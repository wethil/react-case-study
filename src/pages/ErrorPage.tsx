import React from "react";

export interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => (
  <div
    className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 sm:px-8 bg-white"
    role="alert"
    aria-label="Error page"
  >
    <svg
      className="w-16 h-16 text-red-500 mb-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
      Oops! Something went wrong.
    </h1>
    <p className="text-gray-600 mb-6 text-center max-w-md">
      {error?.message ||
        "An unexpected error occurred. Please try again later."}
    </p>
    <button
      type="button"
      onClick={reset}
      className="min-h-[44px] px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-400 transition-colors duration-200"
      aria-label="Try again"
    >
      Try Again
    </button>
  </div>
);

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
