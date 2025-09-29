'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer style={{
      background: '#0F172A',
      color: 'white',
      padding: '3rem 0 1rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <Image 
                src="/logo.png" 
                alt="Mudanzas Edyta London" 
                width={50} 
                height={50}
                style={{ borderRadius: '50%' }}
              />
              <div>
                <h4 style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>
                  Mudanzas Edyta London Limited
                </h4>
                <p style={{ color: '#F97316', margin: 0, fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "Lift on the way"
                </p>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Edyta Removals has been providing high-quality flat removal services for over 8 years. 
              Professional, reliable, and fully insured moving solutions across London.
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>Follow Us</h5>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <a href="https://www.facebook.com/removalsmudanzasedytalondon" 
                 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem' }}>📘</a>
              <a href="https://www.instagram.com/mudanzasedytalondonlimited" 
                 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem' }}>📸</a>
              <a href="https://www.linkedin.com/in/mudanzasedytalondon/" 
                 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.5rem' }}>💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>Quick Links</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/same-day-delivery" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Same-Day Delivery
              </Link>
              <Link href="/office-moves" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Office moves
              </Link>
              <Link href="/pickup-from-store" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Pickup from store
              </Link>
              <Link href="/move-flat-or-apartment" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Move Flat or Apartment
              </Link>
              <Link href="/house-removals" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                House removals
              </Link>
              <Link href="/furniture-currier" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Furniture Currier
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem' }}>Newsletters</h5>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Mudanza Edyta London are top-notch, highly reliable, competent, and reasonable vans
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              />
              <button style={{
                background: '#F97316',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textTransform: 'lowercase'
              }}>
                subscribe now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.875rem'
        }}>
          <p style={{ margin: 0 }}>
            Copyright ©2024 Mudanza Edyta London. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

// Styles are handled by the global pro-theme.css
// This component uses existing CSS classes for consistency

