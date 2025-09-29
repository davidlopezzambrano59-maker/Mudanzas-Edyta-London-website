import { Metadata } from 'next';
import { Users, Star, Shield, Globe, Clock, CheckCircle, Award, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About Us | Mudanzas Edyta London | 10+ Years Moving Experience',
  description: 'Learn about Mudanzas Edyta London - your trusted removals partner with 10+ years experience. Professional, bilingual team serving London with premium moving services.',
  keywords: 'about mudanzas edyta, London removals company, moving company history, professional movers, bilingual removals',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers\' needs and satisfaction at the heart of our service.'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Fully insured, DBS-checked team you can trust with your most valuable possessions.'
    },
    {
      icon: Globe,
      title: 'Inclusive Service',
      description: 'Bilingual English/Spanish service ensuring clear communication for all our customers.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuous improvement and commitment to delivering the highest quality moving experience.'
    }
  ];

  const milestones = [
    { year: '2013', event: 'Mudanzas Edyta London founded with a single van and big dreams' },
    { year: '2015', event: 'Expanded fleet to include medium and large vans for all move sizes' },
    { year: '2017', event: 'Achieved 500+ successful moves and 5-star customer rating' },
    { year: '2019', event: 'Introduced specialized services for pianos, antiques, and office moves' },
    { year: '2021', event: 'Launched bilingual service to better serve London\'s diverse community' },
    { year: '2024', event: 'Over 2000 satisfied customers and expanding across London' }
  ];

  const teamStats = [
    { number: '10+', label: 'Years Experience' },
    { number: '2000+', label: 'Happy Customers' },
    { number: '5000+', label: 'Successful Moves' },
    { number: '7', label: 'Days a Week' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Mudanzas Edyta London
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              For over 10 years, we've been London's trusted moving partner, helping thousands of families and 
              businesses relocate with care, professionalism, and a personal touch that makes all the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                10+ Years Experience
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                2000+ Happy Customers
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Bilingual Service
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Mudanzas Edyta London was born from a simple belief: moving doesn't have to be stressful. 
                  Founded in 2013 by Edyta, who experienced firsthand the challenges of relocating to a new country, 
                  our company was built on empathy, understanding, and a commitment to exceptional service.
                </p>
                <p>
                  Starting with just one van and a dream to help London's diverse community, we've grown into 
                  one of the city's most trusted removals services. Our bilingual approach ensures that language 
                  is never a barrier to receiving the quality service you deserve.
                </p>
                <p>
                  Today, we're proud to serve families, students, professionals, and businesses across London 
                  with the same personal care and attention that defined our very first move. Every box we handle, 
                  every mile we drive, carries with it our promise: "Lift on the way."
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-brand-gradient rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Why "Lift on the way"?</h3>
                <p className="text-lg leading-relaxed opacity-95">
                  Our slogan represents more than just moving your belongings. We lift the burden from your shoulders, 
                  lift your spirits during a stressful time, and lift your expectations of what a moving service can be. 
                  Every step of the way, we're here to lift you up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and ensure every customer receives the exceptional service they deserve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">
              A decade of growth, learning, and serving the London community
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-primary/30"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold shadow-lg relative z-10">
                      {milestone.year}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-brand-primary mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced, DBS-checked professionals are the heart of our service. Every team member 
              shares our commitment to making your move as smooth as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">E</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Edyta</h3>
              <p className="text-gray-600 mb-3">Founder & Director</p>
              <p className="text-sm text-gray-600">
                The visionary behind our company, ensuring every move meets our high standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Moving Team</h3>
              <p className="text-gray-600 mb-3">Professional Movers</p>
              <p className="text-sm text-gray-600">
                Experienced, DBS-checked professionals who treat your belongings with care.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support Team</h3>
              <p className="text-gray-600 mb-3">Customer Service</p>
              <p className="text-sm text-gray-600">
                Bilingual support ensuring clear communication throughout your move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who've trusted us with their most important moves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Get Your Quote
            </a>
            <a
              href="tel:+447456507570"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-brand-primary transition-colors"
            >
              Call 07456 507 570
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
