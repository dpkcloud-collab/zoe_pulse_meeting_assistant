import os
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

class Settings:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
    if not GROQ_API_KEY:
        print("WARNING: GROQ_API_KEY is not set in the .env file!")

settings = Settings()