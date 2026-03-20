import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { History } from './index';

describe('History', () => {
  it('mounts without crashing', () => {
    render(<History options={[]} />);
    expect(document.body).toBeTruthy();
  });
});
