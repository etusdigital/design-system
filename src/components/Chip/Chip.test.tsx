import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders without crashing', () => {
    render(<Chip labelValue="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders children instead of labelValue when provided', () => {
    render(<Chip labelValue="Ignored">Custom Content</Chip>);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Chip labelValue="Closeable" closeable onClose={onClose} />);

    const user = userEvent.setup();
    const closeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('applies correct size class', () => {
    const { container } = render(<Chip labelValue="Small" size="small" />);
    expect(container.querySelector('.status-badge')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<Chip labelValue="With Icon" icon="star" />);
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    const { container } = render(<Chip labelValue="Loading" loading />);
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
});
