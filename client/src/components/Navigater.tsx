import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigater = () => {
  return (
    <Container>
      <Box>
        <Button component={Link} to="/" variant="outlined">Home</Button>
      </Box>
    </Container>
  );
};

export default Navigater;
