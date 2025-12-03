import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
}: UseAnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animate counter when in view
  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);
    
    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const updateCount = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      if (now >= endTime) {
        setCount(end);
        return;
      }

      const progress = (now - startTime) / duration;
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * end));
      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [isInView, end, duration, delay, hasAnimated]);

  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`;

  return { ref, displayValue, count };
}

// Component wrapper for easier use
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const { ref, displayValue } = useAnimatedCounter({
    end,
    duration,
    delay,
    suffix,
    prefix,
  });

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
}

