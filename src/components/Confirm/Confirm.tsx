import React, { createContext, useContext, useRef, useState } from 'react';
import { Dialog } from '../Dialog/Dialog';
import { Button } from '../Button/Button';

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Context ───────────────────────────────────────────────────────────────────

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

// ── ConfirmProvider ───────────────────────────────────────────────────────────

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  function confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setState({
        title: options.title ?? '',
        message: options.message ?? '',
        acceptLabel: options.acceptLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
      });
    });
  }

  function accept() {
    resolverRef.current?.(true);
    resolverRef.current = null;
    setState(null);
  }

  function cancel() {
    resolverRef.current?.(false);
    resolverRef.current = null;
    setState(null);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Dialog value={state !== null} noOutsideClose className="confirm">
        {state && (
          <div className="flex flex-col p-xl gap-sm">
            {state.title && (
              <h2 className="font-bold text-lg text-neutral-foreground-high">{state.title}</h2>
            )}
            {state.message && (
              <p className="text-sm text-neutral-foreground-low">{state.message}</p>
            )}
            <div className="flex justify-end w-full gap-xs mt-sm">
              <Button variant="plain" onClick={cancel}>{state.cancelLabel}</Button>
              <Button onClick={accept}>{state.acceptLabel}</Button>
            </div>
          </div>
        )}
      </Dialog>
    </ConfirmContext.Provider>
  );
}

// ── useConfirm ────────────────────────────────────────────────────────────────

export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside ConfirmProvider');
  return ctx;
}
