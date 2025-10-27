import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders accessible footer text", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo", { name: /footer/i });
    expect(footer).toBeInTheDocument();
    expect(
      screen.getByText(/© 2025 ProductHub\. All rights reserved\./)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByLabelText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact")).toBeInTheDocument();
  });
});
