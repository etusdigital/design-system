import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Alert } from '../Alert/Alert';
import { Button } from '../Button/Button';
import { useTransition } from '../../hooks/useTransition';
import './Toast.css';

type ToastType = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface ToastOptions {
  id?: string;
  title?: string;
  message?: string;
  type?: ToastType;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  timeout?: number | null;
  buttonLabel?: string;
  action?: () => void;
}

interface ToastItem extends Required<Omit<ToastOptions, 'timeout' | 'action'>> {
  visible: boolean;
  timeout: number | null | undefined;
  action: (() => void) | undefined;
}

type ToastAction =
  | { type: 'ADD'; toast: ToastItem }
  | { type: 'HIDE'; id: string }
  | { type: 'REMOVE'; id: string };

interface ToastContextValue {
  toast: (options: ToastOptions) => { id: string; close: () => void };
}

function toastReducer(state: ToastItem[], action: ToastAction): ToastItem[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'HIDE':
      return state.map((t) =>
        t.id === action.id ? { ...t, visible: false } : t
      );
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
  }
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastItemComponentProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

function ToastItemComponent({ toast, onClose }: ToastItemComponentProps) {
  const { isMounted, isActive } = useTransition(toast.visible, {
    duration: 600,
  });

  const slideClass = toast.right ? 'slide-right' : 'slide-left';

  if (!isMounted) return null;

  return (
    <div className={clsx('toast-wrapper', slideClass, isActive && 'active')}>
      <Alert
        title={toast.title}
        message={toast.message}
        type={toast.type}
        iconPosition="center"
        closable
        onClose={() => onClose(toast.id)}
        actions={
          toast.buttonLabel ? (
            <Button
              size="small"
              variant="secondary"
              color={toast.type}
              className="whitespace-nowrap"
              onClick={toast.action}
            >
              {toast.buttonLabel}
            </Button>
          ) : undefined
        }
        className="toast"
      />
    </div>
  );
}

const CONTAINERS = [
  { vertical: 'top' as const, horizontal: 'left' as const },
  { vertical: 'top' as const, horizontal: 'right' as const },
  { vertical: 'bottom' as const, horizontal: 'left' as const },
  { vertical: 'bottom' as const, horizontal: 'right' as const },
];

interface ToastContainersProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

function ToastContainers({ toasts, onClose }: ToastContainersProps) {
  return (
    <>
      {CONTAINERS.map((container) => (
        <div
          key={`${container.vertical}-${container.horizontal}`}
          className={clsx(
            'toast-container',
            container.vertical,
            container.horizontal
          )}
        >
          {toasts
            .filter(
              (toast) =>
                toast[container.vertical] && toast[container.horizontal]
            )
            .map((toast) => (
              <ToastItemComponent
                key={toast.id}
                toast={toast}
                onClose={onClose}
              />
            ))}
        </div>
      ))}
    </>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  const [mounted, setMounted] = useState(false);
  const timerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  useEffect(() => {
    setMounted(true);
    return () => {
      timerMapRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  function removeToast(id: string) {
    const timer = timerMapRef.current.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timerMapRef.current.delete(id);
    }

    dispatch({ type: 'HIDE', id });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 600);
  }

  function addToast(options: ToastOptions): { id: string; close: () => void } {
    const id = options.id ?? crypto.randomUUID();

    const toast: ToastItem = {
      id,
      title: '',
      message: '',
      type: 'danger',
      top: false,
      bottom: false,
      right: false,
      left: false,
      buttonLabel: '',
      action: undefined,
      ...options,
      visible: true,
      timeout: options.timeout,
    };

    dispatch({ type: 'ADD', toast });

    const timeout = options.timeout;
    if (timeout) {
      const timer = setTimeout(() => removeToast(id), timeout);
      timerMapRef.current.set(id, timer);
    }

    return { id, close: () => removeToast(id) };
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {mounted &&
        createPortal(
          <ToastContainers toasts={toasts} onClose={removeToast} />,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
