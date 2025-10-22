import { useState, useCallback, useMemo } from "react";

type SortOrder = "asc" | "desc";

type SortColumn<T> = {
  column: keyof T;
  order: SortOrder;
};

interface UseSortOptions<T> {
  initialSort?: SortColumn<T>[];
}

interface UseSortReturn<T> {
  sortedData: T[];
  sort: SortColumn<T>[];
  handleSort: (column: keyof T) => void;
}

/**
 * useSort - Custom hook for multi-column sorting arrays of objects
 * @param data - The array to sort
 * @param options - { initialSort }
 * @returns {Object} { sortedData, sort, handleSort }
 */
export default function useSort<T extends Record<string, any>>(
  data: T[],
  options: UseSortOptions<T> = {}
): UseSortReturn<T> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      sortedData: [],
      sort: [],
      handleSort: () => {},
    };
  }

  const defaultColumn = Object.keys(data[0] ?? {})[0] as keyof T;
  const [sort, setSort] = useState<SortColumn<T>[]>(
    options.initialSort && options.initialSort.length > 0
      ? options.initialSort
      : [{ column: defaultColumn, order: "asc" }]
  );

  // Handler for sorting column
  const handleSort = useCallback((column: keyof T) => {
    setSort((prevSort) => {
      const existing = prevSort.find((s) => s.column === column);
      if (existing) {
        // Toggle order and move to front
        const newOrder = existing.order === "asc" ? "desc" : "asc";
        return [
          { column, order: newOrder },
          ...prevSort.filter((s) => s.column !== column),
        ];
      } else {
        // Add new column to front, keep others
        return [{ column, order: "asc" }, ...prevSort];
      }
    });
  }, []);

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
      for (const { column, order } of sort) {
        const aValue = a[column];
        const bValue = b[column];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const cmp = aValue.localeCompare(bValue);
          if (cmp !== 0) return order === "asc" ? cmp : -cmp;
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          if (aValue !== bValue)
            return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        // Add more type checks if needed
      }
      return 0;
    });
  }, [data, sort]);

  return {
    sortedData,
    sort,
    handleSort,
  };
}
