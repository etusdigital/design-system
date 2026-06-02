import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label />);
    expect(document.body).toBeTruthy();
  });

  it('renders labelValue text', () => {
    render(<Label labelValue="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders required indicator when required=true', () => {
    render(<Label labelValue="Required Field" required />);
    expect(screen.getByText('Required Field')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('returns null when labelValue is not provided', () => {
    const { container } = render(<Label />);
    expect(container.firstChild).toBeNull();
  });
});
