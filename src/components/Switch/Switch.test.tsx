import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './index';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />);
    expect(document.body).toBeTruthy();
  });

  it('toggles value on click', () => {
    render(<Switch value={false} />);
    const switchEl = document.querySelector('[role="switch"]')!;
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange in controlled mode', () => {
    const handleChange = vi.fn();
    render(<Switch value={false} onChange={handleChange} />);
    const switchEl = document.querySelector('[role="switch"]')!;
    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('renders children as label', () => {
    render(<Switch>My Label</Switch>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('does not respond to clicks when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch value={false} disabled onChange={handleChange} />);
    const switchEl = document.querySelector('[role="switch"]')!;
    fireEvent.click(switchEl);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
