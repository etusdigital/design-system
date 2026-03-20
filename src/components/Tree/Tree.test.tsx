import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Tree } from './index';

describe('Tree', () => {
  it('mounts without crashing', () => {
    render(<Tree options={[]} />);
    expect(document.body).toBeTruthy();
  });
});
