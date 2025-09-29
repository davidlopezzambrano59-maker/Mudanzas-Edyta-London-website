import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mudanzas Edyta London | Premier Removals Service',
    short_name: 'Mudanzas Edyta',
    description: 'London\'s premier removals service with 10+ years experience. Professional, bilingual, fully insured. Get instant quote!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF8A00',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}










