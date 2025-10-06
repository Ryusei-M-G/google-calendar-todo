import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigater = () => {
  return (
    <Container sx={{textAlign:'center'}}>
      <Box sx={{padding:'1rem'}}>
        <Button component={Link} to="/" variant="outlined">Home</Button>
        <Button component={Link} to ="/todo" variant="outlined">todo</Button>
      </Box>
    </Container>
  );
};

export default Navigater;
