import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { TagInput } from './index';

describe('TagInput', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<TagInput />);
    expect(document.body).toBeTruthy();
  });

  it('adds tag on Enter key', () => {
    render(<TagInput placeholder="Add a tag" />);
    const textarea = screen.getByPlaceholderText('Add a tag');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(screen.getByText('hello')).toBeTruthy();
  });

  it('prevents duplicate tags when allowDuplicate is false', () => {
    render(<TagInput defaultValue={['hello']} />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    // Should show duplicate error — badge count stays at 1
    const badges = document.querySelectorAll('[class*="statusBadge"]');
    expect(badges.length).toBe(1);
  });

  it('removes tag on backspace when textarea is empty', () => {
    render(<TagInput defaultValue={['tag1', 'tag2']} />);
    const textarea = document.querySelector('textarea')!;
    // Textarea is empty by default, pressing backspace should remove last tag
    fireEvent.keyDown(textarea, { key: 'Backspace' });
    expect(screen.queryByText('tag2')).toBeNull();
    expect(screen.getByText('tag1')).toBeTruthy();
  });

  it('splits paste by comma into multiple tags', () => {
    render(<TagInput />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.paste(textarea, {
      clipboardData: {
        getData: () => 'alpha,beta,gamma',
      },
    });
    expect(screen.getByText('alpha')).toBeTruthy();
    expect(screen.getByText('beta')).toBeTruthy();
    expect(screen.getByText('gamma')).toBeTruthy();
  });

  it('shows error message for duplicate and auto-dismisses after 2s', async () => {
    vi.useFakeTimers();
    render(<TagInput defaultValue={['hello']} />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    // Error message should appear
    expect(screen.getByText('Duplicated values are not allowed')).toBeTruthy();

    // Advance timers past 2 seconds — error should dismiss
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.queryByText('Duplicated values are not allowed')).toBeNull();
  });
});
