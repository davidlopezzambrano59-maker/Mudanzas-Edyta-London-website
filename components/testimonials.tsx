"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Testimonials() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = t.raw('testimonials.reviews') as Array<{
    name: string;
    text: string;
    rating: number;
    date?: string;
    source?: string;
    location?: string;
  }>;

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFA500' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('testimonials.title')}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-xl font-semibold">4.9/5</span>
          </div>
          <p className="text-gray-300 text-lg">
            From over 500 satisfied customers across London
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-8 md:p-12 text-center">
                    <Quote className="h-12 w-12 text-brand-secondary mx-auto mb-6 opacity-60" />
                    
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-100">
                      "{testimonials[currentIndex]?.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <div className="text-lg font-semibold text-brand-secondary">
                      {testimonials[currentIndex]?.name}
                    </div>
                    <div className="text-gray-300 text-sm flex flex-col gap-1">
                      {testimonials[currentIndex]?.source && (
                        <div className="flex items-center justify-center gap-2">
                          <span>⭐ {testimonials[currentIndex]?.source}</span>
                        </div>
                      )}
                      {testimonials[currentIndex]?.location && (
                        <div>{testimonials[currentIndex]?.location}</div>
                      )}
                      {testimonials[currentIndex]?.date && (
                        <div className="text-xs opacity-75">
                          {new Date(testimonials[currentIndex]?.date || '').toLocaleDateString('en-GB')}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-brand-primary' : 'bg-white/30'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mini Testimonials Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-3">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                <div className="text-brand-secondary font-semibold text-sm">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-6 text-lg">
              Join hundreds of satisfied customers. Book your move today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-gradient text-white font-semibold hover:opacity-90"
              >
                <a href="#quote-calculator">
                  Get Instant Quote
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold"
              >
                <a href="tel:+447456507570">
                  Call 07456 507 570
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}










