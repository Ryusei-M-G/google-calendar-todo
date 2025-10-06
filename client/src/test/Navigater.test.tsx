import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navigater from '../components/Navigater';

describe('Navigater', () => {
  it('renders Home link', () => {
    render(
      <BrowserRouter>
        <Navigater />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('Home link has correct href', () => {
    render(
      <BrowserRouter>
        <Navigater />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders Todo link', () => {
    render(
      <BrowserRouter>
        <Navigater />
      </BrowserRouter>
    );

    const todoLink = screen.getByRole('link', { name: /todo/i });
    expect(todoLink).toBeInTheDocument();
  });

  it('Todo link has correct href', () => {
    render(
      <BrowserRouter>
        <Navigater />
      </BrowserRouter>
    );

    const todoLink = screen.getByRole('link', { name: /todo/i });
    expect(todoLink).toHaveAttribute('href', '/todo');
  });
});