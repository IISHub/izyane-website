import { lazy, ComponentType, LazyExoticComponent, Suspense } from 'react';
import { Skeleton } from './ui/skeleton';

// Generic code splitting utility
export function createAsyncComponent<T = {}>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType
): LazyExoticComponent<ComponentType<T>> {
  const LazyComponent = lazy(importFunc);
  
  return LazyComponent;
}

// Higher-order component for lazy loading with custom fallbacks
export function withLazyLoading(
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  fallbackComponent?: ComponentType
) {
  const LazyComponent = lazy(importFunc);
  
  return function WrappedLazyComponent(props: any) {
    const FallbackComponent = fallbackComponent || DefaultSkeleton;
    
    return (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Default skeleton for lazy loaded components
function DefaultSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

// Pre-defined lazy components with custom skeletons
export const LazyComponents = {
  // Hero Section with image skeleton
  HeroSection: lazy(() => import('./hero-section-vertical')),
  
  // About Section with content skeleton
  AboutSection: lazy(() => import('./about-section')),
  
  // Services with grid skeleton
  ServicesSection: lazy(() => import('./services-section')),
  
  // Contact with form skeleton
  ContactSection: lazy(() => import('./contact-section')),
  
  // Team with cards skeleton
  TeamSection: lazy(() => import('./team-section')),
  
  // Portfolio with gallery skeleton
  PortfolioSection: lazy(() => import('./portfolio-section')),
};

// Section-specific skeletons
export const SectionSkeletons = {
  Hero: () => (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center space-y-6 max-w-4xl px-4">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <div className="grid grid-cols-3 gap-4 mt-12">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  ),
  
  About: () => (
    <div className="section-padding">
      <div className="container-custom space-y-12">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  
  Services: () => (
    <div className="section-padding">
      <div className="container-custom space-y-12">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  
  Contact: () => (
    <div className="section-padding">
      <div className="container-custom max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-1/3" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Intersection Observer based lazy loading for sections
export function useLazySectionLoading() {
  const observeSection = (
    elementId: string, 
    callback: () => void, 
    options = { threshold: 0.1 }
  ) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  };

  return { observeSection };
}
