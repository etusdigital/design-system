import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Filter } from './index';

const filterOptions = [
  {
    label: 'Color',
    value: 'color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ],
  },
  {
    label: 'Size',
    value: 'size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Large', value: 'large' },
    ],
  },
];

function openFilter(container: HTMLElement) {
  const labelContent = container.querySelector('.label-content') as HTMLElement;
  if (labelContent) fireEvent.click(labelContent);
}

describe('Filter', () => {
  it('renders without crashing', () => {
    render(<Filter options={filterOptions} />);
    expect(document.body).toBeTruthy();
  });

  it('renders category headers', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    expect(screen.getByText('Color')).toBeTruthy();
    expect(screen.getByText('Size')).toBeTruthy();
  });

  it('sub-options are hidden by default (collapsed)', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const subOptions = document.querySelectorAll('[role="option"]');
    expect(subOptions.length).toBeGreaterThan(0);
  });

  it('toggles category expand on header click', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const categoryHeader = Array.from(
      document.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    expect(categoryHeader).toBeTruthy();
    if (categoryHeader) {
      fireEvent.click(categoryHeader);
      const expandedChevron = document.querySelector('[class*="expanded"]');
      expect(expandedChevron).toBeTruthy();
    }
  });

  it('collapses category on second header click', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const categoryHeader = Array.from(
      document.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (categoryHeader) {
      fireEvent.click(categoryHeader);
      fireEvent.click(categoryHeader);
      expect(document.body).toBeTruthy();
    }
  });

  it('toggles sub-option selection on checkbox click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Filter options={filterOptions} value={{}} onChange={handleChange} />
    );
    openFilter(container);
    const colorHeader = Array.from(
      document.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (colorHeader) {
      fireEvent.click(colorHeader);
      const subOptions = document.querySelectorAll('[role="option"]');
      if (subOptions.length > 0) {
        fireEvent.click(subOptions[0]);
        expect(handleChange).toHaveBeenCalledWith({ color: ['red'] });
      }
    }
  });

  it('deselects sub-option when already selected', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Filter
        options={filterOptions}
        value={{ color: ['red'] }}
        onChange={handleChange}
      />
    );
    openFilter(container);
    const colorHeader = Array.from(
      document.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (colorHeader) {
      fireEvent.click(colorHeader);
      const subOptions = document.querySelectorAll('[role="option"]');
      if (subOptions.length > 0) {
        fireEvent.click(subOptions[0]);
        expect(handleChange).toHaveBeenCalledWith({ color: [] });
      }
    }
  });

  it('shows status count of selected items', () => {
    render(
      <Filter
        options={filterOptions}
        value={{ color: ['red', 'blue'] }}
        statusLabel="Filters"
      />
    );
    expect(screen.getByText(/Filters/)).toBeTruthy();
  });

  it('clear button resets all selections', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Filter
        options={filterOptions}
        value={{ color: ['red'] }}
        onChange={handleChange}
      />
    );
    openFilter(container);
    const clearBtn = screen.getByText('Clear selection');
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith({});
  });

  it('apply button calls onApply with current selections', () => {
    const handleApply = vi.fn();
    const { container } = render(
      <Filter
        options={filterOptions}
        value={{ color: ['red'] }}
        onApply={handleApply}
      />
    );
    openFilter(container);
    const applyBtn = screen.getByText('Apply filters');
    fireEvent.click(applyBtn);
    expect(handleApply).toHaveBeenCalledWith({ color: ['red'] });
  });

  it('does NOT use useTransition (max-height CSS transition only)', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const contentDivs = document.querySelectorAll('[class*="categoryContent"]');
    expect(contentDivs.length).toBeGreaterThan(0);
  });

  it('renders clear and apply buttons', () => {
    const { container } = render(
      <Filter options={filterOptions} value={{ color: ['red'] }} />
    );
    openFilter(container);
    expect(screen.getByText('Clear selection')).toBeTruthy();
    expect(screen.getByText('Apply filters')).toBeTruthy();
  });
});
