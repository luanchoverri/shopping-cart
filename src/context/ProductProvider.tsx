import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import axios from "axios";
import { ProductContext } from "./ProductContext";

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      await axios.post("https://fakestoreapi.com/products", product);
      setProducts((prev) => (prev ? [...prev, product] : [product]));
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev?.filter((p) => p.id !== id) || null);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, getProducts, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
