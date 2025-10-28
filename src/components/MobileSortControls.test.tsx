import { render, screen, fireEvent } from "@testing-library/react";
import MobileSortControls from "@components/MobileSortControls";
import { vi } from "vitest";
import type { TableColumn, SortState } from "@/types/table.types";

type TestProduct = { id: number; name: string; price: number };
const columns: TableColumn<TestProduct>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
];
const sort: SortState = [{ column: "name", order: "asc" }];
const onSort = vi.fn();

describe("MobileSortControls", () => {
  it("renders sort buttons for sortable columns", () => {
    render(
      <MobileSortControls columns={columns} sort={sort} onSort={onSort} />
    );
    expect(screen.getByRole("button", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /price/i })).toBeInTheDocument();
  });

  it("calls onSort with column when button is clicked", () => {
    render(
      <MobileSortControls columns={columns} sort={sort} onSort={onSort} />
    );
    fireEvent.click(screen.getByRole("button", { name: /price/i }));
    expect(onSort).toHaveBeenCalledWith("price", false);
  });
});
