import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip } from './Tooltip';

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <Tooltip labelValue="Test tooltip">
        <span>Hover me</span>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip content initially', () => {
    render(
      <Tooltip labelValue="Test tooltip">
        <span>Hover me</span>
      </Tooltip>
    );
    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip content on mouseenter', async () => {
    render(
      <Tooltip labelValue="Test tooltip">
        <span>Hover me</span>
      </Tooltip>
    );

    const container = screen.getByText('Hover me').closest('div')!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.getByText('Test tooltip')).toBeInTheDocument();
  });

  it('hides tooltip content on mouseleave after transition', async () => {
    render(
      <Tooltip labelValue="Test tooltip">
        <span>Hover me</span>
      </Tooltip>
    );

    const container = screen.getByText('Hover me').closest('div')!;

    fireEvent.mouseEnter(container);
    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.getByText('Test tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(container);
    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
  });

  it('accepts className prop on wrapper div', () => {
    render(
      <Tooltip labelValue="Test tooltip" className="custom-class">
        <span>Hover me</span>
      </Tooltip>
    );
    const container = screen.getByText('Hover me').closest('div')!;
    expect(container).toHaveClass('custom-class');
  });

  it('renders without crashing with default props', () => {
    const { container } = render(
      <Tooltip>
        <span>Hover me</span>
      </Tooltip>
    );
    expect(container).toBeInTheDocument();
  });

  it('has Tooltip.Label compound sub-component', () => {
    expect(Tooltip.Label).toBeDefined();
    expect(typeof Tooltip.Label).toBe('function');
  });

  it('Tooltip.Label renders children', () => {
    render(
      <Tooltip.Label>
        <span>Label content</span>
      </Tooltip.Label>
    );
    expect(screen.getByText('Label content')).toBeInTheDocument();
  });

  it('hides tooltip on wheel event', async () => {
    render(
      <Tooltip labelValue="Scroll tooltip">
        <span>Hover me</span>
      </Tooltip>
    );

    const container = screen.getByText('Hover me').closest('div')!;

    fireEvent.mouseEnter(container);
    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.getByText('Scroll tooltip')).toBeInTheDocument();

    fireEvent.wheel(document);
    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.queryByText('Scroll tooltip')).not.toBeInTheDocument();
  });

  it('renders with labelValue prop text', async () => {
    render(
      <Tooltip labelValue="My tooltip text">
        <span>Hover target</span>
      </Tooltip>
    );

    const container = screen.getByText('Hover target').closest('div')!;
    fireEvent.mouseEnter(container);
    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.getByText('My tooltip text')).toBeInTheDocument();
  });

  it('supports all position values without error', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    positions.forEach((pos) => {
      const { unmount } = render(
        <Tooltip labelValue="Tooltip" position={pos}>
          <span>Hover {pos}</span>
        </Tooltip>
      );
      expect(screen.getByText(`Hover ${pos}`)).toBeInTheDocument();
      unmount();
    });
  });
});
