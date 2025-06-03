import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { Product } from "../types/product";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cart";
import IncrementDecrementButton from "./IncrementDecrementButton";

const ellipsisSx = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function ItemCart(props: CartItem) {
  const { removeItem, decrementItem, addToCart } = useCart();

  const totalPrice = (props.price * props.quantity).toFixed(2);

  const handleDelete = () => {
    removeItem(props.id);
  };

  const handleIncrement = () => {
    addToCart(props);
  };

  const handleDecrement = () => {
    decrementItem(props);
  };

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexWrap: "no-wrap",
        p: 2,
        gap: 2,
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image={props.image}
        alt={props.title}
        sx={{
          width: 80,
          height: 80,
          borderRadius: 3,
          objectFit: "fill",
          flexShrink: 0,
        }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={ellipsisSx}>
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ellipsisSx}>
          {" "}
          {props.description}
        </Typography>
        <Typography className="text-gradient" fontWeight="bold" mt={1}>
          ${totalPrice}{" "}
        </Typography>
      </Box>

      <IncrementDecrementButton product={props} spacingParam={3} />
      <Box>
        <IconButton size="small" onClick={handleDelete}>
          <CloseRoundedIcon color="disabled" />
        </IconButton>
      </Box>
    </Card>
  );
}

export default ItemCart;
