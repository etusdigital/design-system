import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Profile } from './Profile';

describe('Profile', () => {
  it('renders without crashing', () => {
    render(<Profile />);
    expect(document.body).toBeTruthy();
  });
});
