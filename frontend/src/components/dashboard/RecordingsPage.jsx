import { motion } from 'framer-motion';
import { Video, Play, Download, Trash2, Search, Clock, Users, Calendar, MoreVertical, Eye } from 'lucide-react';
import { useState } from 'react';

const recordings = [
  { id: 1, title: 'Q4 Product Strategy Review', date: 'Apr 21, 2026', duration: '45:12', size: '128 MB', participants: 8, views: 12, hasTranscript: true, hasSummary: true },
  { id: 2, title: 'Engineering Sprint Planning', date: 'Apr 21, 2026', duration: '30:45', size: '86 MB', participants: 12, views: 8, hasTranscript: true, hasSummary: true },
  { id: 3, title: 'Client Onboarding - Acme Corp', date: 'Apr 20, 2026', duration: '58:30', size: '165 MB', participants: 5, views: 15, hasTranscript: true, hasSummary: true },
  { id: 4, title: 'Design System Workshop', date: 'Apr 20, 2026', duration: '1:28:15', size: '245 MB', participants: 6, views: 22, hasTranscript: true, hasSummary: false },
  { id: 5, title: 'Weekly Leadership Sync', date: 'Apr 19, 2026', duration: '24:50', size: '72 MB', participants: 4, views: 6, hasTranscript: true, hasSummary: true },
  { id: 6, title: 'Sales Kickoff Q4', date: 'Apr 18, 2026', duration: '1:15:00', size: '210 MB', participants: 25, views: 34, hasTranscript: true, hasSummary: true },
  { id: 7, title: 'HR Policy Review', date: 'Apr 17, 2026', duration: '35:20', size: '98 MB', participants: 6, views: 4, hasTranscript: true, hasSummary: false },
  { id: 8, title: 'Infrastructure Planning', date: 'Apr 16, 2026', duration: '50:10', size: '142 MB', participants: 7, views: 9, hasTranscript: false, hasSummary: false },
];

export default function RecordingsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = recordings.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSize = recordings.reduce((acc, r) => acc + parseInt(r.size), 0);
  const totalDuration = '6h 28m';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Recordings</h1>
        <p className="text-slate-400 mt-1">Access and manage all your meeting recordings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Recordings</p>
          <p className="text-2xl font-bold mt-1">{recordings.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Duration</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{totalDuration}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Storage Used</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">1.15 GB</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Views</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">110</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search recordings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-zoe-emerald/50"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((recording, i) => (
          <motion.div
            key={recording.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center shrink-0 group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-colors cursor-pointer">
              <Play className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{recording.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{recording.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recording.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{recording.participants}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{recording.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {recording.hasTranscript && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Transcript</span>
              )}
              {recording.hasSummary && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-400/10 text-purple-400 border border-purple-400/20">Summary</span>
              )}
              <span className="text-xs text-slate-500 w-16 text-right">{recording.size}</span>
              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
