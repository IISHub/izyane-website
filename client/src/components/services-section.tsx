import { useState, useEffect } from "react";
import ServiceModal from "@/components/service-modal";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  deliverables: string[];
  pricing: {
    basic: string;
    standard: string;
    enterprise: string;
  };
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.2 });
  const decorationParallax = useParallax({ speed: -0.3 });

  useEffect(() => {
    fetch("/data/services.json")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error loading services:", error));
  }, []);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const displayedServices = services;

  return (
    <section
      id="services"
      className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={backgroundParallax}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl opacity-10"
        style={decorationParallax}
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl xs:text-4xl lg:text-5xl font-bold text-responsive mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-lg xs:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
            We do the highest level of R&D for innovative and user-friendly
            banking applications through Techurate, we are an accredited ORACLE
            gold partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Image */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24 h-full">
              <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-primary to-accent">
                <img
                  src="/img/sevices2.jpg"
                  alt="Our Services"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Try a known fallback image if the primary one fails
                    e.currentTarget.onerror = null as any;
                    e.currentTarget.src = '/img/services1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <i className="fas fa-code text-6xl mb-4 opacity-80"></i>
                    <h3 className="text-2xl font-bold mb-2">Our Services</h3>
                    <p className="text-white/90">
                      Comprehensive solutions for your business needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle and Right Columns - Services */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white dark:bg-slate-700 rounded-xl p-4 parallax-card group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                onClick={() => handleLearnMore(service)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <i className={`${service.icon} text-primary text-lg`}></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-responsive mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
