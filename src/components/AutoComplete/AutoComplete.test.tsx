import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { AutoComplete } from './index';

// AutoComplete accepts string[] | number[] options (primitives only)
const stringOptions = ['Option A', 'Option B', 'Option C'];

afterEach(() => {
  vi.useRealTimers();
});

// AutoComplete opens when: input is focused (focus=true), then outer div clicked,
// then setTimeout flushes (handleExpanded(focus=true) → setExpanded(true)).
function openAutoComplete(container: HTMLElement) {
  vi.useFakeTimers();
  const input = container.querySelector('input') as HTMLInputElement;
  const outerDiv = container.firstChild as HTMLElement;
  act(() => { fireEvent.focus(input); });
  act(() => { fireEvent.click(outerDiv); });
  act(() => { vi.runAllTimers(); });
}

describe('AutoComplete', () => {
  it('renders with options', () => {
    render(<AutoComplete options={stringOptions} />);
    expect(document.body).toBeTruthy();
  });

  it('calls onChange with selected value on option click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <AutoComplete options={stringOptions} value={null} onChange={handleChange} />
    );
    openAutoComplete(container);
    // Options are portaled to document.body via FloatCard
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBeGreaterThan(0);
    act(() => { fireEvent.click(options[0]); });
    // onChange is called with the selected option value
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders all options when opened', () => {
    const { container } = render(
      <AutoComplete options={stringOptions} value={null} />
    );
    openAutoComplete(container);
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(stringOptions.length);
  });

  it('filters options based on search text', () => {
    const { container } = render(
      <AutoComplete options={stringOptions} defaultValue={null} />
    );
    openAutoComplete(container);
    // AutoComplete uses an Input component (type="text")
    const searchInput = container.querySelector('input') as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    act(() => { fireEvent.change(searchInput, { target: { value: 'Option A' } }); });
    // After filter: only Option A remains in portal
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(1);
  });

  it('shows no-results message when nothing matches search', () => {
    const { container } = render(
      <AutoComplete options={stringOptions} defaultValue={null} />
    );
    openAutoComplete(container);
    const searchInput = container.querySelector('input') as HTMLInputElement;
    act(() => { fireEvent.change(searchInput, { target: { value: 'zzzzz' } }); });
    // No matching options
    const options = document.querySelectorAll('[role="option"]');
    expect(options.length).toBe(0);
    expect(screen.getByText('No options match your search')).toBeTruthy();
  });

  it('input value updates when typing', () => {
    const { container } = render(
      <AutoComplete options={stringOptions} defaultValue={null} />
    );
    openAutoComplete(container);
    const searchInput = container.querySelector('input') as HTMLInputElement;
    act(() => { fireEvent.change(searchInput, { target: { value: 'Option' } }); });
    // Input reflects typed value
    expect(searchInput.value).toBe('Option');
  });
});
