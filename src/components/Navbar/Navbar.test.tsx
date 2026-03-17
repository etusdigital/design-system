import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './index';

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(document.body).toBeTruthy();
  });
});
