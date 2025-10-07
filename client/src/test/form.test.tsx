import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputForm from '../components/form';

describe('InputForm', () => {
  const defaultProps = {
    onAddTodo: vi.fn(),
    onUpdateTodo: vi.fn(),
    editingTodo: null,
    onCancelEdit: vi.fn(),
  };

  it('renders form fields', () => {
    render(<InputForm {...defaultProps} />);

    expect(screen.getByLabelText('summary')).toBeInTheDocument();
    expect(screen.getAllByText('Start Date').length).toBeGreaterThan(0);
    expect(screen.getAllByText('End Date').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });

  it('updates summary field when user types', () => {
    render(<InputForm {...defaultProps} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: 'New Todo' } });

    expect(summaryInput.value).toBe('New Todo');
  });

  it('calls onAddTodo when form is submitted', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm {...defaultProps} onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary');
    fireEvent.change(summaryInput, { target: { value: 'Test Todo' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalled();
  });

  it('resets form after submission', () => {
    render(<InputForm {...defaultProps} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: 'Test Todo' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(summaryInput.value).toBe('');
  });

  it('does not submit when summary is empty', () => {
    const mockAddTodo = vi.fn();
    render(<InputForm {...defaultProps} onAddTodo={mockAddTodo} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    fireEvent.change(summaryInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('shows update button and cancel button in edit mode', () => {
    const editingTodo = {
      id: 1,
      summary: 'Test Todo',
      startDate: '2025-10-25 09:00',
      endDate: '2025-10-26 18:00',
    };
    render(<InputForm {...defaultProps} editingTodo={editingTodo} />);

    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
  });

  it('populates form with editing todo data', () => {
    const editingTodo = {
      id: 1,
      summary: 'Test Todo',
      startDate: '2025-10-25 09:00',
      endDate: '2025-10-26 18:00',
    };
    render(<InputForm {...defaultProps} editingTodo={editingTodo} />);

    const summaryInput = screen.getByLabelText('summary') as HTMLInputElement;
    expect(summaryInput.value).toBe('Test Todo');
  });

  it('calls onUpdateTodo when form is submitted in edit mode', () => {
    const mockUpdateTodo = vi.fn();
    const editingTodo = {
      id: 1,
      summary: 'Test Todo',
      startDate: '2025-10-25 09:00',
      endDate: '2025-10-26 18:00',
    };
    render(<InputForm {...defaultProps} editingTodo={editingTodo} onUpdateTodo={mockUpdateTodo} />);

    const summaryInput = screen.getByLabelText('summary');
    fireEvent.change(summaryInput, { target: { value: 'Updated Todo' } });

    const submitButton = screen.getByRole('button', { name: '更新' });
    fireEvent.click(submitButton);

    expect(mockUpdateTodo).toHaveBeenCalledWith(1, 'Updated Todo', expect.any(String), expect.any(String));
  });

  it('calls onCancelEdit when cancel button is clicked', () => {
    const mockCancelEdit = vi.fn();
    const editingTodo = {
      id: 1,
      summary: 'Test Todo',
      startDate: '2025-10-25 09:00',
      endDate: '2025-10-26 18:00',
    };
    render(<InputForm {...defaultProps} editingTodo={editingTodo} onCancelEdit={mockCancelEdit} />);

    const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
    fireEvent.click(cancelButton);

    expect(mockCancelEdit).toHaveBeenCalled();
  });
});
