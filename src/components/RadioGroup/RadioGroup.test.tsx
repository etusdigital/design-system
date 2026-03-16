import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RadioGroup } from './index';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup />);
    expect(document.body).toBeTruthy();
  });
});
