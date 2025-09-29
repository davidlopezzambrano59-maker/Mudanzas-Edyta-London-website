import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { QuoteForm } from '@/components/quote-form';

export const metadata: Metadata = {
  title: 'Get Your Quote | Mudanzas Edyta London | Free Moving Estimate',
  description: 'Get an instant, accurate quote for your London move. Real-time pricing calculator with no hidden fees. Professional removals service with 10+ years experience.',
  keywords: 'moving quote London, removals estimate, van hire quote, instant price calculator, moving cost London',
};

export default function QuotePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Your Moving Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our instant calculator to get accurate pricing, then complete your details for a personalized quote. 
            No surprises, no hidden fees.
          </p>
        </div>
        
        <QuoteForm />
      </div>
    </div>
  );
}










