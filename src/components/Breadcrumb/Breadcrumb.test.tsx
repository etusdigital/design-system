import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(<Breadcrumb />);
    expect(document.body).toBeTruthy();
  });
});
