import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTransition } from './useTransition';

describe('useTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Ensure RAF and cancelAnimationFrame are defined (jsdom may not have them)
    if (typeof globalThis.requestAnimationFrame === 'undefined') {
      globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0) as unknown as number;
    }
    if (typeof globalThis.cancelAnimationFrame === 'undefined') {
      globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
    }
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('isMounted and isActive are both false when open starts as false', () => {
      const { result } = renderHook(() =>
        useTransition(false, { duration: 300 })
      );
      expect(result.current.isMounted).toBe(false);
      expect(result.current.isActive).toBe(false);
    });
  });

  describe('opening', () => {
    it('isMounted becomes true immediately when open changes to true', () => {
      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) => useTransition(open, { duration: 300 }),
        { initialProps: { open: false } }
      );
      act(() => {
        rerender({ open: true });
      });
      expect(result.current.isMounted).toBe(true);
    });

    it('isActive becomes true after double RAF when open changes to true', () => {
      const rafCallbacks: FrameRequestCallback[] = [];
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
      vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});

      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) => useTransition(open, { duration: 300 }),
        { initialProps: { open: false } }
      );

      act(() => {
        rerender({ open: true });
      });
      // isMounted is true but isActive is still false before RAF fires
      expect(result.current.isMounted).toBe(true);
      expect(result.current.isActive).toBe(false);

      // Fire the first RAF — this schedules a second RAF (double-RAF pattern)
      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      // isActive still false — only the outer RAF fired, inner RAF pending
      expect(result.current.isActive).toBe(false);

      // Fire the second RAF — this sets isActive to true
      act(() => {
        const secondBatch = [...rafCallbacks].slice(1);
        secondBatch.forEach(cb => cb(0));
      });
      expect(result.current.isActive).toBe(true);
    });
  });

  describe('closing', () => {
    it('isActive becomes false immediately when open changes to false', () => {
      const rafCallbacks: FrameRequestCallback[] = [];
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
      vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});

      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) => useTransition(open, { duration: 300 }),
        { initialProps: { open: false } }
      );

      // Open first
      act(() => {
        rerender({ open: true });
      });
      // Fire both RAFs (double-RAF pattern) to make isActive true
      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      act(() => {
        const secondBatch = [...rafCallbacks].slice(1);
        secondBatch.forEach(cb => cb(0));
      });
      expect(result.current.isActive).toBe(true);

      // Now close
      act(() => {
        rerender({ open: false });
      });
      expect(result.current.isActive).toBe(false);
    });

    it('isMounted becomes false after duration when closing', () => {
      const rafCallbacks: FrameRequestCallback[] = [];
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
      vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});

      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) => useTransition(open, { duration: 300 }),
        { initialProps: { open: false } }
      );

      // Open
      act(() => {
        rerender({ open: true });
      });
      // Fire both RAFs (double-RAF pattern)
      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      act(() => {
        const secondBatch = [...rafCallbacks].slice(1);
        secondBatch.forEach(cb => cb(0));
      });
      // Close
      act(() => {
        rerender({ open: false });
      });
      expect(result.current.isMounted).toBe(true); // still mounted during transition

      // Advance time
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.isMounted).toBe(false);
    });
  });

  describe('rapid toggle', () => {
    it('cleans up timers properly on rapid toggle', () => {
      const rafCallbacks: FrameRequestCallback[] = [];
      const cancelledRafs: number[] = [];
      vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
      vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => {
        cancelledRafs.push(id);
      });

      const { result, rerender } = renderHook(
        ({ open }: { open: boolean }) => useTransition(open, { duration: 300 }),
        { initialProps: { open: false } }
      );

      // Open then immediately close (before any RAF fires)
      act(() => {
        rerender({ open: true });
      });
      act(() => {
        rerender({ open: false });
      });

      // The cleanup of the open effect should have cancelled the pending RAF
      expect(cancelledRafs.length).toBeGreaterThan(0);

      // After duration, isMounted should be false
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.isMounted).toBe(false);
      expect(result.current.isActive).toBe(false);
    });
  });
});
