import { render, screen, fireEvent } from "@testing-library/react";
import ProductCardLayout from "@components/ProductCardLayout";
import { vi } from "vitest";

import type { Product } from "@/types/products.types";
import type { TableColumn, SortState } from "@/types/table.types";

const products: Product[] = [
  { id: 1, name: "Banana", price: 2, category: "Fruit", stock: 10 },
  { id: 2, name: "Apple", price: 3, category: "Fruit", stock: 5 },
  { id: 3, name: "Carrot", price: 1, category: "Vegetable", stock: 8 },
];

const columns: TableColumn<Product>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "category", label: "Category" },
];

const sort: SortState = [{ column: "name", order: "asc" }];
const onSort = vi.fn();
const rowKey = (row: Product) => row.id;

describe("ProductCardLayout", () => {
  it("renders product cards", () => {
    render(
      <ProductCardLayout
        data={products}
        columns={columns}
        sort={sort}
        onSort={onSort}
        rowKey={rowKey}
      />
    );
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Carrot")).toBeInTheDocument();
  });

  it("calls onSort when sort button is clicked", () => {
    render(
      <ProductCardLayout
        data={products}
        columns={columns}
        sort={sort}
        onSort={onSort}
        rowKey={rowKey}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    expect(onSort).toHaveBeenCalledWith("name", false);
  });
});
