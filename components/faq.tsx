"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  const t = useTranslations();
  
  const faqs = t.raw('faq.items') as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="h-8 w-8 text-brand-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {t('faq.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our removals service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b last:border-b-0"
                >
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gray-50 text-lg font-semibold text-gray-900 hover:text-brand-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-brand-gradient rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Our friendly team is here to help. Get in touch for personalized advice and quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447456507570?text=Hi! I have a question about your removals service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+447456507570"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white hover:text-brand-primary text-white font-semibold rounded-xl transition-colors border border-white/30"
              >
                Call 07456 507 570
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <div className="text-3xl mb-4">💡</div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Moving Tips</h4>
              <p className="text-gray-600 text-sm">
                Start packing non-essential items 2 weeks before your move. Label boxes clearly with contents and destination room.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <div className="text-3xl mb-4">📦</div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Packing Guide</h4>
              <p className="text-gray-600 text-sm">
                Use bubble wrap for fragile items, newspaper for filling gaps, and strong boxes for heavy items like books.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <div className="text-3xl mb-4">🚚</div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Moving Day</h4>
              <p className="text-gray-600 text-sm">
                Be ready 15 minutes before our arrival. Keep important documents with you and take photos of valuable items.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}










