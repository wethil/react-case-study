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
      if (multi) {
        const existingSortIndex = prevSort.findIndex(
          (s) => s.column === column
        );
        let newSort: SortColumn<T>[];
        if (existingSortIndex !== -1) {
          // Toggle order and move to front
          const toggled = {
            ...prevSort[existingSortIndex],
            order: prevSort[existingSortIndex].order === "asc" ? "desc" : "asc",
          } as SortColumn<T>;
          newSort = [
            toggled,
            ...prevSort.filter((_, idx) => idx !== existingSortIndex),
          ];
        } else {
          // Add new column to front with asc order
          newSort = [{ column, order: "asc" }, ...prevSort];
        }
        // Remove duplicates if any
        const seen = new Set<keyof T>();
        return newSort.filter((s) => {
          if (seen.has(s.column)) return false;
          seen.add(s.column);
          return true;
        });
      } else {
        // Single column sort: replace sort state
        const existing = prevSort.find((s) => s.column === column);
        const order = existing && existing.order === "asc" ? "desc" : "asc";
        return [{ column, order }];
      }
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
