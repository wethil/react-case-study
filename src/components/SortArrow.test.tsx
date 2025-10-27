import { render, screen } from "@testing-library/react";
import SortArrow from "./SortArrow";

describe("SortArrow", () => {
  it("renders up arrow when sort is asc", () => {
    render(
      <SortArrow column="name" sort={[{ column: "name", order: "asc" }]} />
    );
    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  it("renders down arrow when sort is desc", () => {
    render(
      <SortArrow column="name" sort={[{ column: "name", order: "desc" }]} />
    );
    expect(screen.getByText("▼")).toBeInTheDocument();
  });

  it("renders nothing when column is not sorted", () => {
    const { container } = render(
      <SortArrow column="name" sort={[{ column: "price", order: "asc" }]} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
