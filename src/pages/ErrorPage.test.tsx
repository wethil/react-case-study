import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";

const ErrorThrower: React.FC = () => {
  throw new Error("Test error");
};
ErrorThrower.displayName = "ErrorThrower";

describe("ErrorBoundary", () => {
  it("renders ErrorPage when a child throws", () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ErrorThrower />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});

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
