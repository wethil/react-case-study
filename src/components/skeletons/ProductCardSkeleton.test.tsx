import { render, screen } from "@testing-library/react";
import ProductCardSkeleton from "./ProductCardSkeleton";

describe("ProductCardSkeleton", () => {
  it("renders skeleton card blocks", () => {
    render(<ProductCardSkeleton />);
    // Expect at least one skeleton card (listitem)
    const skeletonCards = screen.getAllByRole("listitem");
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it("has aria-label for accessibility", () => {
    render(<ProductCardSkeleton />);
    expect(screen.getByLabelText("Loading product")).toBeInTheDocument();
  });
});
