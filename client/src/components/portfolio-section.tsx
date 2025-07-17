import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";

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
  challenges: string[];
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error loading portfolio data:', error));
  }, []);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "ai", name: "AI/ML" },
    { id: "blockchain", name: "Blockchain" }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Our Portfolio</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Showcasing our latest projects and innovations that have helped businesses transform and grow.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "btn-solid shadow-lg scale-105"
                  : "btn-outline"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  {project.featured && (
                    <span className="bg-primary-custom text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <button
                      className="btn-solid btn-sm bg-white/90 text-slate-900 hover:bg-white border-white/90"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </button>
                    <button
                      className="btn-outline btn-sm border-white/90 text-white hover:bg-white/10"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary-custom font-semibold text-sm">{project.client}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-responsive mb-3 group-hover:text-primary-custom transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{project.duration}</span>
                  <span>{project.teamSize}</span>
                </div>

                {project.results && project.results.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold text-responsive mb-2">Key Results:</h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {project.results.slice(0, 2).map((result, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-emerald-500 mr-1 mt-1">•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ExternalLink size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try selecting a different category to see more projects.</p>
          </div>
        )}
      </div>
    </section>
  );
}