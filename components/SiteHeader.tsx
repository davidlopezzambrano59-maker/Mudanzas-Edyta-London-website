'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SiteHeader() {
  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="header-top" style={{
        background: '#F97316',
        color: 'white',
        padding: '8px 0',
        fontSize: '14px'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="mailto:info@mudanzasedyta-london.com" style={{ color: 'white', textDecoration: 'none' }}>
                📧 info@mudanzasedyta-london.com
              </a>
              <a href="tel:07462170197" style={{ color: 'white', textDecoration: 'none' }}>
                📞 07462 170197
              </a>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.facebook.com/removalsmudanzasedytalondon" style={{ color: 'white' }}>📘</a>
              <a href="https://www.linkedin.com/in/mudanzasedytalondon/" style={{ color: 'white' }}>💼</a>
              <a href="https://instagram.com/mudanzasedytalondonlimited" style={{ color: 'white' }}>📸</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            {/* Logo */}
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#0F172A'
            }}>
              <Image 
                src="/logo.png" 
                alt="Mudanzas Edyta London - Lift on the way" 
                width={50} 
                height={50}
                style={{ borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem', lineHeight: '1.2' }}>
                  MUDANZAS EDYTA
                </div>
                <div style={{ fontSize: '0.9rem', color: '#F97316', fontWeight: '600' }}>
                  LONDON
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontStyle: 'italic' }}>
                  LIFT ON THE WAY
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>
                Home
              </Link>
              <Link href="/about" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>
                About Us
              </Link>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: '#64748B', fontWeight: '500', cursor: 'pointer', padding: '0.5rem 0' }}>
                  Services ▼
                </span>
              </div>
              <Link href="/contact" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0' }}>
                Contact Us
              </Link>
            </nav>

            {/* Search and CTA */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="SEARCH HERE" 
                style={{
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '150px'
                }}
              />
              <Link 
                href="/#calculator" 
                style={{
                  background: '#F97316',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  whiteSpace: 'nowrap'
                }}
              >
                FREE QUOTE →
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// Styles are handled by the global pro-theme.css
// This component uses existing CSS classes for consistency

