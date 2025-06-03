import { createContext } from "react";
import type { ProductContextType } from "../types/product";


export const ProductContext = createContext<ProductContextType | null>(null);