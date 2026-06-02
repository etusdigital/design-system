import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActionCard } from './ActionCard';

describe('ActionCard', () => {
  it('renders without crashing', () => {
    render(<ActionCard>content</ActionCard>);
    expect(document.body).toBeTruthy();
  });
});
