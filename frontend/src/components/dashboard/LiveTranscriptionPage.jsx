import { motion } from 'framer-motion';
import { Mic, MicOff, Radio, Users, Globe, Clock, Pause, Play, Download, Copy, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const sampleTranscript = [
  { speaker: 'Sarah Chen', text: 'Let\'s kick off our Q4 planning session. I want to cover three main topics today: revenue targets, product roadmap, and team expansion.', time: '00:00:12', color: 'text-emerald-400' },
  { speaker: 'Michael Ross', text: 'Sounds great. On the revenue side, we\'re tracking 18% above our Q3 numbers. The enterprise segment is really driving growth.', time: '00:00:28', color: 'text-blue-400' },
  { speaker: 'Priya Sharma', text: 'I can confirm that. We closed three major enterprise deals last month. The pipeline looks strong with 12 more in late-stage negotiations.', time: '00:00:45', color: 'text-purple-400' },
  { speaker: 'Sarah Chen', text: 'Excellent numbers. Michael, can you break down the revenue by segment for the board deck?', time: '00:01:02', color: 'text-emerald-400' },
  { speaker: 'James Liu', text: 'From the product side, we\'re on track to ship the analytics dashboard v2 by end of October. The beta feedback has been overwhelmingly positive.', time: '00:01:18', color: 'text-amber-400' },
  { speaker: 'Michael Ross', text: 'The customers are asking for real-time collaboration features. That should be a priority for the next sprint.', time: '00:01:35', color: 'text-blue-400' },
  { speaker: 'Priya Sharma', text: 'Agreed. I\'ve been hearing the same from our top accounts. Real-time is the number one feature request across the board.', time: '00:01:52', color: 'text-purple-400' },
  { speaker: 'Sarah Chen', text: 'Let\'s allocate dedicated resources for that. James, can your team scope it out by Friday?', time: '00:02:08', color: 'text-emerald-400' },
];

const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Arabic', 'Hindi'];

export default function LiveTranscriptionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isRecording || isPaused) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev.length >= sampleTranscript.length) return prev;
        return [...prev, sampleTranscript[prev.length]];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (!isRecording || isPaused) return;
    const timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleCopy = () => {
    const text = visibleLines.map((l) => `[${l.time}] ${l.speaker}: ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Transcription</h1>
          <p className="text-slate-400 mt-1">Real-time speech-to-text with speaker identification</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-zoe-emerald/50"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-zoe-navy">{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-sm font-medium">{isRecording ? 'Recording' : 'Idle'}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{new Set(visibleLines.map((l) => l.speaker)).size} Speakers</span>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{selectedLang}</span>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setIsRecording(!isRecording); if (!isRecording) { setVisibleLines([]); setElapsedTime(0); } }}
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
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="h-[500px] overflow-y-auto p-6 space-y-4">
          {visibleLines.length === 0 && !isRecording && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Radio className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">Ready to transcribe</p>
              <p className="text-sm mt-1">Click "Start Recording" to begin live transcription</p>
            </div>
          )}
          {visibleLines.length === 0 && isRecording && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Mic className="w-16 h-16 text-red-400 opacity-50" />
              </motion.div>
              <p className="text-lg font-medium mt-4">Listening...</p>
            </div>
          )}
          {visibleLines.map((line, i) => (
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
          {isRecording && !isPaused && visibleLines.length > 0 && visibleLines.length < sampleTranscript.length && (
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
