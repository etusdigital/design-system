import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useControllable } from './useControllable';

describe('useControllable', () => {
  describe('uncontrolled mode', () => {
    it('uses defaultValue as initial value', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'hello' })
      );
      expect(result.current[0]).toBe('hello');
    });

    it('updates internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'initial' })
      );
      act(() => {
        result.current[1]('updated');
      });
      expect(result.current[0]).toBe('updated');
    });

    it('initial value is undefined when no value and no defaultValue provided', () => {
      const { result } = renderHook(() =>
        useControllable<string>({})
      );
      expect(result.current[0]).toBeUndefined();
    });
  });

  describe('controlled mode', () => {
    it('uses controlled value (ignores internal state)', () => {
      const { result } = renderHook(() =>
        useControllable({ value: 'controlled' })
      );
      expect(result.current[0]).toBe('controlled');
    });

    it('does not update internal state when controlled', () => {
      const { result } = renderHook(() =>
        useControllable({ value: 'controlled' })
      );
      act(() => {
        result.current[1]('new value');
      });
      // In controlled mode, the value is still from the prop
      expect(result.current[0]).toBe('controlled');
    });
  });

  describe('onChange callback', () => {
    it('calls onChange in uncontrolled mode when setValue is called', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'init', onChange })
      );
      act(() => {
        result.current[1]('new');
      });
      expect(onChange).toHaveBeenCalledWith('new');
    });

    it('calls onChange in controlled mode when setValue is called', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ value: 'controlled', onChange })
      );
      act(() => {
        result.current[1]('new');
      });
      expect(onChange).toHaveBeenCalledWith('new');
    });

    it('does not throw when onChange is not provided', () => {
      const { result } = renderHook(() =>
        useControllable({ defaultValue: 'init' })
      );
      expect(() => {
        act(() => {
          result.current[1]('new');
        });
      }).not.toThrow();
    });
  });

  describe('dev mode warning', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('warns when switching from uncontrolled to controlled', () => {
      let controlled: string | undefined = undefined;
      const { rerender } = renderHook(
        ({ value }: { value?: string }) =>
          useControllable({ value }),
        { initialProps: { value: undefined } }
      );
      // Initially uncontrolled
      rerender({ value: 'now-controlled' });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('switched from uncontrolled to controlled')
      );
    });

    it('warns when switching from controlled to uncontrolled', () => {
      const { rerender } = renderHook(
        ({ value }: { value?: string }) =>
          useControllable({ value }),
        { initialProps: { value: 'initially-controlled' } }
      );
      rerender({ value: undefined });
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('switched from controlled to uncontrolled')
      );
    });
  });
});
