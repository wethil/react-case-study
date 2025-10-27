import React from "react";
import FiltersSkeleton from "@components/skeletons/FiltersSkeleton";
import ProductTableSkeleton from "@components/skeletons/ProductTableSkeleton";
import ProductCardSkeleton from "@components/skeletons/ProductCardSkeleton";

/**
 * ProductsPageSkeleton provides a full-page skeleton for the products page.
 * Responsive: shows table skeleton on desktop/tablet, card skeletons on mobile.
 */
const ProductsPageSkeleton: React.FC = () => (
  <div className="p-4 sm:p-6 transition-all duration-300">
    <header className="mb-6">
      <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </header>

    <FiltersSkeleton />

    {/* Desktop and Tablet: Table Skeleton */}
    <div className="hidden md:block transition-opacity duration-300">
      <ProductTableSkeleton />
    </div>

    {/* Mobile: Card Skeletons */}
    <div
      className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300"
      role="list"
      aria-label="Loading products"
    >
      {[...Array(4)].map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>

    {/* Pagination Skeleton */}
    <div className="flex justify-center items-center mt-6 gap-2">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
          aria-label="Loading page button"
        />
      ))}
    </div>
  </div>
);

ProductsPageSkeleton.displayName = "ProductsPageSkeleton";

export default ProductsPageSkeleton;
