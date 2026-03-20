import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Crop } from './index';

describe('Crop', () => {
  it('mounts without crashing', () => {
    render(<Crop />);
    expect(document.body).toBeTruthy();
  });
});
