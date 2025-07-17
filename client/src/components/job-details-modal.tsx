import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Users } from "lucide-react";

interface Job {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  description: string;
  skills: string[];
  location: string;
  experience: string;
  department: string;
  minimumQualifications: string[];
  preferredQualifications: string[];
  aboutTheJob: string;
  responsibilities: string[];
}

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onApply: (job: Job) => void;
}

export default function JobDetailsModal({ isOpen, onClose, job, onApply }: JobDetailsModalProps) {
  if (!job) return null;

  const handleApplyClick = () => {
    onApply(job);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {job.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`bg-${job.typeColor}/10 text-${job.typeColor} hover:bg-${job.typeColor}/20`}>
                  {job.type}
                </Badge>
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {job.department}
                </Badge>
              </div>
            </div>
            <button 
              onClick={handleApplyClick}
              className="btn-solid px-8 py-3 text-lg"
            >
              Apply Now
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Building2 className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Users className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* About the Job */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              About the Job
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.aboutTheJob}
            </p>
          </section>

          {/* Responsibilities */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Responsibilities
            </h3>
            <ul className="space-y-3">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-custom rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Minimum Qualifications */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Minimum Qualifications
            </h3>
            <ul className="space-y-3">
              {job.minimumQualifications.map((qualification, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {qualification}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Preferred Qualifications */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Preferred Qualifications
            </h3>
            <ul className="space-y-3">
              {job.preferredQualifications.map((qualification, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {qualification}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Skills */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {/* Footer with Apply Button */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p>Ready to join our team?</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="btn-outline px-6"
            >
              Close
            </button>
            <button 
              onClick={handleApplyClick}
              className="btn-solid px-8"
            >
              Apply for this Position
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
