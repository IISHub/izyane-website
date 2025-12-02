import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logo: string;
  category: string;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isPausedCustomers, setIsPausedCustomers] = useState(false);

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

  const partnersList = partners.filter(p => p.category === 'partner');
  const customersList = partners.filter(p => p.category === 'customers');

  if (loading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="partners" className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Section Header */}
      <div className="container-custom mb-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-responsive mb-4">
            Working with Industry Leaders
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We collaborate with world-class organizations to deliver exceptional solutions
          </p>
        </motion.div>
      </div>

      {/* Partners Section */}
      <div className="mb-20">
        <motion.div
          className="container-custom mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2" style={{ lineHeight: 5 }}>
              <i className="fas fa-handshake text-primary"></i>
              Our Partners
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Infinite Scroll - Partners */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: isPaused ? 0 : [0, -50 * partnersList.length * 2.5],
              }}
              transition={{
                x: {
                  duration: partnersList.length * 4,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{ willChange: 'transform' }}
            >
              {/* Triple the logos for seamless loop */}
              {[...partnersList, ...partnersList, ...partnersList].map((partner, index) => (
                <motion.div
                  key={`partner-${index}`}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-44 h-24 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 px-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {partner.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Customers Section */}
      <div className="mb-16">
        <motion.div
          className="container-custom mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2" style={{ lineHeight: 5 }}>
              <i className="fas fa-building text-primary"></i>
              Our Customers
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Infinite Scroll - Customers (Reverse Direction) */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPausedCustomers(true)}
          onMouseLeave={() => setIsPausedCustomers(false)}
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: isPausedCustomers ? 0 : [-50 * customersList.length * 2.5, 0],
              }}
              transition={{
                x: {
                  duration: customersList.length * 4,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{ willChange: 'transform' }}
            >
              {/* Triple the logos for seamless loop */}
              {[...customersList, ...customersList, ...customersList].map((customer, index) => (
                <motion.div
                  key={`customer-${index}`}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-44 h-24 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 px-4">
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      className="max-w-full max-h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {customer.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="container-custom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold text-responsive mb-3">
            Ready to Partner with Us?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            Join our growing network of partners and customers. Let's build something great together.
          </p>
          <button 
            onClick={scrollToContact}
            className="btn-solid px-8 py-3"
          >
            Get in Touch
          </button>
        </div>
      </motion.div>
    </section>
  );
}