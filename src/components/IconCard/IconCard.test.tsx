import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IconCard } from './IconCard';

describe('IconCard', () => {
  it('renders without crashing', () => {
    render(<IconCard>content</IconCard>);
    expect(document.body).toBeTruthy();
  });
});
