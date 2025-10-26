import { useState, useMemo, useCallback } from "react";

// Interface for pagination options (ISP: clients depend only on needed properties)
interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

// Hook for client-side pagination (SRP: handles only pagination logic)
export function usePagination<T>(items: T[], options: PaginationOptions = {}) {
  const { itemsPerPage = 10, initialPage = 1 } = options;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / itemsPerPage)),
    [items.length, itemsPerPage]
  );

  // Store the requested page, but clamp it to valid bounds in render
  const [requestedPage, setRequestedPage] = useState(initialPage);

  // Clamp the current page to valid bounds
  const currentPage = useMemo(() => {
    if (requestedPage < 1) return 1;
    if (requestedPage > totalPages) return totalPages;
    return requestedPage;
  }, [requestedPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    setRequestedPage(page);
  }, []);

  const goToNext = useCallback(() => {
    setRequestedPage((prev) => prev + 1);
  }, []);

  const goToPrevious = useCallback(() => {
    setRequestedPage((prev) => prev - 1);
  }, []);

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
