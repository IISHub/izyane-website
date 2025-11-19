import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceModal, { Service as ServiceType } from "@/components/service-modal";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/data/services.json');
        if (res.ok) {
          const json = await res.json();
          setServices(json as ServiceType[]);
        } else {
          setServices([]);
        }
      } catch (err) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const handleLearnMore = (service: ServiceType) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section
      id="services"
      className="py-20 px-4 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Our Services</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Solutions and services to help your business build, scale and operate secure digital products.
          </p>
        </motion.div>
        {/* Main Grid Container - 3 Equal Columns */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Side - Featured Image (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 h-full shadow-xl">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="grid grid-cols-6 gap-4 p-8 transform rotate-12">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="aspect-square bg-white rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Centered content */}
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl">
                    <i className="fas fa-briefcase text-5xl text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white">
                      Expert Solutions
                    </h3>
                    <p className="text-blue-100 text-base leading-relaxed">
                      Delivering innovative technology solutions with excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Services Grid (2/3 width, 2 columns) */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="relative bg-white rounded-xl p-4 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    onClick={() => handleLearnMore(service)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-blue-100/30 transition-all duration-300" />
                    
                    <div className="relative flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-9 h-9 flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors">
                          <i className={`${service.icon ?? 'fas fa-cog'} text-xl`} />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 leading-tight transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>

                      {/* Arrow Icon - Hidden by default, appears on hover (no background) */}
                      <div className="flex-shrink-0 mt-0">
                        <div className="w-10 h-10 flex items-center justify-center opacity-0 scale-0 -translate-x-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-gray-400 group-hover:text-blue-600">
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
