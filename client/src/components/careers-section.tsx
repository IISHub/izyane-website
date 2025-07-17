export default function CareersSection() {
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
    }
  ];

  const jobs = [
    {
      title: "Senior Full Stack Developer",
      type: "Full-time",
      typeColor: "primary-custom",
      description: "Join our engineering team to build scalable web applications using React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      location: "San Francisco, CA / Remote"
    },
    {
      title: "UX/UI Designer",
      type: "Full-time",
      typeColor: "accent-custom",
      description: "Create beautiful and intuitive user experiences for our suite of products used by millions worldwide.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      location: "New York, NY / Remote"
    },
    {
      title: "DevOps Engineer",
      type: "Contract",
      typeColor: "emerald-700",
      description: "Build and maintain our cloud infrastructure to ensure scalability, security, and reliability.",
      skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
      location: "Austin, TX / Remote"
    }
  ];

  return (
    <section id="careers" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Join Our Team</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're looking for passionate individuals who want to shape the future of technology. Join us and grow your career.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${benefit.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-responsive mb-4">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-responsive text-center mb-12">Open Positions</h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 card-hover">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-xl font-bold text-responsive">{job.title}</h4>
                      <span className={`bg-${job.typeColor}/10 text-${job.typeColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {job.type}
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
                    <div className="flex items-center text-slate-500 text-sm">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="btn-solid px-6 py-2 w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">Don't see a position that fits? We're always looking for talented people.</p>
            <button className="btn-outline px-8 py-3">
              Send Your Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
