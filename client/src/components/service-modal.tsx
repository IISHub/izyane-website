import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, CheckCircle } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: string;
    title: string;
    description: string;
    features: string[];
    gradientFrom: string;
    gradientTo: string;
  } | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  const serviceDetails = {
    "Web Development": {
      fullDescription: "Our web development team creates modern, responsive websites and web applications using the latest technologies. We focus on performance, accessibility, and user experience to deliver solutions that drive business growth.",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"],
      pricing: "Starting at $5,000",
      timeline: "4-12 weeks",
      deliverables: [
        "Responsive website design",
        "Custom backend development",
        "Content management system",
        "SEO optimization",
        "Performance monitoring",
        "3 months support"
      ],
      portfolio: [
        { name: "E-commerce Platform", tech: "React + Node.js", url: "#" },
        { name: "SaaS Dashboard", tech: "Next.js + PostgreSQL", url: "#" },
        { name: "Corporate Website", tech: "React + CMS", url: "#" }
      ]
    },
    "Mobile Development": {
      fullDescription: "Build native iOS and Android applications or cross-platform solutions that provide seamless user experiences across all devices. Our mobile apps are designed for performance, security, and scalability.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      pricing: "Starting at $8,000",
      timeline: "6-16 weeks",
      deliverables: [
        "Native mobile applications",
        "Cross-platform compatibility",
        "App store deployment",
        "Push notifications",
        "Analytics integration",
        "6 months support"
      ],
      portfolio: [
        { name: "Fitness Tracking App", tech: "React Native", url: "#" },
        { name: "Food Delivery App", tech: "Flutter", url: "#" },
        { name: "Social Media App", tech: "Native iOS/Android", url: "#" }
      ]
    },
    "Cloud Solutions": {
      fullDescription: "Migrate to the cloud or build cloud-native applications with our comprehensive cloud services. We help you leverage AWS, Azure, and Google Cloud to improve scalability, reliability, and cost-effectiveness.",
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
      pricing: "Starting at $3,000",
      timeline: "2-8 weeks",
      deliverables: [
        "Cloud architecture design",
        "Migration strategy",
        "Infrastructure as code",
        "Monitoring and logging",
        "Security implementation",
        "Ongoing maintenance"
      ],
      portfolio: [
        { name: "Enterprise Migration", tech: "AWS + Kubernetes", url: "#" },
        { name: "Microservices Platform", tech: "Azure + Docker", url: "#" },
        { name: "Data Pipeline", tech: "Google Cloud", url: "#" }
      ]
    },
    "AI & Machine Learning": {
      fullDescription: "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent solutions that give you a competitive advantage.",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLflow"],
      pricing: "Starting at $10,000",
      timeline: "8-20 weeks",
      deliverables: [
        "Custom AI models",
        "Data preprocessing pipeline",
        "Model training and validation",
        "API integration",
        "Performance monitoring",
        "Model maintenance"
      ],
      portfolio: [
        { name: "Predictive Analytics", tech: "Python + TensorFlow", url: "#" },
        { name: "NLP Chatbot", tech: "OpenAI + FastAPI", url: "#" },
        { name: "Computer Vision", tech: "PyTorch + Flask", url: "#" }
      ]
    },
    "UI/UX Design": {
      fullDescription: "Create beautiful, intuitive user interfaces and exceptional user experiences that delight your customers and drive engagement. Our design process is user-centered and data-driven.",
      technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision", "Miro"],
      pricing: "Starting at $2,500",
      timeline: "3-8 weeks",
      deliverables: [
        "User research and personas",
        "Wireframes and prototypes",
        "Visual design system",
        "Interactive prototypes",
        "Usability testing",
        "Design handoff"
      ],
      portfolio: [
        { name: "SaaS Dashboard Redesign", tech: "Figma + User Testing", url: "#" },
        { name: "Mobile App UI", tech: "Figma + Principle", url: "#" },
        { name: "Brand Identity", tech: "Adobe Creative Suite", url: "#" }
      ]
    },
    "Consulting": {
      fullDescription: "Get strategic technology advice and guidance from our experienced consultants. We help you make informed decisions about technology investments, architecture, and digital transformation.",
      technologies: ["Architecture Review", "Tech Strategy", "Code Audit", "Performance Analysis"],
      pricing: "Starting at $1,500",
      timeline: "1-4 weeks",
      deliverables: [
        "Technology assessment",
        "Strategic recommendations",
        "Implementation roadmap",
        "Risk analysis",
        "Cost optimization plan",
        "Follow-up sessions"
      ],
      portfolio: [
        { name: "Digital Transformation", tech: "Strategy + Roadmap", url: "#" },
        { name: "Architecture Review", tech: "Code Audit + Optimization", url: "#" },
        { name: "Tech Stack Migration", tech: "Assessment + Planning", url: "#" }
      ]
    }
  };

  const details = serviceDetails[service.title as keyof typeof serviceDetails];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} rounded-xl flex items-center justify-center`}>
                <i className={`${service.icon} text-white text-xl`}></i>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-secondary-custom dark:text-white">
                  {service.title}
                </DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-300 mt-1">
                  {service.description}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-custom dark:text-white mb-3">Overview</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {details.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-custom dark:text-white mb-3">Technologies We Use</h3>
            <div className="flex flex-wrap gap-2">
              {details.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-custom dark:text-white mb-2">Pricing</h4>
              <p className="text-lg font-bold text-primary-custom">{details.pricing}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-custom dark:text-white mb-2">Timeline</h4>
              <p className="text-lg font-bold text-primary-custom">{details.timeline}</p>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-custom dark:text-white mb-3">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {details.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Examples */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-custom dark:text-white mb-3">Recent Projects</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {details.portfolio.map((project, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium text-secondary-custom dark:text-white mb-1">{project.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{project.tech}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Project
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary-custom/10 to-accent-custom/10 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-secondary-custom dark:text-white mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Let's discuss your project and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-primary-custom text-white hover:bg-primary-custom/90">
                Get Free Consultation
              </Button>
              <Button variant="outline">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}