import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Stepper } from './index';

const steps = [
  { label: 'Step 1', icon: 'check_circle' },
  { label: 'Step 2', icon: 'settings' },
  { label: 'Step 3', icon: 'done' },
];

describe('Stepper', () => {
  it('renders step circles for each option', () => {
    render(<Stepper options={steps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('active step has active class', () => {
    const { container } = render(<Stepper options={steps} defaultValue={1} />);
    const circles = container.querySelectorAll('[class*="circle"]');
    // The second circle (index 1) should have the active class
    expect(circles[1].className).toContain('active');
  });

  it('does NOT have a version prop in component code', () => {
    // Verify no version prop is expected in the interface
    // We simply check we can render without providing version
    const { container } = render(<Stepper options={steps} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('calls onChange on step click', () => {
    const handleChange = vi.fn();
    render(<Stepper options={steps} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('does not call onChange when noClick is true', () => {
    const handleChange = vi.fn();
    render(<Stepper options={steps} noClick onChange={handleChange} />);
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies --stepper-bg CSS variable when background prop provided', () => {
    const { container } = render(
      <Stepper options={steps} background="white" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--stepper-bg')).toBe('white');
  });

  it('past steps get past class after navigation', () => {
    const { container } = render(<Stepper options={steps} defaultValue={0} />);
    // Navigate to step 2
    fireEvent.click(screen.getByText('Step 2'));
    const circles = container.querySelectorAll('[class*="circle"]');
    // Step 1 (index 0) should now be past
    expect(circles[0].className).toContain('past');
  });
});
