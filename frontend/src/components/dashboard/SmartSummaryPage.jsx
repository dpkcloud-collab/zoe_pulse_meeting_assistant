import { motion } from 'framer-motion';
import { FileText, Clock, Users, Sparkles, ChevronDown, ChevronUp, Copy, Check, Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const meetings = [
  {
    id: 1,
    title: 'Q4 Product Strategy Review',
    date: 'Apr 21, 2026 - 2:00 PM',
    duration: '45 min',
    participants: ['Sarah Chen', 'Michael Ross', 'Priya Sharma', 'James Liu'],
    summary: 'The team reviewed Q4 strategy with a focus on enterprise growth. Revenue is 18% above Q3 targets, driven by three major enterprise deals. Product roadmap includes analytics dashboard v2 shipping in October and real-time collaboration features as top priority. Team expansion plans include 4 senior engineers and 2 product designers to be hired by end of Q4.',
    keyTopics: ['Revenue Growth', 'Product Roadmap', 'Enterprise Sales', 'Hiring Plan'],
    decisions: [
      'Prioritize real-time collaboration features in next sprint',
      'Allocate $500K additional budget for Q4 hiring',
      'Schedule board presentation for October 15th',
    ],
    actionItems: [
      { task: 'Break down revenue by segment for board deck', owner: 'Michael Ross', deadline: 'Apr 25' },
      { task: 'Scope real-time collaboration feature', owner: 'James Liu', deadline: 'Apr 25' },
      { task: 'Draft job descriptions for senior engineers', owner: 'Sarah Chen', deadline: 'Apr 28' },
    ],
  },
  {
    id: 2,
    title: 'Engineering Sprint Planning',
    date: 'Apr 21, 2026 - 11:00 AM',
    duration: '30 min',
    participants: ['James Liu', 'Dev Team'],
    summary: 'Sprint 24 planning completed. 34 story points committed across 12 tickets. Focus areas include API performance optimization, notification system refactor, and accessibility improvements. Two tech debt items carried over from previous sprint. Team velocity is stable at 32-36 points.',
    keyTopics: ['Sprint Planning', 'API Performance', 'Accessibility', 'Tech Debt'],
    decisions: [
      'Move to GraphQL for the analytics endpoints',
      'Defer mobile app work to Sprint 25',
    ],
    actionItems: [
      { task: 'Create API benchmark suite', owner: 'Dev Team', deadline: 'Apr 23' },
      { task: 'Audit WCAG compliance on dashboard', owner: 'James Liu', deadline: 'Apr 28' },
    ],
  },
  {
    id: 3,
    title: 'Client Onboarding - Acme Corp',
    date: 'Apr 20, 2026 - 4:00 PM',
    duration: '60 min',
    participants: ['Priya Sharma', 'Acme Corp Team'],
    summary: 'Successfully onboarded Acme Corp with 500-seat enterprise license. Client requires SSO integration with their Azure AD, custom data retention policies (7 years), and dedicated support channel. Training sessions scheduled for the first two weeks. Client expressed strong interest in the analytics module for their compliance reporting needs.',
    keyTopics: ['Enterprise Onboarding', 'SSO Integration', 'Compliance', 'Training'],
    decisions: [
      'Set up dedicated Slack channel for Acme Corp support',
      'Enable advanced compliance reporting features',
    ],
    actionItems: [
      { task: 'Configure Azure AD SSO for Acme Corp', owner: 'Dev Team', deadline: 'Apr 24' },
      { task: 'Schedule training sessions', owner: 'Priya Sharma', deadline: 'Apr 22' },
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SmartSummaryPage() {
  const [expanded, setExpanded] = useState(meetings[0].id);
  const [copied, setCopied] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smart Summary</h1>
          <p className="text-slate-400 mt-1">AI-powered meeting summaries with key decisions and action items</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === meeting.id ? null : meeting.id)}
              className="w-full flex items-center justify-between p-5 cursor-pointer text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{meeting.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meeting.date}</span>
                    <span>·</span>
                    <span>{meeting.duration}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{meeting.participants.length}</span>
                  </div>
                </div>
              </div>
              {expanded === meeting.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expanded === meeting.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/5"
              >
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-zoe-emerald uppercase tracking-wider">Summary</h4>
                      <button onClick={() => handleCopy(meeting.id, meeting.summary)} className="p-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                        {copied === meeting.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      </button>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{meeting.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {meeting.keyTopics.map((topic) => (
                      <span key={topic} className="px-3 py-1 rounded-full bg-zoe-emerald/10 text-zoe-emerald text-xs font-medium">{topic}</span>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Key Decisions</h4>
                    <ul className="space-y-2">
                      {meeting.decisions.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Action Items</h4>
                    <div className="space-y-2">
                      {meeting.actionItems.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded border border-white/20" />
                            <span className="text-sm text-slate-300">{item.task}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0 ml-4">
                            <span>{item.owner}</span>
                            <span className="px-2 py-0.5 rounded bg-white/5">{item.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white cursor-pointer">
                      <Download className="w-4 h-4" />Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white cursor-pointer">
                      <Copy className="w-4 h-4" />Copy All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
