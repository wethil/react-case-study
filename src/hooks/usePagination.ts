import { useMemo } from "react";

export interface UsePaginationOptions {
  itemsPerPage: number;
  currentPage: number;
}

export function usePagination<T>(items: T[], options: UsePaginationOptions) {
  const { itemsPerPage, currentPage } = options;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / itemsPerPage)),
    [items.length, itemsPerPage]
  );

  const isOutOfBounds = currentPage < 1 || currentPage > totalPages;

  // We wouldn't need to slice the items when fetching from backend by pages
  const paginatedItems = useMemo(() => {
    if (isOutOfBounds) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, itemsPerPage, currentPage, isOutOfBounds]);

  const hasNext = !isOutOfBounds && currentPage < totalPages;
  const hasPrevious = !isOutOfBounds && currentPage > 1;
  const itemsRange = isOutOfBounds
    ? { start: 0, end: 0, total: items.length }
    : {
        start: (currentPage - 1) * itemsPerPage + 1,
        end: Math.min(currentPage * itemsPerPage, items.length),
        total: items.length,
      };

  return {
    totalPages,
    paginatedItems,
    hasNext,
    hasPrevious,
    itemsRange,
  };
}
