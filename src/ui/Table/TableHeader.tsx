import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { TableColumn, SortState } from "@/types/table.types";

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sort: SortState;
  onSort: (column: string, multi?: boolean) => void;
}

const getSortIcon = (column: string, sort: SortState) => {
  const sortObj = sort.find((s) => s.column === column);
  if (!sortObj) {
    return (
      <ArrowUpDown
        className="size-4 text-gray-400 opacity-50 inline ml-1"
        aria-hidden="true"
      />
    );
  }
  if (sortObj.order === "asc") {
    return (
      <ArrowUp
        className="size-4 text-blue-600 inline ml-1"
        aria-hidden="true"
      />
    );
  }
  return (
    <ArrowDown
      className="size-4 text-blue-600 inline ml-1"
      aria-hidden="true"
    />
  );
};

const TableHeader = <T,>({ columns, sort, onSort }: TableHeaderProps<T>) => (
  <thead className="bg-gray-50 border-block-end border-gray-200">
    <tr>
      {columns.map((col) => {
        const sortIndex = sort.findIndex((s) => s.column === col.key);
        return (
          <th
            key={String(col.key)}
            className={`px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide ${
              col.sortable
                ? "cursor-pointer select-none transition-colors duration-200 hover:bg-gray-100"
                : ""
            }`}
            onClick={(e) =>
              col.sortable && onSort(col.key as string, e.shiftKey)
            }
            aria-sort={
              col.sortable && sort.find((s) => s.column === col.key)
                ? sort.find((s) => s.column === col.key)?.order === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            role="columnheader"
            tabIndex={col.sortable ? 0 : -1}
            onKeyDown={(e) =>
              col.sortable &&
              (e.key === "Enter" || e.key === " ") &&
              onSort(col.key as string, e.shiftKey)
            }
          >
            <span className="flex items-center">
              {col.label}
              {col.sortable && getSortIcon(col.key as string, sort)}
              {sortIndex >= 0 && (
                <span className="ml-1 text-xs text-gray-400 font-bold">
                  {sortIndex + 1}
                </span>
              )}
            </span>
          </th>
        );
      })}
    </tr>
  </thead>
);

TableHeader.displayName = "TableHeader";

export default TableHeader;
