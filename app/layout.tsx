import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

// Import CSS in the correct order
import '@/public/css/wp-skin.css';     // WordPress skin (if conflicts arise, comment out)
import '@/public/css/pro-theme.css';   // Our theme - always keep this

// Load fonts matching WordPress site
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mudanzas Edyta London - Professional Removals Service',
  description: 'London\'s premier removal service with 10+ years of experience. Professional, reliable, and bilingual moving solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* WordPress Skin Wrapper - contains marketing shell only */}
        <div className="wp-skin">
          <SiteHeader />
          
          {/* Hero/Marketing sections go here */}
          <main>
            {children}
          </main>
          
          <SiteFooter />
        </div>

        {/* 
        IMPORTANT: If WordPress CSS conflicts with your calculator/maps/booking functionality,
        move those sections OUTSIDE the .wp-skin wrapper like this:
        
        <div className="wp-skin">
          <SiteHeader />
          <main>
            {marketing content}
          </main>
          <SiteFooter />
        </div>
        
        <div className="calculator-section">
          {calculator and booking components}
        </div>
        
        The pro-theme.css will still style your calculator/booking areas beautifully.
        */}
      </body>
    </html>
  );
}