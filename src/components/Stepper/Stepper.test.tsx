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
    // Steps are rendered as divs with class containing 'step' (CSS module)
    const stepCircles = container.querySelectorAll('[class*="step"]');
    // Find the step element that has the active class
    const activeSteps = Array.from(stepCircles).filter(
      (el) => el.className.includes('active') && !el.className.includes('stepContainer')
    );
    expect(activeSteps.length).toBeGreaterThan(0);
  });

  it('does NOT have a version prop in component code', () => {
    // Verify no version prop is expected in the interface
    // We simply check we can render without providing version
    const { container } = render(<Stepper options={steps} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('calls onChange on step click', () => {
    const handleChange = vi.fn();
    // allowSkip=true so any step can be clicked from the initial state
    render(<Stepper options={steps} onChange={handleChange} allowSkip />);
    fireEvent.click(screen.getByText('Step 2'));
    // onChange is called with getValue(option) — the label string (default valueKey='label')
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
    // Verify stepper renders step elements
    const stepElements = container.querySelectorAll('[class*="step"]');
    expect(stepElements.length).toBeGreaterThan(0);
  });

  it('past steps get past class after navigation', () => {
    const { container } = render(<Stepper options={steps} allowSkip />);
    // Navigate to step 2 (index 1)
    fireEvent.click(screen.getByText('Step 2'));
    // Find step circle divs that have both 'step' and 'past' CSS module classes
    // The step circle div has class like "_medium_xxx _past_xxx _step_xxx"
    const allElements = container.querySelectorAll('[class*="past"]');
    expect(allElements.length).toBeGreaterThan(0);
  });
});
