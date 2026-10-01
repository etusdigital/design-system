import { useEffect, useRef, type RefObject } from 'react';
import { focusWhenReady } from '../utils';

export function useModalFocus(
  panel: RefObject<HTMLElement | null>,
  open: boolean
) {
  const opener = useRef<HTMLElement | null>(null);
  const openedPanel = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      const active = document.activeElement as HTMLElement | null;
      if (!panel.current?.contains(active)) opener.current = active;
      focusWhenReady(() => {
        openedPanel.current = panel.current;
        return panel.current;
      });
      return;
    }

    const lastOpener = opener.current;
    const lastPanel = openedPanel.current ?? panel.current;
    opener.current = null;
    openedPanel.current = null;
    if (!lastOpener) return;

    const frame = requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active !== document.body && !lastPanel?.contains(active)) return;
      lastOpener.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
}
