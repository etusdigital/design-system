import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DatePicker } from './index';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker />);
    expect(document.body).toBeTruthy();
  });
});
