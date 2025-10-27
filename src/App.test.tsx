import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders sidebar, header, and footer", async () => {
    render(<App />);

    // Sidebar navigation
    expect(
      screen.getByRole("complementary", { name: /navigation sidebar/i })
    ).toBeInTheDocument();

    // Header banner
    expect(screen.getByRole("banner", { name: /header/i })).toBeInTheDocument();

    // Footer contentinfo
    expect(
      screen.getByRole("contentinfo", { name: /footer/i })
    ).toBeInTheDocument();
  });
});
