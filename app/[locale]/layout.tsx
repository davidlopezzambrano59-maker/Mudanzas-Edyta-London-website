import React from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {WhatsAppFloat} from '@/components/whatsapp-float';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mudanzas Edyta London | Premier Removals Service | Lift on the way',
  description: 'London\'s premier removals service with 10+ years experience. Professional, bilingual (EN/ES), fully insured. Same-day availability. Get instant quote!',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}