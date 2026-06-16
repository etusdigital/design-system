import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children when value=true', async () => {
    render(
      <Dialog value={true}>
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    expect(screen.getByText('content')).toBeTruthy();
  });

  it('does not render children when value=false', () => {
    render(
      <Dialog value={false}>
        <p>content</p>
      </Dialog>
    );
    expect(screen.queryByText('content')).toBeNull();
  });

  it('calls onChange(false) on overlay click when noOutsideClose=false', async () => {
    const onChange = vi.fn();
    render(
      <Dialog value={true} onChange={onChange}>
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange on overlay click when noOutsideClose=true', async () => {
    const onChange = vi.fn();
    render(
      <Dialog value={true} noOutsideClose={true} onChange={onChange}>
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('adds no-outside-close-warning class on overlay click when noOutsideClose=true', async () => {
    render(
      <Dialog value={true} noOutsideClose={true}>
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    const dialogEl = document.querySelector('.dialog');
    expect(dialogEl?.classList.contains('no-outside-close-warning')).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(dialogEl?.classList.contains('no-outside-close-warning')).toBe(false);
  });

  it('applies custom width and height', async () => {
    render(
      <Dialog value={true} width="400px" height="300px">
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const dialogEl = document.querySelector('.dialog') as HTMLElement;
    expect(dialogEl).toBeTruthy();
    expect(dialogEl.style.width).toBe('400px');
    expect(dialogEl.style.height).toBe('300px');
  });

  it('applies custom zIndex to dialog (zIndex + 1)', async () => {
    render(
      <Dialog value={true} zIndex={2000}>
        <p>content</p>
      </Dialog>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const dialogEl = document.querySelector('.dialog') as HTMLElement;
    expect(dialogEl).toBeTruthy();
    expect(dialogEl.style.zIndex).toBe('2001');
  });

  it('renders in portal (document.body)', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <Dialog value={true}>
        <p>test</p>
      </Dialog>,
      { container }
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    expect(backdrop?.parentElement).toBe(document.body);
    document.body.removeChild(container);
  });
});
