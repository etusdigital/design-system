import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card>content</Card>);
    expect(document.body).toBeTruthy();
  });
});
