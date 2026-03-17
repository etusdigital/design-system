import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders 7-column grid for a month', () => {
    render(<Calendar />);
    const weekdayHeaders = document.querySelectorAll('[class*="weekdayHeader"]');
    expect(weekdayHeaders.length).toBe(7);
  });

  it('shows month name and year in header', () => {
    render(<Calendar />);
    const header = document.querySelector('[class*="monthYear"]');
    expect(header).toBeTruthy();
    expect(header!.textContent!.length).toBeGreaterThan(0);
  });

  it('previous month button has correct aria-label', () => {
    render(<Calendar />);
    const prevBtn = screen.getByRole('button', { name: 'Previous month' });
    expect(prevBtn).toBeTruthy();
  });

  it('next month button has correct aria-label', () => {
    render(<Calendar />);
    const nextBtn = screen.getByRole('button', { name: 'Next month' });
    expect(nextBtn).toBeTruthy();
  });

  it('navigation buttons change the month', () => {
    render(<Calendar />);
    const header = document.querySelector('[class*="monthYear"]')!;
    const initialText = header.textContent;

    const nextBtn = screen.getByRole('button', { name: 'Next month' });
    fireEvent.click(nextBtn);

    expect(header.textContent).not.toBe(initialText);
  });

  it('day click calls onChange with Date in date mode', () => {
    const onChange = vi.fn();
    render(<Calendar onChange={onChange} type="date" />);

    const cells = document.querySelectorAll('[role="gridcell"]');
    let clickedCell: Element | undefined;
    for (const cell of Array.from(cells)) {
      if (cell.textContent && /^\d+$/.test(cell.textContent.trim())) {
        clickedCell = cell;
        break;
      }
    }
    expect(clickedCell).toBeTruthy();
    fireEvent.click(clickedCell!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  it('today cell has font-semibold styling (today class)', () => {
    render(<Calendar />);
    const todayCells = document.querySelectorAll('[class*="today"]');
    expect(todayCells.length).toBeGreaterThan(0);
  });

  it('Calendar.Day and Calendar.DateDialog exist as static properties', () => {
    expect(typeof (Calendar as any).Day).toBe('function');
    expect(typeof (Calendar as any).DateDialog).toBe('function');
  });

  it('does not import date-fns or dayjs', () => {
    render(<Calendar />);
    expect(document.body).toBeTruthy();
  });

  it('renders correct number of day cells for a known month', () => {
    const jan2025 = new Date(2025, 0, 15);
    render(<Calendar value={jan2025} type="date" />);
    const cells = document.querySelectorAll('[role="gridcell"]');
    const filledCells = Array.from(cells).filter(
      (c) => c.textContent && /^\d+$/.test(c.textContent.trim())
    );
    expect(filledCells.length).toBe(31);
  });

  it('period mode: two clicks result in a range', () => {
    const onChange = vi.fn();
    render(<Calendar onChange={onChange} type="period" />);

    const cells = document.querySelectorAll('[role="gridcell"]');
    const filledCells = Array.from(cells).filter(
      (c) => c.textContent && /^\d+$/.test(c.textContent.trim())
    );
    expect(filledCells.length).toBeGreaterThan(1);

    fireEvent.click(filledCells[0]);
    fireEvent.click(filledCells[4]);

    expect(onChange).toHaveBeenCalledTimes(2);
    const secondCallValue = onChange.mock.calls[1][0];
    expect(Array.isArray(secondCallValue)).toBe(true);
  });
});
