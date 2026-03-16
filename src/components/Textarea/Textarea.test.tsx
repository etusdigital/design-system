import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './index';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(document.body).toBeTruthy();
  });
});
