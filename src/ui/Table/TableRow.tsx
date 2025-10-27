import type { TableColumn } from "@/types/table.types";

export interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  isLast: boolean;
}

/**
 * TableRow renders a single table row with proper types, ARIA, and touch-friendly tap targets.
 */
const TableRow = <T,>({ row, columns, isLast }: TableRowProps<T>) => (
  <tr
    className={`transition-colors duration-200 hover:bg-gray-50 ${
      !isLast ? "border-b border-gray-200" : ""
    }`}
    role="row"
  >
    {columns.map((col) => (
      <td
        key={String(col.key)}
        className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap min-h-11"
        role="cell"
      >
        {col.render
          ? col.render(row[col.key], row)
          : row[col.key] !== undefined
            ? String(row[col.key])
            : ""}
      </td>
    ))}
  </tr>
);

TableRow.displayName = "TableRow";

export default TableRow;
