import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { Slider } from './index';
import * as useControllableModule from '../../hooks/useControllable';

describe('Slider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<Slider />);
    expect(document.body).toBeTruthy();
  });

  it('renders track and cursor elements', () => {
    const { container } = render(<Slider value={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider).toBeTruthy();
    const cursors = slider.querySelectorAll('[class*="cursor"]');
    expect(cursors.length).toBeGreaterThan(0);
  });

  it('forwards ref to container div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Slider ref={ref} value={0.3} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('cleans up event listeners on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Slider value={0.5} />);
    const addedCount = addSpy.mock.calls.filter(
      (call) => ['mousemove', 'mouseup', 'touchmove', 'touchend'].includes(call[0] as string)
    ).length;
    expect(addedCount).toBe(4);

    unmount();

    const removedCount = removeSpy.mock.calls.filter(
      (call) => ['mousemove', 'mouseup', 'touchmove', 'touchend'].includes(call[0] as string)
    ).length;
    expect(removedCount).toBe(4);
  });

  it('accepts size prop', () => {
    const { container } = render(<Slider size="small" value={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider.className).toContain('small');
  });

  it('renders two cursors in range mode', () => {
    const { container } = render(<Slider isRange value={[0.2, 0.8]} />);
    const slider = container.firstChild as HTMLElement;
    const cursors = slider.querySelectorAll('[class*="cursor"]');
    expect(cursors.length).toBe(2);
  });

  it('passes internal defaultValue 0 to useControllable for single slider', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: 0,
      })
    );
  });

  it('passes internal defaultValue [0,0] to useControllable for range slider', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider isRange />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: [0, 0],
      })
    );
  });

  it('uses value prop when provided (controlled mode)', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider value={0.5} />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 0.5,
      })
    );
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Slider disabled value={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider.className).toContain('disabled');
  });

  it('applies vertical class when vertical', () => {
    const { container } = render(<Slider vertical value={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider.className).toContain('vertical');
  });
});
