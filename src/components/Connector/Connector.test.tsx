import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Connector } from './Connector';

describe('Connector', () => {
  it('renders without crashing', () => {
    render(<Connector>content</Connector>);
    expect(document.body).toBeTruthy();
  });
});
