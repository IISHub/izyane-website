import { useState, useEffect } from "react";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  image: string;
  expertise: string[];
  skills: string[];
  education: string[];
  experience: string;
  location: string;
  languages: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  achievements: string[];
}

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => setTeamMembers(data))
      .catch(error => console.error('Error loading team data:', error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-800 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-primary-accent-light text-primary-custom rounded-full text-sm font-semibold mb-4">
            The People Behind iZyane
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-responsive mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Our diverse team of experts brings together decades of experience from leading tech companies to deliver exceptional results.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-16 left-8 w-20 h-20 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-32 h-32 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-16 w-6 h-6 bg-primary-accent-medium rounded-full opacity-40"></div>
        <div className="absolute top-1/4 right-16 w-10 h-10 bg-primary-accent-medium rounded-full opacity-30"></div>
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
                
                <h3 className="text-xl font-bold text-responsive mb-2">
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