import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
  // optional legacy / theme fields
  gradientFrom?: string;
  gradientTo?: string;
  // new name used in the mock modal
  whatYouGet?: string[];
  // legacy fallback
  deliverables?: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

function FeaturesList({ features }: { features: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-responsive mb-3">Key Features</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnologiesList({ technologies }: { technologies: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-responsive mb-3">Technologies We Use</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <Badge key={index} variant="secondary" className="bg-primary-custom/10 text-primary-custom">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function WhatYouGetList({ items }: { items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-responsive mb-3">What You Get</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  const whatYouGet = service.whatYouGet ?? service.deliverables ?? [];
  const useGradient = service.gradientFrom && service.gradientTo;
  const features = service.features ?? [];
  const technologies = service.technologies ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${useGradient ? `bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo}` : 'bg-gray-900'}`}>
              <i className={`${service.icon} text-white text-2xl`} />
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
          <FeaturesList features={features} />

        </div>
      </DialogContent>
    </Dialog>
  );
}