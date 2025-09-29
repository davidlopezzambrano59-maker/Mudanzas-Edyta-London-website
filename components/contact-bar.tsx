"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calculator, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactBar() {
  const t = useTranslations();

  const scrollToCalculator = () => {
    const calculator = document.getElementById('quote-calculator');
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-brand-gradient text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm20 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Move? Get Started Today!
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Professional removals service available 7 days a week. Get your instant quote or speak to our friendly team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToCalculator}
                size="lg"
                variant="secondary"
                className="h-16 text-lg font-bold bg-white text-brand-primary hover:bg-gray-100 shadow-lg group"
              >
                <Calculator className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Get Instant Quote
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-16 text-lg font-bold border-white/30 text-white hover:bg-white hover:text-brand-primary shadow-lg group"
              >
                <a href="tel:+447456507570">
                  <Phone className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Call 07456 507 570
                </a>
              </Button>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full h-16 text-lg font-bold bg-green-500 hover:bg-green-600 shadow-lg group"
            >
              <a 
                href="https://wa.me/447456507570?text=Hi! I'd like to get a quote for a removal service." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                WhatsApp for Instant Response
              </a>
            </Button>

            {/* Contact Info */}
            <div className="space-y-4 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 opacity-80" />
                <span className="opacity-90">{t('contact.hours')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 opacity-80" />
                <span className="opacity-90">{t('contact.coverage')}</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Why Choose Mudanzas Edyta?</h3>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Same-Day Service</h4>
                  <p className="text-sm opacity-90">Emergency moves and last-minute bookings welcome</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🛡️</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fully Insured & DBS Checked</h4>
                  <p className="text-sm opacity-90">Complete peace of mind for your valuable items</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Bilingual Service</h4>
                  <p className="text-sm opacity-90">English and Spanish speaking team members</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                  <p className="text-sm opacity-90">No hidden fees, clear hourly rates, 2-hour minimum</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-white/20"
        >
          <p className="text-lg opacity-90 mb-4">
            <span className="font-bold">"Lift on the way"</span> - Your trusted moving partner in London
          </p>
          <p className="opacity-80">
            Book now and experience the difference of professional, caring service
          </p>
        </motion.div>
      </div>
    </section>
  );
}










