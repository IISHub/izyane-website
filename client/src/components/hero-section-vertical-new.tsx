import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

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
      title: "Transforming Ideas into Digital Reality",
      subtitle: "Innovation at Scale",
      description: "We craft exceptional digital experiences that elevate your brand and accelerate business growth. Partner with us to unlock your full potential in the digital landscape.",
      backgroundGradient: "from-blue-50 via-indigo-50 to-purple-100",
      darkBackgroundGradient: "from-slate-900 via-blue-900/20 to-slate-800",
      heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { number: "500+", label: "Happy Clients" },
        { number: "1000+", label: "Projects Delivered" },
        { number: "99%", label: "Satisfaction Rate" }
      ],
      mockupIcon: "fas fa-rocket",
      accentTheme: "primary"
    },
    {
      title: "Intelligent Automation for Modern Business",
      subtitle: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence and machine learning to automate workflows, gain valuable insights, and stay ahead in the competitive landscape.",
      backgroundGradient: "from-emerald-50 via-teal-50 to-cyan-100",
      darkBackgroundGradient: "from-slate-900 via-emerald-900/20 to-slate-800",
      heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { number: "95%", label: "Accuracy Rate" },
        { number: "10x", label: "Faster Processing" },
        { number: "24/7", label: "AI Monitoring" }
      ],
      mockupIcon: "fas fa-brain",
      accentTheme: "primary"
    },
    {
      title: "Enterprise-Grade Cloud Solutions",
      subtitle: "Scalable Infrastructure", 
      description: "Build, deploy, and scale your applications with confidence using our robust cloud infrastructure. From startups to enterprises, we power your digital transformation.",
      backgroundGradient: "from-orange-50 via-amber-50 to-yellow-100",
      darkBackgroundGradient: "from-slate-900 via-orange-900/20 to-slate-800",
      heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      stats: [
        { number: "99.9%", label: "Uptime SLA" },
        { number: "50+", label: "Cloud Deployments" },
        { number: "3s", label: "Load Time" }
      ],
      mockupIcon: "fas fa-cloud",
      accentTheme: "secondary"
    }
  ];

  // Enhanced parallax transforms with proper content switching
  const x = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, -100, -200, -200]);

  // Individual slide opacities for proper content switching
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.33, 0.4], [1, 1, 0, 0]);
  const slide2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const slide3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 0.9, 1], [0, 1, 1, 1]);

  // Parallax effects for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const floatingElementsY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Scale and rotation effects
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  // Opacity fades for different sections
  const fadeInOut = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      {/* Floating background elements with parallax */}
      <motion.div 
        style={{ y: floatingElementsY }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-custom/20 to-secondary-custom/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-lg"></div>
      </motion.div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images for all slides - positioned to cover entire screen */}
        {slides.map((slide, index) => {
          const slideOpacity = index === 0 ? slide1Opacity : index === 1 ? slide2Opacity : slide3Opacity;
          return (
            <motion.div 
              key={`bg-${index}`}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.heroImage})`,
                opacity: slideOpacity
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
              
              {/* Gradient overlay for additional styling */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundGradient} dark:bg-gradient-to-br dark:${slide.darkBackgroundGradient} opacity-30 dark:opacity-20`}></div>
            </motion.div>
          );
        })}

        {/* Animated background pattern */}
        <motion.div 
          style={{ y: backgroundY, opacity: fadeInOut }}
          className="absolute inset-0 opacity-20 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform skew-y-6"></div>
        </motion.div>

        <motion.div style={{ x, scale }} className="flex h-full w-[300%] items-center relative z-20">
          {slides.map((slide, index) => {
            // Get the appropriate opacity for each slide content
            const slideOpacity = index === 0 ? slide1Opacity : index === 1 ? slide2Opacity : slide3Opacity;
            
            return (
            <div key={index} className="h-full w-full">
              <section 
                id={index === 0 ? "home" : `slide-${index}`}
                className="h-screen flex items-center justify-center relative overflow-hidden"
              >
                <div className="container-custom relative z-20 px-4">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div 
                      className="text-center lg:text-left order-2 lg:order-1"
                      style={{ y: textY, opacity: slideOpacity }}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.div 
                        className={`inline-block px-4 py-2 ${slide.accentTheme === 'primary' ? 'bg-primary-custom/20 text-white border border-white/30' : 'bg-secondary-custom/20 text-white border border-white/30'} rounded-full text-sm font-semibold mb-4 backdrop-blur-sm`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {slide.subtitle}
                      </motion.div>
                      
                      <motion.h1 
                        className="text-4xl xs:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        {slide.title.split(' ').map((word, wordIndex) => {
                          if (word === 'Digital' || word === 'Intelligent' || word === 'Enterprise-Grade' || word === 'Reality' || word === 'Automation' || word === 'Solutions') {
                            return <span key={wordIndex} className="text-primary-custom">{word} </span>;
                          }
                          return word + ' ';
                        })}
                      </motion.h1>
                      
                      <motion.p 
                        className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        {slide.description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-col xs:flex-row gap-4 justify-center lg:justify-start mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                      >
                        <button 
                          onClick={scrollToContact}
                          className="btn-solid text-lg px-8 py-4"
                        >
                          Get Started
                        </button>
                        <button className="btn-outline text-lg px-8 py-4">
                          <i className="fas fa-play mr-2"></i>Watch Demo
                        </button>
                      </motion.div>
                      
                      <motion.div 
                        className="grid grid-cols-3 gap-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        {slide.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-white/20">
                            <div className="text-3xl font-bold text-white drop-shadow">{stat.number}</div>
                            <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative order-1 lg:order-2"
                      style={{ y: mockupY, rotate }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                    >
                      {/* Floating decorative elements around mockup */}
                      <motion.div 
                        className="absolute -top-8 -left-8 w-6 h-6 bg-primary-custom/30 rounded-full"
                        animate={{ 
                          y: [0, -20, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div 
                        className="absolute -bottom-6 -right-6 w-4 h-4 bg-secondary-custom/40 rounded-full"
                        animate={{ 
                          y: [0, 15, 0],
                          x: [0, 10, 0]
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                      <motion.div 
                        className="absolute top-1/2 -right-12 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      <motion.div 
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transform rotate-3 relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.02,
                          rotate: 0,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Hero Image Background */}
                        <div className="absolute inset-0 opacity-20">
                          <img 
                            src={slide.heroImage} 
                            alt={`${slide.subtitle} Background`}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-2xl"></div>
                        </div>
                        
                        <div className="space-y-4 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="text-slate-400 dark:text-slate-500 text-sm">dashboard.izyane.com</div>
                          </div>
                          <div className={`h-32 rounded-lg flex items-center justify-center ${slide.accentTheme === 'primary' ? 'hero-accent-primary' : 'hero-accent-secondary'} relative overflow-hidden`}>
                            {/* Animated background pattern in mockup */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                              animate={{ x: [-100, 200] }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            <motion.i 
                              className={`${slide.mockupIcon} text-4xl ${slide.accentTheme === 'primary' ? 'text-primary-custom' : 'text-secondary-custom'} relative z-10`}
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <motion.div 
                              className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                              whileHover={{ scale: 1.05 }}
                              animate={{ 
                                backgroundColor: ["rgba(148, 163, 184, 0.1)", "rgba(148, 163, 184, 0.2)", "rgba(148, 163, 184, 0.1)"]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <i className="fas fa-users text-slate-400 dark:text-slate-500"></i>
                            </motion.div>
                            <motion.div 
                              className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                              whileHover={{ scale: 1.05 }}
                              animate={{ 
                                backgroundColor: ["rgba(148, 163, 184, 0.1)", "rgba(148, 163, 184, 0.2)", "rgba(148, 163, 184, 0.1)"]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                              }}
                            >
                              <i className="fas fa-server text-slate-400 dark:text-slate-500"></i>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
