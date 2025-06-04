import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link } from "react-router-dom";

const PurchaseSuccess = () => {
  const location = useLocation();
  const orderId = "26470";
  const { items, total } = location.state || {};

  if (!orderId) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No order data found.
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 2, py: 6, maxWidth: 600, mx: "auto" }}>
      <Box textAlign="center" mb={4}>
        <Box
          sx={{
            width: 96,
            height: 96,
            backgroundColor: "success.light",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: 48, color: "white" }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Purchase Successful!
        </Typography>
        <Typography variant="body1">
          Thank you for your purchase. Your order has been successfully
          processed.
        </Typography>
      </Box>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Inventory2Icon sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="h6">Order Details</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="text.secondary">Order Number:</Typography>
            <Typography>#{orderId}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="text.secondary">Items:</Typography>
            <Typography>{items} products</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Total Paid:</Typography>
            <Typography>${total?.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            What's next?
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            • You will receive a confirmation email shortly. <br />
            • Your order will be processed within 1-2 business days. <br />• You
            will receive tracking information soon.
          </Typography>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button variant="outlined" disabled>
          View My Orders
        </Button>
        <Button
          className="btn-gradient"
          component={Link}
          to="/"
          variant="contained"
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default PurchaseSuccess;
