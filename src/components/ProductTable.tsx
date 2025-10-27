import type { TableColumn, SortColumn, SortState } from "@/types/table.types";
import TableHeader from "@/ui/Table/TableHeader";
import TableRow from "@/ui/Table/TableRow";

interface ProductTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  sort: SortState;
  onSort: (column: SortColumn) => void;
  rowKey: (row: T) => string | number;
}

const ProductTable = <T,>({
  data,
  columns,
  sort,
  onSort,
  rowKey,
}: ProductTableProps<T>) => (
  <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-200 hover:shadow-lg">
    <div className="overflow-x-auto">
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
