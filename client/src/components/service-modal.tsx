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
        </div>
      </DialogContent>
    </Dialog>
  );
}