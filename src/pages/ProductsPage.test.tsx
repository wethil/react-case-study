import { render, screen } from "@testing-library/react";
import Products from "./ProductsPage";
import { ProductDataProviderContext } from "@/contexts/ProductDataProviderContext";
import MockProductDataService from "@/services/MockProductDataService";
import { Suspense } from "react";

describe("ProductsPage", () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <ProductDataProviderContext service={MockProductDataService}>
        <Suspense fallback={<div>Loading...</div>}>{ui}</Suspense>
      </ProductDataProviderContext>
    );

  it("renders Products header", async () => {
    renderWithProvider(<Products />);
    expect(await screen.findByText(/Products/)).toBeInTheDocument();
  });

  it("renders filter section", async () => {
    renderWithProvider(<Products />);
    const filterElements =
      await screen.findAllByLabelText("Filter by Category");
    expect(filterElements.length).toBeGreaterThan(0);
  });

  it("renders table on desktop", async () => {
    window.innerWidth = 1024;
    renderWithProvider(<Products />);
    expect(await screen.findByRole("table")).toBeInTheDocument();
  });

  it("renders cards on mobile", async () => {
    window.innerWidth = 375;
    renderWithProvider(<Products />);
    expect(await screen.findByRole("list")).toBeInTheDocument();
  });
});
