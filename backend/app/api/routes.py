from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import json
from app.services.llm_service import llm_engine
# Import the new Deepgram STT service we built!
from app.services.stt_services import stt_engine 

router = APIRouter()

# Data model for what the frontend needs to send
class TranscriptPayload(BaseModel):
    meeting_id: str
    text: str

@router.get("/health")
async def health_check():
    return {"status": "success", "service": "FastAPI AI Engine running!"}

@router.post("/generate-mom")
async def create_mom(payload: TranscriptPayload):
    if not payload.text:
        raise HTTPException(status_code=400, detail="Transcript text is required")
        
    try:
        # Call Groq to generate the Minutes of Meeting
        raw_mom_string = llm_engine.generate_mom(payload.text)
        
        # Parse the string back into a Python dictionary
        mom_json = json.loads(raw_mom_string)
        
        return {
            "meeting_id": payload.meeting_id,
            "status": "success",
            "data": mom_json
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================
# NEW: LIVE AUDIO WEBSOCKET ENDPOINT
# ==========================================
@router.websocket("/ws/audio/{meeting_id}")
async def websocket_audio_endpoint(websocket: WebSocket, meeting_id: str):
    # 1. Accept the live connection from React
    await websocket.accept()
    print(f"🔌 React Frontend connected for meeting: {meeting_id}")

    # 2. Define how to send Deepgram's text back to React
    async def send_transcript_to_frontend(transcript: str):
        # We package it as JSON so React can easily read it
        await websocket.send_json({"type": "transcript", "text": transcript})

    # 3. Open the permanent tube to Deepgram using our STT service
    dg_connection = await stt_engine.create_live_stream(send_transcript_to_frontend)

    if not dg_connection:
        print("Failed to connect to Deepgram.")
        await websocket.close()
        return

    try:
        # 4. Continuously listen for audio chunks from React
        while True:
            # Receive the raw WebM audio bytes from the browser
            audio_data = await websocket.receive_bytes()
            
            # Forward the audio directly into the Deepgram live stream
            await dg_connection.send(audio_data)
            
    except WebSocketDisconnect:
        print(f"❌ React Frontend disconnected for meeting: {meeting_id}")
    except Exception as e:
        print(f"⚠️ Error during audio streaming: {e}")
    finally:
        # 5. Clean up: Tell Deepgram the meeting is over
        dg_connection.finish()