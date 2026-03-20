import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Table } from './index';

describe('Table', () => {
  it('mounts without crashing', () => {
    render(<Table columns={[]} items={[]} />);
    expect(document.body).toBeTruthy();
  });
});
