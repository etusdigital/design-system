import React, { useEffect } from 'react';
import { ConfirmProvider } from '../components/Confirm/Confirm';
import { ToastProvider } from '../components/Toast/Toast';

const FONT_LINKS = [
  'https://fonts.googleapis.com/css?family=Inter&display=swap',
  'https://fonts.googleapis.com/css?family=Poppins&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
];

function useInjectFonts() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    FONT_LINKS.forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.insertBefore(link, document.head.firstChild);
    });
  }, []);
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  useInjectFonts();

  return (
    <ConfirmProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ConfirmProvider>
  );
}
