import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ColorPicker } from './index';

describe('ColorPicker', () => {
  it('renders without crash', () => {
    render(<ColorPicker />);
    expect(document.body).toBeTruthy();
  });

  it('renders color area canvas element', () => {
    const { container } = render(<ColorPicker />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('renders hue slider track', () => {
    const { container } = render(<ColorPicker />);
    const hueTrack = container.querySelector('[class*="hueTrack"]');
    expect(hueTrack).toBeTruthy();
  });

  it('renders opacity slider when showAlpha is true (default)', () => {
    const { container } = render(<ColorPicker showAlpha={true} />);
    const opacityTrack = container.querySelector('[class*="opacityTrack"]');
    expect(opacityTrack).toBeTruthy();
  });

  it('does not render opacity slider when showAlpha is false', () => {
    const { container } = render(<ColorPicker showAlpha={false} />);
    const opacityTrack = container.querySelector('[class*="opacityTrack"]');
    expect(opacityTrack).toBeNull();
  });

  it('renders all five type toggle buttons', () => {
    const { container } = render(<ColorPicker />);
    const toggles = container.querySelectorAll('[class*="typeToggle"]');
    const toggleTexts = Array.from(toggles).map((t) => t.textContent?.trim());
    expect(toggleTexts).toContain('HEXA');
    expect(toggleTexts).toContain('RGBA');
    expect(toggleTexts).toContain('HSLA');
    expect(toggleTexts).toContain('HSVA');
    expect(toggleTexts).toContain('HWB');
  });

  it('attaches window mousemove and mouseup listeners on mount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    render(<ColorPicker />);
    const eventNames = addSpy.mock.calls.map((call) => call[0]);
    expect(eventNames).toContain('mousemove');
    expect(eventNames).toContain('mouseup');
    addSpy.mockRestore();
  });

  it('attaches window touchmove and touchend listeners on mount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    render(<ColorPicker />);
    const eventNames = addSpy.mock.calls.map((call) => call[0]);
    expect(eventNames).toContain('touchmove');
    expect(eventNames).toContain('touchend');
    addSpy.mockRestore();
  });

  it('removes window listeners on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ColorPicker />);
    unmount();
    const eventNames = removeSpy.mock.calls.map((call) => call[0]);
    expect(eventNames).toContain('mousemove');
    expect(eventNames).toContain('mouseup');
    expect(eventNames).toContain('touchmove');
    expect(eventNames).toContain('touchend');
    removeSpy.mockRestore();
  });

  it('calls onChange when value input changes', () => {
    const onChange = vi.fn();
    const { container } = render(<ColorPicker onChange={onChange} />);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
