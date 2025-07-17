import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceModal from "@/components/service-modal";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const services = [
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices for performance and scalability.",
      features: ["React & Vue.js", "Node.js & Python", "Cloud Deployment"],
      gradientFrom: "from-primary-custom",
      gradientTo: "to-accent-custom"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "App Store Publishing"],
      gradientFrom: "from-accent-custom",
      gradientTo: "to-primary-custom"
    },
    {
      icon: "fas fa-cloud",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and DevOps solutions to power your business growth.",
      features: ["AWS & Azure", "DevOps & CI/CD", "Security & Monitoring"],
      gradientFrom: "from-primary-custom",
      gradientTo: "to-accent-custom"
    },
    {
      icon: "fas fa-brain",
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics"],
      gradientFrom: "from-accent-custom",
      gradientTo: "to-primary-custom"
    },
    {
      icon: "fas fa-palette",
      title: "UI/UX Design",
      description: "User-centered design that creates engaging and intuitive digital experiences.",
      features: ["User Research", "Prototyping", "Design Systems"],
      gradientFrom: "from-primary-custom",
      gradientTo: "to-accent-custom"
    },
    {
      icon: "fas fa-cogs",
      title: "Consulting",
      description: "Strategic technology consulting to help you make informed decisions and plan for growth.",
      features: ["Digital Strategy", "Architecture Review", "Technology Roadmap"],
      gradientFrom: "from-accent-custom",
      gradientTo: "to-primary-custom"
    }
  ];

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
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">Our Services</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From concept to deployment, we provide comprehensive technology solutions tailored to your business needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-slate-700 rounded-xl p-6 card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <i className={`${service.icon} text-white text-lg`}></i>
              </div>
              <h3 className="text-lg font-bold text-secondary-custom dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{service.description}</p>
              <ul className="space-y-1 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                    <i className="fas fa-check text-emerald-500 mr-2 text-xs"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="ghost" 
                onClick={() => handleLearnMore(service)}
                className="text-primary-custom font-semibold hover:text-accent-custom transition-colors duration-200 p-0 text-sm"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </motion.div>
          ))}
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
