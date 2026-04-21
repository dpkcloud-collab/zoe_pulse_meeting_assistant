import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Globe, Mic, Database } from 'lucide-react';
import { useState } from 'react';

const sections = [
  {
    title: 'Profile',
    icon: User,
    settings: [
      { label: 'Display Name', type: 'text', value: 'Sarah Chen' },
      { label: 'Email', type: 'text', value: 'sarah.chen@company.com' },
      { label: 'Role', type: 'text', value: 'VP Product' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { label: 'Meeting Summary Ready', type: 'toggle', value: true },
      { label: 'Action Item Reminders', type: 'toggle', value: true },
      { label: 'Sentiment Alerts', type: 'toggle', value: false },
      { label: 'Weekly Digest Email', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Transcription',
    icon: Mic,
    settings: [
      { label: 'Auto-start Recording', type: 'toggle', value: false },
      { label: 'Default Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German', 'Japanese'] },
      { label: 'Speaker Diarization', type: 'toggle', value: true },
      { label: 'Punctuation & Formatting', type: 'toggle', value: true },
    ],
  },
  {
    title: 'AI & Intelligence',
    icon: Database,
    settings: [
      { label: 'Auto-generate Summary', type: 'toggle', value: true },
      { label: 'Extract Action Items', type: 'toggle', value: true },
      { label: 'Sentiment Analysis', type: 'toggle', value: true },
      { label: 'AI Model', type: 'select', value: 'Qwen 3 32B', options: ['Qwen 3 32B', 'GPT-4', 'Claude 3.5'] },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      { label: 'End-to-End Encryption', type: 'toggle', value: true },
      { label: 'Data Retention (days)', type: 'select', value: '90', options: ['30', '60', '90', '180', '365'] },
      { label: 'On-Premises Processing', type: 'toggle', value: false },
      { label: 'Audit Logging', type: 'toggle', value: true },
    ],
  },
];

export default function SettingsPage() {
  const [toggleStates, setToggleStates] = useState({});

  const handleToggle = (sectionTitle, label) => {
    const key = `${sectionTitle}-${label}`;
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getToggleValue = (sectionTitle, label, defaultValue) => {
    const key = `${sectionTitle}-${label}`;
    return key in toggleStates ? toggleStates[key] : defaultValue;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-400 mt-1">Configure your meeting intelligence platform</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, si) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-zoe-emerald/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zoe-emerald" />
                </div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-300">{setting.label}</span>
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleToggle(section.title, setting.label)}
                        className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                          getToggleValue(section.title, setting.label, setting.value)
                            ? 'bg-zoe-emerald'
                            : 'bg-white/10'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            getToggleValue(section.title, setting.label, setting.value)
                              ? 'translate-x-[22px]'
                              : 'translate-x-[2px]'
                          }`}
                        />
                      </button>
                    )}
                    {setting.type === 'text' && (
                      <input
                        type="text"
                        defaultValue={setting.value}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-zoe-emerald/50 w-64 text-right"
                      />
                    )}
                    {setting.type === 'select' && (
                      <select
                        defaultValue={setting.value}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-zoe-emerald/50"
                      >
                        {setting.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-zoe-navy">{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-medium cursor-pointer"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
}
