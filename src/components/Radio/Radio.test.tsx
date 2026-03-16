import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Radio } from './index';

describe('Radio', () => {
  it('renders without crashing', () => {
    render(<Radio />);
    expect(document.body).toBeTruthy();
  });
});
