import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import {  Badge, Box, } from "@mui/material";


function ResponsiveAppBar() {
  const { isLoggedIn, user } = useAuth();
  const { getTotalQuantity } = useCart();
  const cartItemCount = getTotalQuantity(); 

  return (
    <AppBar color="primary" position="sticky" elevation={3} >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Mi Tienda
        </Typography>

        {/* Store */}
        <Button color="inherit" component={Link} to="/">
          Store
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Login / User */}
          {!isLoggedIn ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Typography
                component={Link}
                to={"/profile"}
                variant="body1"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "inherit",
                  },
                  cursor: "pointer",
                }}
              >
                Hi, {user?.username}!
              </Typography>
            </>
          )}

          {/* Cart */}
          <IconButton color="inherit" component={Link} to="/carrito">
            {cartItemCount > 0 ? (
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartOutlinedIcon fontSize="small" />
              </Badge>
            ) : (
              <ShoppingCartOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
