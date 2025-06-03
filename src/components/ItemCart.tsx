import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useCart } from "../hooks/useCart";
import type { CartItem } from "../types/cart";
import IncrementDecrementButton from "./IncrementDecrementButton";

const ellipsisSx = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function ItemCart(props: CartItem) {
  const { removeItem } = useCart();

  const totalPrice = (props.price * props.quantity).toFixed(2);

  const handleDelete = () => {
    removeItem(props.id);
  };

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", xl: "nowrap" }, // wrap en móviles
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
      <Box sx={{ flexGrow: 1, minWidth: 100 }}>
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
        <IconButton size="small" onClick={handleDelete} sx={{ flexShrink: 0 }}>
          <CloseRoundedIcon color="disabled" />
        </IconButton>
      </Box>
    </Card>
  );
}

export default ItemCart;
