import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders sidebar navigation", () => {
    render(
      <Sidebar
        currentPage="products"
        onNavigate={() => {}}
        isOpen={true}
        onToggle={() => {}}
      />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
