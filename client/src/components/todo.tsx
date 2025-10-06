import * as React from 'react';
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
    summary: 'testData'
  },
  {
    id: 2,
    summary: 'testData2'
  }
]
export default function Todo() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {mockData.map((e) => {
        return (
          <React.Fragment key={e.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={e.summary}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {e.summary}
                    </Typography>
                  </React.Fragment>
                }
              />
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </React.Fragment>
        )
      })}
    </List>
  );
}