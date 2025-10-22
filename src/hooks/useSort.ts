import { useState, useCallback, useMemo } from "react";

type SortOrder = "asc" | "desc";

interface UseSortOptions<T> {
  initialSortBy?: keyof T;
  initialSortOrder?: SortOrder;
}

interface UseSortReturn<T> {
  sortedData: T[];
  sortBy: keyof T;
  sortOrder: SortOrder;
  handleSort: (column: keyof T) => void;
}

/**
 * useSort - Custom hook for sorting arrays of objects
 * @param data - The array to sort
 * @param options - { initialSortBy, initialSortOrder }
 * @returns {Object} { sortedData, sortBy, sortOrder, handleSort }
 */
export default function useSort<T extends Record<string, any>>(
  data: T[],
  options: UseSortOptions<T> = {}
): UseSortReturn<T> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      sortedData: [],
      sortBy: "" as keyof T,
      sortOrder: "asc",
      handleSort: () => {},
    };
  }

  const { initialSortBy, initialSortOrder = "asc" } = options;
  const [sortBy, setSortBy] = useState<keyof T>(
    initialSortBy ?? (Object.keys(data[0] ?? {})[0] as keyof T)
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  // Handler for sorting column
  const handleSort = useCallback(
    (column: keyof T) => {
      if (sortBy === column) {
        setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(column);
        setSortOrder("asc");
      }
    },
    [sortBy]
  );

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  return {
    sortedData,
    sortBy,
    sortOrder,
    handleSort,
  };
}
