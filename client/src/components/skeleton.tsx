import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text" | "avatar" | "button";
  lines?: number;
  animate?: boolean;
}

const skeletonVariants = {
  default: "bg-gray-200 dark:bg-gray-700 rounded",
  card: "bg-gray-200 dark:bg-gray-700 rounded-lg",
  text: "bg-gray-200 dark:bg-gray-700 rounded h-4",
  avatar: "bg-gray-200 dark:bg-gray-700 rounded-full",
  button: "bg-gray-200 dark:bg-gray-700 rounded-md h-10"
};

export function Skeleton({ 
  className, 
  variant = "default", 
  lines = 1, 
  animate = true,
  ...props 
}: SkeletonProps) {
  const baseClasses = skeletonVariants[variant];
  
  const shimmerAnimation = animate ? {
    background: [
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
    ],
    backgroundPosition: ["-200px 0", "200px 0", "200px 0"]
  } : {};

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(baseClasses, className)}
            style={{ 
              width: index === lines - 1 ? `${60 + Math.random() * 30}%` : "100%" 
            }}
            animate={animate ? shimmerAnimation : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(baseClasses, className)}
      animate={animate ? shimmerAnimation : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      {...props}
    />
  );
}

// Specialized skeleton components
export function CardSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <Skeleton variant="avatar" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
      </div>
      <Skeleton variant="button" className="w-full" />
    </div>
  );
}

export function PostSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="avatar" className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-32" />
          <Skeleton variant="text" className="h-3 w-24" />
        </div>
      </div>
      <Skeleton variant="card" className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  );
}

export function TableSkeleton({ 
  rows = 5, 
  columns = 4, 
  className, 
  ...props 
}: SkeletonProps & { rows?: number; columns?: number }) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton 
            key={`header-${index}`} 
            variant="text" 
            className="h-6 flex-1" 
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`cell-${rowIndex}-${colIndex}`} 
              variant="text" 
              className="h-4 flex-1" 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Loading wrapper component
interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
  className?: string;
}

export function LoadingWrapper({ 
  loading, 
  children, 
  skeleton, 
  className 
}: LoadingWrapperProps) {
  return (
    <motion.div 
      className={className}
      animate={{ opacity: loading ? 0.7 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {loading ? skeleton : children}
    </motion.div>
  );
}
