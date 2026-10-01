import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    render(<Avatar />);
    expect(document.body).toBeTruthy();
  });

  it('shows initials when no src is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows image when src is provided', () => {
    render(
      <Avatar name="John Doe" src="https://example.com/image.jpg" />
    );

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('sets aria-hidden on initials when image is shown', () => {
    render(<Avatar name="John Doe" src="https://example.com/photo.jpg" />);
    const span = screen.getByText('JD');
    expect(span).toHaveAttribute('aria-hidden', 'true');
  });
});
