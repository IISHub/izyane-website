import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  ease?: string;
}

export function useParallax({ speed = 0.5, offset = 0, ease = 'linear' }: ParallaxOptions = {}) {
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = (scrolled + offset) * speed;
      setTransform(parallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return {
    transform: `translateY(${transform}px)`,
    translateY: transform
  };
}

export function useParallaxScale({ speed = 0.1, initialScale = 1 }: { speed?: number; initialScale?: number } = {}) {
  const [scale, setScale] = useState(initialScale);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const newScale = initialScale + (scrolled * speed * 0.001);
      setScale(Math.min(Math.max(newScale, 0.8), 1.5)); // Limit scale between 0.8 and 1.5
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, initialScale]);

  return {
    transform: `scale(${scale})`,
    scale
  };
}

export function useParallaxOpacity({ speed = 0.001, threshold = 300 }: { speed?: number; threshold?: number } = {}) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (scrolled > threshold) {
        const newOpacity = 1 - ((scrolled - threshold) * speed);
        setOpacity(Math.max(newOpacity, 0));
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, threshold]);

  return {
    opacity,
    style: { opacity }
  };
}

export function useScrollRotation({ speed = 0.1 }: { speed?: number } = {}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const newRotation = scrolled * speed;
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return {
    transform: `rotate(${rotation}deg)`,
    rotation
  };
}

export function useVerticalCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which slide should be active based on scroll position
      // Each slide takes up the full viewport height
      const slideProgress = scrollY / windowHeight;
      const newActiveSlide = Math.floor(slideProgress);
      setActiveSlide(Math.max(0, Math.min(newActiveSlide, 2))); // Assuming 3 slides max
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSlide };
}

export function useStaticContentParallax() {
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only move background, content stays fixed
      if (scrollY < windowHeight * 3) { // For 3 hero slides
        setBackgroundOffset(scrollY * 0.5); // Slower parallax for background
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { backgroundOffset };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = (scrolled / maxHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useScrollTextReveal({ 
  text = '', 
  threshold = 100, 
  speed = 1 
}: { 
  text: string; 
  threshold?: number; 
  speed?: number 
}) {
  const [revealedText, setRevealedText] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > threshold) {
        // Calculate how many characters to reveal based on scroll position
        const scrollDistance = scrolled - threshold;
        const charsToReveal = Math.min(Math.floor(scrollDistance * speed * 0.05), text.length);
        setRevealedText(text.substring(0, charsToReveal));
      } else {
        setRevealedText('');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [text, threshold, speed]);
  
  return { revealedText, progress: text.length > 0 ? revealedText.length / text.length : 0 };
}

export function useScrollColorTransition({
  startColor = '#ffffff',
  endColor = '#000000',
  startThreshold = 0,
  endThreshold = 500
}: {
  startColor?: string;
  endColor?: string;
  startThreshold?: number;
  endThreshold?: number;
}) {
  const [color, setColor] = useState(startColor);
  
  useEffect(() => {
    // Helper to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    // Start and end colors in RGB
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (scrolled <= startThreshold) {
        setColor(startColor);
      } else if (scrolled >= endThreshold) {
        setColor(endColor);
      } else {
        // Calculate interpolation factor
        const progress = (scrolled - startThreshold) / (endThreshold - startThreshold);
        
        // Interpolate between colors
        const r = Math.round(startRgb.r + progress * (endRgb.r - startRgb.r));
        const g = Math.round(startRgb.g + progress * (endRgb.g - startRgb.g));
        const b = Math.round(startRgb.b + progress * (endRgb.b - startRgb.b));
        
        setColor(`rgb(${r}, ${g}, ${b})`);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startColor, endColor, startThreshold, endThreshold]);
  
  return { color };
}

export function useScrollImageMask({
  startThreshold = 0,
  endThreshold = 500
}: {
  startThreshold?: number;
  endThreshold?: number;
}) {
  const [maskSize, setMaskSize] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (scrolled <= startThreshold) {
        setMaskSize(0);
      } else if (scrolled >= endThreshold) {
        setMaskSize(100);
      } else {
        // Calculate mask size (0-100%)
        const progress = (scrolled - startThreshold) / (endThreshold - startThreshold);
        setMaskSize(progress * 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startThreshold, endThreshold]);
  
  return { 
    maskSize,
    maskStyle: {
      clipPath: `circle(${maskSize}% at center)`
    }
  };
}

export function useHeroScrollAnimations() {
  // Track multiple animation states for hero components
  const [animations, setAnimations] = useState({
    headlineWords: [] as string[],
    wordIndex: 0,
    imageReveal: 0,
    buttonScale: 1,
    backgroundBlur: 0,
    statsOpacity: 1,
  });
  
  useEffect(() => {
    // Initial animation state
    setAnimations(prev => ({
      ...prev,
      headlineWords: ['Innovative', 'Intelligent', 'Scalable', 'Future-proof', 'Game-changing'],
    }));
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollProgress = scrollY / viewportHeight; // Normalized scroll within viewport
      
      // Calculate scroll-based animation values
      setAnimations(prev => ({
        ...prev,
        wordIndex: Math.min(Math.floor(scrollProgress * 3), prev.headlineWords.length - 1), // Change headline word 
        imageReveal: Math.min(scrollProgress * 120, 100), // Reveal image (0-100%)
        buttonScale: 1 + (Math.sin(scrollProgress * Math.PI) * 0.1), // Subtle button pulse
        backgroundBlur: Math.min(scrollProgress * 10, 5), // Increase background blur (0-5px)
        statsOpacity: Math.max(1 - (scrollProgress - 0.5) * 2, 0), // Fade out stats when scrolling down
      }));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return animations;
}

export function useStickyHeroEffect(sectionCount = 3) {
  const [stickyState, setStickyState] = useState({
    isSticky: false,
    activeSection: 0,
    progress: 0,
    contentOpacity: [1, 0, 0] // Opacity for each section content
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate if we're in the "sticky" area (first N viewports)
      const isInStickyRange = scrollY < viewportHeight * sectionCount;
      const sectionProgress = scrollY / viewportHeight;
      const activeSection = Math.floor(sectionProgress);
      
      // Calculate progress within the current section
      const progressInSection = sectionProgress - activeSection;
      
      // Calculate opacity for each section
      const opacityValues = Array(sectionCount).fill(0).map((_, index) => {
        if (index === activeSection) return 1 - progressInSection; // Current section fades out
        if (index === activeSection + 1) return progressInSection; // Next section fades in
        return 0; // Other sections are hidden
      });
      
      setStickyState({
        isSticky: isInStickyRange,
        activeSection: Math.min(activeSection, sectionCount - 1),
        progress: progressInSection,
        contentOpacity: opacityValues
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionCount]);
  
  return stickyState;
}
