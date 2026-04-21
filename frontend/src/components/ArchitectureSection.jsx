import { motion } from 'framer-motion';
import { Radio, Zap, Brain, Users } from 'lucide-react';

export default function ArchitectureSection({ t }) {
  const techStack = [
    {
      key: 'webrtc',
      icon: Radio,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      key: 'fastapi',
      icon: Zap,
      color: 'from-emerald-500 to-teal-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      key: 'llm',
      icon: Brain,
      color: 'from-purple-500 to-violet-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      key: 'diarization',
      icon: Users,
      color: 'from-amber-500 to-orange-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zoe-emerald/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.architecture.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.architecture.subtitle}
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.key}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative p-6 rounded-2xl glass ${tech.borderColor} hover:border-opacity-50 transition-all cursor-default`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${tech.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-zoe-emerald" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t.architecture[tech.key].title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.architecture[tech.key].desc}
                </p>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connection Lines Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl w-full">
            <div className="flex items-center justify-between gap-4">
              {['Audio Capture', 'STT Engine', 'LLM Processing', 'MoM Output'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      i === 0 ? 'bg-blue-500/20 text-blue-400' :
                      i === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                      i === 2 ? 'bg-purple-500/20 text-purple-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{step}</span>
                  </div>
                  {i < 3 && (
                    <div className="hidden sm:block w-12 h-px bg-gradient-to-r from-slate-600 to-slate-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
