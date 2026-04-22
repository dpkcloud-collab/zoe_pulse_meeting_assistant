import uuid
import json
import time
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, WebSocket, WebSocketDisconnect
from typing import Optional
from app.schemas.voice_schemas import HealthResponse
from app.services.stt_services import stt_engine
from app.core.config import settings

voice_router = APIRouter()

@voice_router.get("/health", response_model=HealthResponse)
async def voice_health():
    # Simplified health check for the new WebSocket engine
    return HealthResponse(
        status="success",
        service="Deepgram Live STT Engine (WebSocket)",
        deepgram_connected=True,
        model=settings.DEEPGRAM_MODEL,
    )

@voice_router.get("/languages")
async def get_supported_languages():
    return {
        "status": "success",
        "languages": [
            {"code": "auto", "name": "Auto-Detect"},
            {"code": "en", "name": "English"},
            {"code": "ar", "name": "Arabic"},
            {"code": "ru", "name": "Russian"},
            {"code": "es", "name": "Spanish"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
        ],
    }

# ==========================================
# OLD REST ROUTES (Safely stubbed out)
# ==========================================
@voice_router.post("/session/start")
async def start_transcription_session(payload: dict):
    # The WebSocket handles session creation natively now.
    # Returning a mock success so the frontend doesn't crash if it calls this.
    return {
        "meeting_id": payload.get("meeting_id", str(uuid.uuid4())),
        "status": "active",
        "elapsed_seconds": 0.0,
    }

@voice_router.post("/session/{meeting_id}/stop")
async def stop_transcription_session(meeting_id: str):
    return {"meeting_id": meeting_id, "status": "stopped"}


# ==========================================
# THE NEW LIVE WEBSOCKET BRIDGE
# ==========================================
@voice_router.websocket("/ws/transcribe/{meeting_id}")
async def websocket_transcribe(websocket: WebSocket, meeting_id: str):
    # 1. Accept the live connection from React
    await websocket.accept()
    print(f"🔌 React Frontend connected for meeting: {meeting_id}")

    # Optional: Read initial config if React sends it
    try:
        init_data = await websocket.receive_text()
        print(f"Config received: {init_data}")
    except Exception:
        pass

    # 2. Define how to send Deepgram's text back to React
    # ---> THIS IS THE CRITICAL UPDATE <---
    async def send_transcript_to_frontend(transcript: str, is_final: bool, start: float, end: float, speaker_id: str):
        # We package it exactly how your frontend expects it
        await websocket.send_json({
            "type": "transcription",
            "data": {
                "meeting_id": meeting_id,
                "text": transcript,
                "is_final": is_final, 
                "start": start,       
                "end": end,           
                "speaker_id": speaker_id 
            }
        })

    # 3. Open the permanent tube to Deepgram using our NEW STT engine
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
        if dg_connection:
            dg_connection.finish()