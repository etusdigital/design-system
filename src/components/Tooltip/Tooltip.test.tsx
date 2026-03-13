import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders without crashing', () => {
    render(<Tooltip />);
    expect(document.body).toBeTruthy();
  });
});
