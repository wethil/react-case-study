import { render, screen } from "@testing-library/react";
import ProductTableLayout from "./ProductTableLayout";
import { Product } from "@/types/products.types";
import { TableColumn, SortState } from "@/types/table.types";

describe("ProductTableLayout", () => {
  const products: Product[] = [
    { id: 1, name: "A", category: "Cat", price: 1, stock: 1 },
    { id: 2, name: "B", category: "Cat", price: 2, stock: 2 },
  ];
  const columns: TableColumn<Product>[] = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
  ];
  const sort: SortState = [{ column: "name", order: "asc" }];

  it("renders table rows", () => {
    render(
      <ProductTableLayout
        data={products}
        columns={columns}
        sort={sort}
        onSort={() => {}}
        rowKey={(row) => row.id}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
  });
});
