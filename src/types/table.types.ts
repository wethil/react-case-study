import type { Product } from "@/types/products.types";

export type SortState = { column: SortColumn; order: "asc" | "desc" }[];

export type SortColumn = keyof Pick<Product, "name" | "price">;
