import { useState, useEffect, useMemo } from "react";

// Interface for pagination options (ISP: clients depend only on needed properties)
interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

// Hook for client-side pagination (SRP: handles only pagination logic)
export function usePagination<T>(items: T[], options: PaginationOptions = {}) {
  const { itemsPerPage = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(() => {
    // Ensure initialPage is within bounds
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
    return Math.min(Math.max(initialPage, 1), totalPages);
  });

  // Reset to initialPage when items change (e.g., due to filtering/sorting)
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
    setCurrentPage(Math.min(Math.max(initialPage, 1), totalPages));
  }, [items, initialPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNext = () => goToPage(currentPage + 1);
  const goToPrevious = () => goToPage(currentPage - 1);

  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;

  const itemsRange = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, items.length);
    return { start, end, total: items.length };
  }, [currentPage, itemsPerPage, items.length]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
    itemsRange,
  };
}
