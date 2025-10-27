import { render, screen } from "@testing-library/react";
import ProductsPageSkeleton from "./ProductsPageSkeleton";

describe("ProductsPageSkeleton", () => {
  it("renders header skeleton", () => {
    render(<ProductsPageSkeleton />);
    expect(screen.getByLabelText(/Loading products page/)).toBeInTheDocument();
  });

  it("renders filter and table skeletons", () => {
    render(<ProductsPageSkeleton />);
    // Should render filter skeleton
    expect(screen.getByLabelText(/Loading filters/)).toBeInTheDocument();
    // Should render table skeleton
    expect(screen.getByLabelText(/Loading products table/)).toBeInTheDocument();
  });
});
