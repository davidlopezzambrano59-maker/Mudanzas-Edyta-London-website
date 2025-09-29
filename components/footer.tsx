"use client";

import { useTranslations } from 'next-intl';
import { Phone, MessageCircle, Mail, MapPin, Clock, Star } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations();

  const quickLinks = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.faq'), href: '/faq' },
    { name: t('navigation.quote'), href: '/quote' },
  ];

  const services = [
    { name: t('services.homeRemovals.title'), href: '/services/home-removals' },
    { name: t('services.officeMoves.title'), href: '/services/office-moves' },
    { name: t('services.airportTransfers.title'), href: '/services/airport-transfers' },
    { name: t('services.assembly.title'), href: '/services/assembly' },
  ];

  const areas = [
    { name: 'London', href: '/areas/london' },
    { name: 'Croydon', href: '/areas/croydon' },
    { name: 'Wembley', href: '/areas/wembley' },
    { name: 'Kingston', href: '/areas/kingston' },
    { name: 'Richmond', href: '/areas/richmond' },
    { name: 'Watford', href: '/areas/watford' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ME</span>
              </div>
              <div>
                <div className="font-bold text-xl">Mudanzas Edyta</div>
                <div className="text-brand-secondary font-medium">{t('footer.slogan')}</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-primary" />
                <a href="tel:+447456507570" className="hover:text-brand-primary transition-colors">
                  07456 507 570
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <a 
                  href="https://wa.me/447456507570" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand-primary" />
                <span className="text-gray-300">{t('contact.hours')}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand-primary" />
                <span className="text-gray-300">{t('contact.coverage')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-primary">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-primary">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-primary">{t('footer.areas')}</h3>
            <ul className="space-y-3">
              {areas.map((area) => (
                <li key={area.name}>
                  <Link 
                    href={area.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-brand-primary" />
              </div>
              <span className="text-sm font-medium">{t('trustBadges.experience')}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">🛡️</span>
              </div>
              <span className="text-sm font-medium">{t('trustBadges.insured')}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xl">✅</span>
              </div>
              <span className="text-sm font-medium">{t('trustBadges.dbs')}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-xl">🌍</span>
              </div>
              <span className="text-sm font-medium">{t('trustBadges.bilingual')}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-400 text-xl">⚡</span>
              </div>
              <span className="text-sm font-medium">{t('trustBadges.sameDay')}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <span className="text-sm font-medium">{t('trustBadges.minimum')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Mudanzas Edyta London Ltd. {t('footer.rights')}
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "MovingCompany"],
            "name": "Mudanzas Edyta London Ltd",
            "alternateName": "Mudanzas Edyta London",
            "description": "Professional removals and moving services in London with 10+ years experience. Bilingual English/Spanish service.",
            "url": "https://mudanzasedytalondon.com",
            "telephone": "+447456507570",
            "email": "info@mudanzasedytalondon.com",
            "areaServed": [
              {
                "@type": "City",
                "name": "London",
                "addressCountry": "GB"
              }
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 51.5074,
                "longitude": -0.1278
              },
              "geoRadius": "50000"
            },
            "openingHours": "Mo-Su 08:00-20:00",
            "priceRange": "££",
            "languages": ["English", "Spanish"],
            "logo": "https://mudanzasedytalondon.com/logo.png",
            "sameAs": [
              "https://wa.me/447456507570"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Moving Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "House Removals",
                    "description": "Complete residential moving service"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Office Relocation",
                    "description": "Commercial moving and office relocation"
                  }
                }
              ]
            }
          })
        }}
      />
    </footer>
  );
}










