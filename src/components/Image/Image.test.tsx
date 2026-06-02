import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Image } from './Image';

describe('Image', () => {
  it('renders without crashing', () => {
    render(<Image />);
    expect(document.body).toBeTruthy();
  });
});
