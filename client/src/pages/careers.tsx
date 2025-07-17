import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Job {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  description: string;
  skills: string[];
  location: string;
  experience: string;
  department: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/data/jobs.json')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error loading jobs:', error));
  }, []);
  const benefits = [
    {
      icon: "fas fa-rocket",
      title: "Innovation First",
      description: "Work on cutting-edge projects that push the boundaries of what's possible."
    },
    {
      icon: "fas fa-balance-scale",
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options to help you thrive."
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Learning & Growth",
      description: "Continuous learning opportunities and career development programs."
    },
    {
      icon: "fas fa-heart",
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs for you and your family."
    },
    {
      icon: "fas fa-plane",
      title: "Time Off",
      description: "Generous vacation policy and paid time off to recharge and explore."
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Competitive Pay",
      description: "Market-leading compensation packages with equity options and bonuses."
    }
  ];



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom dark:text-white leading-tight mb-6">
              Join Our <span className="gradient-text">Amazing</span> Team
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              We're looking for passionate individuals who want to shape the future of technology. 
              Join us and grow your career while making a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="bg-primary-custom text-white px-8 py-4 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                View Open Positions
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg hover:border-primary-custom hover:text-primary-custom dark:hover:border-primary-custom dark:hover:text-primary-custom transition-all duration-200 font-semibold text-lg"
              >
                <i className="fas fa-users mr-2"></i>Our Culture
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary-custom dark:text-white">150+</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom dark:text-white">25+</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom dark:text-white">4.8/5</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Employee Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom dark:text-white">98%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">Why Join iZyane?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive, innovate, and grow together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${benefit.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-secondary-custom dark:text-white mb-4">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">Open Positions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover opportunities to grow your career and make an impact with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 card-hover">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-secondary-custom">{job.title}</h3>
                      <span className={`bg-${job.typeColor}/10 text-${job.typeColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {job.type}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-briefcase mr-2"></i>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Button className="bg-primary-custom text-white px-6 py-2 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-colors duration-200 font-semibold w-full lg:w-auto">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">Don't see a position that fits? We're always looking for talented people.</p>
            <Button 
              variant="outline" 
              className="border-2 border-primary-custom text-primary-custom px-8 py-3 rounded-lg hover:bg-primary-custom hover:text-white transition-all duration-200 font-semibold"
            >
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}