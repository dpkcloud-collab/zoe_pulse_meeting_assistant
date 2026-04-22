import asyncio
from deepgram import (
    DeepgramClient,
    LiveTranscriptionEvents,
    LiveOptions,
)
from app.core.config import settings 

class STTService:
    def __init__(self):
        # Initialize the Deepgram client using your .env key
        self.deepgram = DeepgramClient(settings.DEEPGRAM_API_KEY)

    async def create_live_stream(self, frontend_callback):
        """
        Creates a live WebSocket connection to Deepgram.
        """
        # 1. The EXACT syntax for v3.9.0 Async Websockets
        dg_connection = self.deepgram.listen.asynclive.v("1")

        # 2. Define what happens when Deepgram successfully transcribes audio
        async def on_message(self, result, **kwargs):
            sentence = result.channel.alternatives[0]
            transcript = sentence.transcript
            
            if len(transcript) == 0:
                return

            # --- NEW METADATA EXTRACTION ---
            # Grab the real timestamps and finality flag
            is_final = result.is_final
            start = result.start
            end = start + result.duration
            
            # Grab the speaker ID (Deepgram assigns 0, 1, 2, etc.)
            speaker_id = "speaker_0"
            if hasattr(sentence, 'words') and sentence.words and hasattr(sentence.words[0], 'speaker'):
                speaker_id = f"speaker_{sentence.words[0].speaker}"

            # Optional: print to terminal for debugging
            if is_final:
                print(f"🎙️ Deepgram Heard [{speaker_id}]: {transcript}")

            # Send ALL this rich data to the callback in voice_routes.py
            await frontend_callback(transcript, is_final, start, end, speaker_id)

        # 3. Define what happens if Deepgram throws an error
        async def on_error(self, error, **kwargs):
            print(f"❌ Deepgram Error: {error}")

        # Attach the listeners
        dg_connection.on(LiveTranscriptionEvents.Transcript, on_message)
        dg_connection.on(LiveTranscriptionEvents.Error, on_error)

        # 4. Start the connection!
        options = LiveOptions(
            model="nova-2",
            language="en",
            smart_format=True, 
            diarize=True,  # Turn on Speaker Detection!
        )

        if await dg_connection.start(options) is False:
            print("Failed to start Deepgram connection")
            return None

        print("✅ Deepgram Live Stream Connected!")
        return dg_connection

# Export the engine so routes.py can use it
stt_engine = STTService()