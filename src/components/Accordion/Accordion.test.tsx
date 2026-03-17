import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders header content', () => {
    render(<Accordion header="Section Title"><p>body</p></Accordion>);
    expect(screen.getByText('Section Title')).toBeTruthy();
  });

  it('renders children when expanded (value=true)', async () => {
    render(
      <Accordion value={true}>
        <p>accordion body</p>
      </Accordion>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    expect(screen.getByText('accordion body')).toBeTruthy();
  });

  it('hides children when collapsed (value=false, maxHeight is 0px)', async () => {
    render(
      <Accordion value={false}>
        <p>accordion body</p>
      </Accordion>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    // Content element is in DOM but maxHeight is 0px (collapsed)
    const contentEl = document.querySelector('[class*="content"]') as HTMLElement;
    expect(contentEl).toBeTruthy();
    expect(contentEl.style.maxHeight).toBe('0px');
  });

  it('calls onChange when header is clicked', async () => {
    const onChange = vi.fn();
    render(
      <Accordion value={false} onChange={onChange} header="Click me">
        <p>body</p>
      </Accordion>
    );
    const header = document.querySelector('[class*="header"]') as HTMLElement;
    expect(header).toBeTruthy();
    fireEvent.click(header);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <Accordion value={false} disabled={true} onChange={onChange} header="Click me">
        <p>body</p>
      </Accordion>
    );
    const header = document.querySelector('[class*="header"]') as HTMLElement;
    expect(header).toBeTruthy();
    fireEvent.click(header);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('chevron has expanded class when open', async () => {
    render(
      <Accordion value={true}>
        <p>body</p>
      </Accordion>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const chevron = document.querySelector('[class*="chevron"]') as HTMLElement;
    expect(chevron).toBeTruthy();
    // The expanded class is applied via CSS module — check className contains 'expanded'
    expect(chevron.className).toMatch(/expanded/);
  });
});
