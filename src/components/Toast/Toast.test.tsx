import React, { useRef } from 'react';
import { render, screen, act, renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';
import type { ToastOptions } from './Toast';

// Mock createPortal to render inline during tests
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Polyfill RAF/cAF at module level — jsdom does not provide them
// and vi.useRealTimers() removes them from beforeEach assignments.
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(() => cb(0), 0) as unknown as number;
}
if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function TestConsumer({ options }: { options?: Partial<ToastOptions> }) {
  const { toast } = useToast();
  return (
    <button
      onClick={() =>
        toast({
          title: 'Test',
          message: 'Hello',
          top: true,
          right: true,
          ...options,
        })
      }
    >
      Show Toast
    </button>
  );
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ToastProvider / useToast', () => {
  it('throws when useToast is used outside provider', () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used inside ToastProvider'
    );
  });

  it('shows a toast when toast() is called', () => {
    renderWithProvider(<TestConsumer />);
    const button = screen.getByText('Show Toast');

    act(() => {
      fireEvent.click(button);
    });

    // Advance RAF so useTransition triggers isActive
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('auto-dismisses after 5000ms when timeout is specified', () => {
    renderWithProvider(<TestConsumer options={{ timeout: 5000 }} />);

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText('Test')).toBeInTheDocument();

    // Advance to auto-dismiss timer (triggers HIDE → visible:false)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Advance 600ms for REMOVE dispatch + useTransition unmount
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('does not auto-dismiss with timeout=0', () => {
    renderWithProvider(<TestConsumer options={{ timeout: 0 }} />);

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('does not auto-dismiss with timeout=null', () => {
    renderWithProvider(<TestConsumer options={{ timeout: null }} />);

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('close() removes the toast manually', () => {
    let closeRef: (() => void) | undefined;

    function TestCloseConsumer() {
      const { toast } = useToast();
      const ref = useRef<{ id: string; close: () => void } | null>(null);
      return (
        <>
          <button
            onClick={() => {
              ref.current = toast({ title: 'Closeable', top: true, right: true });
              closeRef = ref.current.close;
            }}
          >
            Show
          </button>
        </>
      );
    }

    render(
      <ToastProvider>
        <TestCloseConsumer />
      </ToastProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Show'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText('Closeable')).toBeInTheDocument();

    act(() => {
      closeRef?.();
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText('Closeable')).not.toBeInTheDocument();
  });

  it('renders toast in the correct corner container', () => {
    renderWithProvider(
      <TestConsumer options={{ top: true, right: true, title: 'TopRight' }} />
    );

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const toastEl = screen.getByText('TopRight');
    const container = toastEl.closest('.toast-container');
    expect(container).toHaveClass('top');
    expect(container).toHaveClass('right');
  });

  it('renders toast in bottom-left corner when bottom+left specified', () => {
    function BottomLeftConsumer() {
      const { toast } = useToast();
      return (
        <button
          onClick={() =>
            toast({ title: 'BottomLeft', message: 'BL', bottom: true, left: true })
          }
        >
          Show BL
        </button>
      );
    }

    render(
      <ToastProvider>
        <BottomLeftConsumer />
      </ToastProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Show BL'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const toastEl = screen.getByText('BottomLeft');
    const container = toastEl.closest('.toast-container');
    expect(container).toHaveClass('bottom');
    expect(container).toHaveClass('left');
  });

  it('renders action button when buttonLabel is provided', () => {
    const actionFn = vi.fn();
    renderWithProvider(
      <TestConsumer options={{ buttonLabel: 'Undo', action: actionFn }} />
    );

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('close icon dismisses the toast', () => {
    renderWithProvider(<TestConsumer />);

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'));
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText('Test')).toBeInTheDocument();

    // The close icon rendered by Alert's closable prop has text content 'close'
    const closeIcon = screen.getByText('close');
    act(() => {
      fireEvent.click(closeIcon);
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});
