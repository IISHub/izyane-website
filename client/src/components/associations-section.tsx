import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import { SiOracle } from "react-icons/si";
import {
  ShieldCheck,
  Building2,
  Lock,
  CheckCircle2,
  Clock,
  Award,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface AssociationItem {
  id: string;
  title: string;
  badge: string;
  badgeType: "success" | "brand" | "progress";
  subtitle: string;
  description: string;
  iconType: "boz" | "oracle" | "pci";
  points: string[];
  footerNote: string;
}

const associationsData: AssociationItem[] = [
  {
    id: "boz-license",
    title: "BoZ Payment License",
    badge: "Licensed & Regulated",
    badgeType: "success",
    subtitle: "Bank of Zambia (Central Bank)",
    description:
      "Licensed under the Bank of Zambia's National Payment Systems regulatory framework, authorizing iZyane to develop, deploy, and operate compliant electronic transaction processing and fintech infrastructure.",
    iconType: "boz",
    points: [
      "National Payment Systems (NPS) regulatory authorization",
      "Compliant transaction processing & settlement services",
      "Strict financial governance and institutional compliance",
    ],
    footerNote: "Regulatory Authority: Bank of Zambia",
  },
  {
    id: "oracle-registered",
    title: "Oracle Registered",
    badge: "Registered Partner",
    badgeType: "brand",
    subtitle: "Oracle Partner Network",
    description:
      "Officially registered with Oracle, collaborating across enterprise database systems and core banking architectures such as Oracle FLEXCUBE to deliver mission-critical, high-availability solutions.",
    iconType: "oracle",
    points: [
      "Registered member of the Oracle Partner Network",
      "Deep integration with Oracle FLEXCUBE core banking",
      "Enterprise-grade database reliability and cloud scalability",
    ],
    footerNote: "Ecosystem: Oracle Enterprise Systems",
  },
  {
    id: "pci-certification",
    title: "Currently Undergoing PCI Certification",
    badge: "Audit In Progress",
    badgeType: "progress",
    subtitle: "PCI Security Standards Council (PCI DSS)",
    description:
      "Currently undergoing comprehensive Payment Card Industry Data Security Standard (PCI DSS) certification to ensure top-tier cardholder data protection, cryptographic safeguards, and secure transaction workflows.",
    iconType: "pci",
    points: [
      "PCI DSS global security standards alignment",
      "Rigorous cardholder data protection & zero-trust protocols",
      "Continuous vulnerability scanning & compliance verification",
    ],
    footerNote: "Security Benchmark: PCI DSS Assessment",
  },
];

export default function AssociationsSection() {
  const bgParallax = useParallax({ speed: 0.08 });
  const decorationParallax = useParallax({ speed: -0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="associations"
      className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Decorative Blur Blobs */}
      <div
        className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-custom/10 dark:bg-primary-custom/15 rounded-full blur-3xl pointer-events-none"
        style={bgParallax}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        style={decorationParallax}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-custom/10 text-primary-custom rounded-full text-sm font-semibold mb-4 border border-primary-custom/20">
              <Award className="w-4 h-4" />
              <span>Trust, Compliance & Alliances</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-responsive mb-4 tracking-tight">
              Associations
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We hold our platforms to the highest regulatory, technology, and
              security benchmarks, ensuring robust trust and peace of mind for
              financial institutions.
            </p>
          </motion.div>
        </div>

        {/* 3 Associations Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {associationsData.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                {/* Top Glowing Gradient Accent on Hover */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-primary-custom/50 group-hover:via-primary-custom to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Row: Icon + Status Pill */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    {/* Icon Container */}
                    <div className="relative">
                      {item.iconType === "boz" && (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/15 via-emerald-600/10 to-teal-500/10 dark:from-emerald-500/25 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <Building2 className="w-8 h-8" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}

                      {item.iconType === "oracle" && (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/15 via-rose-600/10 to-orange-500/10 dark:from-red-500/25 dark:to-orange-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <SiOracle className="w-8 h-8" />
                        </div>
                      )}

                      {item.iconType === "pci" && (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/15 via-blue-600/10 to-indigo-500/10 dark:from-amber-500/25 dark:to-blue-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <Lock className="w-8 h-8 text-primary-custom dark:text-sky-400" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div>
                      {item.badgeType === "success" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {item.badge}
                        </span>
                      )}

                      {item.badgeType === "brand" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-700 dark:text-red-300">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          {item.badge}
                        </span>
                      )}

                      {item.badgeType === "progress" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 ">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                          </span>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order numbering tag */}
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary-custom/10 text-primary-custom flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </span>
                    <span>{item.subtitle}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-responsive mb-3 group-hover:text-primary-custom transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Key Points Bullet List */}
                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-slate-200/70 dark:border-slate-700/60">
                    {item.points.map((point, pIndex) => (
                      <li
                        key={pIndex}
                        className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Note */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium">{item.footerNote}</span>
                  <span className="text-primary-custom opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
