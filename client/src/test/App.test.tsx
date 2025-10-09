import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders title', () => {
    render(<App />);
    expect(screen.getByText('google calendar todo')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'googleでログイン' })).toBeInTheDocument();
  });

  it('redirects to auth endpoint when login button is clicked', () => {
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    render(<App />);

    const loginButton = screen.getByRole('button', { name: 'googleでログイン' });
    fireEvent.click(loginButton);

    expect(mockLocation.href).toBe('/auth');
  });
});
