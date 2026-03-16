import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TagInput } from './index';

describe('TagInput', () => {
  it('renders without crashing', () => {
    render(<TagInput />);
    expect(document.body).toBeTruthy();
  });
});
