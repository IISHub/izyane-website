import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { 
  useVerticalCarousel, 
  useStaticContentParallax, 
  useScrollProgress,
  useScrollTextReveal,
  useScrollColorTransition,
  useScrollImageMask,
  useHeroScrollAnimations,
  useStickyHeroEffect
} from "@/hooks/use-parallax";

export default function HeroSection() {
  const { activeSlide } = useVerticalCarousel();
  const { backgroundOffset } = useStaticContentParallax();
  const scrollProgress = useScrollProgress();
  
  // New scroll-triggered animations
  const heroAnims = useHeroScrollAnimations();
  const { color: accentColor } = useScrollColorTransition({
    startColor: '#3b82f6', // blue
    endColor: '#ef4444', // red
    startThreshold: 0,
    endThreshold: window.innerHeight * 2
  });
  const { maskSize, maskStyle } = useScrollImageMask({
    startThreshold: 100,
    endThreshold: 500
  });
  const { revealedText } = useScrollTextReveal({
    text: "Transforming ideas into digital realities with cutting-edge solutions",
    threshold: 150,
    speed: 1.5
  });
  
  // Sticky section effects
  const stickyHero = useStickyHeroEffect(3); // 3 sections

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
      backgroundGradient: "from-blue-50 via-indigo-50 to-slate-100",
      darkBackgroundGradient: "from-slate-900 via-blue-900/20 to-slate-800",
      stats: [
        { number: "500+", label: "Happy Clients" },
        { number: "1000+", label: "Projects Delivered" },
        { number: "99%", label: "Satisfaction Rate" }
      ],
      mockupIcon: "fas fa-chart-line",
      primaryColor: "primary-custom",
      accentTheme: "primary"
    },
    {
      title: "AI-Powered Solutions for Tomorrow",
      subtitle: "Artificial Intelligence",
      description: "Harness the power of AI and machine learning to automate processes, gain insights, and stay ahead of the competition with our intelligent solutions.",
      backgroundGradient: "from-slate-50 via-blue-100 to-indigo-100",
      darkBackgroundGradient: "from-slate-900 via-indigo-900/30 to-slate-800",
      stats: [
        { number: "95%", label: "Accuracy Rate" },
        { number: "10x", label: "Faster Processing" },
        { number: "24/7", label: "AI Monitoring" }
      ],
      mockupIcon: "fas fa-brain",
      primaryColor: "primary-custom",
      accentTheme: "primary"
    },
    {
      title: "Scalable Cloud Infrastructure",
      subtitle: "Cloud Excellence",
      description: "Build, deploy, and scale your applications with our robust cloud solutions. From microservices to enterprise-grade platforms, we've got you covered.",
      backgroundGradient: "from-red-50 via-rose-50 to-slate-100",
      darkBackgroundGradient: "from-slate-900 via-red-900/20 to-slate-800",
      stats: [
        { number: "99.9%", label: "Uptime SLA" },
        { number: "50+", label: "Cloud Deployments" },
        { number: "3s", label: "Load Time" }
      ],
      mockupIcon: "fas fa-cloud",
      primaryColor: "secondary-custom",
      accentTheme: "secondary"
    }
  ];

  const currentSlideData = slides[activeSlide];

  return (
    <div className="relative">
      {/* Three full-height sections for vertical scrolling */}
      {slides.map((slide, index) => (
        <section 
          key={index}
          id={index === 0 ? "home" : `hero-slide-${index + 1}`}
          className="h-screen relative overflow-hidden"
        >
          {/* Parallax Background - moves with scroll with animated blur */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${slide.backgroundGradient} dark:bg-gradient-to-br dark:${slide.darkBackgroundGradient} transition-all duration-1000`}
            style={{
              transform: `translateY(${backgroundOffset}px)`,
              height: '120%',
              top: '-10%',
              filter: `blur(${index === activeSlide ? heroAnims.backgroundBlur : 0}px)`
            }}
          />
          
          {/* Dynamic color overlay based on scroll */}
          {index === activeSlide && (
            <div 
              className="absolute inset-0 opacity-10 transition-opacity duration-500"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}33, transparent 70%)`,
                opacity: stickyHero.isSticky ? 0.15 : 0
              }}
            />
          )}
          
          {/* Animated Floating Elements with Parallax */}
          <div 
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl float-animation"
            style={{ 
              transform: `translateY(${backgroundOffset * 0.3}px) scale(${index === activeSlide ? 1 + (heroAnims.buttonScale - 1) * 0.5 : 1})`,
              animationDelay: `${index * 0.5}s`
            }}
          />
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl float-animation-slow"
            style={{ 
              transform: `translateY(${backgroundOffset * -0.2}px)`,
              animationDelay: `${index * 0.7}s`
            }}
          />
          
          {/* Static Content - doesn't move with scroll */}
          <div 
            className={`absolute inset-0 flex items-center z-10 transition-opacity duration-500 ${
              activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div 
                  className="text-center lg:text-left order-2 lg:order-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={activeSlide === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className={`inline-block px-3 py-2 xs:px-4 ${slide.accentTheme === 'primary' ? 'bg-primary-accent-light text-primary-custom' : 'bg-secondary-accent-light text-secondary-custom'} rounded-full text-xs xs:text-sm font-semibold mb-4`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {slide.subtitle}
                  </motion.div>
                  <motion.h1 
                    className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-responsive leading-tight mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {slide.title.split(' ').map((word, wordIndex) => {
                      if (word === 'Future' || word === 'AI-Powered' || word === 'Scalable') {
                        return (
                          <span 
                            key={wordIndex} 
                            className="gradient-text inline-block"
                            style={{
                              transform: index === activeSlide ? `scale(${heroAnims.buttonScale})` : 'scale(1)',
                              transition: 'transform 0.3s ease-out'
                            }}
                          >
                            {index === activeSlide && wordIndex === 0 ? heroAnims.headlineWords[heroAnims.wordIndex] : word}{' '}
                          </span>
                        );
                      }
                      return word + ' ';
                    })}
                  </motion.h1>
                  
                  {/* Scroll-revealed text (visible on active slide only) */}
                  {index === activeSlide && (
                    <motion.div 
                      className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-4 overflow-hidden h-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <div className="font-mono">{revealedText}<span className="animate-pulse">|</span></div>
                    </motion.div>
                  )}
                  <motion.p 
                    className="text-base xs:text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    style={{
                      transform: index === activeSlide ? `scale(${heroAnims.buttonScale})` : 'scale(1)'
                    }}
                  >
                    <button 
                      onClick={scrollToContact}
                      className="btn-solid text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 w-full xs:w-auto relative overflow-hidden"
                      style={{
                        background: index === activeSlide ? 
                          `linear-gradient(90deg, var(--color-primary) ${stickyHero.progress * 100}%, var(--color-primary-light) ${stickyHero.progress * 100 + 50}%)` :
                          undefined
                      }}
                    >
                      Get Started
                      {index === activeSlide && (
                        <span 
                          className="absolute inset-0 bg-white/20" 
                          style={{ 
                            transform: `translateX(${(stickyHero.progress - 1) * 100}%)`,
                            opacity: 0.2
                          }}
                        />
                      )}
                    </button>
                    <button 
                      className="btn-outline text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 w-full xs:w-auto"
                    >
                      <i 
                        className="fas fa-play mr-2"
                        style={{
                          transform: index === activeSlide ? `rotate(${stickyHero.progress * 360}deg)` : 'rotate(0deg)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      />
                      Watch Demo
                    </button>
                  </motion.div>
                  <motion.div 
                    className="grid grid-cols-3 gap-4 xs:gap-6 lg:gap-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    style={{
                      opacity: index === activeSlide ? heroAnims.statsOpacity : 1,
                      transform: index === activeSlide ? `translateY(${stickyHero.progress * 50}px)` : 'translateY(0)'
                    }}
                  >
                    {slide.stats.map((stat, statIndex) => (
                      <div 
                        key={statIndex}
                        className="relative overflow-hidden"
                        style={{
                          transform: index === activeSlide ? 
                            `scale(${1 + (statIndex * 0.05) * Math.sin(stickyHero.progress * Math.PI)})` : 
                            'scale(1)'
                        }}
                      >
                        <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-responsive">
                          {/* Use CountUp animation effect when active */}
                          {stat.number}
                          {index === activeSlide && statIndex === 0 && (
                            <span 
                              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" 
                              style={{ 
                                width: `${stickyHero.progress * 100}%`,
                                opacity: stickyHero.progress
                              }}
                            />
                          )}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-xs xs:text-sm font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="relative order-1 lg:order-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={activeSlide === index ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transform rotate-3"
                    animate={{ 
                      y: activeSlide === index ? [0, -10, 0] : 0,
                      rotate: activeSlide === index ? [3, 4, 3] : 3
                    }}
                    transition={{
                      duration: 6,
                      repeat: activeSlide === index ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    style={{
                      transform: index === activeSlide ? 
                        `rotate(3deg) translateY(${stickyHero.progress * -30}px) scale(${1 + stickyHero.progress * 0.1})` : 
                        'rotate(3deg)',
                      opacity: index === activeSlide ? 
                        Math.max(1 - stickyHero.progress * 0.5, 0.5) : 
                        1,
                      clipPath: index === activeSlide ? 
                        `circle(${maskSize}% at center)` : 
                        'circle(100% at center)'
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-slate-400 dark:text-slate-500 text-sm">dashboard.izyane.com</div>
                      </div>
                      <div className={`h-32 rounded-lg flex items-center justify-center ${slide.accentTheme === 'primary' ? 'hero-accent-primary' : 'hero-accent-secondary'}`}>
                        <i className={`${slide.mockupIcon} text-4xl ${slide.accentTheme === 'primary' ? 'text-primary-custom' : 'text-secondary-custom'}`}></i>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <i className="fas fa-users text-slate-400 dark:text-slate-500"></i>
                        </div>
                        <div className="h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <i className="fas fa-server text-slate-400 dark:text-slate-500"></i>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Scroll Progress Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSlide 
                ? slide.accentTheme === 'primary' ? 'bg-primary-custom scale-125' : 'bg-secondary-custom scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            style={{
              transform: index === activeSlide ? 
                `scale(${1.25 + Math.sin(stickyHero.progress * Math.PI) * 0.25})` : 
                'scale(1)',
              boxShadow: index === activeSlide ? 
                `0 0 ${10 + stickyHero.progress * 8}px ${slide.accentTheme === 'primary' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'}` :
                'none'
            }}
          />
        ))}
      </div>
      
      {/* Scroll Hint - fades out as user scrolls */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-center"
        style={{
          opacity: Math.max(1 - stickyHero.progress * 3, 0),
          transform: `translate(-50%, ${stickyHero.progress * 30}px)`,
          pointerEvents: stickyHero.progress > 0.3 ? 'none' : 'auto'
        }}
      >
        <div className="text-slate-600 dark:text-slate-300 text-sm mb-2">Scroll to explore</div>
        <div className="relative h-6">
          <i 
            className={`fas fa-chevron-down text-slate-600 dark:text-slate-300 absolute left-1/2 transform -translate-x-1/2 animate-bounce`}
            style={{
              animationDuration: '1s',
              top: `${Math.sin(Date.now() / 500) * 3}px`
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}