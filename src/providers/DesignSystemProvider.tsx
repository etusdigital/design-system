import React from 'react';
import { ConfirmProvider } from '../components/Confirm/Confirm';
import { ToastProvider } from '../components/Toast/Toast';

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ConfirmProvider>
  );
}
