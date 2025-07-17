import { useState, useEffect } from 'react';

interface Partner {
  name: string;
  logo: string;
  category: string;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const response = await fetch('/data/partners.json');
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error('Error loading partners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-responsive mb-4">
            Trusted by Industry <span className="gradient-text">Leaders</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We're proud to work with some of the world's most innovative companies and cutting-edge technologies.
          </p>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-responsive text-center mb-8">Our Partners</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-12">
              {/* First set of partner logos */}
              {partners.filter(partner => partner.category === 'partner').map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                  />
                </div>
              ))}
              {/* Duplicate for seamless scrolling */}
              {partners.filter(partner => partner.category === 'partner').map((partner, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-responsive text-center mb-8">Our Customers</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-12" style={{ animationDirection: 'reverse' }}>
              {/* First set of customers logos */}
              {partners.filter(partner => partner.category === 'customers').map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate for seamless scrolling */}
              {partners.filter(partner => partner.category === 'customers').map((partner, index) => (
                <div
                  key={`duplicate-tech-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 animate-fadeInUp">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ready to join our growing list of satisfied clients?
          </p>
          <button className="btn-solid">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}