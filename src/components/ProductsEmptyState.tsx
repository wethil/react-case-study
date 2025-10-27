/*
 It is crutial to provide clear feedback to users when no products match their search or filter criteria.
*/
export default function ProductsEmptyState() {
  return (
    <section
      className="flex flex-col items-center justify-center py-12"
      role="status"
      aria-live="polite"
    >
      <svg
        className="w-16 h-16 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
      <p className="text-lg text-gray-500 mb-2" tabIndex={0}>
        No products found
      </p>
      <p className="text-sm text-gray-400" tabIndex={0}>
        Try adjusting your filters or search.
      </p>
    </section>
  );
}

ProductsEmptyState.displayName = "ProductsEmptyState";
