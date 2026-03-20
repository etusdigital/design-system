import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { History } from './index';

const options = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('History', () => {
  it('renders without crashing', () => {
    render(
      <History
        options={options}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    expect(document.body).toBeTruthy();
  });

  it('renders all options passed via props', () => {
    render(
      <History
        options={options}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('calls onChange when an option is clicked', () => {
    const handleChange = vi.fn();
    render(
      <History
        options={options}
        onChange={handleChange}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });

  it('applies position CSS class to option elements', () => {
    const { container } = render(
      <History
        options={options}
        position="left"
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    const optionEls = container.querySelectorAll('[class*="option"]');
    expect(optionEls.length).toBeGreaterThan(0);
    optionEls.forEach((el) => {
      expect(el.className).toMatch(/left/);
    });
  });

  it('first option has active class when no value is set and not disabled', () => {
    const { container } = render(
      <History
        options={options}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    const firstOption = container.querySelectorAll('[class*="option"]')[0];
    expect(firstOption.className).toMatch(/active/);
  });

  it('controlled value sets the active step', () => {
    const { container } = render(
      <History
        options={options}
        value={options[1]}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    const optionEls = container.querySelectorAll('[class*="option"]');
    expect(optionEls[1].className).toMatch(/active/);
    expect(optionEls[0].className).not.toMatch(/active/);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(
      <History
        options={options}
        disabled
        onChange={handleChange}
        renderOption={(option) => <span>{option.label}</span>}
      />
    );
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
