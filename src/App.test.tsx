import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders sidebar and header", () => {
    render(<App />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders products page by default", () => {
    render(<App />);
    expect(screen.getByText(/Products/)).toBeInTheDocument();
  });

  it("renders about page when selected", () => {
    render(<App />);
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<App />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
