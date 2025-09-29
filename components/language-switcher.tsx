"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const handleLanguageChange = (locale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = locale === 'en' ? pathWithoutLocale : `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto h-9 border-0 bg-transparent hover:bg-gray-100 focus:ring-1 focus:ring-brand-primary">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {languages.find(lang => lang.code === currentLocale)?.flag}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}










