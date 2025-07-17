import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceModal from "@/components/service-modal";

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
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">Our Services</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From concept to deployment, we provide comprehensive technology solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-slate-700 rounded-2xl p-8 card-hover group">
              <div className={`w-16 h-16 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <i className={`${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-secondary-custom dark:text-white mb-4">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                    <i className="fas fa-check text-emerald-500 mr-3 text-sm"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="ghost" 
                onClick={() => handleLearnMore(service)}
                className="text-primary-custom font-semibold hover:text-accent-custom transition-colors duration-200 p-0"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </div>
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
