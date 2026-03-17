import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tab } from './index';

describe('Tab', () => {
  it('renders tab buttons for string options', () => {
    render(<Tab options={['First', 'Second', 'Third']} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('renders tab buttons for object options with labelKey', () => {
    const options = [
      { label: 'Tab A', value: 'a' },
      { label: 'Tab B', value: 'b' },
    ];
    render(<Tab options={options} labelKey="label" />);
    expect(screen.getByText('Tab A')).toBeInTheDocument();
    expect(screen.getByText('Tab B')).toBeInTheDocument();
  });

  it('initializes to index 0 when no defaultValue', () => {
    render(<Tab options={['First', 'Second']} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toContain('active');
    expect(buttons[1].className).not.toContain('active');
  });

  it('active tab has active class', () => {
    render(<Tab options={['First', 'Second', 'Third']} defaultValue={1} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[1].className).toContain('active');
    expect(buttons[0].className).not.toContain('active');
  });

  it('calls onChange on tab click', () => {
    const handleChange = vi.fn();
    render(<Tab options={['First', 'Second', 'Third']} onChange={handleChange} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('switches active tab on click (uncontrolled)', () => {
    render(<Tab options={['First', 'Second']} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toContain('active');
    fireEvent.click(buttons[1]);
    expect(buttons[1].className).toContain('active');
    expect(buttons[0].className).not.toContain('active');
  });
});
