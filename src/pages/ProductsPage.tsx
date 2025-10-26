import React, { useCallback, useMemo } from "react";
import useSort from "@/hooks/useSort";
import useGetProducts from "@hooks/useGetProducts";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import { usePagination } from "@/hooks/usePagination";
import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/products.types";

// Type for category options in select
type CategoryOption = {
  value: string;
  label: string;
};

// Type for sort column (restrict to known keys)
type SortColumn = keyof Pick<Product, "name" | "price">;

const Products: React.FC = () => {
  // Fetch all products first (empty params for client-side filtering)
  const params = useMemo(() => ({}), []);
  const { products } = useGetProducts(params);

  // Use the extracted hook for category filtering (client-side)
  const {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
  } = useCategoryFilter(products);

  // Use useSort for Product Name and Price columns
  const { sortedData, sort, handleSort } = useSort(filteredProducts, {
    initialSort: [{ column: "name", order: "asc" }],
  });

  // Use usePagination for client-side pagination (10 per page)
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
    itemsRange,
  } = usePagination(sortedData, { itemsPerPage: 10 });

  // Handler for select change
  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
    },
    [setSelectedCategory]
  );

  // Handler for sort click
  const handleSortClick = useCallback(
    (column: SortColumn) => {
      handleSort(column);
    },
    [handleSort]
  );

  // Handler for page navigation
  const handlePageClick = useCallback(
    (page: number) => {
      goToPage(page);
    },
    [goToPage]
  );

  // Typed category options
  const categoryOptions: CategoryOption[] = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat,
        label: cat === "all" ? "All Categories" : cat,
      })),
    [categories]
  );

  return (
    <div className="p-4 sm:p-6 transition-all duration-300">
      <header className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 transition-colors duration-200">
          Products
        </h2>
        <p className="text-gray-600 transition-colors duration-200">
          Manage your product inventory
        </p>
      </header>

      <section className="mb-6" aria-labelledby="filter-label">
        <label
          id="filter-label"
          className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200"
        >
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 transition-all duration-200"
          aria-describedby="filter-label"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      {/* Desktop and Tablet: Table Layout */}
      <div className="hidden md:block transition-opacity duration-300">
        <ProductTable
          products={paginatedItems}
          sort={sort as { column: SortColumn; order: "asc" | "desc" }[]}
          onSort={handleSortClick}
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
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
};

export default Products;
