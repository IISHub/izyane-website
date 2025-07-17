import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Careers() {
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

  const jobs = [
    {
      title: "Senior Full Stack Developer",
      type: "Full-time",
      typeColor: "primary-custom",
      description: "Join our engineering team to build scalable web applications using React, Node.js, and cloud technologies. You'll work on exciting projects that impact millions of users worldwide.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
      location: "San Francisco, CA / Remote",
      experience: "5+ years",
      department: "Engineering"
    },
    {
      title: "UX/UI Designer",
      type: "Full-time",
      typeColor: "accent-custom",
      description: "Create beautiful and intuitive user experiences for our suite of products used by millions worldwide. Work closely with product managers and engineers to bring designs to life.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Adobe Creative Suite"],
      location: "New York, NY / Remote",
      experience: "3+ years",
      department: "Design"
    },
    {
      title: "DevOps Engineer",
      type: "Contract",
      typeColor: "emerald-700",
      description: "Build and maintain our cloud infrastructure to ensure scalability, security, and reliability. Implement CI/CD pipelines and monitor system performance.",
      skills: ["Docker", "Kubernetes", "CI/CD", "Terraform", "AWS", "Monitoring"],
      location: "Austin, TX / Remote",
      experience: "4+ years",
      department: "Infrastructure"
    },
    {
      title: "Product Manager",
      type: "Full-time",
      typeColor: "blue-600",
      description: "Drive product strategy and execution for our core platform. Work with cross-functional teams to deliver features that delight our customers.",
      skills: ["Product Strategy", "Analytics", "Roadmapping", "Agile", "User Research"],
      location: "Seattle, WA / Remote",
      experience: "4+ years",
      department: "Product"
    },
    {
      title: "Marketing Specialist",
      type: "Full-time",
      typeColor: "purple-600",
      description: "Develop and execute marketing campaigns to grow our brand awareness and customer acquisition. Work on content creation, social media, and digital marketing.",
      skills: ["Digital Marketing", "Content Creation", "SEO", "Social Media", "Analytics"],
      location: "Los Angeles, CA / Remote",
      experience: "2+ years",
      department: "Marketing"
    },
    {
      title: "Data Scientist",
      type: "Full-time",
      typeColor: "indigo-600",
      description: "Analyze large datasets to extract insights and build predictive models. Work on machine learning projects that drive business decisions.",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics", "Data Visualization"],
      location: "Boston, MA / Remote",
      experience: "3+ years",
      department: "Data"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom leading-tight mb-6">
              Join Our <span className="gradient-text">Amazing</span> Team
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We're looking for passionate individuals who want to shape the future of technology. 
              Join us and grow your career while making a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="bg-primary-custom text-white px-8 py-4 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                View Open Positions
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:border-primary-custom hover:text-primary-custom transition-all duration-200 font-semibold text-lg"
              >
                <i className="fas fa-users mr-2"></i>Our Culture
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary-custom">150+</div>
                <div className="text-slate-600 text-sm font-medium">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom">25+</div>
                <div className="text-slate-600 text-sm font-medium">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom">4.8/5</div>
                <div className="text-slate-600 text-sm font-medium">Employee Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom">98%</div>
                <div className="text-slate-600 text-sm font-medium">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom mb-6">Why Join iZyane?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive, innovate, and grow together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${benefit.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-secondary-custom mb-4">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom mb-6">Open Positions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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