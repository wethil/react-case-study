import type { JSX } from "react";
import type { SortColumn, SortState } from "@/types/table.types";

export default function SortArrow({
  column,
  sort,
}: {
  column: SortColumn;
  sort: SortState;
}): JSX.Element | null {
  const sortCol = sort.find((s) => s.column === column);
  if (!sortCol) return null;
  return (
    <span className="ml-1 transition-transform duration-200">
      {sortCol.order === "asc" ? "▲" : "▼"}
    </span>
  );
}

SortArrow.displayName = "SortArrow";
