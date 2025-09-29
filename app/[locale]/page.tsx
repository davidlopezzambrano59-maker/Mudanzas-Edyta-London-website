import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg inline-block font-semibold text-lg">
            Lift on the way
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Professional Service</h3>
            <p className="text-gray-600">10+ years of experience in London removals</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Bilingual Team</h3>
            <p className="text-gray-600">English and Spanish speaking professionals</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Fully Insured</h3>
            <p className="text-gray-600">Complete protection for your belongings</p>
          </div>
        </div>
      </div>
    </div>
  );
}