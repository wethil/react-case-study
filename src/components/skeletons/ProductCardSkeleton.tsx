import React from "react";

const ProductCardSkeleton: React.FC = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2 animate-pulse min-h-[120px] transition-shadow duration-200 hover:shadow-lg"
    role="listitem"
    aria-label="Loading product"
  >
    <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

ProductCardSkeleton.displayName = "ProductCardSkeleton";

export default ProductCardSkeleton;
