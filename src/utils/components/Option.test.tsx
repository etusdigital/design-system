import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Option } from './Option';

describe('Option', () => {
  it('renders without crashing', () => {
    render(<Option />);
    expect(document.body).toBeTruthy();
  });

  it('renders with role="option"', () => {
    render(<Option>Item</Option>);
    expect(screen.getByRole('option')).toBeInTheDocument();
  });

  it('has tabindex="0"', () => {
    render(<Option>Item</Option>);
    expect(screen.getByRole('option')).toHaveAttribute('tabindex', '0');
  });

  it('applies selected class when selected=true', () => {
    render(<Option selected>Item</Option>);
    expect(screen.getByRole('option')).toHaveClass('selected');
  });

  it('applies disabled class when disabled=true', () => {
    render(<Option disabled>Item</Option>);
    expect(screen.getByRole('option')).toHaveClass('disabled');
  });

  it('applies secondary class when secondary=true', () => {
    render(<Option secondary>Item</Option>);
    expect(screen.getByRole('option')).toHaveClass('secondary');
  });

  it('applies noHover class when noHover=true', () => {
    render(<Option noHover>Item</Option>);
    expect(screen.getByRole('option')).toHaveClass('noHover');
  });

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = vi.fn();
    render(<Option onClick={handleClick}>Item</Option>);
    fireEvent.click(screen.getByRole('option'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Option disabled onClick={handleClick}>Item</Option>);
    fireEvent.click(screen.getByRole('option'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders children', () => {
    render(<Option>My Option Text</Option>);
    expect(screen.getByText('My Option Text')).toBeInTheDocument();
  });
});
