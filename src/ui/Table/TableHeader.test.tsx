import { render, screen, fireEvent } from "@testing-library/react";
import TableHeader from "@ui/Table/TableHeader";
import type { TableColumn, SortState } from "@/types/table.types";

type TestProduct = { id: number; name: string; price: number };
const columns: TableColumn<TestProduct>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
];
const sort: SortState = [{ column: "name", order: "asc" }];
import { vi } from "vitest";
const onSort = vi.fn();

describe("TableHeader", () => {
  it("renders sortable column headers", () => {
    render(<TableHeader columns={columns} sort={sort} onSort={onSort} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  it("calls onSort when header is clicked", () => {
    render(<TableHeader columns={columns} sort={sort} onSort={onSort} />);
    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    fireEvent.keyDown(nameHeader, { key: "Enter", code: "Enter" });
    expect(onSort).toHaveBeenCalledWith("name", false);
  });
});
