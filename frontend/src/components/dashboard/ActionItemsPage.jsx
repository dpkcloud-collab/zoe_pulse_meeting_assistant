import { motion } from 'framer-motion';
import { ListChecks, CheckCircle2, Circle, Clock, AlertCircle, Filter, Plus, User, Calendar } from 'lucide-react';
import { useState } from 'react';

const initialItems = [
  { id: 1, task: 'Break down revenue by segment for board deck', owner: 'Michael Ross', meeting: 'Q4 Strategy Review', deadline: 'Apr 25', priority: 'high', completed: false },
  { id: 2, task: 'Scope real-time collaboration feature', owner: 'James Liu', meeting: 'Q4 Strategy Review', deadline: 'Apr 25', priority: 'high', completed: false },
  { id: 3, task: 'Draft job descriptions for senior engineers', owner: 'Sarah Chen', meeting: 'Q4 Strategy Review', deadline: 'Apr 28', priority: 'medium', completed: false },
  { id: 4, task: 'Create API benchmark suite', owner: 'Dev Team', meeting: 'Sprint Planning', deadline: 'Apr 23', priority: 'high', completed: true },
  { id: 5, task: 'Audit WCAG compliance on dashboard', owner: 'James Liu', meeting: 'Sprint Planning', deadline: 'Apr 28', priority: 'medium', completed: false },
  { id: 6, task: 'Configure Azure AD SSO for Acme Corp', owner: 'Dev Team', meeting: 'Acme Onboarding', deadline: 'Apr 24', priority: 'high', completed: false },
  { id: 7, task: 'Schedule training sessions for Acme Corp', owner: 'Priya Sharma', meeting: 'Acme Onboarding', deadline: 'Apr 22', priority: 'medium', completed: true },
  { id: 8, task: 'Prepare compliance documentation', owner: 'Priya Sharma', meeting: 'Acme Onboarding', deadline: 'Apr 30', priority: 'low', completed: false },
  { id: 9, task: 'Review Q3 customer satisfaction scores', owner: 'Sarah Chen', meeting: 'Leadership Sync', deadline: 'Apr 22', priority: 'medium', completed: false },
  { id: 10, task: 'Update product demo environment', owner: 'James Liu', meeting: 'Sprint Planning', deadline: 'Apr 26', priority: 'low', completed: false },
];

const priorityConfig = {
  high: { label: 'High', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
};

export default function ActionItemsPage() {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState('all');

  const toggleComplete = (id) => {
    setItems(items.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const filtered = items.filter((item) => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    if (filter === 'high') return item.priority === 'high' && !item.completed;
    return true;
  });

  const completedCount = items.filter((i) => i.completed).length;
  const highPriority = items.filter((i) => i.priority === 'high' && !i.completed).length;
  const overdue = 2;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Action Items</h1>
          <p className="text-slate-400 mt-1">Track and manage action items from all your meetings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Total Items</p>
          <p className="text-2xl font-bold mt-1">{items.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{completedCount}</p>
          <div className="w-full h-1.5 rounded-full bg-white/5 mt-2">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${(completedCount / items.length) * 100}%` }} />
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">High Priority</p>
          <p className="text-2xl font-bold text-rose-400 mt-1">{highPriority}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">Overdue</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{overdue}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {['all', 'pending', 'completed', 'high'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filter === f ? 'bg-zoe-emerald/20 text-zoe-emerald' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : f === 'high' ? 'High Priority' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item) => {
          const prio = priorityConfig[item.priority];
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-all ${item.completed ? 'opacity-60' : ''}`}
            >
              <button onClick={() => toggleComplete(item.id)} className="shrink-0 cursor-pointer">
                {item.completed
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  : <Circle className="w-5 h-5 text-slate-500 hover:text-white" />
                }
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${item.completed ? 'line-through text-slate-500' : 'text-white'}`}>{item.task}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.owner}</span>
                  <span>·</span>
                  <span>{item.meeting}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${prio.color} ${prio.bg} border ${prio.border}`}>{prio.label}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />{item.deadline}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
