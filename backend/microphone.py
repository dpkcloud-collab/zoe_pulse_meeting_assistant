import sounddevice as sd
from scipy.io.wavfile import write
import numpy as np

def record_audio(duration=5, sample_rate=16000):
    print(f"\n RECORDING FOR {duration} SECONDS... SPEAK NOW!")
    
    # Capture audio from the default microphone
    # We use 1 channel (mono) which is standard for speech-to-text AI
    audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype=np.int16)
    
    # Wait until the recording is finished
    sd.wait()
    print("Recording complete!")
    
    # Save the audio chunk to a file
    filename = "test_meeting.wav"
    write(filename, sample_rate, audio_data)
    print(f"Audio saved successfully to: {filename}\n")

if __name__ == "__main__":
    record_audio()