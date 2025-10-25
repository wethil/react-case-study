import React, { memo, useMemo } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  itemsRange: { start: number; end: number; total: number };
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = memo(
  ({
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    itemsRange,
    onPageChange,
    onNext,
    onPrevious,
  }) => {
    const pageNumbers = useMemo(
      () => Array.from({ length: totalPages }, (_, i) => i + 1),
      [totalPages]
    );

    return (
      <nav
        className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        aria-label="Pagination navigation"
      >
        <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
          Showing {itemsRange.start}-{itemsRange.end} of {itemsRange.total}{" "}
          products
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="Go to previous page"
          >
            Previous
          </button>
          {pageNumbers.map((page: number) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                page === currentPage
                  ? "bg-blue-500 text-white border-blue-500 scale-105"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label="Go to next page"
          >
            Next
          </button>
        </div>
      </nav>
    );
  }
);

PaginationControls.displayName = "PaginationControls";

export default PaginationControls;
