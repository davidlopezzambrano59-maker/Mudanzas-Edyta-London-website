"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, Building2, Plane, Wrench, Recycle, Piano, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ServicesGrid() {
  const t = useTranslations();

  const services = [
    {
      icon: Home,
      title: t('services.homeRemovals.title'),
      description: t('services.homeRemovals.description'),
      href: '/services/home-removals',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      features: ['Free packing materials', 'Furniture protection', 'Insurance included']
    },
    {
      icon: Building2,
      title: t('services.officeMoves.title'),
      description: t('services.officeMoves.description'),
      href: '/services/office-moves',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      features: ['Weekend availability', 'IT equipment care', 'Minimal downtime']
    },
    {
      icon: Plane,
      title: t('services.airportTransfers.title'),
      description: t('services.airportTransfers.description'),
      href: '/services/airport-transfers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      features: ['All London airports', 'Meet & greet', 'Flight tracking']
    },
    {
      icon: Wrench,
      title: t('services.assembly.title'),
      description: t('services.assembly.description'),
      href: '/services/assembly',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      features: ['IKEA specialists', 'Tool provided', 'Same-day service']
    },
    {
      icon: Recycle,
      title: t('services.recycling.title'),
      description: t('services.recycling.description'),
      href: '/services/recycling-clearance',
      color: 'text-green-700',
      bgColor: 'bg-green-50 border-green-300',
      features: ['Eco-friendly disposal', 'Charity donations', 'House clearance']
    },
    {
      icon: Piano,
      title: t('services.specialItems.title'),
      description: t('services.specialItems.description'),
      href: '/services/special-items',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      features: ['Piano specialists', 'Antique care', 'High-value items']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-brand-primary/30">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${service.bgColor} border-2 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all"
                    >
                      <Link href={service.href}>
                        {t('common.learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-brand-gradient rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Need a custom solution?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              We handle unique requirements and challenging moves. Get in touch for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="font-semibold"
              >
                <Link href="/quote">
                  Get Custom Quote
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-brand-primary font-semibold"
              >
                <a href="tel:+447456507570">
                  Call 07456 507 570
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}










