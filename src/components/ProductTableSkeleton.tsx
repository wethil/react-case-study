import React from "react";

/**
 * ProductTableSkeleton displays a loading skeleton for the product table.
 * Structure matches ProductTable for seamless Suspense fallback.
 */
const ProductTableSkeleton: React.FC = () => {
  // Number of skeleton rows to display
  const skeletonRows = Array.from({ length: 8 });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-max"
          role="table"
          aria-label="Loading products table"
        >
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Product Name
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Price
              </th>
              <th className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, idx) => (
              <tr
                key={idx}
                className={`animate-pulse ${
                  idx !== skeletonRows.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
                role="row"
              >
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
                <td
                  className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap"
                  role="cell"
                >
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTableSkeleton;
