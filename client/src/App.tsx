import { Button, Typography, Container, Box } from '@mui/material'

function App() {

  const loginHandle = () => {
    console.log('ログイン（モック）');
    // window.location.href = 'http://localhost:3000/auth';
  }
  return (
    <Container style={{ textAlign: 'center' }} >
      <Box component="section" sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        maxWidth: 800,
        margin: '0 auto',
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          google calendar todo
        </Typography>
        <Button variant="contained" color="primary" onClick={loginHandle} sx={{ margin: '0 auto', maxWidth: 200 }}>
          googleでログイン
        </Button>
      </Box>
    </Container>
  )
}

export default App
