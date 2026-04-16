import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders span with material-symbols-rounded class', () => {
    render(<Icon name="home" />);
    const span = screen.getByText('home');
    expect(span.tagName).toBe('SPAN');
    expect(span).toHaveClass('material-symbols-rounded');
  });

  it('renders icon name as text content', () => {
    render(<Icon name="settings" />);
    expect(screen.getByText('settings')).toBeInTheDocument();
  });

  it('applies custom className for size variants', () => {
    render(<Icon name="home" className="text-2xl" />);
    const span = screen.getByText('home');
    expect(span).toHaveClass('text-2xl');
  });

  it('renders icon with default classes only when no extra props', () => {
    render(<Icon name="home" />);
    const span = screen.getByText('home');
    expect(span).toHaveClass('material-symbols-rounded');
    expect(span).toHaveClass('icon');
  });

  it('adds filled class when filled=true', () => {
    render(<Icon name="home" filled={true} />);
    const span = screen.getByText('home');
    expect(span).toHaveClass('filled');
  });

  it('does not add filled class when filled=false', () => {
    render(<Icon name="home" filled={false} />);
    const span = screen.getByText('home');
    expect(span).not.toHaveClass('filled');
  });

  it('accepts additional className', () => {
    render(<Icon name="home" className="custom-class" />);
    const span = screen.getByText('home');
    expect(span).toHaveClass('custom-class');
  });

  it('renders span with icon class', () => {
    render(<Icon name="home" />);
    const span = screen.getByText('home');
    expect(span).toHaveClass('icon');
  });

  it('renders span when name is undefined', () => {
    const { container } = render(<Icon />);
    const span = container.querySelector('span.material-symbols-rounded');
    expect(span).toBeInTheDocument();
  });
});
