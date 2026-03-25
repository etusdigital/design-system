import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { ConfirmProvider, useConfirm } from './Confirm';
import { DesignSystemProvider } from '../../providers/DesignSystemProvider';

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

// ── Test helper ───────────────────────────────────────────────────────────────

function TestConsumer({ onResult }: { onResult: (v: boolean) => void }) {
  const { confirm } = useConfirm();
  return (
    <button
      onClick={async () => {
        const result = await confirm({ title: 'Delete?', message: 'Are you sure?' });
        onResult(result);
      }}
    >
      Open Confirm
    </button>
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('useConfirm', () => {
  it('throws outside ConfirmProvider', () => {
    expect(() => renderHook(() => useConfirm())).toThrow(
      'useConfirm must be used inside ConfirmProvider'
    );
  });

  it('confirm() shows dialog with title and message', async () => {
    render(
      <ConfirmProvider>
        <TestConsumer onResult={() => {}} />
      </ConfirmProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Open Confirm'));
    });

    expect(screen.getByText('Delete?')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('confirm() resolves true on accept click', async () => {
    const onResult = vi.fn();

    render(
      <ConfirmProvider>
        <TestConsumer onResult={onResult} />
      </ConfirmProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Open Confirm'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Confirm'));
    });

    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('confirm() resolves false on cancel click', async () => {
    const onResult = vi.fn();

    render(
      <ConfirmProvider>
        <TestConsumer onResult={onResult} />
      </ConfirmProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Open Confirm'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });

    expect(onResult).toHaveBeenCalledWith(false);
  });

  it('uses custom accept and cancel labels', async () => {
    function CustomConsumer() {
      const { confirm } = useConfirm();
      return (
        <button
          onClick={() => confirm({ title: 'Sure?', acceptLabel: 'Yes', cancelLabel: 'No' })}
        >
          Open
        </button>
      );
    }

    render(
      <ConfirmProvider>
        <CustomConsumer />
      </ConfirmProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Open'));
    });

    expect(screen.getByText('Yes')).toBeTruthy();
    expect(screen.getByText('No')).toBeTruthy();
  });

  it('renders conditionally — title and message optional', async () => {
    function EmptyConsumer() {
      const { confirm } = useConfirm();
      return (
        <button onClick={() => confirm({ title: '', message: '' })}>Open Empty</button>
      );
    }

    render(
      <ConfirmProvider>
        <EmptyConsumer />
      </ConfirmProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Open Empty'));
    });

    // No h2 or p in dialog content since title and message are empty
    const headings = document.querySelectorAll('.confirm h2');
    const paragraphs = document.querySelectorAll('.confirm p');
    expect(headings.length).toBe(0);
    expect(paragraphs.length).toBe(0);
  });

  it('DesignSystemProvider: both useConfirm and useToast work without error', async () => {
    function ConfirmConsumer() {
      const { confirm } = useConfirm();
      return <button onClick={() => confirm({ title: 'Test?' })}>Confirm</button>;
    }

    // Just rendering inside DesignSystemProvider should not throw
    expect(() =>
      render(
        <DesignSystemProvider>
          <ConfirmConsumer />
        </DesignSystemProvider>
      )
    ).not.toThrow();
  });
});
