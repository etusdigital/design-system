import React, { createContext, useContext, useRef, useState } from 'react';
import { Dialog } from '../Dialog/Dialog';
import { Button } from '../Button/Button';

interface ConfirmOptions {
  title?: string;
  message?: string;
  acceptLabel?: string;
  cancelLabel?: string;
}

interface ConfirmState {
  title: string;
  message: string;
  acceptLabel: string;
  cancelLabel: string;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

const DIALOG_TRANSITION_MS = 500;

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const [open, setOpen] = useState(false);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);
  const cleanupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function confirm(options: ConfirmOptions): Promise<boolean> {
    if (cleanupTimer.current) {
      clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setState({
        title: options.title ?? '',
        message: options.message ?? '',
        acceptLabel: options.acceptLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
      });
      setOpen(true);
    });
  }

  function close(result: boolean) {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setOpen(false);
    cleanupTimer.current = setTimeout(() => {
      setState(null);
      cleanupTimer.current = null;
    }, DIALOG_TRANSITION_MS);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Dialog value={open} noOutsideClose className="confirm z-[1005]">
        {state && (
          <div className="flex flex-col p-xl gap-sm">
            {state.title && (
              <h2 className="font-bold text-lg text-neutral-foreground-high">{state.title}</h2>
            )}
            {state.message && (
              <p className="text-sm text-neutral-foreground-low">{state.message}</p>
            )}
            <div className="flex justify-end w-full gap-xs mt-sm">
              <Button variant="plain" onClick={() => close(false)}>{state.cancelLabel}</Button>
              <Button onClick={() => close(true)}>{state.acceptLabel}</Button>
            </div>
          </div>
        )}
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside ConfirmProvider');
  return ctx;
}
