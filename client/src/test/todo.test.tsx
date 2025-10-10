import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Todo from '../components/todo';
import axios from 'axios';

vi.mock('axios');

describe('Todo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty todo list initially', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: { events: [] } });
    render(<Todo />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost/api/event');
    });
  });

  it('renders todo items from API', async () => {
    const mockEvents = [
      { id: '1', summary: 'testData', start: '2025-10-25 09:00', end: '2025-10-26 18:00' },
      { id: '2', summary: 'testData2', start: '2025-10-25 10:30', end: '2025-10-26 17:00' }
    ];

    vi.mocked(axios.get).mockResolvedValue({ data: { events: mockEvents } });
    render(<Todo />);

    await waitFor(() => {
      expect(screen.getByText('testData')).toBeInTheDocument();
      expect(screen.getByText('testData2')).toBeInTheDocument();
    });
  });

  it('deletes item when delete button is clicked', async () => {
    const mockEvents = [
      { id: '1', summary: 'testData', start: '2025-10-25 09:00', end: '2025-10-26 18:00' },
      { id: '2', summary: 'testData2', start: '2025-10-25 10:30', end: '2025-10-26 17:00' }
    ];

    vi.mocked(axios.get).mockResolvedValue({ data: { events: mockEvents } });
    render(<Todo />);

    await waitFor(() => {
      expect(screen.getByText('testData')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('testData')).not.toBeInTheDocument();
    expect(screen.getByText('testData2')).toBeInTheDocument();
  });
});
