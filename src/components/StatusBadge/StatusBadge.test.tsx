import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders without crashing', () => {
    render(<StatusBadge />);
    expect(document.body).toBeTruthy();
  });
});
