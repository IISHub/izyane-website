import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "ai", name: "AI/ML" },
    { id: "blockchain", name: "Blockchain" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features real-time inventory, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Healthcare Management System",
      category: "web",
      description: "HIPAA-compliant healthcare management system with patient records, appointment scheduling, and telemedicine features.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Django", "PostgreSQL", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      category: "mobile",
      description: "Cross-platform mobile app for fitness tracking with workout plans, nutrition logging, and social features.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "AI Content Generator",
      category: "ai",
      description: "AI-powered content generation platform using GPT models for blog posts, social media content, and marketing copy.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      technologies: ["Next.js", "OpenAI API", "Prisma", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 5,
      title: "DeFi Trading Platform",
      category: "blockchain",
      description: "Decentralized finance platform for cryptocurrency trading with automated market making and yield farming.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      technologies: ["React", "Web3.js", "Solidity", "Ethereum"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Smart Home Dashboard",
      category: "mobile",
      description: "IoT dashboard for smart home automation with device control, energy monitoring, and security features.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop",
      technologies: ["Flutter", "Node.js", "MQTT", "InfluxDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom dark:text-white mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Discover our latest projects and see how we've helped businesses transform their digital presence with innovative solutions.
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary-custom text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-slate-50 dark:bg-slate-700 rounded-2xl overflow-hidden card-hover animate-fadeInUp ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        className="bg-white/90 text-slate-800 hover:bg-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 text-slate-800 border-white/90 hover:bg-white"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-secondary-custom dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="bg-primary-custom/10 text-primary-custom px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      className="bg-primary-custom text-white hover:bg-[hsl(221,83%,45%)] flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fadeInUp">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Have a project in mind? Let's discuss how we can bring your vision to life.
            </p>
            <Button className="bg-primary-custom text-white px-8 py-3 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}