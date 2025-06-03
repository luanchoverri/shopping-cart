export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductContextType = {
  products: Product[] | null;
  getProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (id: number) => void;
};
