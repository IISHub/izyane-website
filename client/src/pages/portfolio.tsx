import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  client: string;
  duration: string;
  teamSize: string;
  year: string;
  results: string[];
  features: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Load projects
    fetch('/data/portfolio.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        
        // Generate categories from projects
        const uniqueCategories = Array.from(new Set(data.map((project: Project) => project.category))) as string[];
        const categoryList: Category[] = [
          { id: "all", name: "All Projects" },
          ...uniqueCategories.map((cat: string) => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === 'web' ? ' Apps' : cat === 'mobile' ? ' Apps' : cat === 'ai' ? '/ML' : '')
          }))
        ];
        setCategories(categoryList);
      })
      .catch(error => console.error('Error loading portfolio data:', error));
  }, []);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-responsive mb-6">
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
                    ? "btn-solid shadow-lg"
                    : "btn-outline"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Gallery */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-white dark:bg-slate-700 rounded-2xl overflow-hidden card-hover animate-fadeInUp break-inside-avoid mb-6 group ${
                  project.featured ? "ring-2 ring-primary-custom/30" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      index % 4 === 0 ? "h-64" : 
                      index % 4 === 1 ? "h-48" : 
                      index % 4 === 2 ? "h-56" : "h-52"
                    }`}
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-custom text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="btn-solid btn-sm bg-white text-slate-900 hover:bg-slate-100 flex-1"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </button>
                      <button 
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="btn-outline btn-sm border-white text-white hover:bg-white hover:text-slate-900"
                      >
                        <Github className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-responsive line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{project.client}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {project.results && project.results.length > 0 && (
                    <div className="border-t border-slate-200 dark:border-slate-600 pt-3">
                      <p className="text-xs text-primary-custom font-medium">
                        🎯 {project.results[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fadeInUp">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Have a project in mind? Let's discuss how we can bring your vision to life.
            </p>
            <button className="btn-solid px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}