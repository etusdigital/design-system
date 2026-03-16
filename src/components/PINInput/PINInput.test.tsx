import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PINInput } from './index';

describe('PINInput', () => {
  it('renders without crashing', () => {
    render(<PINInput />);
    expect(document.body).toBeTruthy();
  });
});
