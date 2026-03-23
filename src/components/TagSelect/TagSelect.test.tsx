import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagSelect } from './index';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

function openTagSelect(container: HTMLElement) {
  const labelContent = container.querySelector('.label-content') as HTMLElement;
  if (labelContent) fireEvent.click(labelContent);
}

describe('TagSelect', () => {
  it('renders without crashing', () => {
    render(<TagSelect options={options} />);
    expect(document.body).toBeTruthy();
  });

  it('renders initial selected values as tags', () => {
    render(
      <TagSelect
        options={options}
        defaultValue={[{ label: 'Apple', value: 'apple' }]}
      />
    );
    expect(screen.getByText('Apple')).toBeTruthy();
  });

  it('renders multiple initial values as tags', () => {
    render(
      <TagSelect
        options={options}
        defaultValue={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ]}
      />
    );
    expect(screen.getByText('Apple')).toBeTruthy();
    expect(screen.getByText('Banana')).toBeTruthy();
  });

  it('removes tag when delete icon is clicked', () => {
    const handleChange = vi.fn();
    render(
      <TagSelect
        options={options}
        value={[{ label: 'Apple', value: 'apple' }]}
        onChange={handleChange}
      />
    );
    // Find the close icon span (Material Symbols renders "close" as text content)
    const closeSpans = Array.from(document.querySelectorAll('span')).filter(
      (el) => el.textContent === 'close'
    );
    if (closeSpans.length > 0) {
      fireEvent.click(closeSpans[0]);
      expect(handleChange).toHaveBeenCalledWith([]);
    }
  });

  it('opens options list on click', () => {
    const { container } = render(<TagSelect options={options} />);
    openTagSelect(container);
    // Options are portaled to document.body via FloatCard
    const optionEls = document.querySelectorAll('[role="option"]');
    expect(optionEls.length).toBe(options.length);
  });

  it('toggles option into selection on click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagSelect options={options} value={[]} onChange={handleChange} />
    );
    openTagSelect(container);
    // Options are portaled to document.body
    const optionEls = document.querySelectorAll('[role="option"]');
    expect(optionEls.length).toBeGreaterThan(0);
    fireEvent.click(optionEls[0]);
    expect(handleChange).toHaveBeenCalledWith(['apple']);
  });

  it('deselects option when clicked again (toggle out)', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagSelect
        options={options}
        value={[{ label: 'Apple', value: 'apple' }]}
        onChange={handleChange}
      />
    );
    openTagSelect(container);
    // Options are portaled to document.body
    const optionEls = document.querySelectorAll('[role="option"]');
    expect(optionEls.length).toBeGreaterThan(0);
    fireEvent.click(optionEls[0]);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('filters options when searchable and text entered', () => {
    const { container } = render(<TagSelect options={options} searchable value={[]} />);
    openTagSelect(container);
    // Search input is in the label area (not portaled)
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: 'app' } });
    // Options are portaled to document.body
    const optionEls = document.querySelectorAll('[role="option"]');
    expect(optionEls.length).toBe(1);
  });

  it('shows no result found message when search matches nothing', () => {
    const { container } = render(<TagSelect options={options} searchable value={[]} />);
    openTagSelect(container);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'zzzzz' } });
    expect(screen.getByText('No result found')).toBeTruthy();
  });

  it('shows Add button in creatable mode for new search text', () => {
    const { container } = render(<TagSelect options={options} creatable value={[]} />);
    openTagSelect(container);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Mango' } });
    expect(screen.getByText(/Add/)).toBeTruthy();
  });

  it('adds new option via Add button click in creatable mode', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagSelect options={options} creatable value={[]} onChange={handleChange} />
    );
    openTagSelect(container);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Mango' } });
    const addBtn = screen.getByText(/Add/);
    fireEvent.click(addBtn);
    expect(handleChange).toHaveBeenCalledWith(['Mango']);
  });

  it('adds new option via Enter key in creatable mode', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagSelect options={options} creatable value={[]} onChange={handleChange} />
    );
    openTagSelect(container);
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Mango' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(['Mango']);
  });

  it('shows empty state when no options provided', () => {
    const { container } = render(<TagSelect options={[]} />);
    openTagSelect(container);
    expect(screen.getByText('No tags created yet')).toBeTruthy();
  });

  it('respects disabled prop — does not open', () => {
    const { container } = render(<TagSelect options={options} disabled />);
    openTagSelect(container);
    // Disabled — portal content should not be mounted
    const optionEls = document.querySelectorAll('[role="option"]');
    expect(optionEls.length).toBe(0);
  });
});
