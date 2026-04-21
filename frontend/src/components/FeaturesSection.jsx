import { motion } from 'framer-motion';
import { FileText, Bot, Users, ClipboardList, Globe, Search } from 'lucide-react';

export default function FeaturesSection({ t }) {
  const features = [
    {
      key: 'realtime',
      icon: FileText,
      size: 'normal',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      accent: 'bg-emerald-500',
    },
    {
      key: 'virtualMember',
      icon: Bot,
      size: 'large',
      gradient: 'from-purple-500/20 to-violet-500/20',
      accent: 'bg-purple-500',
    },
    {
      key: 'diarization',
      icon: Users,
      size: 'normal',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accent: 'bg-blue-500',
    },
    {
      key: 'mom',
      icon: ClipboardList,
      size: 'normal',
      gradient: 'from-amber-500/20 to-orange-500/20',
      accent: 'bg-amber-500',
    },
    {
      key: 'multilingual',
      icon: Globe,
      size: 'normal',
      gradient: 'from-rose-500/20 to-pink-500/20',
      accent: 'bg-rose-500',
    },
    {
      key: 'search',
      icon: Search,
      size: 'large',
      gradient: 'from-zoe-gold/20 to-yellow-500/20',
      accent: 'bg-zoe-gold',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zoe-gold/5 to-transparent" />

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
            {t.features.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';

            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group relative rounded-2xl glass overflow-hidden ${
                  isLarge ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${feature.accent}/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.accent.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t.features[feature.key].title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.features[feature.key].desc}
                  </p>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.gradient} opacity-20 rounded-bl-full`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
