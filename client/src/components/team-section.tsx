import { useState, useEffect } from "react";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

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
    email: string;
  };
  achievements: string[];
}

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => setTeamMembers(data))
      .catch(error => console.error('Error loading team data:', error));
  }, []);

  return (
    <section id="team" className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Meet Our Team</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Passionate professionals dedicated to delivering innovative solutions and exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="group relative bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 card-hover"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-primary-custom rounded-full flex items-center justify-center text-white hover:bg-primary-custom/80 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                        style={{ transitionDelay: '100ms' }}
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a 
                        href={member.social.twitter}
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                        style={{ transitionDelay: '150ms' }}
                      >
                        <Twitter size={16} />
                      </a>
                    )}
                    {member.social.github && (
                      <a 
                        href={member.social.github}
                        className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                        style={{ transitionDelay: '200ms' }}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      style={{ transitionDelay: '250ms' }}
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-responsive mb-1">{member.name}</h3>
                <p className="text-primary-custom font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                  {hoveredMember === member.id ? member.longBio : member.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-responsive mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary-custom/10 text-primary-custom rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {hoveredMember === member.id && (
                  <div className="space-y-3 text-left">
                    <div>
                      <h4 className="text-sm font-semibold text-responsive mb-1">Experience:</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{member.experience}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-responsive mb-1">Location:</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{member.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-responsive mb-1">Key Achievements:</h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-emerald-500 mr-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}