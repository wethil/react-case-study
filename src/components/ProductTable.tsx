import React, { useMemo } from "react";
import { Product } from "@/types/products.types";
import type { JSX } from "react";

type SortColumn = keyof Pick<Product, "name" | "price">;

interface ProductTableProps {
  products: Product[];
  sort: { column: SortColumn; order: "asc" | "desc" }[];
  onSort: (column: SortColumn) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sort,
  onSort,
}) => {
  const getSortArrow = useMemo(
    () =>
      (column: SortColumn): JSX.Element | null => {
        const sortCol = sort.find((s) => s.column === column);
        if (!sortCol) return null;
        return (
          <span className="ml-1 transition-transform duration-200">
            {sortCol.order === "asc" ? "▲" : "▼"}
          </span>
        );
      },
    [sort]
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-max"
          role="table"
          aria-label="Products table"
        >
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none transition-colors duration-200 hover:bg-gray-100"
                onClick={() => onSort("name")}
                aria-sort={
                  sort.find((s) => s.column === "name")?.order === "asc"
                    ? "ascending"
                    : "descending"
                }
                role="columnheader"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSort("name")}
              >
                Product Name
                {getSortArrow("name")}
              </th>
              <th
                className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                role="columnheader"
              >
                Category
              </th>
              <th
                className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none transition-colors duration-200 hover:bg-gray-100"
                onClick={() => onSort("price")}
                aria-sort={
                  sort.find((s) => s.column === "price")?.order === "asc"
                    ? "ascending"
                    : "descending"
                }
                role="columnheader"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSort("price")}
              >
                Price
                {getSortArrow("price")}
              </th>
              <th
                className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                role="columnheader"
              >
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors duration-200"
                role="row"
              >
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 transition-colors duration-200">
                    {product.category}
                  </span>
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="text-sm text-gray-900">
                    {product.stock} units
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
