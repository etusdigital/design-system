import { render, screen } from '@testing-library/react';
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
    const { container } = render(<Slider defaultValue={0.5} />);
    // Should render the slider container
    const slider = container.firstChild as HTMLElement;
    expect(slider).toBeTruthy();
    // Should render at least one cursor div
    const cursors = slider.querySelectorAll('[class*="cursor"]');
    expect(cursors.length).toBeGreaterThan(0);
  });

  it('forwards ref to container div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Slider ref={ref} defaultValue={0.3} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('cleans up event listeners on unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Slider defaultValue={0.5} />);
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
    const { container } = render(<Slider size="small" defaultValue={0.5} />);
    const slider = container.firstChild as HTMLElement;
    // The small CSS module class should be applied
    expect(slider.className).toContain('small');
  });

  it('renders two cursors in range mode', () => {
    const { container } = render(<Slider isRange defaultValue={[0.2, 0.8]} />);
    const slider = container.firstChild as HTMLElement;
    const cursors = slider.querySelectorAll('[class*="cursor"]');
    expect(cursors.length).toBe(2);
  });

  it('passes defaultValue to useControllable', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider defaultValue={0.5} />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: 0.5,
      })
    );
  });

  it('passes range defaultValue to useControllable', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider isRange defaultValue={[0.2, 0.8]} />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: [0.2, 0.8],
      })
    );
  });

  it('falls back to 0 when no defaultValue provided', () => {
    const useControllableSpy = vi.spyOn(useControllableModule, 'useControllable');

    render(<Slider />);

    expect(useControllableSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValue: 0,
      })
    );
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Slider disabled defaultValue={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider.className).toContain('disabled');
  });

  it('applies vertical class when vertical', () => {
    const { container } = render(<Slider vertical defaultValue={0.5} />);
    const slider = container.firstChild as HTMLElement;
    expect(slider.className).toContain('vertical');
  });
});
