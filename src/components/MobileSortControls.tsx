import React, { useState } from "react";
import type { TableColumn, SortColumn, SortState } from "@/types/table.types";

/**
 * MobileSortControls displays a touch-friendly button group for sorting.
 * Users can toggle multi-column sorting with a checkbox.
 * Shows primary sort order with a number badge.
 */
export interface MobileSortControlsProps<T> {
  sort: SortState;
  onSort: (column: SortColumn, multi?: boolean) => void;
  columns: TableColumn<T>[];
}

const MobileSortControls = <T,>({
  sort,
  onSort,
  columns,
}: MobileSortControlsProps<T>): React.ReactElement => {
  const [multiSort, setMultiSort] = useState(false);
  const sortableColumns = columns.filter((col) => col.sortable);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          id="multi-sort-toggle"
          type="checkbox"
          checked={multiSort}
          onChange={() => setMultiSort((v) => !v)}
          className="min-h-11 min-w-11 accent-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Enable multi-column sorting"
        />
        <label
          htmlFor="multi-sort-toggle"
          className="text-sm text-gray-700 select-none"
        >
          Multi-column sort
        </label>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Sort products"
      >
        {sortableColumns.map((col) => {
          const activeIdx = sort.findIndex((s) => s.column === col.key);
          const active = activeIdx !== -1 ? sort[activeIdx] : undefined;
          return (
            <button
              key={String(col.key)}
              type="button"
              className={`min-h-11 min-w-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white text-gray-900 transition-all duration-200 flex items-center justify-center relative ${
                active ? "font-bold" : ""
              }`}
              aria-label={
                active
                  ? `Sorted by ${col.label} ${active.order === "asc" ? "ascending" : "descending"}`
                  : `Sort by ${col.label}`
              }
              onClick={() => onSort(col.key as SortColumn, multiSort)}
            >
              {col.label}
              {active && (
                <>
                  <span className="ml-2" aria-hidden="true">
                    {active.order === "asc" ? "▲" : "▼"}
                  </span>
                  {sort.length > 1 && (
                    <span
                      className="absolute top-1 right-1 text-xs font-semibold bg-gray-200 rounded-full px-1 py-0.5"
                      aria-label={
                        activeIdx === 0
                          ? "Primary sort"
                          : `Sort priority ${activeIdx + 1}`
                      }
                    >
                      {activeIdx + 1}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

MobileSortControls.displayName = "MobileSortControls";

export default MobileSortControls;
