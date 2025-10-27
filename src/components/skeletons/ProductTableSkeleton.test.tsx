import { render, screen } from "@testing-library/react";
import ProductTableSkeleton from "./ProductTableSkeleton";

describe("ProductTableSkeleton", () => {
  it("renders skeleton table rows", () => {
    render(<ProductTableSkeleton />);
    // Expect at least one skeleton row (region)
    const skeletonRows = screen.getAllByRole("row", { hidden: true });
    expect(skeletonRows.length).toBeGreaterThan(0);
  });

  it("has aria-label for accessibility", () => {
    render(<ProductTableSkeleton />);
    expect(screen.getByLabelText(/Loading products table/)).toBeInTheDocument();
  });
});
