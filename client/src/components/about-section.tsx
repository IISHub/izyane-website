import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useParallax, useScrollRotation } from "@/hooks/use-parallax";

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { ref, display: `${count}${suffix}` };
}

// Stat Card Component with Animation
function StatCard({ number, suffix, label, duration = 2000, delay = 0 }: { 
  number: number; 
  suffix: string; 
  label: string; 
  duration?: number;
  delay?: number;
}) {
  const { ref, display } = useAnimatedCounter(number, duration, suffix);
  
  return (
    <motion.div 
      ref={ref}
      className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      viewport={{ once: true }}
    >
      <div className="text-2xl sm:text-3xl font-bold text-primary-custom">
        {display}
      </div>
      <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.15 });
  const iconRotation = useScrollRotation({ speed: 0.05 });
  const decorationParallax = useParallax({ speed: -0.25 });

  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-full blur-3xl"
        style={backgroundParallax}
      />

      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-100/50 to-transparent dark:from-purple-900/20 rounded-full blur-3xl"
        style={decorationParallax}
      />

      {/* Rotating Icons */}
      <div
        className="absolute top-20 left-20 w-8 h-8 text-blue-400/30"
        style={iconRotation}
      >
        <i className="fas fa-cog text-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">
            Your Partner for Software Innovation
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            At iZyane we are passionate about creating impact as well as driving
            profitable businesses through our values.
          </p>
        </motion.div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12 bg-transparent border-b border-slate-200 dark:border-slate-600 rounded-none h-auto p-0">
            <TabsTrigger
              value="about"
              className="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 data-[state=active]:border-primary-custom data-[state=active]:text-primary-custom border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 bg-transparent data-[state=active]:bg-transparent rounded-none data-[state=active]:shadow-none"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="vision"
              className="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 data-[state=active]:border-primary-custom data-[state=active]:text-primary-custom border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 bg-transparent data-[state=active]:bg-transparent rounded-none data-[state=active]:shadow-none"
            >
              Our Vision
            </TabsTrigger>
            <TabsTrigger
              value="mission"
              className="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 data-[state=active]:border-primary-custom data-[state=active]:text-primary-custom border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 bg-transparent data-[state=active]:bg-transparent rounded-none data-[state=active]:shadow-none"
            >
              Our Mission
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="/img/about.png?w=800&h=600"
                  alt="Team collaboration in modern office"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">
                  About Us
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  iZyane is a digital product driven company that offers
                  end-to-end solutions, from development, testing and
                  development, to guiding financial institutions on their
                  go-to-market (GTM) strategy. We understand that technology
                  alone does not yield the desired results without the right GTM
                  and the right change management strategy.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  We develop mobile and POS solutions for financial inclusion
                  and a cashless economy. The team has more than 2 decades of
                  combined digital transformation experience.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <StatCard number={2019} suffix="" label="Founded" duration={1500} />
                  <StatCard number={20} suffix="+" label="Team Members" duration={2000} delay={200} />
                  <StatCard number={10} suffix="+" label="Happy Clients" duration={1800} delay={400} />
                  <StatCard number={5} suffix="+" label="Years Experience" duration={2200} delay={600} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vision" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">
                  Our Vision
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  As a fintech company, we believe in leveraging innovative
                  technology to provide financial solutions that are accessible,
                  affordable, and secure for everyone. We are committed to
                  promoting financial inclusion and empowering underserved
                  communities with the tools they need to achieve financial
                  freedom. We also value transparency and accountability in all
                  our operations, and seek to build long-term relationships with
                  our clients based on trust and mutual respect.
                </p>
                <p className="text-lg text-slate-600 mb-8">
                  Our vision is to be a leader in the African fintech space,
                  driving economic growth and financial stability across the
                  continent.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary-custom"></i>
                    <span className="text-slate-600">
                      Global technology leadership
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary-custom"></i>
                    <span className="text-slate-600">
                      Innovation-driven solutions
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/img/vision.png?w=800&h=600"
                  alt="Vision - Future technology workspace"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mission" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="/img/mission.jpg"
                  alt="Mission - Team working together"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">
                  Our Mission
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  Exceeding customer expectation in everything we do and holding
                  ourselves accountable at every step.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-responsive mb-2">
                      Our Passion & Drive
                    </h4>
                    <p className="text-slate-600">
                      At iZyane we are passionate about creating impact as well
                      as driving profitable businesses.
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">
                      We are committed to promoting financial inclusion and empowering underserved communities with the tools they need to achieve financial freedom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
