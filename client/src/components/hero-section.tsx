import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const slides = [
    {
      title: "Building the Future of Technology",
      subtitle: "Innovative Solutions",
      description: "We deliver cutting-edge solutions that transform businesses and drive innovation. Join the thousands of companies already accelerating their growth with iZyane.",
      backgroundGradient: "from-slate-50 via-blue-50 to-indigo-100",
      stats: [
        { number: "500+", label: "Happy Clients" },
        { number: "1000+", label: "Projects Delivered" },
        { number: "99%", label: "Satisfaction Rate" }
      ],
      mockupIcon: "fas fa-chart-line",
      primaryColor: "primary-custom"
    },
    {
      title: "AI-Powered Solutions for Tomorrow",
      subtitle: "Artificial Intelligence",
      description: "Harness the power of AI and machine learning to automate processes, gain insights, and stay ahead of the competition with our intelligent solutions.",
      backgroundGradient: "from-purple-50 via-indigo-50 to-blue-100",
      stats: [
        { number: "95%", label: "Accuracy Rate" },
        { number: "10x", label: "Faster Processing" },
        { number: "24/7", label: "AI Monitoring" }
      ],
      mockupIcon: "fas fa-brain",
      primaryColor: "accent-custom"
    },
    {
      title: "Scalable Cloud Infrastructure",
      subtitle: "Cloud Excellence",
      description: "Build, deploy, and scale your applications with our robust cloud solutions. From microservices to enterprise-grade platforms, we've got you covered.",
      backgroundGradient: "from-emerald-50 via-teal-50 to-cyan-100",
      stats: [
        { number: "99.9%", label: "Uptime SLA" },
        { number: "50+", label: "Cloud Deployments" },
        { number: "3s", label: "Load Time" }
      ],
      mockupIcon: "fas fa-cloud",
      primaryColor: "emerald-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section id="home" className={`pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br ${currentSlideData.backgroundGradient} min-h-screen flex items-center relative overflow-hidden transition-all duration-1000`}>
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className={`inline-block px-4 py-2 bg-${currentSlideData.primaryColor}/10 text-${currentSlideData.primaryColor} rounded-full text-sm font-semibold mb-4 animate-fadeInUp`}>
              {currentSlideData.subtitle}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom leading-tight mb-6 animate-fadeInUp">
              {currentSlideData.title.split(' ').map((word, index) => {
                if (word === 'Future' || word === 'AI-Powered' || word === 'Scalable') {
                  return <span key={index} className="gradient-text">{word} </span>;
                }
                return word + ' ';
              })}
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed animate-fadeInUp">
              {currentSlideData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fadeInUp">
              <Button 
                onClick={scrollToContact}
                className={`bg-${currentSlideData.primaryColor} text-white px-8 py-4 rounded-lg hover:bg-${currentSlideData.primaryColor}/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:border-primary-custom hover:text-primary-custom transition-all duration-200 font-semibold text-lg"
              >
                <i className="fas fa-play mr-2"></i>Watch Demo
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center animate-fadeInUp">
              {currentSlideData.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-secondary-custom">{stat.number}</div>
                  <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fadeInUp">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-slate-400 text-sm">dashboard.izyane.com</div>
                </div>
                <div className={`h-32 bg-gradient-to-r from-${currentSlideData.primaryColor}/20 to-accent-custom/20 rounded-lg flex items-center justify-center`}>
                  <i className={`${currentSlideData.mockupIcon} text-4xl text-${currentSlideData.primaryColor}`}></i>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-slate-400"></i>
                  </div>
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-server text-slate-400"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-accent-custom to-${currentSlideData.primaryColor} rounded-full opacity-20 animate-pulse`}></div>
            <div className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-${currentSlideData.primaryColor} to-accent-custom rounded-full opacity-30 animate-pulse`}></div>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-20"
      >
        <ChevronLeft className="w-6 h-6 text-slate-600" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-20"
      >
        <ChevronRight className="w-6 h-6 text-slate-600" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? `bg-${currentSlideData.primaryColor}` 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}