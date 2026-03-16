import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />);
    expect(document.body).toBeTruthy();
  });

  it('toggles value on click', () => {
    render(<Checkbox defaultValue={false} />);
    const checkbox = document.querySelector('[role="checkbox"]')!;
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('cycles through three states when allowIndeterminate', () => {
    render(<Checkbox defaultValue={false} allowIndeterminate />);
    const checkbox = document.querySelector('[role="checkbox"]')!;
    // false -> true
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    // true -> null (mixed)
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    // null -> false
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange in controlled mode', () => {
    const handleChange = vi.fn();
    render(<Checkbox value={false} onChange={handleChange} />);
    const checkbox = document.querySelector('[role="checkbox"]')!;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('renders children as label', () => {
    render(<Checkbox>My Label</Checkbox>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('does not respond to clicks when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox defaultValue={false} disabled onChange={handleChange} />);
    const checkbox = document.querySelector('[role="checkbox"]')!;
    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
