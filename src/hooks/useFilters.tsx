import { useState, useMemo, useCallback } from "react";

export interface FilterState {
  [key: string]: string;
}

export function useFilters<T>(
  items: T[],
  filterConfigs: { key: keyof T; options: string[] }[]
) {
  const [filters, setFilters] = useState<FilterState>(() =>
    filterConfigs.reduce((acc, config) => {
      acc[config.key as string] = "all";
      return acc;
    }, {} as FilterState)
  );

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      filterConfigs.every(
        (config) =>
          filters[config.key as string] === "all" ||
          String(item[config.key]) === filters[config.key as string]
      )
    );
  }, [items, filters, filterConfigs]);

  const filterOptions = useMemo(() => {
    return filterConfigs.map((config) => ({
      key: config.key,
      options: [
        "all",
        ...Array.from(new Set(items.map((item) => String(item[config.key])))),
      ],
    }));
  }, [items, filterConfigs]);

  return {
    filters,
    setFilter,
    filteredItems,
    filterOptions,
  };
}
