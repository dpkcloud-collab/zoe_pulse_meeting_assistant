from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from datetime import datetime


class SupportedLanguage(str, Enum):
    AUTO = "auto"
    ENGLISH = "en"
    ARABIC = "ar"
    RUSSIAN = "ru"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    JAPANESE = "ja"
    CHINESE = "zh"
    HINDI = "hi"
    PORTUGUESE = "pt"
    KOREAN = "ko"
    ITALIAN = "it"
    TURKISH = "tr"
    DUTCH = "nl"
    POLISH = "pl"


class DeepgramModel(str, Enum):
    NOVA_3 = "nova-3"
    NOVA_2 = "nova-2"
    ENHANCED = "enhanced"
    BASE = "base"


class TranscriptionWord(BaseModel):
    text: str
    start: float
    end: float
    confidence: Optional[float] = None
    speaker_id: Optional[str] = None
    punctuated_word: Optional[str] = None


class Utterance(BaseModel):
    speaker_id: str
    text: str
    start: float
    end: float
    confidence: Optional[float] = None


class TranscriptionRequest(BaseModel):
    language_code: SupportedLanguage = Field(
        default=SupportedLanguage.AUTO,
        description="ISO-639-1 language code. Use 'auto' for automatic detection."
    )
    model_id: DeepgramModel = Field(
        default=DeepgramModel.NOVA_3,
        description="Deepgram model to use for transcription."
    )
    diarize: bool = Field(
        default=True,
        description="Enable speaker diarization to identify who said what."
    )
    smart_format: bool = Field(
        default=True,
        description="Enable smart formatting for punctuation, capitalization, etc."
    )
    utterances: bool = Field(
        default=True,
        description="Split transcript into speaker-attributed utterances."
    )
    punctuate: bool = Field(
        default=True,
        description="Add punctuation to the transcript."
    )


class TranscriptionResponse(BaseModel):
    meeting_id: str
    status: str = "success"
    language_code: str
    language_probability: Optional[float] = None
    text: str
    words: List[TranscriptionWord] = []
    utterances: List[Utterance] = []
    duration_seconds: Optional[float] = None
    speaker_count: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TranscriptionChunk(BaseModel):
    meeting_id: str
    chunk_index: int
    speaker_id: Optional[str] = None
    text: str
    start: float
    end: float
    is_final: bool = False
    speech_final: bool = False
    language_code: Optional[str] = None
    confidence: Optional[float] = None


class TranscriptionSessionStart(BaseModel):
    meeting_id: str
    language_code: SupportedLanguage = SupportedLanguage.AUTO
    diarize: bool = True
    sample_rate: int = Field(default=16000, description="Audio sample rate in Hz.")


class TranscriptionSessionStatus(BaseModel):
    meeting_id: str
    status: str
    elapsed_seconds: float = 0.0
    chunks_processed: int = 0
    speaker_count: int = 0
    language_detected: Optional[str] = None


class TranscriptionError(BaseModel):
    status: str = "error"
    detail: str
    code: Optional[str] = None


class HealthResponse(BaseModel):
    status: str = "success"
    service: str
    deepgram_connected: bool
    model: str
