import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Sidebar } from './index';

describe('Sidebar', () => {
  it('mounts without crashing', () => {
    render(<Sidebar options={[]} />);
    expect(document.body).toBeTruthy();
  });
});
