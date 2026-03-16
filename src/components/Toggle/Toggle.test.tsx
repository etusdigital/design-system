import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toggle } from './index';

describe('Toggle', () => {
  it('renders without crashing', () => {
    render(<Toggle />);
    expect(document.body).toBeTruthy();
  });
});
