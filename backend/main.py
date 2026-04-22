import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.api.voice_routes import voice_router

app = FastAPI(title="Zoé Pulse AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1/ai")
app.include_router(voice_router, prefix="/api/v1/voice")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Zoé Pulse AI API!",
        "docs": "Go to http://127.0.0.1:8000/docs to test the AI endpoints."
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    