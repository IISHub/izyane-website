import { useEffect, useState } from "react";

interface Partner {
  name: string;
  logo: string;
  category: string;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/data/partners.json')
      .then(response => response.json())
      .then(data => setPartners(data))
      .catch(error => console.error('Error loading partners:', error));
  }, []);

  // Duplicate the array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">
            Our <span className="gradient-text">Partners</span> & Technologies
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We work with industry leaders and cutting-edge technologies to deliver exceptional solutions.
          </p>
        </div>
        
        <div className="relative">
          {/* Animated logo strip */}
          <div className="flex space-x-12 animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center p-4 transition-all duration-300 hover:shadow-2xl hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-primary-custom/10 group-hover:to-accent-custom/10">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain filter transition-all duration-300 group-hover:brightness-110"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'text-sm font-semibold text-slate-600 dark:text-slate-300 text-center';
                      fallback.textContent = partner.name;
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400">
            Interested in partnering with us? 
            <button className="text-primary-custom hover:text-accent-custom font-semibold ml-1 transition-colors duration-200">
              Get in touch
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}