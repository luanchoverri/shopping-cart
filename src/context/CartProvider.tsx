import { useReducer, type ReactNode } from "react";

import type { Product } from "../types/product";
import { CartContext } from "./CartContext";
import { cartReducer } from "./CartReducer";
import { initialCartState, type CartItem, type CartState } from "../types/cart";


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

    const decrementItem = (product: Product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };

  

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalQuantity = () => {
     const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity;
    };

  const getQuantityOfProduct = (product: Product) => {
    const existingItem = state.items.find( (item: CartItem) => item.id === product.id );
    
    return existingItem? existingItem.quantity : 1;
  };

  const value = {
    items: state.items,
    total: state.totalAmount,
    addToCart,
    removeItem,
    decrementItem,
    clearCart,
    getTotalQuantity,
    getQuantityOfProduct,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
