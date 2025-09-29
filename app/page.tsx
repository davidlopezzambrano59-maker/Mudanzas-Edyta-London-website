import { QuoteCalculator } from '@/components/quote-calculator';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching WordPress Design */}
      <section style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="a" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)"%3E%3Crect width="100" height="100" fill="%23374151"/%3E%3Cpath d="M0 0h100v100H0z" fill="url(%23b)"/%3E%3C/pattern%3E%3ClinearGradient id="b"%3E%3Cstop offset="0" stop-color="%234B5563"/%3E%3Cstop offset="1" stop-color="%23374151"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23a)"/%3E%3C/svg%3E")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: 'white'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '700',
              marginBottom: '2rem',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Need help lifting?
            </h1>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/services" 
                style={{
                  background: '#F97316',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                Explore Services
              </a>
              <a 
                href="/about" 
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  border: '2px solid rgba(255,255,255,0.8)',
                  transition: 'all 0.2s ease'
                }}
              >
                learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { icon: "⭐", text: "10+ Years Experience" },
              { icon: "🛡️", text: "Fully Insured" },
              { icon: "✅", text: "DBS Checked" },
              { icon: "🌍", text: "Bilingual Service" },
              { icon: "⚡", text: "Same Day Available" },
              { icon: "⏰", text: "2 Hour Minimum" }
            ].map((badge, index) => (
              <div key={index} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-sm">{badge.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote Calculator */}
      <section id="quote-calculator" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <QuoteCalculator />
        </div>
      </section>

      {/* Services Section - Matching WordPress */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Our Services <span style={{ color: '#F97316' }}>.</span>
            </h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              { 
                title: "Furniture Currier", 
                desc: "Are you seeking someone to move your furniture? Look no further than Mudanza Edyta London services for moving your furniture safely and sound. Call us now!" 
              },
              { 
                title: "House removals", 
                desc: "Grab our professional house removal services at highly reasonable prices!" 
              },
              { 
                title: "Move Flat", 
                desc: "Are you seeking someone to move your flat or apartment? Look no further than Mudanza Edyta London services for moving your flat and apartment safe and sound. Call us now!" 
              },
              { 
                title: "Office movers", 
                desc: "Call us now to get a reasonable quote for relocating your office!" 
              },
              { 
                title: "Same-Day Delivery", 
                desc: "Grab our fastest Mudanza Edyta London services. Call us now, we'll be there in just an hour to move your stuff!" 
              }
            ].map((service, index) => (
              <div key={index} style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease'
              }}>
                <h6 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  color: '#0F172A'
                }}>
                  {service.title}
                </h6>
                <p style={{ 
                  color: '#64748B', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Matching WordPress */}
      <section style={{ padding: '4rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}>
                Years Removals Experience
              </h3>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}>
                World Satisfied Customers
              </h3>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}>
                Professional Team Members
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Matching WordPress */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#F97316', fontWeight: '600', marginBottom: '1rem' }}>Why Choose Us</p>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#0F172A',
              marginBottom: '1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We are different from others to provide services
            </h3>
            <p style={{ 
              color: '#64748B', 
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Mudanza Edyta London are top-notch, highly reliable, competent, and reasonable vans to take you safely to your desired destinations.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h6 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                marginBottom: '1rem',
                color: '#0F172A'
              }}>
                Best Rate Guarantee
              </h6>
              <p style={{ 
                color: '#64748B', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Mudanza Edyta London are well-known for providing the most up-to-date, opulent private transportation services at extremely affordable rates.
              </p>
              <a href="/services" style={{ color: '#F97316', textDecoration: 'none', fontWeight: '600' }}>
                Read More
              </a>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h6 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                marginBottom: '1rem',
                color: '#0F172A'
              }}>
                Quick Service
              </h6>
              <p style={{ 
                color: '#64748B', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Mudanza Edyta London provides the fastest and timeline transportation services at one call. Book your rides now!
              </p>
              <a href="/contact" style={{ color: '#F97316', textDecoration: 'none', fontWeight: '600' }}>
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Move? Get Started Today!</h2>
          <p className="text-xl mb-8">Professional removals service available 7 days a week</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote-calculator" 
               className="bg-white text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors">
              Get Instant Quote
            </a>
            <a href="https://wa.me/447456507570" 
               className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition-colors">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>


      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <a href="https://wa.me/447456507570" 
           className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl animate-pulse">
          💬
        </a>
      </div>
    </div>
  );
}







