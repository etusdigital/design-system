import { useState, useEffect, useRef } from 'react';

export interface UseTransitionOptions {
  duration: number;
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
      setIsMounted(true);
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
