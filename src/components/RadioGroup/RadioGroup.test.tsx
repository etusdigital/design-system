import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './index';
import { Radio } from '../Radio/Radio';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup />);
    expect(document.body).toBeTruthy();
  });

  it('renders options as Radio children', () => {
    const options = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
    ];
    render(<RadioGroup options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
  });

  it('marks the selected option as checked', () => {
    const options = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
    ];
    render(<RadioGroup value={2} options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('selecting one deselects others', () => {
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
    ];
    render(<RadioGroup defaultValue="a" options={options} />);
    const radios = screen.getAllByRole('radio');

    // Initially first is selected
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');

    // Click second
    fireEvent.click(radios[1]);
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('controlled mode calls onChange with selected value', () => {
    const onChange = vi.fn();
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    render(<RadioGroup value="a" onChange={onChange} options={options} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('works with children (no options prop)', () => {
    render(
      <RadioGroup defaultValue="x">
        <Radio groupValue="x">X</Radio>
        <Radio groupValue="y">Y</Radio>
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('disables all children when disabled prop is set', () => {
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];
    render(<RadioGroup disabled options={options} />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
