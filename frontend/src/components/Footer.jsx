import { motion } from 'framer-motion';
import { Shield, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer id="contact" className="relative pt-24 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-zoe-deep-navy to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Join leading enterprises across UAE, Saudi Arabia, and Russia who trust Zoé Pulse for their meeting intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@zoepulse.ai"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-zoe-emerald to-emerald-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Sales
            </a>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zoe-emerald to-zoe-gold flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Zoé <span className="gradient-text">Pulse</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                Enterprise-grade AI meeting intelligence platform. Secure, real-time transcription, diarisation, and automated MoM generation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-4 h-4 text-zoe-emerald" />
                  contact@zoepulse.ai
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-4 h-4 text-zoe-emerald" />
                  +971 4 XXX XXXX
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-zoe-emerald" />
                  Dubai, UAE | Riyadh, KSA | Moscow, Russia
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {['Platform', 'Solutions', 'Security', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-zoe-emerald transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-zoe-emerald transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Zoé Pulse. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-zoe-emerald transition-colors">
                {t.footer.privacy}
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-zoe-emerald transition-colors">
                {t.footer.terms}
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-zoe-emerald transition-colors">
                {t.footer.security}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
