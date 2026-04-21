import { motion } from 'framer-motion';
import { UsersRound, Clock, MessageSquare, TrendingUp, Mic } from 'lucide-react';

const speakers = [
  { name: 'Sarah Chen', role: 'VP Product', totalTime: '4h 32m', meetingsAttended: 18, avgTalkTime: '32%', avgSentiment: 87, engagement: 94, topTopics: ['strategy', 'roadmap', 'hiring'], talkRatio: 32, listenRatio: 68 },
  { name: 'Michael Ross', role: 'CFO', totalTime: '3h 15m', meetingsAttended: 14, avgTalkTime: '28%', avgSentiment: 84, engagement: 88, topTopics: ['revenue', 'budget', 'enterprise'], talkRatio: 28, listenRatio: 72 },
  { name: 'Priya Sharma', role: 'Head of Sales', totalTime: '5h 08m', meetingsAttended: 22, avgTalkTime: '35%', avgSentiment: 91, engagement: 96, topTopics: ['pipeline', 'clients', 'onboarding'], talkRatio: 35, listenRatio: 65 },
  { name: 'James Liu', role: 'Engineering Lead', totalTime: '6h 45m', meetingsAttended: 24, avgTalkTime: '38%', avgSentiment: 79, engagement: 82, topTopics: ['sprint', 'architecture', 'performance'], talkRatio: 38, listenRatio: 62 },
  { name: 'Emily Watson', role: 'Product Designer', totalTime: '2h 20m', meetingsAttended: 10, avgTalkTime: '22%', avgSentiment: 86, engagement: 78, topTopics: ['design', 'accessibility', 'UX'], talkRatio: 22, listenRatio: 78 },
  { name: 'David Kim', role: 'Data Scientist', totalTime: '1h 50m', meetingsAttended: 8, avgTalkTime: '18%', avgSentiment: 82, engagement: 72, topTopics: ['analytics', 'models', 'metrics'], talkRatio: 18, listenRatio: 82 },
];

const meetingParticipation = [
  { meeting: 'Q4 Strategy Review', speakers: [{ name: 'Sarah', pct: 35 }, { name: 'Michael', pct: 25 }, { name: 'Priya', pct: 22 }, { name: 'James', pct: 18 }] },
  { meeting: 'Sprint Planning', speakers: [{ name: 'James', pct: 42 }, { name: 'Emily', pct: 20 }, { name: 'David', pct: 18 }, { name: 'Others', pct: 20 }] },
  { meeting: 'Client Onboarding', speakers: [{ name: 'Priya', pct: 48 }, { name: 'Client', pct: 32 }, { name: 'Sarah', pct: 12 }, { name: 'Others', pct: 8 }] },
];

const speakerColors = ['bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-amber-400', 'bg-rose-400', 'bg-cyan-400'];

export default function SpeakerAnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Speaker Analytics</h1>
        <p className="text-slate-400 mt-1">Deep insights into participation patterns and speaker dynamics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Speakers</p>
          <p className="text-2xl font-bold mt-1">{speakers.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Avg Engagement</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">85%</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Most Active</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">James Liu</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Talk Time</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">23h 50m</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5">Speaker Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {speakers.map((speaker, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${speakerColors[i]} bg-opacity-20 flex items-center justify-center text-sm font-bold`}>
                  {speaker.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{speaker.name}</p>
                  <p className="text-xs text-slate-400">{speaker.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-300">{speaker.totalTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-300">{speaker.meetingsAttended} meetings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-300">{speaker.avgTalkTime} avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-300">{speaker.engagement}% engaged</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Talk {speaker.talkRatio}%</span>
                  <span>Listen {speaker.listenRatio}%</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${speaker.talkRatio}%` }} transition={{ delay: 0.3, duration: 0.5 }} className={`${speakerColors[i]} rounded-full`} />
                  <div className="flex-1 bg-white/10 rounded-full" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {speaker.topTopics.map((topic) => (
                  <span key={topic} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{topic}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5">Meeting Participation Breakdown</h2>
        <div className="space-y-5">
          {meetingParticipation.map((meeting, mi) => (
            <div key={mi}>
              <p className="text-sm font-medium mb-2">{meeting.meeting}</p>
              <div className="flex h-8 rounded-xl overflow-hidden gap-0.5">
                {meeting.speakers.map((s, si) => (
                  <motion.div
                    key={si}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.2 + si * 0.1, duration: 0.5 }}
                    className={`${speakerColors[si]} flex items-center justify-center text-[10px] font-bold text-white/90 rounded-lg`}
                  >
                    {s.pct >= 15 && `${s.name} ${s.pct}%`}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
