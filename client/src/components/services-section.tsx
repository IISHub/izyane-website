import { useState, useEffect } from "react";
import ServiceModal from "@/components/service-modal";
import { motion } from "framer-motion";

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
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

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

  return (
    <section
      id="services"
      className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden"
    >
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Image */}
          <div className="lg:w-[35%] relative min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden">
            <img 
              src="/services-illustration.jpg" 
              alt="Our Services"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Right side - Services */}
          <div className="lg:w-[65%]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((service, index: number) => (
                <motion.div
                  key={service.id}
                  className="flex flex-col bg-white dark:bg-slate-800 rounded-lg p-3 hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${service.icon} text-white text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1 line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs mb-2 line-clamp-2">
                        {service.description}
                      </p>
                      <button
                        onClick={() => handleLearnMore(service)}
                        className="text-primary-custom hover:text-primary-custom/80 text-xs font-medium transition-colors"
                      >
                        Learn More →
                      </button>
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
      </div>
    </section>
  );
}
