import { Button, Typography, Container, Box } from '@mui/material'

function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MUI最小構成
        </Typography>
        <Button variant="outlined" color="primary">
          サンプルボタン
        </Button>
      </Box>
    </Container>
  )
}

export default App
