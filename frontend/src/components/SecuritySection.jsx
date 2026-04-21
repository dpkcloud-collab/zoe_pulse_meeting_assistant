import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, Server, ArrowRight } from 'lucide-react';

export default function SecuritySection({ t }) {
  const securityFeatures = [
    {
      key: 'rbac',
      icon: Shield,
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-zoe-emerald',
      iconBg: 'bg-emerald-500/20',
    },
    {
      key: 'encryption',
      icon: Lock,
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
    },
    {
      key: 'compliance',
      icon: FileCheck,
      color: 'from-zoe-gold/20 to-amber-500/20',
      iconColor: 'text-zoe-gold',
      iconBg: 'bg-zoe-gold/20',
    },
    {
      key: 'deploy',
      icon: Server,
      color: 'from-purple-500/20 to-violet-500/20',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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
    <section id="security" className="relative py-24 sm:py-32">
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
            {t.security.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.security.subtitle}
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 gap-6 mb-16"
        >
          {securityFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.key}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl glass overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8 flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl ${feat.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t.security[feat.key].title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t.security[feat.key].desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zoe-emerald/20 via-zoe-gold/10 to-zoe-emerald/20" />
          <div className="absolute inset-0 glass-strong" />

          <div className="relative p-8 sm:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-16 h-16 text-zoe-emerald mx-auto mb-6" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {t.security.cta}
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              {t.security.ctaSub}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105"
            >
              {t.security.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
