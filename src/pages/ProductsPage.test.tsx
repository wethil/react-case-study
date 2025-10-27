import { render, screen } from "@testing-library/react";
import Products from "./ProductsPage";
import Providers from "@/Providers";
import { Suspense } from "react";

describe("ProductsPage", () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <Providers>
        <Suspense fallback={<div>Loading...</div>}>{ui}</Suspense>
      </Providers>
    );

  it("renders Products header", async () => {
    renderWithProviders(<Products />);
    expect(
      await screen.findByText(/Manage your product inventory/)
    ).toBeInTheDocument();
  });

  it("renders filter section", async () => {
    renderWithProviders(<Products />);
    const filterElements =
      await screen.findAllByLabelText("Filter by Category");
    expect(filterElements.length).toBeGreaterThan(0);
  });

  it("renders table on desktop", async () => {
    window.innerWidth = 1024;
    renderWithProviders(<Products />);
    expect(await screen.findByRole("table")).toBeInTheDocument();
  });

  it("renders cards on mobile", async () => {
    window.innerWidth = 375;
    renderWithProviders(<Products />);
    expect(await screen.findByRole("list")).toBeInTheDocument();
  });
});
