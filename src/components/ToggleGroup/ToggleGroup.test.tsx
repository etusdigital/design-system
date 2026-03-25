import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleGroup } from './index';

const defaultOptions = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
];

describe('ToggleGroup', () => {
  it('renders without crashing', () => {
    render(<ToggleGroup options={defaultOptions} />);
    expect(document.body).toBeTruthy();
  });

  it('renders options as Toggle children', () => {
    const { getByText } = render(<ToggleGroup options={defaultOptions} />);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('selecting one option updates the group selection', () => {
    const { getAllByRole } = render(
      <ToggleGroup options={defaultOptions} defaultValue={1} />
    );
    const buttons = getAllByRole('button');
    // First button initially active
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    // Click second
    fireEvent.click(buttons[1]);
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('secondary type applies secondary styling class', () => {
    const { getAllByRole } = render(
      <ToggleGroup options={defaultOptions} type="secondary" />
    );
    const buttons = getAllByRole('button');
    // Secondary type buttons should not have the default min-width class
    // We verify by checking the className contains 'secondary'
    expect(buttons[0].className).toContain('secondary');
  });

  it('disabled disables all toggle items', () => {
    const { getAllByRole } = render(
      <ToggleGroup options={defaultOptions} disabled />
    );
    const buttons = getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('calls onChange with selected value', () => {
    const onChange = vi.fn();
    const { getAllByRole } = render(
      <ToggleGroup options={defaultOptions} onChange={onChange} />
    );
    fireEvent.click(getAllByRole('button')[1]);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('controlled mode: value prop controls selection, onChange fires on click', () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(
      <ToggleGroup options={defaultOptions} value={1} onChange={handleChange} />
    );
    const buttons = getAllByRole('button');
    // First button is active because value=1 matches first option
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    // Click second button
    fireEvent.click(buttons[1]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
