import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>content</Alert>);
    expect(document.body).toBeTruthy();
  });
});
