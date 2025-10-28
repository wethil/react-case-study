import type { TableColumn, SortColumn, SortState } from "@/types/table.types";
import TableHeader from "@/ui/Table/TableHeader";
import TableRow from "@/ui/Table/TableRow";

interface ProductTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  sort: SortState;
  onSort: (column: SortColumn) => void;
  rowKey: (row: T) => string | number;
  sortableColumns?: TableColumn<T>[];
}

const ProductTable = <T,>({
  data,
  columns,
  sort,
  onSort,
  rowKey,
}: ProductTableProps<T>) => (
  <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-200 hover:shadow-lg">
    x``
    <div className="overflow-x-auto">
      <div className="w-full flex items-center justify-end mb-2">
        <span
          className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 rounded focus-visible:ring focus-visible:outline-none"
          role="note"
          aria-label="Multi-column sort info"
        >
          Tip: Hold{" "}
          <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded border text-xs font-mono">
            Shift
          </kbd>{" "}
          and click to enable multi-column sorting.
        </span>
      </div>
      <table
        className="w-full min-w-max"
        role="table"
        aria-label="Products table"
      >
        <TableHeader columns={columns} sort={sort} onSort={onSort} />
        <tbody>
          {data.map((row, idx) => (
            <TableRow
              key={rowKey(row)}
              row={row}
              columns={columns}
              isLast={idx === data.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

ProductTable.displayName = "ProductTable";

export default ProductTable;
