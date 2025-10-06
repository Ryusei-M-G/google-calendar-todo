import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Todo from '../components/todo';

describe('Todo', () => {
  it('renders todo items', () => {
    render(<Todo />);

    expect(screen.getByText('testData')).toBeInTheDocument();
    expect(screen.getByText('testData2')).toBeInTheDocument();
  });

  it('deletes item when delete button is clicked', () => {
    render(<Todo />);

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('testData')).not.toBeInTheDocument();
    expect(screen.getByText('testData2')).toBeInTheDocument();
  });
});
