import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Overlay } from './Overlay';

// Mock createPortal to render inline during tests
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Polyfill RAF/cAF at module level — jsdom does not provide them
// and vi.useRealTimers() removes them from beforeEach assignments.
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(() => cb(0), 0) as unknown as number;
}
if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
}

describe('Overlay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<Overlay />);
    expect(document.body).toBeTruthy();
  });

  it('does not render backdrop when value=false', () => {
    render(<Overlay value={false} />);
    expect(document.querySelector('.overlay-backdrop')).toBeNull();
  });

  it('renders backdrop when value=true', () => {
    render(<Overlay value={true} />);
    // isMounted becomes true immediately when value=true
    // createPortal is mocked to render inline in document.body
    expect(document.querySelector('.overlay-backdrop')).toBeInTheDocument();
  });

  it('renders children alongside backdrop', () => {
    const { getByText } = render(
      <Overlay value={true}>
        <span>Child content</span>
      </Overlay>
    );
    expect(getByText('Child content')).toBeInTheDocument();
  });

  it('calls onClick when backdrop is clicked', () => {
    const handleClick = vi.fn();
    render(<Overlay value={true} onClick={handleClick} />);

    const backdrop = document.querySelector('.overlay-backdrop');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(handleClick).toHaveBeenCalled();
  });
});
