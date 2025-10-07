import { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import InputForm from './form';



const mockData = [
  {
    id: 1,
    summary: 'testData',
    startDate: '2025-10-25 09:00',
    endDate: '2025-10-26 18:00',
  },
  {
    id: 2,
    summary: 'testData2',
    startDate: '2025-10-25 10:30',
    endDate: '2025-10-26 17:00',
  }
]
export default function Todo() {
  const [todoData,setTodoData] = useState(mockData);

  const deleteHandle = (id: number) => {
    setTodoData(todoData.filter((item) => item.id !== id));
  }

  const addTodo = (summary: string, startDate: string, endDate: string) => {
    const newId = todoData.length > 0 ? Math.max(...todoData.map(item => item.id)) + 1 : 1;
    const newTodo = {
      id: newId,
      summary,
      startDate,
      endDate,
    };
    setTodoData([...todoData, newTodo]);
  }

  return (
    <div style={{textAlign:'center'}}>
    <InputForm onAddTodo={addTodo} />
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',margin: '0 auto'  }}>
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
                      {e.startDate}
                      {' - '}
                      {e.endDate}
                    </Typography>
                  </Fragment>
                }
              />
              <IconButton aria-label="delete" onClick={() => deleteHandle(e.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </Fragment>
        )
      })}
    </List>
    </div>
  );
}