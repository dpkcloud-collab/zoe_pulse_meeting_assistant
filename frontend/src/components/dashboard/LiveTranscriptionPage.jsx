import { motion } from 'framer-motion';
import { Mic, MicOff, Radio, Users, Globe, Clock, Pause, Play, Download, Copy, Check, Upload, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api/v1/voice';
const WS_BASE = 'ws://127.0.0.1:8000/api/v1/voice';

const LANGUAGE_OPTIONS = [
  { code: 'auto', name: 'Auto-Detect' },
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
];

const SPEAKER_COLORS = [
  'text-emerald-400', 'text-blue-400', 'text-purple-400', 'text-amber-400',
  'text-rose-400', 'text-cyan-400', 'text-lime-400', 'text-fuchsia-400',
];

function getSpeakerColor(speakerId, speakerMap) {
  if (!speakerId) return 'text-slate-400';
  if (!speakerMap.current[speakerId]) {
    const idx = Object.keys(speakerMap.current).length % SPEAKER_COLORS.length;
    speakerMap.current[speakerId] = SPEAKER_COLORS[idx];
  }
  return speakerMap.current[speakerId];
}

function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function LiveTranscriptionPage() {
  const [mode, setMode] = useState('live');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState('auto');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [speakerCount, setSpeakerCount] = useState(0);
  const [detectedLang, setDetectedLang] = useState(null);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wsRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const speakerMapRef = useRef({});
  const meetingIdRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then((r) => r.json())
      .then((data) => setBackendStatus(data.deepgram_connected ? 'connected' : 'degraded'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptLines]);

  useEffect(() => {
    if (!isRecording || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused]);

  const startLiveRecording = useCallback(async () => {
    setError(null);
    setTranscriptLines([]);
    setElapsedTime(0);
    setSpeakerCount(0);
    setDetectedLang(null);
    speakerMapRef.current = {};

    const mid = `meeting_${Date.now()}`;
    meetingIdRef.current = mid;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ws = new WebSocket(`${WS_BASE}/ws/transcribe/${mid}`);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          language_code: selectedLang,
          diarize: true,
        }));

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : 'audio/webm',
        });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            event.data.arrayBuffer().then((buffer) => {
              ws.send(new Uint8Array(buffer));
            });
          }
        };

        mediaRecorder.start(3000);
        setIsRecording(true);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === 'transcription' && msg.data) {
          const chunk = msg.data;
          const speakerLabel = chunk.speaker_id
            ? chunk.speaker_id.replace('speaker_', 'Speaker ')
            : 'Speaker';

          setTranscriptLines((prev) => [
            ...prev,
            {
              speaker: speakerLabel,
              text: chunk.text,
              time: formatTimestamp(chunk.start),
              color: getSpeakerColor(chunk.speaker_id, speakerMapRef),
              speakerId: chunk.speaker_id,
            },
          ]);

          if (chunk.language_code) setDetectedLang(chunk.language_code);
          setSpeakerCount(Object.keys(speakerMapRef.current).length);
        }

        if (msg.type === 'error') {
          setError(msg.detail);
        }
      };

      ws.onerror = () => setError('WebSocket connection error. Is the backend running?');
      ws.onclose = () => {
        if (isRecording) setIsRecording(false);
      };

    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone permissions.');
      } else {
        setError(`Failed to start recording: ${err.message}`);
      }
    }
  }, [selectedLang]);

  const stopLiveRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    setIsRecording(false);
    setIsPaused(false);
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setUploadStatus('uploading');
    setTranscriptLines([]);
    setSpeakerCount(0);
    setDetectedLang(null);
    speakerMapRef.current = {};

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language_code', selectedLang);
    formData.append('diarize', 'true');
    formData.append('smart_format', 'true');
    formData.append('utterances', 'true');
    formData.append('punctuate', 'true');

    try {
      const response = await fetch(`${API_BASE}/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Transcription failed');
      }

      const data = await response.json();
      setUploadStatus('done');
      setDetectedLang(data.language_code);
      setSpeakerCount(data.speaker_count || 0);

      const lines = [];

      if (data.utterances && data.utterances.length > 0) {
        for (const u of data.utterances) {
          const label = u.speaker_id
            ? u.speaker_id.replace('speaker_', 'Speaker ')
            : 'Speaker';
          lines.push({
            speaker: label,
            text: u.text,
            time: formatTimestamp(u.start),
            color: getSpeakerColor(u.speaker_id, speakerMapRef),
            speakerId: u.speaker_id,
          });
        }
      } else if (data.words && data.words.length > 0) {
        let currentSpeaker = null;
        let currentText = '';
        let currentStart = 0;

        for (const word of data.words) {
          if (word.speaker_id !== currentSpeaker && currentText.trim()) {
            const label = currentSpeaker
              ? currentSpeaker.replace('speaker_', 'Speaker ')
              : 'Speaker';
            lines.push({
              speaker: label,
              text: currentText.trim(),
              time: formatTimestamp(currentStart),
              color: getSpeakerColor(currentSpeaker, speakerMapRef),
              speakerId: currentSpeaker,
            });
            currentText = '';
            currentStart = word.start;
          }
          currentSpeaker = word.speaker_id;
          currentText += (word.punctuated_word || word.text) + ' ';
        }

        if (currentText.trim()) {
          const label = currentSpeaker
            ? currentSpeaker.replace('speaker_', 'Speaker ')
            : 'Speaker';
          lines.push({
            speaker: label,
            text: currentText.trim(),
            time: formatTimestamp(currentStart),
            color: getSpeakerColor(currentSpeaker, speakerMapRef),
            speakerId: currentSpeaker,
          });
        }
      }

      if (lines.length === 0 && data.text) {
        lines.push({
          speaker: 'Speaker',
          text: data.text,
          time: '00:00',
          color: 'text-emerald-400',
        });
      }

      setTranscriptLines(lines);
      setElapsedTime(Math.round(data.duration_seconds || 0));

    } catch (err) {
      setError(err.message);
      setUploadStatus(null);
    }
  };

  const handleCopy = () => {
    const text = transcriptLines.map((l) => `[${l.time}] ${l.speaker}: ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = transcriptLines.map((l) => `[${l.time}] ${l.speaker}: ${l.text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${meetingIdRef.current || 'meeting'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const langName = LANGUAGE_OPTIONS.find((l) => l.code === (detectedLang || selectedLang))?.name || selectedLang;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Transcription</h1>
          <p className="text-slate-400 mt-1">Real-time speech-to-text powered by Deepgram Nova-3</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {backendStatus === 'connected' ? (
              <Wifi className="w-4 h-4 text-emerald-400" />
            ) : backendStatus === 'checking' ? (
              <Wifi className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <WifiOff className="w-4 h-4 text-rose-400" />
            )}
            <span className={`text-xs font-medium ${
              backendStatus === 'connected' ? 'text-emerald-400' :
              backendStatus === 'checking' ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {backendStatus === 'connected' ? 'API Connected' :
               backendStatus === 'checking' ? 'Checking...' : 'API Offline'}
            </span>
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-zoe-emerald/50"
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.code} value={l.code} className="bg-zoe-navy">{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20"
        >
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <p className="text-sm text-rose-300">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-white cursor-pointer text-sm">Dismiss</button>
        </motion.div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setMode('live')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === 'live' ? 'bg-zoe-emerald/20 text-zoe-emerald' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2"><Mic className="w-4 h-4" />Live Recording</span>
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            mode === 'upload' ? 'bg-zoe-emerald/20 text-zoe-emerald' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2"><Upload className="w-4 h-4" />Upload Audio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : uploadStatus === 'uploading' ? 'bg-amber-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-sm font-medium">
            {isRecording ? 'Recording' : uploadStatus === 'uploading' ? 'Processing...' : uploadStatus === 'done' ? 'Transcribed' : 'Idle'}
          </span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{speakerCount} Speaker{speakerCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{langName}</span>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            {mode === 'live' ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isRecording ? stopLiveRecording() : startLiveRecording()}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium cursor-pointer ${
                    isRecording
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Stop' : 'Start Recording'}
                </motion.button>
                {isRecording && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </motion.button>
                )}
              </>
            ) : (
              <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white cursor-pointer">
                <Upload className="w-4 h-4" />
                {uploadStatus === 'uploading' ? 'Processing...' : 'Upload Audio File'}
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploadStatus === 'uploading'}
                />
              </label>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} disabled={transcriptLines.length === 0} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer disabled:opacity-30">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={handleDownload} disabled={transcriptLines.length === 0} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer disabled:opacity-30">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="h-[500px] overflow-y-auto p-6 space-y-4">
          {transcriptLines.length === 0 && !isRecording && uploadStatus !== 'uploading' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Radio className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">Ready to transcribe</p>
              <p className="text-sm mt-1">
                {mode === 'live'
                  ? 'Click "Start Recording" to begin live transcription'
                  : 'Upload an audio file (WAV, MP3, OGG, WebM) to transcribe'}
              </p>
              <p className="text-xs text-slate-600 mt-3">Supports Arabic, Russian, English, and 90+ languages</p>
            </div>
          )}
          {transcriptLines.length === 0 && (isRecording || uploadStatus === 'uploading') && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Mic className="w-16 h-16 text-red-400 opacity-50" />
              </motion.div>
              <p className="text-lg font-medium mt-4">{isRecording ? 'Listening...' : 'Processing audio...'}</p>
              <p className="text-sm text-slate-600 mt-1">Deepgram Nova-3 is analyzing the audio</p>
            </div>
          )}
          {transcriptLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 group"
            >
              <span className="text-xs text-slate-500 mt-1 shrink-0 w-16 font-mono">{line.time}</span>
              <div className="flex-1">
                <span className={`text-sm font-semibold ${line.color}`}>{line.speaker}</span>
                <p className="text-slate-300 mt-0.5 leading-relaxed">{line.text}</p>
              </div>
            </motion.div>
          ))}
          {isRecording && !isPaused && transcriptLines.length > 0 && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-2 text-slate-500 pl-20"
            >
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zoe-emerald animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zoe-emerald animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zoe-emerald animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs">Transcribing...</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
