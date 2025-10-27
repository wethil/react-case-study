import type { ReactNode } from "react";

export type SortState = { column: SortColumn; order: "asc" | "desc" }[];

export type SortColumn = string;

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
};
