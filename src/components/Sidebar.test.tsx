import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import type { Route } from "@/routes";

const mockRoutes: Record<string, Route> = {
  products: {
    path: "/products",
    title: "Products",
    ariaLabel: "Products page",
    icon: "📦",
  },
  about: {
    path: "/about",
    title: "About Case Study",
    ariaLabel: "About page",
    icon: "ℹ️",
  },
  home: {
    path: "/",
    title: "ProductsUp",
    ariaLabel: "Home page",
    icon: "🏪",
  },
};

describe("Sidebar", () => {
  it("renders sidebar navigation and nav items", () => {
    render(
      <Sidebar
        currentPage="products"
        onNavigate={() => {}}
        isOpen={true}
        onToggle={() => {}}
        routes={mockRoutes}
      />
    );
    const nav = screen.getByRole("complementary", {
      name: /navigation sidebar/i,
    });
    expect(nav).toBeInTheDocument();

    // Check for all nav items
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About Case Study")).toBeInTheDocument();
    expect(screen.getAllByText("ProductsUp")).toHaveLength(2);

    // Ensure touch-friendly tap targets
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const style = window.getComputedStyle(btn);
      expect(parseInt(style.minHeight)).toBeGreaterThanOrEqual(44);
    });
  });

  it("highlights the current page", () => {
    render(
      <Sidebar
        currentPage="about"
        onNavigate={() => {}}
        isOpen={true}
        onToggle={() => {}}
        routes={mockRoutes}
      />
    );
    const aboutBtn = screen.getByRole("button", { name: /about page/i });
    expect(aboutBtn).toHaveAttribute("aria-current", "page");
  });
});
