import { useState, useEffect } from "react";
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
            A curated collection of our finest work showcasing creative excellence and technical innovation across various industries.
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

          {/* Projects Gallery - Photos Only */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="break-inside-avoid mb-4 group cursor-pointer portfolio-gallery"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      index % 6 === 0 ? "h-72" : 
                      index % 6 === 1 ? "h-48" : 
                      index % 6 === 2 ? "h-64" : 
                      index % 6 === 3 ? "h-56" : 
                      index % 6 === 4 ? "h-80" : "h-52"
                    }`}
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <div className="w-3 h-3 bg-primary-custom rounded-full shadow-lg"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-xs mt-1 drop-shadow">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fadeInUp">
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              Inspired by our work? Let's create something amazing together.
            </p>
            <button className="btn-solid px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}