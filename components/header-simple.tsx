"use client";

import { useState } from "react";
import { Menu, Phone, Calculator, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  const scrollToCalculator = () => {
    const calculator = document.getElementById('quote-calculator');
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">ME</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-800">Mudanzas Edyta</div>
              <div className="text-sm text-brand-primary font-medium">Lift on the way</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-primary font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={scrollToCalculator}
              variant="outline"
              size="sm"
              className="font-semibold"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Get Quote
            </Button>
            
            <Button
              asChild
              variant="default"
              size="sm"
              className="font-semibold"
            >
              <a href="tel:+447456507570">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t bg-white"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:text-brand-primary hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="px-4 pt-4 border-t space-y-3">
                  <Button
                    onClick={scrollToCalculator}
                    variant="outline"
                    className="w-full font-semibold"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                  
                  <Button
                    asChild
                    variant="default"
                    className="w-full font-semibold"
                  >
                    <a href="tel:+447456507570">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}









