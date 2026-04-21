import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Mic, FileText, ListChecks, SmilePlus,
  UsersRound, BrainCircuit, CalendarDays, Video, Settings,
  ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { path: '/dashboard/live-transcription', label: 'Live Transcription', icon: Mic },
  { path: '/dashboard/smart-summary', label: 'Smart Summary', icon: FileText },
  { path: '/dashboard/action-items', label: 'Action Items', icon: ListChecks },
  { path: '/dashboard/sentiment', label: 'Sentiment Analysis', icon: SmilePlus },
  { path: '/dashboard/speaker-analytics', label: 'Speaker Analytics', icon: UsersRound },
  { path: '/dashboard/insights', label: 'Meeting Insights', icon: BrainCircuit },
  { path: '/dashboard/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/dashboard/recordings', label: 'Recordings', icon: Video },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-zoe-navy/95 backdrop-blur-xl border-r border-white/5"
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zoe-emerald to-emerald-600 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-lg gradient-text whitespace-nowrap"
            >
              Zoé Pulse
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.end
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-zoe-emerald/15 text-zoe-emerald'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-6 bg-zoe-emerald rounded-r-full"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </motion.aside>
  );
}
