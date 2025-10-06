import { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



const mockData = [
  {
    id: 1,
    summary: 'testData',
    startDate: '2025-10-25',
    endDate: '2025-10-26',
  },
  {
    id: 2,
    summary: 'testData2',
    startDate: '2025-10-25',
    endDate: '2025-10-26',
  }
]
export default function Todo() {
  const [todoData,] = useState(mockData);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', textAlign: 'center' }}>
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
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </Fragment>
        )
      })}
    </List>
  );
}