import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './index';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';

describe('Radio', () => {
  it('renders without crashing', () => {
    render(<Radio />);
    expect(document.body).toBeTruthy();
  });

  it('selects on click standalone', () => {
    const onChange = vi.fn();
    render(<Radio onChange={onChange}>Option</Radio>);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('cannot deselect standalone — click always sets true', () => {
    const onChange = vi.fn();
    render(<Radio value={true} onChange={onChange}>Option</Radio>);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    // onChange still called with true (Radio cannot deselect itself)
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('reads group context and reflects selected state', () => {
    const contextValue = {
      selected: 'b',
      disabled: false,
      select: vi.fn(),
    };
    render(
      <RadioGroupContext.Provider value={contextValue}>
        <Radio groupValue="b">Option B</Radio>
      </RadioGroupContext.Provider>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('reads group context and is not selected when groupValue does not match', () => {
    const contextValue = {
      selected: 'a',
      disabled: false,
      select: vi.fn(),
    };
    render(
      <RadioGroupContext.Provider value={contextValue}>
        <Radio groupValue="b">Option B</Radio>
      </RadioGroupContext.Provider>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');
  });

  it('calls group context select when clicked inside a group', () => {
    const select = vi.fn();
    const contextValue = {
      selected: 'a',
      disabled: false,
      select,
    };
    render(
      <RadioGroupContext.Provider value={contextValue}>
        <Radio groupValue="b">Option B</Radio>
      </RadioGroupContext.Provider>
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(select).toHaveBeenCalledWith('b');
  });

  it('does not fire when disabled', () => {
    const onChange = vi.fn();
    render(<Radio disabled onChange={onChange}>Option</Radio>);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled class when disabled via group context', () => {
    const contextValue = {
      selected: null,
      disabled: true,
      select: vi.fn(),
    };
    render(
      <RadioGroupContext.Provider value={contextValue}>
        <Radio groupValue="x">Option</Radio>
      </RadioGroupContext.Provider>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-disabled', 'true');
  });
});
