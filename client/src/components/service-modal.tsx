import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle } from "lucide-react";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  deliverables: string[];
  pricing: {
    basic: string;
    standard: string;
    enterprise: string;
  };
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-0 top-0 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} rounded-xl flex items-center justify-center`}>
              <i className={`${service.icon} text-white text-2xl`}></i>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-responsive">
                {service.title}
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-300 mt-2">
                {service.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Detailed Description */}
          <div>
            <h3 className="text-lg font-semibold text-responsive mb-3">About This Service</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-responsive mb-3">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-responsive mb-3">Technologies We Use</h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-primary-custom/10 text-primary-custom">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-lg font-semibold text-responsive mb-3">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-responsive mb-3">Pricing Options</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-responsive mb-2">Basic</h4>
                <p className="text-2xl font-bold text-primary-custom mb-2">{service.pricing.basic}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Perfect for small projects and startups</p>
              </div>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 ring-2 ring-primary-custom relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-custom text-white px-3 py-1 rounded-full text-xs font-semibold">Popular</span>
                </div>
                <h4 className="font-semibold text-responsive mb-2">Standard</h4>
                <p className="text-2xl font-bold text-primary-custom mb-2">{service.pricing.standard}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Ideal for growing businesses</p>
              </div>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-responsive mb-2">Enterprise</h4>
                <p className="text-2xl font-bold text-primary-custom mb-2">{service.pricing.enterprise}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Tailored solutions for large organizations</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button className="btn-solid flex-1">
              Get Started
            </button>
            <button className="btn-outline flex-1">
              Schedule Consultation
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}