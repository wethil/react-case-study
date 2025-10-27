import type { ReactNode } from "react";
import type { Product } from "@/types/products.types";

export type SortState = { column: SortColumn; order: "asc" | "desc" }[];

export type SortColumn = keyof Pick<Product, "name" | "price">;

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
};
