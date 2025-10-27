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
  handleSort: (column: keyof T, multi?: boolean) => void;
}

/**
 * useSort - Custom hook for multi-column sorting arrays of objects
 * @param data - The array to sort
 * @param options - { initialSort }
 * @returns {Object} { sortedData, sort, handleSort }
 */
export default function useSort<T extends Record<string, unknown>>(
  data: T[],
  options: UseSortOptions<T> = {}
): UseSortReturn<T> {
  const isArrayData = Array.isArray(data);
  const defaultColumn = isArrayData
    ? (Object.keys(data[0] ?? {})?.[0] as keyof T)
    : "id";
  const [sort, setSort] = useState<SortColumn<T>[]>(
    options.initialSort && options.initialSort.length > 0
      ? options.initialSort
      : [{ column: defaultColumn, order: "asc" }]
  );

  // Handler for sorting column
  const handleSort = useCallback((column: keyof T, multi?: boolean) => {
    setSort((prevSort) => {
      const existingIndex = prevSort.findIndex((s) => s.column === column);

      // Multi-column sorting (shift-click)
      if (multi) {
        if (existingIndex >= 0) {
          // Toggle order for existing column
          const updated = [...prevSort];
          updated[existingIndex] = {
            column,
            order: updated[existingIndex].order === "asc" ? "desc" : "asc",
          };
          return updated;
        } else {
          // Add new column to sort stack
          return [...prevSort, { column, order: "asc" }];
        }
      }

      // Single-column sorting (normal click)
      if (existingIndex === 0) {
        // Toggle order for primary column
        return [
          {
            column,
            order: prevSort[0].order === "asc" ? "desc" : "asc",
          },
          ...prevSort.slice(1),
        ];
      }
      // Move column to front, set to ascending
      return [
        { column, order: "asc" },
        ...prevSort.filter((s) => s.column !== column),
      ];
    });
  }, []);

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
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

  if (!Array.isArray(data) || data.length === 0) {
    return {
      sortedData: [],
      sort,
      handleSort,
    };
  }

  return {
    sortedData,
    sort,
    handleSort,
  };
}
