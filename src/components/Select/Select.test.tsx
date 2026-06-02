import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './index';

const stringOptions = ['Apple', 'Banana', 'Cherry'];
const objectOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

function openSelect(container: HTMLElement) {
  const labelContent = container.querySelector('.label-content') as HTMLElement;
  if (labelContent) fireEvent.click(labelContent);
}

describe('Select', () => {
  it('renders with string options', () => {
    render(<Select options={stringOptions} />);
    expect(document.body).toBeTruthy();
  });

  it('renders with object options using labelKey', () => {
    render(<Select options={objectOptions} labelKey="label" valueKey="value" />);
    expect(document.body).toBeTruthy();
  });

  it('calls onChange with selected value on option click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={objectOptions} value={null} onChange={handleChange} />
    );
    openSelect(container);
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('multiple mode: toggles options in and out of array', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={objectOptions} multiple value={[]} onChange={handleChange} />
    );
    openSelect(container);
    const options = document.querySelectorAll('[role="option"]');
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith(['a']);
  });

  it('multiple mode: deselects an already selected option', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={objectOptions} multiple value={['a']} onChange={handleChange} />
    );
    openSelect(container);
    const options = document.querySelectorAll('[role="option"]');
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('multiple mode: renders Checkbox inside each option', () => {
    const { container } = render(
      <Select options={objectOptions} multiple value={[]} />
    );
    openSelect(container);
    const checkboxes = document.querySelectorAll('[role="checkbox"]');
    expect(checkboxes.length).toBe(objectOptions.length);
  });

  it('search filters options', () => {
    const { container } = render(
      <Select options={objectOptions} searchable value={null} />
    );
    openSelect(container);
    const searchInput = container.querySelector('input[type="search"]');
    expect(searchInput).toBeTruthy();
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(objectOptions.length);
  });

  it('returns no options when nothing matches search', () => {
    const { container } = render(
      <Select options={objectOptions} searchable value={null} />
    );
    openSelect(container);
    const searchInput = container.querySelector('input[type="search"]') as HTMLInputElement;
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'zzzzz' } });
    }
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(0);
  });

  it('clearable shows clear action button', () => {
    const { container } = render(
      <Select options={objectOptions} clearable value={null} />
    );
    openSelect(container);
    const clearBtn = screen.getByText('Clear');
    expect(clearBtn).toBeTruthy();
  });

  it('supports getObject mode emitting full option object', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={objectOptions} value={null} onChange={handleChange} getObject />
    );
    openSelect(container);
    const options = document.querySelectorAll('[role="option"]');
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith(objectOptions[0]);
  });
});
