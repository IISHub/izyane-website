import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  quality = 75,
  priority = false,
  sizes = "100vw",
  onLoad,
  onError,
  placeholder,
  blurDataURL
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>("");

  // Generate optimized image URLs
  const generateImageUrl = (originalSrc: string, format: string = "webp") => {
    // For external URLs (Unsplash, etc.), append format and quality parameters
    if (originalSrc.includes("unsplash.com")) {
      const url = new URL(originalSrc);
      url.searchParams.set("fm", format);
      url.searchParams.set("q", quality.toString());
      if (width) url.searchParams.set("w", width.toString());
      if (height) url.searchParams.set("h", height.toString());
      return url.toString();
    }
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [priority]);

  // Determine best image format and set source
  useEffect(() => {
    if (!isInView) return;

    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    const supportsAVIF = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    };

    // Determine best format
    let format = "jpg";
    if (supportsAVIF()) {
      format = "avif";
    } else if (supportsWebP()) {
      format = "webp";
    }

    setCurrentSrc(generateImageUrl(src, format));
  }, [isInView, src, quality, width, height]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original format
    setCurrentSrc(src);
    onError?.();
  };

  const placeholderSrc = placeholder || blurDataURL || 
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Blur background */}
      <motion.div
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
        animate={{
          opacity: isLoaded ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {(placeholder || blurDataURL) && (
          <img
            src={placeholderSrc}
            alt=""
            className="w-full h-full object-cover filter blur-sm scale-110"
            aria-hidden="true"
          />
        )}
        
        {/* Loading skeleton */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </motion.div>

      {/* Main image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Progressive loading hook
export function useProgressiveImage(src: string) {
  const [currentSrc, setCurrentSrc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    img.src = src;
  }, [src]);

  return { src: currentSrc, loading };
}
