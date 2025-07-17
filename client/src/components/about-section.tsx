import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">About iZyane</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Founded in 2018, we've grown from a small team of passionate developers to a leading technology company serving clients worldwide.
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
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Team collaboration in modern office" 
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">Our Story</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  We started with a simple mission: to bridge the gap between complex technology and business needs. Today, we're proud to help companies of all sizes leverage technology to achieve their goals.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Our team combines deep technical expertise with business acumen to deliver solutions that not only work beautifully but drive real results.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-custom">2018</div>
                    <div className="text-slate-600 dark:text-slate-400">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-custom">50+</div>
                    <div className="text-slate-600 dark:text-slate-400">Team Members</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vision" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">Our Vision</h3>
                <p className="text-lg text-slate-600 mb-6">
                  To become the world's most trusted technology partner, empowering businesses to transform and thrive in the digital age through innovative solutions that make technology accessible and impactful.
                </p>
                <p className="text-lg text-slate-600 mb-8">
                  We envision a future where every business, regardless of size or industry, can harness the full potential of technology to achieve unprecedented growth and success.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary-custom"></i>
                    <span className="text-slate-600">Global technology leadership</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary-custom"></i>
                    <span className="text-slate-600">Innovation-driven solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary-custom"></i>
                    <span className="text-slate-600">Sustainable business growth</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Mission - Team working together" 
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-responsive mb-6">Our Mission</h3>
                <p className="text-lg text-slate-600 mb-6">
                  To deliver exceptional technology solutions that solve real-world problems, drive business growth, and create lasting value for our clients through innovation, expertise, and unwavering commitment to excellence.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-responsive mb-2">Client Success</h4>
                    <p className="text-slate-600">We measure our success by the success of our clients, ensuring every solution we deliver exceeds expectations.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-responsive mb-2">Innovation</h4>
                    <p className="text-slate-600">We stay at the forefront of technology trends to provide cutting-edge solutions that give our clients a competitive advantage.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-responsive mb-2">Excellence</h4>
                    <p className="text-slate-600">We maintain the highest standards in everything we do, from code quality to customer service.</p>
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
