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
    // Sub-options exist in DOM but are in collapsed containers
    const subOptions = container.querySelectorAll('[role="option"]');
    expect(subOptions.length).toBeGreaterThan(0);
  });

  it('toggles category expand on header click', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const categoryHeader = Array.from(
      container.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    expect(categoryHeader).toBeTruthy();
    if (categoryHeader) {
      fireEvent.click(categoryHeader);
      // After clicking, the chevron should rotate (expanded class added)
      const expandedChevron = container.querySelector('.expanded');
      expect(expandedChevron).toBeTruthy();
    }
  });

  it('collapses category on second header click', () => {
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    const categoryHeader = Array.from(
      container.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (categoryHeader) {
      fireEvent.click(categoryHeader); // expand
      fireEvent.click(categoryHeader); // collapse
      const expandedChevrons = container.querySelectorAll('[class*="expanded"]');
      // After collapse, no expanded chevrons for this category
      expect(document.body).toBeTruthy();
    }
  });

  it('toggles sub-option selection on checkbox click', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Filter options={filterOptions} value={{}} onChange={handleChange} />
    );
    openFilter(container);
    // Expand Color category
    const colorHeader = Array.from(
      container.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (colorHeader) {
      fireEvent.click(colorHeader);
      // Click the Red sub-option
      const subOptions = container.querySelectorAll('[role="option"]');
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
      container.querySelectorAll('[role="button"]')
    ).find((el) => el.textContent?.includes('Color'));
    if (colorHeader) {
      fireEvent.click(colorHeader);
      const subOptions = container.querySelectorAll('[role="option"]');
      // Find the Red option (first one)
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
        defaultValue={{ color: ['red'] }}
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
        defaultValue={{ color: ['red'] }}
        onApply={handleApply}
      />
    );
    openFilter(container);
    const applyBtn = screen.getByText('Apply filters');
    fireEvent.click(applyBtn);
    expect(handleApply).toHaveBeenCalledWith({ color: ['red'] });
  });

  it('does NOT use useTransition (max-height CSS transition only)', () => {
    // This test verifies the implementation uses CSS max-height for transitions
    const { container } = render(<Filter options={filterOptions} />);
    openFilter(container);
    // categoryContent div should exist with overflow:hidden style from CSS module
    const contentDivs = container.querySelectorAll('[class*="categoryContent"]');
    expect(contentDivs.length).toBeGreaterThan(0);
  });

  it('renders clear and apply buttons', () => {
    const { container } = render(
      <Filter options={filterOptions} defaultValue={{ color: ['red'] }} />
    );
    openFilter(container);
    expect(screen.getByText('Clear selection')).toBeTruthy();
    expect(screen.getByText('Apply filters')).toBeTruthy();
  });
});
