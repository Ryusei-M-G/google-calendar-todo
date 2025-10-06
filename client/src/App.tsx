import { Button, Typography, Container, Box } from '@mui/material'

function App() {

  const loginHandle = () =>{
    console.log('ログイン（モック）');
    // window.location.href = 'http://localhost:3000/auth';
  }
  return (
    <Container style={{textAlign:'center'}} >
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          google calendar todo
        </Typography>
        <Button variant="contained" color="primary" onClick={loginHandle}>
          googleでログイン
        </Button>
      </Box>
    </Container>
  )
}

export default App
