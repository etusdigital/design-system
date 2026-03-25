import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Group, useGroupContext } from './Group';

function TestConsumer() {
  const ctx = useGroupContext();
  return (
    <div>
      <span data-testid="value">{String(ctx?.value)}</span>
      <span data-testid="disabled">{String(ctx?.disabled)}</span>
      <button onClick={() => ctx?.select('test-value')}>Select</button>
    </div>
  );
}

describe('Group', () => {
  it('renders without crashing', () => {
    render(<Group />);
    expect(document.body).toBeTruthy();
  });

  it('provides GroupContext with initial value to children', () => {
    render(
      <Group defaultValue="initial">
        <TestConsumer />
      </Group>
    );
    expect(screen.getByTestId('value').textContent).toBe('initial');
  });

  it('provides disabled=false by default', () => {
    render(
      <Group>
        <TestConsumer />
      </Group>
    );
    expect(screen.getByTestId('disabled').textContent).toBe('false');
  });

  it('provides disabled=true when disabled prop is set', () => {
    render(
      <Group disabled>
        <TestConsumer />
      </Group>
    );
    expect(screen.getByTestId('disabled').textContent).toBe('true');
  });

  it('calls onChange when select() is called from context', () => {
    const handleChange = vi.fn();
    render(
      <Group defaultValue={null} onChange={handleChange}>
        <TestConsumer />
      </Group>
    );

    fireEvent.click(screen.getByText('Select'));
    expect(handleChange).toHaveBeenCalledWith('test-value');
  });

  it('updates value in context when select() is called', () => {
    render(
      <Group defaultValue={null}>
        <TestConsumer />
      </Group>
    );

    expect(screen.getByTestId('value').textContent).toBe('null');
    fireEvent.click(screen.getByText('Select'));
    expect(screen.getByTestId('value').textContent).toBe('test-value');
  });

  it('useGroupContext returns null outside Group', () => {
    render(<TestConsumer />);
    expect(screen.getByTestId('value').textContent).toBe('undefined');
  });

  it('renders children', () => {
    render(
      <Group>
        <span>Group child</span>
      </Group>
    );
    expect(screen.getByText('Group child')).toBeInTheDocument();
  });
});
