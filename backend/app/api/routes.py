from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from app.services.llm_service import llm_engine

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