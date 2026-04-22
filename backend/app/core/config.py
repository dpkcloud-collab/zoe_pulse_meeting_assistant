import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

    if not GROQ_API_KEY:
        print("WARNING: GROQ_API_KEY is not set in the .env file!")
    if not DEEPGRAM_API_KEY:
        print("WARNING: DEEPGRAM_API_KEY is not set in the .env file!")

    DEEPGRAM_MODEL = "nova-3"
    SUPPORTED_AUDIO_FORMATS = {
        "audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp3",
        "audio/ogg", "audio/webm", "audio/flac", "audio/mp4",
        "audio/aac", "audio/opus",
    }
    MAX_AUDIO_SIZE_MB = 500
    DEFAULT_SAMPLE_RATE = 16000

settings = Settings()