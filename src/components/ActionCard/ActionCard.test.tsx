import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActionCard } from './ActionCard';

describe('ActionCard', () => {
  it('renders without crashing', () => {
    render(<ActionCard>content</ActionCard>);
    expect(document.body).toBeTruthy();
  });

  it('delete icon is focusable', () => {
    render(<ActionCard>content</ActionCard>);
    expect(screen.getByLabelText('Delete')).toHaveAttribute('tabindex', '0');
  });

  it('calls onDelete on click, Enter and Space', () => {
    const onDelete = vi.fn();
    render(<ActionCard onDelete={onDelete}>content</ActionCard>);
    const deleteIcon = screen.getByLabelText('Delete');
    fireEvent.click(deleteIcon);
    fireEvent.keyUp(deleteIcon, { key: 'Enter' });
    fireEvent.keyUp(deleteIcon, { key: ' ' });
    expect(onDelete).toHaveBeenCalledTimes(3);
  });
});
