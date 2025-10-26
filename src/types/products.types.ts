export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};
