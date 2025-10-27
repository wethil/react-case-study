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

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, itemsPerPage, currentPage]);

  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;
  const itemsRange = {
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
