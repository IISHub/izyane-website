import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} rounded-xl flex items-center justify-center`}>
              <i className={`${service.icon} text-slate-800 dark:text-slate-200 text-2xl`}></i>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}