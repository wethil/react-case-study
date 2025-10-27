import { render, screen } from "@testing-library/react";
import FiltersSkeleton from "./FiltersSkeleton";

describe("FiltersSkeleton", () => {
  it("renders 3 skeleton filter blocks", () => {
    render(<FiltersSkeleton />);
    const skeletonBlocks = screen.getAllByTestId("filters-skeleton-block");
    expect(skeletonBlocks.length).toBe(3);
  });

  it("has aria-label for accessibility", () => {
    render(<FiltersSkeleton />);
    expect(screen.getByLabelText("Loading filters")).toBeInTheDocument();
  });
});
