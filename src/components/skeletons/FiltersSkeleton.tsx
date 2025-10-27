import React from "react";

const FiltersSkeleton: React.FC = () => (
  <section
    className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    aria-label="Loading filters"
  >
    {[...Array(3)].map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col"
        role="region"
        aria-hidden="true"
        data-testid="filters-skeleton-block"
      >
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    ))}
  </section>
);

FiltersSkeleton.displayName = "FiltersSkeleton";

export default FiltersSkeleton;
