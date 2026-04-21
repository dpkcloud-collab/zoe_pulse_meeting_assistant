import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Scale, GraduationCap } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2000, isDecimal = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = progress * target;
      setCount(isDecimal ? Math.floor(current) / 100 : Math.floor(current));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration, isDecimal]);

  const displayValue = isDecimal ? (count / 100).toFixed(2) : count.toLocaleString();

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export default function UseCasesSection({ t }) {
  const useCases = [
    {
      key: 'leadership',
      icon: Crown,
      color: 'from-zoe-gold/20 to-amber-500/20',
      iconColor: 'text-zoe-gold',
      iconBg: 'bg-zoe-gold/20',
    },
    {
      key: 'compliance',
      icon: Scale,
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-zoe-emerald',
      iconBg: 'bg-emerald-500/20',
    },
    {
      key: 'hr',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
    },
  ];

  const stats = [
    { key: 'meetings', value: 500000, suffix: '+' },
    { key: 'accuracy', value: 97, suffix: '%' },
    { key: 'languages', value: 50, suffix: '+' },
    { key: 'uptime', value: 99.99, suffix: '%', isDecimal: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="solutions" className="relative py-24 sm:py-32">
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
            {t.useCases.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.useCases.subtitle}
          </p>
        </motion.div>

        {/* Use Cases Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.key}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl glass overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${uc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-8">
                  <div className={`w-14 h-14 rounded-xl ${uc.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${uc.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t.useCases[uc.key].title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.useCases[uc.key].desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} isDecimal={stat.isDecimal || false} />
                </div>
                <div className="text-sm text-slate-400">
                  {t.useCases.stats[stat.key]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
