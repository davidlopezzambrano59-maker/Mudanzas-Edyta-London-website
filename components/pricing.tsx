"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Truck, Users, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, VAN_BASE_HOURLY, LOADER_HOURLY, MIN_HOURS } from '@/lib/pricing';

export function Pricing() {
  const t = useTranslations();

  const pricingTiers = [
    {
      name: 'Small Van',
      vanSize: 'small' as const,
      price: VAN_BASE_HOURLY.small,
      description: 'Perfect for 1-bedroom flats, small items, or single room moves',
      features: [
        'Up to 8.5m³ capacity',
        'Professional driver included',
        'Basic equipment provided',
        'Ideal for student moves',
        'City center friendly'
      ],
      popular: false,
      color: 'border-blue-200 bg-blue-50'
    },
    {
      name: 'Medium Van',
      vanSize: 'medium' as const,
      price: VAN_BASE_HOURLY.medium,
      description: 'Great for 2-bedroom homes and medium-sized relocations',
      features: [
        'Up to 12m³ capacity',
        'Professional driver included',
        'Complete equipment set',
        'Most popular choice',
        'Family home moves'
      ],
      popular: true,
      color: 'border-brand-primary bg-brand-primary/5'
    },
    {
      name: 'Luton Van (17.3m³)',
      vanSize: 'large' as const,
      price: VAN_BASE_HOURLY.large,
      description: 'Best for large homes, offices, or multiple rooms',
      features: [
        '17.3m³ capacity',
        'Professional driver included',
        'Full moving equipment',
        'Tail lift available',
        'Commercial moves'
      ],
      popular: false,
      color: 'border-green-200 bg-green-50'
    }
  ];

  const additionalServices = [
    {
      name: 'Additional Loaders',
      price: LOADER_HOURLY,
      unit: 'per loader/hour',
      description: 'Extra hands to speed up your move'
    },
    {
      name: 'Minimum Charge',
      price: 'N/A',
      unit: `${MIN_HOURS} hours minimum`,
      description: 'Fair pricing for all move sizes'
    },
    {
      name: 'Distance Charge',
      price: 1.5,
      unit: 'per mile (>10 miles)',
      description: 'First 10 miles are free'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. Clear hourly rates with everything included.
          </p>
        </motion.div>

        {/* Main Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-brand-gradient text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`h-full ${tier.color} border-2 ${tier.popular ? 'shadow-xl scale-105' : 'hover:shadow-lg'} transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-brand-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-brand-primary">
                    {formatCurrency(tier.price)}
                    <span className="text-lg text-gray-600 font-normal">/hour</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>2-hour minimum:</span>
                        <span className="font-semibold">{formatCurrency(tier.price * MIN_HOURS)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>With 1 loader:</span>
                        <span className="font-semibold">{formatCurrency((tier.price + LOADER_HOURLY) * MIN_HOURS)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Additional Services & Charges
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  {index === 0 && <Users className="h-6 w-6 text-brand-primary" />}
                  {index === 1 && <Clock className="h-6 w-6 text-brand-primary" />}
                  {index === 2 && <MapPin className="h-6 w-6 text-brand-primary" />}
                </div>
                <h4 className="font-semibold text-gray-900">{service.name}</h4>
                <div className="text-2xl font-bold text-brand-primary">
                  {typeof service.price === 'number' ? formatCurrency(service.price) : service.price}
                </div>
                <div className="text-sm text-gray-600">{service.unit}</div>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            What's Always Included
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-2">
              <div>✅ Professional, DBS-checked driver</div>
              <div>✅ Fuel costs within London</div>
              <div>✅ Basic moving equipment (straps, blankets, dollies)</div>
              <div>✅ Standard insurance coverage</div>
            </div>
            <div className="space-y-2">
              <div>✅ No hidden fees or charges</div>
              <div>✅ Friendly, bilingual service</div>
              <div>✅ Same-day availability</div>
              <div>✅ Free estimates and advice</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}










