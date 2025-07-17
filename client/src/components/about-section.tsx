import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutSection() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      bio: "10+ years in tech leadership",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "Expert in cloud architecture",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9e11174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Mike Chen",
      role: "Head of Design",
      bio: "Award-winning UX designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Lisa Rodriguez",
      role: "VP Operations",
      bio: "Scaling teams globally",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">About iZyane</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Founded in 2018, we've grown from a small team of passionate developers to a leading technology company serving clients worldwide.
          </p>
        </div>
        
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="vision">Our Vision</TabsTrigger>
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
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
                <h3 className="text-3xl font-bold text-secondary-custom mb-6">Our Story</h3>
                <p className="text-lg text-slate-600 mb-6">
                  We started with a simple mission: to bridge the gap between complex technology and business needs. Today, we're proud to help companies of all sizes leverage technology to achieve their goals.
                </p>
                <p className="text-lg text-slate-600 mb-8">
                  Our team combines deep technical expertise with business acumen to deliver solutions that not only work beautifully but drive real results.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-custom">2018</div>
                    <div className="text-slate-600">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-custom">50+</div>
                    <div className="text-slate-600">Team Members</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-secondary-custom text-center mb-12">Meet Our Team</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center group">
                    <img 
                      src={member.image} 
                      alt={`${member.name}, ${member.role}`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-200 object-cover"
                    />
                    <h4 className="text-lg font-semibold text-secondary-custom">{member.name}</h4>
                    <p className="text-primary-custom font-medium">{member.role}</p>
                    <p className="text-slate-600 text-sm mt-2">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vision" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-secondary-custom mb-6">Our Vision</h3>
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
                <h3 className="text-3xl font-bold text-secondary-custom mb-6">Our Mission</h3>
                <p className="text-lg text-slate-600 mb-6">
                  To deliver exceptional technology solutions that solve real-world problems, drive business growth, and create lasting value for our clients through innovation, expertise, and unwavering commitment to excellence.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-secondary-custom mb-2">Client Success</h4>
                    <p className="text-slate-600">We measure our success by the success of our clients, ensuring every solution we deliver exceeds expectations.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-secondary-custom mb-2">Innovation</h4>
                    <p className="text-slate-600">We stay at the forefront of technology trends to provide cutting-edge solutions that give our clients a competitive advantage.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-secondary-custom mb-2">Excellence</h4>
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
