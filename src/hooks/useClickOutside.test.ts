import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fires callback when mousedown is outside the ref element', () => {
    const callback = vi.fn();

    renderHook(() => {
      const ref = useRef<HTMLElement | null>(null);
      useClickOutside([ref], callback);
      return ref;
    });

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does NOT fire callback when mousedown is inside the ref element', () => {
    const callback = vi.fn();

    const element = document.createElement('div');
    document.body.appendChild(element);

    element.getBoundingClientRect = () => ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 200,
      width: 200,
      height: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    renderHook(() => {
      const ref = useRef<HTMLElement | null>(element);
      useClickOutside([ref], callback);
      return ref;
    });

    act(() => {
      const event = new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true });
      document.dispatchEvent(event);
    });

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it('does NOT fire callback when enabled=false', () => {
    const callback = vi.fn();

    renderHook(() => {
      const ref = useRef<HTMLElement | null>(null);
      useClickOutside([ref], callback, false);
      return ref;
    });

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
