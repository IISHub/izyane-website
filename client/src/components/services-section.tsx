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
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/data/services.json')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error loading services:', error));
  }, []);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section id="services" className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Our Services</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From concept to deployment, we provide comprehensive technology solutions tailored to your business needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="bg-white dark:bg-slate-700 rounded-xl p-6 card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <i className={`${service.icon} text-white text-lg`}></i>
              </div>
              <h3 className="text-lg font-bold text-responsive mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{service.description}</p>
              
              <div className="mb-4">
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                      <i className="fas fa-check text-emerald-500 mr-2 text-xs"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {service.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs">
                      +{service.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <button 
                onClick={() => handleLearnMore(service)}
                className="btn-outline w-full"
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* See More / Show Less Button */}
        {services.length > 6 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="btn-outline px-8 py-3"
            >
              {showAll ? `Show Less` : `See All Services (${services.length - 6} more)`}
            </button>
          </div>
        )}
      </div>

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
