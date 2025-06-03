import { ShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ShoppingCartOutlined color="disabled"
          sx={{ fontSize:"5rem" }}
        ></ShoppingCartOutlined>
        <Typography variant="h6"  color="textSecondary" sx={{fontWeight: 600 , mt: 2, textAlign:"center"}}>Your cart is empty</Typography>
          <Typography variant="body2" color="textSecondary" mt={1} textAlign={"center"}>Add some products to start</Typography>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ mt: 3 }}
          component={Link}
          to="/"
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}

export default EmptyCart;
