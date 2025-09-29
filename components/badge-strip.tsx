"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Shield, Users, Globe, Clock, CheckCircle } from 'lucide-react';

export function BadgeStrip() {
  const t = useTranslations();

  const badges = [
    {
      icon: Star,
      text: t('trustBadges.experience'),
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 border-yellow-200'
    },
    {
      icon: Shield,
      text: t('trustBadges.insured'),
      color: 'text-blue-500',
      bg: 'bg-blue-50 border-blue-200'
    },
    {
      icon: CheckCircle,
      text: t('trustBadges.dbs'),
      color: 'text-green-500',
      bg: 'bg-green-50 border-green-200'
    },
    {
      icon: Globe,
      text: t('trustBadges.bilingual'),
      color: 'text-purple-500',
      bg: 'bg-purple-50 border-purple-200'
    },
    {
      icon: Clock,
      text: t('trustBadges.sameDay'),
      color: 'text-red-500',
      bg: 'bg-red-50 border-red-200'
    },
    {
      icon: Users,
      text: t('trustBadges.minimum'),
      color: 'text-brand-primary',
      bg: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-gray-600 font-medium">Trusted by 1000+ customers across London</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`${badge.bg} border rounded-xl p-4 text-center hover:shadow-lg transition-shadow group cursor-default`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 ${badge.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-full h-full" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 leading-tight">
                    {badge.text}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-gray-600 font-medium">4.9/5 from 500+ reviews</span>
        </motion.div>
      </div>
    </section>
  );
}










