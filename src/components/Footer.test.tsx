import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/©|Copyright|All rights reserved/)
    ).toBeInTheDocument();
  });
});
