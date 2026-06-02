import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders without crashing', () => {
    render(<MetricCard>content</MetricCard>);
    expect(document.body).toBeTruthy();
  });
});
