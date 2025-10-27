import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useSort from "@/hooks/useSort";
import useGetProducts from "@hooks/useGetProducts";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import { usePagination } from "@/hooks/usePagination";
import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import Pagination from "@/components/Pagination";
import Filters, { FilterConfig } from "@/components/Filters";
import { Product } from "@/types/products.types";
import type { TableColumn, SortColumn, SortState } from "@/types/table.types";
import isNumber from "@/utils/isNumber";

type CategoryOption = {
  value: string;
  label: string;
};

const columns: TableColumn<Product>[] = [
  { key: "name", label: "Product Name", sortable: true },
  { key: "category", label: "Category" },
  {
    key: "price",
    label: "Price",
    sortable: true,
    render: (value, _) => (isNumber(value) ? `$${value.toFixed(2)}` : ""),
  },
  {
    key: "stock",
    label: "Stock",
    render: (value, _) => (isNumber(value) ? `${value} units` : ""),
  },
];

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo<Record<string, unknown>>(
    () => ({
      // Additional params can be added here in the future
      // e.g., filters, sort options from URL, and pagination
    }),
    []
  );
  const { products } = useGetProducts(params);

  const {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
  } = useCategoryFilter(products);

  const { sortedData, sort, handleSort } = useSort(filteredProducts, {
    initialSort: [{ column: "name", order: "asc" }],
  });

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const { totalPages, paginatedItems, hasNext, hasPrevious, itemsRange } =
    usePagination<Product>(sortedData, { itemsPerPage: 10, currentPage });

  const handleSortClick = useCallback(
    (column: SortColumn, multi?: boolean) => {
      handleSort(column as keyof Product, multi);
    },
    [handleSort]
  );

  const handlePageClick = useCallback(
    (page: number) => {
      setSearchParams({ page: String(page) });
    },
    [setSearchParams]
  );

  const categoryOptions: CategoryOption[] = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat,
        label: cat === "all" ? "All Categories" : cat,
      })),
    [categories]
  );

  const categoryFilter: FilterConfig = {
    name: "category",
    label: "Filter by Category",
    value: selectedCategory,
    options: categoryOptions,
    onChange: setSelectedCategory,
  };

  const filters: FilterConfig[] = [categoryFilter];

  return (
    <div className="p-4 sm:p-6 transition-all duration-300">
      <header className="mb-5">
        <p className="text-gray-600 transition-colors duration-200">
          Manage your product inventory
        </p>
      </header>

      <Filters filters={filters} />

      {/* Desktop and Tablet: Table Layout */}
      <div className="hidden md:block transition-opacity duration-300">
        <ProductTable
          data={paginatedItems}
          columns={columns}
          sort={sort as SortState}
          onSort={handleSortClick}
          rowKey={(row: Product) => row.id}
        />
      </div>

      {/* Mobile: Card Layout */}
      <div
        className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300"
        role="list"
        aria-label="Products list"
      >
        {paginatedItems.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        itemsRange={itemsRange}
        onPageChange={handlePageClick}
        onNext={() => handlePageClick(currentPage + 1)}
        onPrevious={() => handlePageClick(currentPage - 1)}
      />
    </div>
  );
};

Products.displayName = "Products";

export default Products;
