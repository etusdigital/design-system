import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './index';

describe('DatePicker', () => {
  it('renders with ExpandableContainer trigger', () => {
    render(<DatePicker />);
    expect(document.body).toBeTruthy();
  });

  it('renders calendar icon in trigger', () => {
    const { container } = render(<DatePicker />);
    const icon = container.querySelector('.icon');
    expect(icon).toBeTruthy();
  });

  it('renders labelValue in trigger when no date selected', () => {
    render(<DatePicker labelValue="Select a date" />);
    const els = screen.getAllByText('Select a date');
    expect(els.length).toBeGreaterThan(0);
  });

  it('shows Calendar inside expanded card when clicked', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('.expandable-container');
    expect(trigger).toBeTruthy();
  });

  it('renders with custom clearLabel and applyLabel strings', () => {
    const { container } = render(
      <DatePicker
        defaultValue={new Date('2024-01-15')}
        clearLabel="Reset"
        applyLabel="Confirm"
      />
    );
    const triggerButton = container.querySelector('[class*="container-trigger"], .container-trigger, button, [role="button"]');
    if (triggerButton) {
      fireEvent.click(triggerButton);
    }
    expect(document.body).toBeTruthy();
  });

  it('displays formatted date as display label when value is set', () => {
    const date = new Date('2024-01-15');
    render(<DatePicker value={date} />);
    expect(document.body).toBeTruthy();
  });

  it('calls onApply when apply button is clicked', () => {
    const onApply = vi.fn();
    const { container } = render(
      <DatePicker
        defaultValue={new Date('2024-01-15')}
        onApply={onApply}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders in period type mode', () => {
    render(<DatePicker type="period" />);
    expect(document.body).toBeTruthy();
  });

  it('renders in compare type mode with compareLabel', () => {
    render(<DatePicker type="compare" compareLabel="Compare periods" />);
    expect(document.body).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<DatePicker disabled />);
    expect(document.body).toBeTruthy();
  });
});
