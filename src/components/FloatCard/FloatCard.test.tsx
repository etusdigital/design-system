import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FloatCard } from './FloatCard';

describe('FloatCard', () => {
  it('renders without crashing', () => {
    render(<FloatCard />);
    expect(document.body).toBeTruthy();
  });
});
