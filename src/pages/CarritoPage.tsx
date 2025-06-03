import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import ItemCartList from "../components/ItemCartList";
import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";

import toast from "react-hot-toast";

function CarritoPage() {
  const { clearCart, items, total, getTotalQuantity } = useCart();
  const cartItemsCount = getTotalQuantity();
  const navigate = useNavigate();

  const handleCancelOrder = () => {
    clearCart();
  };

  const handleCheckOut = async () => {
    const loadingToast = toast.loading("Processing your order...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.dismiss(loadingToast);
    clearCart();

    /*  toast.dismiss(loadingToast); // Quitás el loading
      toast.success( "Successful Purchase! Thank you! ❤️", { duration: 3000, position: "top-center",   style: {
      background: "#2e7d32", // verde oscuro (éxito)
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      padding: "14px 20px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#2e7d32",
    }, }) */
    navigate("/carrito/success", {
      state: {
        
        items: cartItemsCount,
        total,
      },
    });
  };

  if (cartItemsCount == 0) return <EmptyCart></EmptyCart>;

  return (
    <Grid
      container
      spacing={4}
      sx={{
        mt: 0,
        pt: 6,
        pb: { xs: 4, sm: 8 },
        px: { xs: 0, sm: 15 }, // padding horizontal: 0 en mobile, 5 (40px) desde sm en adelante
      }}
    >
      {/* LISTA DE PRODUCTOS */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          <Divider />

          <ItemCartList cartItems={items} />

          {/* BOTONES */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button component={Link} to="/">
              Back
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelOrder}
            >
              Cancel
            </Button>
          </Box>
        </Card>
      </Grid>

      {/* RESUMEN DE COMPRA */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal ({cartItemsCount} items)</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography
              fontWeight="bold"
              fontSize="1.2rem"
              className="text-gradient"
            >
              Total
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize="1.2rem"
              className="text-gradient"
            >
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              className="btn-gradient"
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 1 }}
              component={Link}
              to="/"
            >
              Continue Shopping
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CarritoPage;
