import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "./ErrorPage";
import { vi } from "vitest";
describe("ErrorPage", () => {
  it("renders error message", () => {
    render(<ErrorPage error={new Error("Test error")} />);
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it("renders default message if no error", () => {
    render(<ErrorPage />);
    expect(
      screen.getByText(/An unexpected error occurred. Please try again later./)
    ).toBeInTheDocument();
  });

  it("calls reset when Try Again is clicked", () => {
    const reset = vi.fn();
    render(<ErrorPage reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));
    expect(reset).toHaveBeenCalled();
  });
});
