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
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (open) {
      // Mount immediately
      setIsMounted(true);
      // Double RAF ensures browser paints the initial (off-screen) state
      // before adding .active, so the CSS transition actually animates
      const raf = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsActive(true);
        });
        cleanupRef.current = () => cancelAnimationFrame(raf2);
      });
      return () => {
        cancelAnimationFrame(raf);
        cleanupRef.current?.();
      };
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
