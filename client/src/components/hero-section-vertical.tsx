import { motion, useScroll, useTransform } from "framer-motion";
import OptimizedImage from "@/components/optimized-image";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Ensure proper initialization
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0);
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      const fallback = document.querySelector(`[id*="${sectionId}"]`);
      if (fallback) {
        fallback.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const slides = [
    {
      backgroundGradient: "from-emerald-50 via-teal-50 to-cyan-100",
      darkBackgroundGradient: "from-slate-900 via-emerald-900/20 to-slate-800",
      heroImage: "/img/banner3.png",
      stats: [
        { number: "10+", label: "Projects Delivered" },
        { number: "5+", label: "AI Products", link: "products" },
        { number: "99%", label: "Satisfaction Rate" }
      ],
      mockupIcon: "fas fa-brain",
      accentTheme: "primary"
    },
    {
      backgroundGradient: "from-blue-50 via-indigo-50 to-purple-100",
      darkBackgroundGradient: "from-slate-900 via-blue-900/20 to-slate-800",
      heroImage: "/img/banner1.png",
      stats: [
        { number: "100+", label: "DSA's" },
        { number: "99%", label: "Client Support" },
        { number: "5000+", label: "Agencies Opened" }
      ],
      mockupIcon: "fas fa-rocket",
      accentTheme: "primary"
    },
    {
      backgroundGradient: "from-orange-50 via-amber-50 to-yellow-100",
      darkBackgroundGradient: "from-slate-900 via-orange-900/20 to-slate-800",
      heroImage: "/img/banner3.png",
      stats: [
        { number: "2200+", label: "POS Supplied" },
        { number: "2", label: "Countries" },
        { number: "70+", label: "Locations" }
      ],
      mockupIcon: "fas fa-cloud",
      accentTheme: "secondary"
    },
    {
      backgroundGradient: "from-emerald-50 via-sky-50 to-red-100",
      darkBackgroundGradient: "from-slate-900 via-emerald-900/20 to-slate-800",
      heroImage: "/img/boz.jpeg",
      stats: [
        { number: "BoZ", label: "Payment Licensed", link: "associations" },
        { number: "Oracle", label: "Registered Partner", link: "associations" },
        { number: "PCI DSS", label: " Underway", link: "associations" }
      ],
      mockupIcon: "fas fa-shield-halved",
      accentTheme: "primary"
    }
  ];

  // Enhanced parallax transforms with proper content switching
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -100, -200, -300, -300]);

  // Individual slide opacities for proper content switching - start with slide 1 visible, others hidden
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.19, 0.25, 0.3], [1, 1, 0, 0]);
  const slide2Opacity = useTransform(scrollYProgress, [0.19, 0.25, 0.44, 0.5], [0, 1, 1, 0]);
  const slide3Opacity = useTransform(scrollYProgress, [0.44, 0.5, 0.69, 0.75], [0, 1, 1, 0]);
  const slide4Opacity = useTransform(scrollYProgress, [0.69, 0.75, 0.95, 1], [0, 1, 1, 1]);

  const slide1PointerEvents = useTransform(scrollYProgress, (v) => v < 0.22 ? "auto" : "none");
  const slide2PointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.19 && v < 0.5) ? "auto" : "none");
  const slide3PointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.44 && v < 0.75) ? "auto" : "none");
  const slide4PointerEvents = useTransform(scrollYProgress, (v) => v >= 0.69 ? "auto" : "none");

  const slideOpacities = [slide1Opacity, slide2Opacity, slide3Opacity, slide4Opacity];
  const slidePointerEventsList = [slide1PointerEvents, slide2PointerEvents, slide3PointerEvents, slide4PointerEvents];

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
    <section ref={targetRef} className="relative h-[400vh]">
      {/* Floating background elements with parallax */}
      <motion.div 
        style={{ y: floatingElementsY }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="hidden md:absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-custom/20 to-secondary-custom/20 rounded-full blur-xl"></div>
        <div className="hidden lg:absolute top-40 right-20 w-32 h-32 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        <div className="hidden md:absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-xl"></div>
        <div className="hidden lg:absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-lg"></div>
      </motion.div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images for all slides - positioned to cover entire screen */}
        {slides.map((slide, index) => {
          const slideOpacity = slideOpacities[index];
          const slidePointerEvents = slidePointerEventsList[index];
          
          return (
            <motion.div 
              key={`bg-${index}`}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
              style={{ 
                backgroundImage: `url(${slide.heroImage})`,
                opacity: isInitialized ? slideOpacity : (index === 0 ? 1 : 0),
                zIndex: index === 0 ? 15 : 10
              }}
              initial={{ opacity: index === 0 ? 1 : 0 }} // Only first slide visible initially
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 pointer-events-none"></div>
              
              {/* Gradient overlay for additional styling */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundGradient} dark:bg-gradient-to-br dark:${slide.darkBackgroundGradient} opacity-30 dark:opacity-20 pointer-events-none`}></div>
              
              {/* Background Content Overlay for all slides */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                style={{ 
                  opacity: isInitialized ? slideOpacity : (index === 0 ? 1 : 0),
                  pointerEvents: isInitialized ? slidePointerEvents : (index === 0 ? 'auto' : 'none')
                }} // Prevent stacking on initial load
                initial={{ opacity: index === 0 ? 1 : 0, y: 50 }} // Only first slide content visible initially
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="text-center max-w-6xl px-4 sm:px-6 pointer-events-auto">
                  <motion.h2
                    className={`text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl ${
                      index === 0 ? 'mb-4 sm:mb-6' : 'mb-6 sm:mb-8 md:mb-12'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {index === 0 && (
                      
                      <>
                        <span className="text-emerald-400">Smart</span> Solutions<br />
                        for <span className="text-teal-400">Tomorrow</span>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <span className="text-blue-400">Digital</span> Innovation<br />
                        <span className="text-red-800">Unleashed</span>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <span className="text-orange-400">POS Supply</span> &<br/>
                        <span className="text-amber-400">Application</span> Development
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <span className="text-emerald-400">Licensed</span> &<br/>
                        <span className="text-sky-400">Trusted</span> Fintech
                      </>
                    )}
                  </motion.h2>

                  {index === 0 && (
                    <motion.p
                      className="text-sm sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.65 }}
                    >
                      {/* Render stats here — will be displayed regardless of slide content */}
                    </motion.p>
                  )}

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {slide.stats.map((stat, statIndex) => {
                      const isClickable = Boolean((stat as any).link);

                      return (
                        <motion.div 
                          key={statIndex} 
                          className={`group relative text-center ${isClickable ? 'cursor-pointer' : ''}`}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                          }}
                          whileTap={isClickable ? { scale: 0.96 } : undefined}
                          onClick={isClickable ? () => scrollToSection((stat as any).link) : undefined}
                          onKeyDown={isClickable ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              scrollToSection((stat as any).link);
                            }
                          } : undefined}
                          tabIndex={isClickable ? 0 : undefined}
                          role={isClickable ? "button" : undefined}
                          aria-label={isClickable ? `Navigate to ${stat.label}` : undefined}
                        >
                          {/* Liquid Glass Background */}
                          <div className={`relative p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:border-white/40 ${
                            isClickable ? 'hover:border-white/70 hover:ring-2 hover:ring-white/30' : ''
                          } ${
                            index === 0 ? 'hover:from-blue-400/10 hover:to-purple-400/10' : 
                            index === 1 ? 'hover:from-emerald-400/10 hover:to-teal-400/10' : 
                            index === 3 ? 'hover:from-emerald-400/10 hover:to-sky-400/10' :
                            'hover:from-orange-400/10 hover:to-amber-400/10'
                          }`}>
                            {/* Animated liquid glass effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className={`absolute inset-0 bg-gradient-to-tl opacity-30 animate-pulse ${
                              index === 0 ? 'from-blue-400/10 via-transparent to-purple-400/10' : 
                              index === 1 ? 'from-emerald-400/10 via-transparent to-teal-400/10' : 
                              index === 3 ? 'from-emerald-400/10 via-transparent to-sky-400/10' :
                              'from-orange-400/10 via-transparent to-amber-400/10'
                            }`}></div>
                            
                            {/* Floating particles effect */}
                            <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                            <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-300"></div>
                            <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-500"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2 sm:mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text group-hover:from-white group-hover:to-white transition-all duration-300">
                                {stat.number}
                              </div>
                              <div className="text-white/90 font-semibold text-xs sm:text-sm md:text-base lg:text-lg tracking-wide group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-1.5">
                                <span>{stat.label}</span>
                                {isClickable && (
                                  <i className="fas fa-arrow-right text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                )}
                              </div>
                            </div>
                            
                            {/* Liquid ripple effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-[shimmer_2s_ease-in-out_infinite]"></div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Animated background pattern */}
        <motion.div 
          style={{ y: backgroundY, opacity: fadeInOut }}
          className="absolute inset-0 opacity-20 z-10 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform skew-y-6 pointer-events-none"></div>
        </motion.div>

        <motion.div style={{ x, scale }} className="flex h-full w-[400%] items-center relative z-20 pointer-events-none">
          {slides.map((slide, index) => {
            // Get the appropriate opacity for each slide content
            const slideOpacity = slideOpacities[index];
            
            return (
            <div key={index} className="h-full w-full">
              <section 
                id={index === 0 ? "home" : `slide-${index}`}
                className="h-screen flex items-center justify-center relative overflow-hidden"
              >
                {/* Floating decorative elements - hidden on mobile */}
                <motion.div 
                  className="hidden md:absolute md:right-20 top-1/2 -translate-y-1/2"
                  style={{ y: mockupY, rotate }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
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
                </motion.div>
              </section>
            </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
