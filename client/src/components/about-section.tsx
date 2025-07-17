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
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom mb-6">About TechFlow</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Founded in 2018, we've grown from a small team of passionate developers to a leading technology company serving clients worldwide.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
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
      </div>
    </section>
  );
}
