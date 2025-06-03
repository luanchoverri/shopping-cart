import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export const initialCartState: CartState = {
  items: [],
  totalAmount: 0,
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "DECREMENT_QUANTITY", payload: Product}
  | { type: "CLEAR_CART" };


export interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  decrementItem: (product: Product) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  getQuantityOfProduct: (product: Product) => number;
}
