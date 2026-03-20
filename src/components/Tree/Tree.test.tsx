import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tree } from './index';
import type { Option as DropOption } from '../../utils/types/DropOption';

const flatOptions: DropOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

const nestedOptions: DropOption[] = [
  {
    label: 'Fruits',
    value: 'fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  { label: 'Vegetables', value: 'vegetables' },
];

describe('Tree', () => {
  it('renders root-level options', () => {
    render(<Tree options={flatOptions} />);
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
    expect(screen.getByText('Gamma')).toBeTruthy();
  });

  it('clicking a node calls onChange with that node value', () => {
    const onChange = vi.fn();
    render(<Tree options={flatOptions} onChange={onChange} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('alpha');
  });

  it('clicking expand icon shows nested children', () => {
    render(<Tree options={nestedOptions} />);
    // Children should not be visible initially
    expect(screen.queryByText('Apple')).toBeNull();

    // Click the expand icon on the Fruits node row
    const expandIcons = document.querySelectorAll('.icon');
    fireEvent.click(expandIcons[0]);
    expect(screen.getByText('Apple')).toBeTruthy();
    expect(screen.getByText('Banana')).toBeTruthy();
  });

  it('multiple mode renders checkboxes', () => {
    render(<Tree options={flatOptions} multiple />);
    const checkboxes = document.querySelectorAll('[role="checkbox"]');
    expect(checkboxes.length).toBe(flatOptions.length);
  });

  it('multiple mode: onChange emits array of selected values', () => {
    const onChange = vi.fn();
    render(<Tree options={flatOptions} multiple onChange={onChange} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith(['alpha']);
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(Array);
  });

  it('getObject mode emits full option object on single select', () => {
    const onChange = vi.fn();
    render(<Tree options={flatOptions} getObject onChange={onChange} />);
    fireEvent.click(screen.getByText('Beta'));
    expect(onChange).toHaveBeenCalledWith(flatOptions[1]);
  });

  it('disabled tree nodes are not interactive', () => {
    const onChange = vi.fn();
    render(<Tree options={flatOptions} disabled onChange={onChange} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not render children until expanded', () => {
    render(<Tree options={nestedOptions} />);
    expect(screen.queryByText('Apple')).toBeNull();
    expect(screen.queryByText('Banana')).toBeNull();
  });
});
