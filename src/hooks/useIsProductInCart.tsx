import type { Product } from "../types/product";
import { useCart } from "./useCart";


export const useIsProductInCart = (product: Product): boolean => {
  const { items } = useCart(); 
  
  return items.some((item) => item.id === product.id);
};