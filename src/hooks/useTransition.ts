import { useState, useEffect, useRef } from 'react';

export interface UseTransitionOptions {
  duration: number; // ms — must match the CSS transition duration
}

export function useTransition(
  open: boolean,
  options: UseTransitionOptions
): { isMounted: boolean; isActive: boolean } {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      // Mount immediately
      setIsMounted(true);
      // Trigger CSS transition on next animation frame
      const raf = requestAnimationFrame(() => {
        setIsActive(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      // Start leave transition: deactivate immediately, unmount after duration
      setIsActive(false);
      timerRef.current = setTimeout(() => {
        setIsMounted(false);
      }, options.duration);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [open, options.duration]);

  return { isMounted, isActive };
}
