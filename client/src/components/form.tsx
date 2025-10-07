import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface TodoItem {
  id: number;
  summary: string;
  startDate: string;
  endDate: string;
}

interface InputFormProps {
  onAddTodo: (summary: string, startDate: string, endDate: string) => void;
  onUpdateTodo: (id: number, summary: string, startDate: string, endDate: string) => void;
  editingTodo: TodoItem | null;
  onCancelEdit: () => void;
}

const InputForm = ({ onAddTodo, onUpdateTodo, editingTodo, onCancelEdit }: InputFormProps) => {
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (editingTodo) {
      setSummary(editingTodo.summary);
      setStartDate(dayjs(editingTodo.startDate, 'YYYY-MM-DD HH:mm'));
      setEndDate(dayjs(editingTodo.endDate, 'YYYY-MM-DD HH:mm'));
    } else {
      setSummary('');
      setStartDate(dayjs());
      setEndDate(dayjs());
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (summary && startDate && endDate) {
      if (editingTodo) {
        onUpdateTodo(
          editingTodo.id,
          summary,
          startDate.format('YYYY-MM-DD HH:mm'),
          endDate.format('YYYY-MM-DD HH:mm')
        );
      } else {
        onAddTodo(
          summary,
          startDate.format('YYYY-MM-DD HH:mm'),
          endDate.format('YYYY-MM-DD HH:mm')
        );
      }
      setSummary('');
      setStartDate(dayjs());
      setEndDate(dayjs());
    }
  };

  const handleCancel = () => {
    setSummary('');
    setStartDate(dayjs());
    setEndDate(dayjs());
    onCancelEdit();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          maxWidth: 400,
          margin: '0 auto',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="summary"
          variant="outlined"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" type="submit" sx={{ flex: 1 }}>
            {editingTodo ? '更新' : '追加'}
          </Button>
          {editingTodo && (
            <Button variant="outlined" onClick={handleCancel} sx={{ flex: 1 }}>
              キャンセル
            </Button>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default InputForm;