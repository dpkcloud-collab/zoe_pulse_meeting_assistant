import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, Lightbulb, Target, BarChart3, Hash, ArrowUpRight } from 'lucide-react';

const trendingTopics = [
  { topic: 'Product Roadmap', mentions: 34, trend: '+12%', sentiment: 85 },
  { topic: 'Enterprise Sales', mentions: 28, trend: '+23%', sentiment: 90 },
  { topic: 'Team Scaling', mentions: 22, trend: '+8%', sentiment: 72 },
  { topic: 'API Performance', mentions: 19, trend: '+15%', sentiment: 78 },
  { topic: 'Customer Onboarding', mentions: 17, trend: '+5%', sentiment: 88 },
  { topic: 'Compliance', mentions: 14, trend: '+18%', sentiment: 75 },
  { topic: 'Design System', mentions: 12, trend: '-3%', sentiment: 82 },
  { topic: 'Technical Debt', mentions: 10, trend: '+31%', sentiment: 65 },
];

const aiInsights = [
  { type: 'opportunity', title: 'Enterprise pipeline momentum', desc: 'Enterprise deal mentions increased 23% this week. 3 deals in final negotiation stage suggest strong Q4 close rates.', impact: 'high' },
  { type: 'risk', title: 'Resource bottleneck forming', desc: 'Engineering capacity concerns mentioned in 4 of 6 meetings this week. Hiring timeline may need acceleration.', impact: 'high' },
  { type: 'pattern', title: 'Meeting efficiency improving', desc: 'Average meeting duration decreased 12% while action item completion rate increased 8%. Teams are becoming more focused.', impact: 'medium' },
  { type: 'suggestion', title: 'Cross-team alignment needed', desc: 'Product and Engineering teams discussed overlapping features in separate meetings. Consider a joint session to align priorities.', impact: 'medium' },
  { type: 'opportunity', title: 'Customer satisfaction peak', desc: 'Client sentiment scores averaged 89% this week, highest in Q4. Good timing for case study outreach.', impact: 'low' },
];

const weeklyStats = [
  { label: 'Mon', meetings: 4, hours: 3.2 },
  { label: 'Tue', meetings: 6, hours: 5.1 },
  { label: 'Wed', meetings: 3, hours: 2.4 },
  { label: 'Thu', meetings: 5, hours: 4.0 },
  { label: 'Fri', meetings: 4, hours: 3.5 },
];

const impactColors = {
  high: { bg: 'bg-rose-400/10', text: 'text-rose-400', border: 'border-rose-400/20' },
  medium: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/20' },
  low: { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/20' },
};

const typeIcons = {
  opportunity: { icon: TrendingUp, color: 'text-emerald-400' },
  risk: { icon: Target, color: 'text-rose-400' },
  pattern: { icon: BarChart3, color: 'text-blue-400' },
  suggestion: { icon: Lightbulb, color: 'text-amber-400' },
};

export default function InsightsPage() {
  const maxMentions = Math.max(...trendingTopics.map((t) => t.mentions));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meeting Insights</h1>
        <p className="text-slate-400 mt-1">AI-powered patterns, trends, and strategic recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <BrainCircuit className="w-5 h-5 text-zoe-emerald" />
              <h2 className="text-lg font-semibold">AI-Generated Insights</h2>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, i) => {
                const typeConfig = typeIcons[insight.type];
                const Icon = typeConfig.icon;
                const impact = impactColors[insight.impact];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${insight.type === 'opportunity' ? 'bg-emerald-400/10' : insight.type === 'risk' ? 'bg-rose-400/10' : insight.type === 'pattern' ? 'bg-blue-400/10' : 'bg-amber-400/10'} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${typeConfig.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white">{insight.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${impact.text} ${impact.bg} border ${impact.border}`}>
                          {insight.impact}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{insight.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">Weekly Meeting Activity</h2>
            <div className="flex items-end gap-4 h-40">
              {weeklyStats.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-400">{day.meetings}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.meetings / 7) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-zoe-emerald to-emerald-400"
                  />
                  <span className="text-xs text-slate-500">{day.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Hash className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold">Trending Topics</h2>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{topic.topic}</span>
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <ArrowUpRight className="w-3 h-3" />{topic.trend}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(topic.mentions / maxMentions) * 100}%` }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-400 to-violet-400"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 w-8">{topic.mentions}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Decisions Made</span>
                <span className="font-bold text-emerald-400">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Follow-ups Created</span>
                <span className="font-bold text-blue-400">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Avg Meeting Score</span>
                <span className="font-bold text-amber-400">8.4/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Time Saved (AI)</span>
                <span className="font-bold text-purple-400">12.5 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
