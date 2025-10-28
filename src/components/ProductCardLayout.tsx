import React from "react";
import type { Product } from "@/types/products.types";
import ProductCard from "./ProductCard";
import type { TableColumn, SortColumn, SortState } from "@/types/table.types";
import MobileSortControls from "@components/MobileSortControls";
/**
 * ProductCardLayout displays a responsive grid of product cards with sorting controls.
 * Sorting is controlled by parent via props: sort, onSort, columns.
 */
export interface ProductCardLayoutProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  sort: SortState;
  onSort: (column: SortColumn, multi?: boolean) => void;
  rowKey: (row: T) => string | number;
}

const ProductCardLayout = <T extends Product>({
  data,
  sort,
  onSort,
  rowKey,
  columns,
}: ProductCardLayoutProps<T>): React.ReactElement => {
  return (
    <section className="w-full px-4 py-4">
      <MobileSortControls columns={columns} sort={sort} onSort={onSort} />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.map((row) => (
          <ProductCard key={rowKey(row)} product={row} />
        ))}
      </div>
    </section>
  );
};

ProductCardLayout.displayName = "ProductCardLayout";

export default ProductCardLayout;
