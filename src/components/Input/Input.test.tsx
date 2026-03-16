import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './index';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(document.body).toBeTruthy();
  });
});
