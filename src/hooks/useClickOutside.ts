import { useEffect, useRef } from 'react';

export function useClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void,
  enabled = true
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    function handleMouseDown(e: MouseEvent) {
      const isOutside = refs.every((ref) => {
        if (!ref.current) return true;
        const rect = ref.current.getBoundingClientRect();
        return (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top  || e.clientY > rect.bottom
        );
      });
      if (isOutside) callbackRef.current();
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps
}
