import React from "react";
import type { SortColumn, SortState } from "@/types/table.types";

/**
 * Renders a sort arrow indicator for the given column and sort state.
 * Ensures touch-friendly tap targets and accessibility.
 */
export interface SortArrowProps {
  column: SortColumn;
  sort: SortState;
}

const SortArrow: React.FC<SortArrowProps> = ({ column, sort }) => {
  const sortCol = sort.find((s) => s.column === column);
  if (!sortCol) return null;
  return (
    <span
      className="ml-1 transition-transform duration-200 min-h-11 min-w-11 flex items-center justify-center"
      aria-label={
        sortCol.order === "asc" ? "Sorted ascending" : "Sorted descending"
      }
      role="img"
      tabIndex={0}
    >
      {sortCol.order === "asc" ? "▲" : "▼"}
    </span>
  );
};

SortArrow.displayName = "SortArrow";

export default SortArrow;
