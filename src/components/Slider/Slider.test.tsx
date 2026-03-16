import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './index';

describe('Slider', () => {
  it('renders without crashing', () => {
    render(<Slider />);
    expect(document.body).toBeTruthy();
  });
});
