import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './index';

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination length={5} defaultValue={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('returns null when length is less than 1', () => {
    const { container } = render(<Pagination length={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('active page has active class', () => {
    render(<Pagination length={5} defaultValue={3} />);
    const pageButtons = screen.getAllByRole('button');
    // Find the button with text "3"
    const activeButton = pageButtons.find((btn) => btn.textContent === '3');
    expect(activeButton?.className).toContain('active');
  });

  it('calls onChange on page click', () => {
    const handleChange = vi.fn();
    render(<Pagination length={5} defaultValue={1} onChange={handleChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('prev button is disabled when on first page', () => {
    render(<Pagination length={5} defaultValue={1} />);
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('next button is disabled when on last page', () => {
    render(<Pagination length={5} defaultValue={5} />);
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('prev button navigates to previous page', () => {
    const handleChange = vi.fn();
    render(<Pagination length={5} defaultValue={3} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('next button navigates to next page', () => {
    const handleChange = vi.fn();
    render(<Pagination length={5} defaultValue={3} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('renders ellipsis for many pages', () => {
    render(<Pagination length={10} defaultValue={5} />);
    // Should show ellipsis (...) for pages far from current
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});
