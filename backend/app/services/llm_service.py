from groq import Groq
from app.core.config import settings
from app.prompts.templates import MOM_PROMPT_TEMPLATE

class GroqService:
    def __init__(self):
        # Initialize the Groq client using the API key from config
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        # Using a model supported by Groq. You can swap this with Qwen if available on their tier, 
        # or use Llama 3 which Groq runs incredibly fast.
        self.model_name = "qwen/qwen3-32b"

    def generate_mom(self, transcript: str) -> dict:
        """Takes a raw transcript, sends it to Groq, and returns JSON."""
        
        prompt = MOM_PROMPT_TEMPLATE.format(transcript=transcript)
        
        try:
            response = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system", 
                        "content": "You are a helpful assistant that ALWAYS outputs valid JSON."
                    },
                    {
                        "role": "user", 
                        "content": prompt
                    }
                ],
                model=self.model_name,
                temperature=0.3, # Low temperature for accurate, factual responses
                response_format={"type": "json_object"} # Forces the API to return clean JSON
            )
            
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error communicating with Groq: {e}")
            raise e

# Instantiate the service
llm_engine = GroqService()