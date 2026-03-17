import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TagSelect } from './index';

describe('TagSelect', () => {
  it('renders without crashing', () => {
    render(<TagSelect />);
    expect(document.body).toBeTruthy();
  });
});
