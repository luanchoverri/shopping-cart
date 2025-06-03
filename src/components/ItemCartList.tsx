import Box from "@mui/material/Box";
import ItemCart from "./ItemCart";
import type { CartItem } from "../types/cart";

interface ItemCartListProps {
  cartItems: CartItem[];
}

function ItemCartList({ cartItems }: ItemCartListProps) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 , mt:2, mb:2}}>
      {cartItems.map((p: CartItem) => (
        <ItemCart key={p.id} {...p}></ItemCart>
      ))}
    </Box>
  );
}

export default ItemCartList;
