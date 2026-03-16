import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToggleGroup } from './index';

describe('ToggleGroup', () => {
  it('renders without crashing', () => {
    render(<ToggleGroup />);
    expect(document.body).toBeTruthy();
  });
});
