import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Drawer } from './Drawer';

let rafId = 0;
const rafCallbacks: Map<number, FrameRequestCallback> = new Map();
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
  const id = ++rafId;
  rafCallbacks.set(id, cb);
  return id;
});
vi.stubGlobal('cancelAnimationFrame', (id: number) => {
  rafCallbacks.delete(id);
});

describe('Drawer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    rafCallbacks.clear();
  });

  it('renders children when value=true', async () => {
    render(
      <Drawer value={true}>
        <p>drawer content</p>
      </Drawer>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    expect(screen.getByText('drawer content')).toBeTruthy();
  });

  it('does not render children when value=false', () => {
    render(
      <Drawer value={false}>
        <p>drawer content</p>
      </Drawer>
    );
    expect(screen.queryByText('drawer content')).toBeNull();
  });

  it('calls onChange(false) on overlay backdrop click', async () => {
    const onChange = vi.fn();
    render(
      <Drawer value={true} onChange={onChange}>
        <p>drawer content</p>
      </Drawer>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when noOutsideClose=true', async () => {
    const onChange = vi.fn();
    render(
      <Drawer value={true} noOutsideClose={true} onChange={onChange}>
        <p>drawer content</p>
      </Drawer>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const backdrop = document.querySelector('.overlay-backdrop');
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies .right class by default', async () => {
    render(
      <Drawer value={true}>
        <p>content</p>
      </Drawer>
    );
    await act(async () => {
      vi.runAllTimers();
    });
    const drawerEl = document.querySelector('.drawer');
    expect(drawerEl?.classList.contains('right')).toBe(true);
  });

  it('applies position class for each position value', async () => {
    const positions = ['left', 'top', 'bottom'] as const;
    for (const pos of positions) {
      const { unmount } = render(
        <Drawer value={true} position={pos}>
          <p>content</p>
        </Drawer>
      );
      await act(async () => {
        vi.runAllTimers();
      });
      const drawerEl = document.querySelector('.drawer');
      expect(drawerEl?.classList.contains(pos)).toBe(true);
      unmount();
    }
  });

  it('renders in portal (document.body)', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <Drawer value={true}>
        <p>portal test</p>
      </Drawer>,
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
