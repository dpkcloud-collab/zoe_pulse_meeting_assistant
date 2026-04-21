import { motion } from 'framer-motion';
import {
  Mic, FileText, ListChecks, SmilePlus, UsersRound,
  BrainCircuit, TrendingUp, Clock, CalendarDays, Video,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Meetings This Week', value: '24', change: '+12%', up: true, icon: CalendarDays },
  { label: 'Hours Transcribed', value: '38.5', change: '+8%', up: true, icon: Clock },
  { label: 'Action Items', value: '67', change: '+23%', up: true, icon: ListChecks },
  { label: 'Avg Sentiment', value: '82%', change: '+5%', up: true, icon: SmilePlus },
];

const recentMeetings = [
  { title: 'Q4 Product Strategy Review', date: 'Today, 2:00 PM', duration: '45 min', participants: 8, sentiment: 85, status: 'completed' },
  { title: 'Engineering Sprint Planning', date: 'Today, 11:00 AM', duration: '30 min', participants: 12, sentiment: 78, status: 'completed' },
  { title: 'Client Onboarding - Acme Corp', date: 'Yesterday, 4:00 PM', duration: '60 min', participants: 5, sentiment: 92, status: 'completed' },
  { title: 'Design System Workshop', date: 'Yesterday, 10:00 AM', duration: '90 min', participants: 6, sentiment: 88, status: 'completed' },
  { title: 'Weekly Leadership Sync', date: 'Mon, 9:00 AM', duration: '25 min', participants: 4, sentiment: 71, status: 'completed' },
];

const upcomingMeetings = [
  { title: 'Board Review Preparation', time: 'Tomorrow, 10:00 AM', participants: 6 },
  { title: 'Customer Success Check-in', time: 'Tomorrow, 2:30 PM', participants: 3 },
  { title: 'Tech Architecture Deep Dive', time: 'Thu, 11:00 AM', participants: 9 },
];

const quickActions = [
  { label: 'Live Transcription', icon: Mic, path: '/dashboard/live-transcription', color: 'from-emerald-500 to-teal-500' },
  { label: 'Smart Summary', icon: FileText, path: '/dashboard/smart-summary', color: 'from-purple-500 to-violet-500' },
  { label: 'Action Items', icon: ListChecks, path: '/dashboard/action-items', color: 'from-amber-500 to-orange-500' },
  { label: 'Insights', icon: BrainCircuit, path: '/dashboard/insights', color: 'from-blue-500 to-cyan-500' },
];

const activityFeed = [
  { text: 'AI generated summary for "Q4 Product Strategy Review"', time: '5 min ago', icon: FileText },
  { text: '3 new action items assigned from Sprint Planning', time: '2 hrs ago', icon: ListChecks },
  { text: 'Sentiment alert: Low engagement detected in Leadership Sync', time: '1 day ago', icon: SmilePlus },
  { text: 'Meeting recording processed: Design System Workshop', time: '1 day ago', icon: Video },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function getSentimentColor(score) {
  if (score >= 85) return 'text-emerald-400';
  if (score >= 70) return 'text-amber-400';
  return 'text-rose-400';
}

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back. Here's your meeting intelligence overview.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard/live-transcription')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-medium shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          Start Meeting
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-2xl p-5 hover:border-zoe-emerald/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-slate-400" />
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${action.color} bg-opacity-10 border border-white/5 hover:border-white/10 transition-all cursor-pointer`}
              style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))` }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{action.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Recent Meetings</h2>
            <button onClick={() => navigate('/dashboard/recordings')} className="text-sm text-zoe-emerald hover:underline cursor-pointer">View All</button>
          </div>
          <div className="space-y-3">
            {recentMeetings.map((meeting, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{meeting.title}</p>
                    <p className="text-xs text-slate-400">{meeting.date} · {meeting.duration} · {meeting.participants} participants</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getSentimentColor(meeting.sentiment)} shrink-0`}>
                  {meeting.sentiment}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting, i) => (
                <div key={i} className="flex items-start gap-3 p-2">
                  <div className="w-8 h-8 rounded-lg bg-zoe-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarDays className="w-4 h-4 text-zoe-emerald" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="text-xs text-slate-400">{meeting.time} · {meeting.participants} people</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-zoe-emerald" />
              <h2 className="text-lg font-semibold">Activity</h2>
            </div>
            <div className="space-y-3">
              {activityFeed.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <Icon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">{item.text}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
