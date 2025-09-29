import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mudanzasedytalondon.com'
  
  const routes = [
    '',
    '/quote',
    '/about',
    '/faq',
    '/services',
    '/services/home-removals',
    '/services/office-moves',
    '/services/airport-transfers',
    '/services/assembly',
    '/services/recycling-clearance',
    '/services/special-items',
    '/areas',
    '/areas/london',
    '/areas/croydon',
    '/areas/wembley',
    '/areas/kingston',
    '/areas/richmond',
    '/areas/watford',
    '/areas/harrow',
    '/areas/ealing',
    '/blog',
    '/privacy',
    '/terms',
  ]

  const locales = ['en', 'es']
  
  const sitemap: MetadataRoute.Sitemap = []

  // Add routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      const url = locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route.includes('/blog/') ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/quote' ? 0.9 : route.includes('/blog/') ? 0.6 : 0.8,
        alternates: {
          languages: {
            en: locale === 'en' ? url : `${baseUrl}${route}`,
            es: locale === 'es' ? url : `${baseUrl}/es${route}`,
          },
        },
      })
    })
  })

  return sitemap
}










