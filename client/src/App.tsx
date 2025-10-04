import { Button, Typography, Container, Box } from '@mui/material'

function App() {
  return (
    <Container>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
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
