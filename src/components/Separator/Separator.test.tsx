import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders without crashing', () => {
    render(<Separator />);
    expect(document.body).toBeTruthy();
  });
});
