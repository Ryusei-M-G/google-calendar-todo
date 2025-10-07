import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputForm from '../components/form';

describe('InputForm', () => {
  it('renders form fields', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm onAddTodo={mockAddTodo} />);

    expect(screen.getByLabelText('summary')).toBeInTheDocument();
    expect(screen.getAllByText('Start Date').length).toBeGreaterThan(0);
    expect(screen.getAllByText('End Date').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });

  it('updates summary field when user types', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: 'New Todo' } });

    expect(summaryInput.value).toBe('New Todo');
  });

  it('calls onAddTodo when form is submitted', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary');
    fireEvent.change(summaryInput, { target: { value: 'Test Todo' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalled();
  });

  it('resets form after submission', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: 'Test Todo' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(summaryInput.value).toBe('');
  });

  it('does not submit when summary is empty', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
