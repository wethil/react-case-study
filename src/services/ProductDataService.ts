import type { Product } from "@/types/products.types.ts";

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  sort?: { column: keyof Product; order: "asc" | "desc" }[];
  category?: string;
}

export interface ProductDataService {
  getProducts(
    params?: ProductQueryParams
  ): Promise<{ products: Product[]; total: number }>;
}
