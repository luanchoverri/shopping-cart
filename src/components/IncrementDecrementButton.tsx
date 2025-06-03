import {  IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../hooks/useCart";
import type { Product } from "../types/product";


interface IncrementDecrementButtonProps {
  product: Product;
  spacingParam?: number;
}

function IncrementDecrementButton({
  product,
  spacingParam = 5,
}: IncrementDecrementButtonProps) {
  const { addToCart, decrementItem, getQuantityOfProduct } = useCart();


  const handleIncrement = () => {
    addToCart(product);

  };

  const handleDecrement = () => {
    decrementItem(product);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={spacingParam}>
        <IconButton size="small" onClick={handleDecrement}>
          <RemoveIcon color="disabled" />
        </IconButton>
        <Typography>{getQuantityOfProduct(product)}</Typography>

        <IconButton size="small" onClick={handleIncrement}>
          <AddIcon color="disabled" />
          
        </IconButton>
      </Stack>
    </>
  );
}

export default IncrementDecrementButton;
