import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Server, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ t }) {
  const [deployMode, setDeployMode] = useState('cloud');

  const isCloud = deployMode === 'cloud';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zoe-emerald/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zoe-gold/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-zoe-emerald text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Meeting Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              {t.hero.headline.split(' ').map((word, i) =>
                word === 'Intelligence' || word === 'Разумность' || word === 'الذكاء' ? (
                  <span key={i} className="gradient-text">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Deployment Toggle Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              {/* Toggle Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-slate-400">{t.hero.deployToggle}</span>
                <div className="flex bg-zoe-deep-navy rounded-lg p-1">
                  <button
                    onClick={() => setDeployMode('cloud')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      isCloud
                        ? 'bg-zoe-emerald text-white shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Cloud className="w-4 h-4" />
                    {t.hero.cloudDeploy}
                  </button>
                  <button
                    onClick={() => setDeployMode('onprem')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      !isCloud
                        ? 'bg-zoe-gold text-zoe-deep-navy shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Server className="w-4 h-4" />
                    {t.hero.onPremDeploy}
                  </button>
                </div>
              </div>

              {/* Animated Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={deployMode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {isCloud ? (
                    <>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Cloud className="w-5 h-5 text-zoe-emerald" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Secure Cloud Deployment</h3>
                          <p className="text-sm text-slate-400">SOC 2 Type II certified infrastructure</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {['Auto-scaling', 'Global CDN', '99.99% Uptime', 'Instant Updates'].map((item) => (
                          <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                            <div className="w-2 h-2 rounded-full bg-zoe-emerald" />
                            <span className="text-sm text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-zoe-emerald text-sm font-medium mb-1">
                          <Sparkles className="w-4 h-4" />
                          Best for: Distributed teams, rapid deployment
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-zoe-gold/10 border border-zoe-gold/20">
                        <div className="w-10 h-10 rounded-lg bg-zoe-gold/20 flex items-center justify-center">
                          <Server className="w-5 h-5 text-zoe-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Air-Gapped On-Premises</h3>
                          <p className="text-sm text-slate-400">Complete data sovereignty</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {['Zero Data Exit', 'Custom HSM', 'Air-Gapped', 'Full Control'].map((item) => (
                          <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                            <div className="w-2 h-2 rounded-full bg-zoe-gold" />
                            <span className="text-sm text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-zoe-gold/10 to-transparent border border-zoe-gold/20">
                        <div className="flex items-center gap-2 text-zoe-gold text-sm font-medium mb-1">
                          <Sparkles className="w-4 h-4" />
                          Best for: Government, defense, regulated industries
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Decorative Elements */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Data Residency</span>
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${isCloud ? 'bg-zoe-emerald' : 'bg-zoe-gold'} animate-pulse`} />
                    {isCloud ? 'Global Regions' : 'Your Premises'}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating decorative element */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-zoe-emerald/20 to-zoe-gold/20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
