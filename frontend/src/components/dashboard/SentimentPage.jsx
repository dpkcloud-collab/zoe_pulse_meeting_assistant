import { motion } from 'framer-motion';
import { SmilePlus, Smile, Meh, Frown, TrendingUp, TrendingDown, Minus, Users } from 'lucide-react';

const meetingSentiments = [
  {
    title: 'Q4 Product Strategy Review',
    date: 'Today, 2:00 PM',
    overall: 85,
    mood: 'Positive',
    segments: [
      { label: 'Opening', score: 82, time: '0-10 min' },
      { label: 'Revenue Discussion', score: 92, time: '10-20 min' },
      { label: 'Product Roadmap', score: 88, time: '20-30 min' },
      { label: 'Resource Planning', score: 72, time: '30-40 min' },
      { label: 'Closing', score: 90, time: '40-45 min' },
    ],
    speakers: [
      { name: 'Sarah Chen', sentiment: 88, engagement: 'High', keywords: ['growth', 'priority', 'excellent'] },
      { name: 'Michael Ross', sentiment: 85, engagement: 'High', keywords: ['revenue', 'enterprise', 'tracking'] },
      { name: 'Priya Sharma', sentiment: 90, engagement: 'Medium', keywords: ['confirmed', 'pipeline', 'strong'] },
      { name: 'James Liu', sentiment: 78, engagement: 'High', keywords: ['on track', 'feedback', 'ship'] },
    ],
    emotions: { confident: 35, enthusiastic: 28, analytical: 22, concerned: 10, neutral: 5 },
  },
  {
    title: 'Engineering Sprint Planning',
    date: 'Today, 11:00 AM',
    overall: 78,
    mood: 'Neutral-Positive',
    segments: [
      { label: 'Backlog Review', score: 72, time: '0-10 min' },
      { label: 'Sprint Goals', score: 80, time: '10-20 min' },
      { label: 'Task Assignment', score: 75, time: '20-25 min' },
      { label: 'Blockers', score: 65, time: '25-30 min' },
    ],
    speakers: [
      { name: 'James Liu', sentiment: 76, engagement: 'High', keywords: ['scope', 'capacity', 'sprint'] },
      { name: 'Dev Team', sentiment: 80, engagement: 'Medium', keywords: ['feasible', 'estimate', 'dependency'] },
    ],
    emotions: { analytical: 40, neutral: 25, concerned: 15, confident: 12, enthusiastic: 8 },
  },
];

function getSentimentIcon(score) {
  if (score >= 80) return <Smile className="w-5 h-5 text-emerald-400" />;
  if (score >= 60) return <Meh className="w-5 h-5 text-amber-400" />;
  return <Frown className="w-5 h-5 text-rose-400" />;
}

function getSentimentBarColor(score) {
  if (score >= 80) return 'bg-emerald-400';
  if (score >= 60) return 'bg-amber-400';
  return 'bg-rose-400';
}

const emotionColors = {
  confident: 'bg-emerald-400',
  enthusiastic: 'bg-blue-400',
  analytical: 'bg-violet-400',
  concerned: 'bg-amber-400',
  neutral: 'bg-slate-400',
};

export default function SentimentPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sentiment Analysis</h1>
        <p className="text-slate-400 mt-1">AI-powered emotional intelligence across your meetings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Avg Sentiment</p>
            <p className="text-2xl font-bold">82%</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <Minus className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Meetings Analyzed</p>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Speakers Tracked</p>
            <p className="text-2xl font-bold">18</p>
          </div>
        </div>
      </div>

      {meetingSentiments.map((meeting, mi) => (
        <motion.div
          key={mi}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: mi * 0.1 }}
          className="glass rounded-2xl p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getSentimentIcon(meeting.overall)}
              <div>
                <h3 className="font-semibold text-white">{meeting.title}</h3>
                <p className="text-xs text-slate-400">{meeting.date} · {meeting.mood}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{meeting.overall}%</p>
              <p className="text-xs text-slate-400">Overall</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Sentiment Timeline</h4>
            <div className="flex items-end gap-2 h-24">
              {meeting.segments.map((seg, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium">{seg.score}%</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${seg.score}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${getSentimentBarColor(seg.score)}`}
                    style={{ maxHeight: `${seg.score}%` }}
                  />
                  <span className="text-[10px] text-slate-500 mt-1">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Emotional Breakdown</h4>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
              {Object.entries(meeting.emotions).map(([emotion, value]) => (
                <motion.div
                  key={emotion}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`${emotionColors[emotion]} rounded-full`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {Object.entries(meeting.emotions).map(([emotion, value]) => (
                <span key={emotion} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <div className={`w-2 h-2 rounded-full ${emotionColors[emotion]}`} />
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)} {value}%
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Speaker Sentiment</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {meeting.speakers.map((speaker, si) => (
                <div key={si} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zoe-emerald/30 to-emerald-600/30 flex items-center justify-center text-xs font-bold">
                    {speaker.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{speaker.name}</span>
                      <span className="text-sm font-bold">{speaker.sentiment}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 mt-1">
                      <div className={`h-full rounded-full ${getSentimentBarColor(speaker.sentiment)}`} style={{ width: `${speaker.sentiment}%` }} />
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      {speaker.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
