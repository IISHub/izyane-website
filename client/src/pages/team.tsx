import { useState } from "react";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech. Former VP at Google, passionate about building solutions that make a difference.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      expertise: ["Strategy", "Leadership", "Product Vision"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@izyane.com"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      bio: "Full-stack architect and machine learning expert. Led engineering teams at Microsoft and Tesla. Loves solving complex problems.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      expertise: ["AI/ML", "Cloud Architecture", "Team Leadership"],
      social: {
        linkedin: "#",
        github: "#",
        email: "michael@izyane.com"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Creative director with a passion for user-centered design. Previously at Apple and Airbnb, creating beautiful and intuitive experiences.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      expertise: ["UX Design", "Design Systems", "User Research"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@izyane.com"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Lead Developer",
      bio: "Senior full-stack developer with expertise in React, Node.js, and cloud technologies. Open source contributor and tech mentor.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      expertise: ["React", "Node.js", "DevOps"],
      social: {
        github: "#",
        linkedin: "#",
        email: "david@izyane.com"
      }
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "VP of Marketing",
      bio: "Growth marketing specialist with a track record of scaling startups. Former marketing director at Slack and Shopify.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      expertise: ["Growth Marketing", "Content Strategy", "Brand Development"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "lisa@izyane.com"
      }
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Head of Operations",
      bio: "Operations expert focused on scaling processes and ensuring operational excellence. Former operations director at Uber.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      expertise: ["Operations", "Process Optimization", "Team Management"],
      social: {
        linkedin: "#",
        email: "james@izyane.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom dark:text-white mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Our diverse team of experts brings together decades of experience from leading tech companies to deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-center card-hover animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-custom/20 to-accent-custom/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-secondary-custom dark:text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary-custom font-semibold mb-4">
                  {member.role}
                </p>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-200"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-200"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-200"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-200"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 animate-fadeInUp">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-custom mb-2">50+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Years Combined Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-custom mb-2">15+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Tech Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-custom mb-2">100+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-custom mb-2">5+</div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">Countries Served</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fadeInUp">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Want to join our amazing team? Check out our open positions.
            </p>
            <a
              href="/careers"
              className="inline-block bg-primary-custom text-white px-8 py-3 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}