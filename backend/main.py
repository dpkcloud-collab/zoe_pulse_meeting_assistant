import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(title="Zoé Pulse AI Engine")

# Allow your React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the API routes
app.include_router(router, prefix="/api/v1/ai")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Zoé Pulse AI API!",
        "docs": "Go to http://127.0.0.1:8000/docs to test the AI endpoints."
    }

# NEW CODE ADDED HERE:
# This tells standard Python to start the Uvicorn server automatically
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    