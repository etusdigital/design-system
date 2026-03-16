import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SelectContent } from './SelectContent';

describe('SelectContent', () => {
  it('renders without crashing', () => {
    render(<SelectContent />);
    expect(document.body).toBeTruthy();
  });

  it('renders search input when searchable and expanded', () => {
    render(<SelectContent searchable={true} expanded={true} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeTruthy();
  });

  it('renders icon when icon prop is provided', () => {
    const { container } = render(<SelectContent icon="arrow_drop_down" />);
    const icon = container.querySelector('.sc-icon');
    expect(icon).toBeTruthy();
  });

  it('search input is not rendered when not searchable', () => {
    render(<SelectContent searchable={false} expanded={true} />);
    expect(screen.queryByRole('searchbox')).toBeNull();
  });

  it('search input is not rendered when disabled', () => {
    render(<SelectContent searchable={true} disabled={true} expanded={true} />);
    expect(screen.queryByRole('searchbox')).toBeNull();
  });

  it('renders status slot content', () => {
    render(<SelectContent status={<span>Selected item</span>} />);
    expect(screen.getByText('Selected item')).toBeTruthy();
  });
});
