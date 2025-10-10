import { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import InputForm from './form';


interface TodoItem {
  id: string;
  summary: string;
  start: string;
  end: string;
}

export default function Todo() {
  const [todoData, setTodoData] = useState<TodoItem[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandle = (id: string) => {
    setTodoData(todoData.filter((item) => item.id !== id));
  }

  const editHandle = (todo: TodoItem) => {
    setEditingTodo(todo);
  }

  const addTodo = (summary: string, start: string, end: string) => {
    const newId = todoData.length > 0 ? String(Math.max(...todoData.map(item => Number(item.id))) + 1) : '1';
    const newTodo = {
      id: newId,
      summary,
      start,
      end,
    };
    setTodoData([...todoData, newTodo]);
  }

  const updateTodo = (id: string, summary: string, start: string, end: string) => {
    setTodoData(todoData.map(item =>
      item.id === id ? { ...item, summary, start, end } : item
    ));
    setEditingTodo(null);
  }
  const getCalendarEvent = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/api/event', { withCredentials: true })
      setTodoData(res.data.events)
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
;
  }

  useEffect(() => {
    getCalendarEvent();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <InputForm
        onAddTodo={addTodo}
        onUpdateTodo={updateTodo}
        editingTodo={editingTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto' }}>
          {todoData.map((e) => {
            return (
              <Fragment key={e.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={e.summary}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          {e.start}
                          {' - '}
                          {e.end}
                        </Typography>
                      </Fragment>
                    }
                  />
                  <IconButton aria-label="edit" onClick={() => editHandle(e)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteHandle(e.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </Fragment>
            )
          })}
        </List>
      )}
    </div>
  );
}