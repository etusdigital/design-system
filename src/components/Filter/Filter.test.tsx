import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Filter } from './index';

describe('Filter', () => {
  it('renders without crashing', () => {
    render(<Filter />);
    expect(document.body).toBeTruthy();
  });
});
