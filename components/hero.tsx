"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Calculator, Star, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations();

  const scrollToCalculator = () => {
    const calculator = document.getElementById('quote-calculator');
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    "10+ years experience",
    "DBS-checked team", 
    "Fully insured",
    "Bilingual service",
    "Same-day availability"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-brand-yellow/10 min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF8A00' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-gradient text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              <Star className="h-4 w-4" />
              London's #1 Rated Removals Service
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-700"
              >
                {t('hero.description')}
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={scrollToCalculator}
                size="lg"
                className="text-lg px-8 py-6 h-auto font-bold shadow-xl hover:shadow-2xl transition-shadow group"
              >
                <Calculator className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t('hero.cta')}
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto font-bold border-2 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
              >
                <a href="tel:+447456507570">
                  <Phone className="mr-2 h-5 w-5" />
                  {t('hero.ctaSecondary')}
                </a>
              </Button>
            </motion.div>

            {/* Price Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-3 rounded-xl font-semibold"
            >
              <span className="text-2xl">💰</span>
              {t('hero.fromPrice')}
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center sm:text-left"
            >
              <div className="text-3xl font-bold text-brand-primary italic">
                "{t('hero.slogan')}" 🚀
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Van Illustration */}
              <div className="relative bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <Truck className="h-32 w-32 text-white mx-auto animate-float" />
                  <div className="text-center mt-4">
                    <div className="text-white font-bold text-2xl">Luton Van</div>
                    <div className="text-white/90 text-lg">17.3m³ Capacity</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-brand-primary/20"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">£40</div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-2xl shadow-xl p-4"
              >
                <div className="text-center">
                  <div className="text-xl">⚡</div>
                  <div className="text-sm font-bold">Same Day</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-1/2 -left-8 bg-blue-500 text-white rounded-full shadow-xl p-3"
              >
                <CheckCircle className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}










