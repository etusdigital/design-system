import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTransition } from './useTransition';

describe('useTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
      expect(result.current.isMounted).toBe(true);
      expect(result.current.isActive).toBe(false);

      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      expect(result.current.isActive).toBe(false);

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

      act(() => {
        rerender({ open: true });
      });
      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      act(() => {
        const secondBatch = [...rafCallbacks].slice(1);
        secondBatch.forEach(cb => cb(0));
      });
      expect(result.current.isActive).toBe(true);

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

      act(() => {
        rerender({ open: true });
      });
      act(() => {
        const firstBatch = [...rafCallbacks];
        firstBatch.forEach(cb => cb(0));
      });
      act(() => {
        const secondBatch = [...rafCallbacks].slice(1);
        secondBatch.forEach(cb => cb(0));
      });
      act(() => {
        rerender({ open: false });
      });
      expect(result.current.isMounted).toBe(true);

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

      act(() => {
        rerender({ open: true });
      });
      act(() => {
        rerender({ open: false });
      });

      expect(cancelledRafs.length).toBeGreaterThan(0);

      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.isMounted).toBe(false);
      expect(result.current.isActive).toBe(false);
    });
  });
});
