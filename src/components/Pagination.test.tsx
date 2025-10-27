import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders pagination controls", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        hasNext={true}
        hasPrevious={false}
        itemsRange={{ start: 1, end: 10, total: 30 }}
        onPageChange={() => {}}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        hasNext={true}
        hasPrevious={false}
        itemsRange={{ start: 1, end: 10, total: 30 }}
        onPageChange={() => {}}
        onNext={onNext}
        onPrevious={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText("Go to next page"));
    expect(onNext).toHaveBeenCalled();
  });
});
