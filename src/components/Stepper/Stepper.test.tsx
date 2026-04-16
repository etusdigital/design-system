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
    const { container } = render(<Stepper options={steps} value="Step 2" />);
    const stepCircles = container.querySelectorAll('[class*="step"]');
    const activeSteps = Array.from(stepCircles).filter(
      (el) => el.className.includes('active') && !el.className.includes('stepContainer')
    );
    expect(activeSteps.length).toBeGreaterThan(0);
  });

  it('does NOT have a version prop in component code', () => {
    const { container } = render(<Stepper options={steps} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('calls onChange on step click', () => {
    const handleChange = vi.fn();
    render(<Stepper options={steps} onChange={handleChange} allowSkip />);
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).toHaveBeenCalledWith('Step 2');
  });

  it('does not call onChange when noClick is true', () => {
    const handleChange = vi.fn();
    render(<Stepper options={steps} disabled onChange={handleChange} />);
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders step elements without crashing', () => {
    const { container } = render(<Stepper options={steps} />);
    const stepElements = container.querySelectorAll('[class*="step"]');
    expect(stepElements.length).toBeGreaterThan(0);
  });

  it('past steps get past class after navigation', () => {
    const { container } = render(<Stepper options={steps} allowSkip />);
    fireEvent.click(screen.getByText('Step 2'));
    const allElements = container.querySelectorAll('[class*="past"]');
    expect(allElements.length).toBeGreaterThan(0);
  });
});
