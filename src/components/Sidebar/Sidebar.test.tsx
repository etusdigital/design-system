import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar } from './index';

const options = [
  { label: 'Home', value: 'home', icon: 'home' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  { label: 'Profile', value: 'profile', icon: 'person' },
];

describe('Sidebar', () => {
  it('mounts without crashing', () => {
    render(<Sidebar options={[]} />);
    expect(document.body).toBeTruthy();
  });

  it('renders options passed via props', () => {
    render(<Sidebar options={options} expanded />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('calls onChange when an option is clicked', () => {
    const handleChange = vi.fn();
    render(<Sidebar options={options} expanded onChange={handleChange} />);
    fireEvent.click(screen.getByText('Settings'));
    expect(handleChange).toHaveBeenCalledWith('settings');
  });

  it('collapsed mode hides option labels', () => {
    render(<Sidebar options={options} />);
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('expanded mode shows option labels', () => {
    render(<Sidebar options={options} expanded />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
