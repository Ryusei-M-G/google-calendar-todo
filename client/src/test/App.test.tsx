import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
    delete (window as any).location;
    window.location = { href: '' } as any;

    render(<App />);

    const loginButton = screen.getByRole('button', { name: 'googleでログイン' });
    fireEvent.click(loginButton);

    expect(window.location.href).toBe('http://localhost:3000/auth');
  });
});
