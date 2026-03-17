import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AutoComplete } from './index';

const stringOptions = ['Apple', 'Banana', 'Cherry'];
const objectOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

function openAutoComplete(container: HTMLElement) {
  const labelContent = container.querySelector('.label-content') as HTMLElement;
  if (labelContent) fireEvent.click(labelContent);
}

describe('AutoComplete', () => {
  it('renders with options', () => {
    render(<AutoComplete options={stringOptions} />);
    expect(document.body).toBeTruthy();
  });

  it('calls onChange with selected value on option click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <AutoComplete options={objectOptions} value={null} onChange={handleChange} />
    );
    openAutoComplete(container);
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('calls onChange with full object when getObject is true', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <AutoComplete
        options={objectOptions}
        value={null}
        onChange={handleChange}
        getObject
      />
    );
    openAutoComplete(container);
    const options = container.querySelectorAll('[role="option"]');
    fireEvent.click(options[0]);
    expect(handleChange).toHaveBeenCalledWith(objectOptions[0]);
  });

  it('filters options based on search text', () => {
    const { container } = render(
      <AutoComplete options={objectOptions} defaultValue={null} />
    );
    openAutoComplete(container);
    const searchInput = container.querySelector('input[type="search"]') as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    fireEvent.change(searchInput, { target: { value: 'Option A' } });
    // After filter: only Option A remains
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBe(1);
  });

  it('shows no-results message when nothing matches search', () => {
    const { container } = render(
      <AutoComplete options={objectOptions} defaultValue={null} />
    );
    openAutoComplete(container);
    const searchInput = container.querySelector('input[type="search"]') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'zzzzz' } });
    // No options but no-results message shows
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBe(0);
    expect(screen.getByText('No options match your search')).toBeTruthy();
  });

  it('internal search state not exposed to consumer — onChange only fires on option select', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <AutoComplete options={objectOptions} defaultValue={null} onChange={handleChange} />
    );
    openAutoComplete(container);
    const searchInput = container.querySelector('input[type="search"]') as HTMLInputElement;
    // Typing in search should NOT call onChange
    fireEvent.change(searchInput, { target: { value: 'Option' } });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
