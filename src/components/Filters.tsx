import React from "react";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  name: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export interface FiltersProps {
  filters: FilterConfig[];
}

/**
 * Filters renders filter controls in a responsive column layout on desktop/tablet,
 * and a row layout on mobile. Touch-friendly, semantic, and accessible.
 */
const Filters: React.FC<FiltersProps> = ({ filters }) => (
  <section
    className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    aria-label="Filters"
  >
    {filters.map((filter) => (
      <div key={filter.name} className="flex flex-col">
        <label
          htmlFor={`filter-${filter.name}`}
          className="text-sm font-medium text-gray-700 transition-colors duration-200 mb-2"
        >
          {filter.label}
        </label>
        <select
          id={`filter-${filter.name}`}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white text-gray-900 transition-all duration-200 min-h-[44px]"
          aria-label={filter.label}
        >
          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    ))}
  </section>
);

Filters.displayName = "Filters";

export default Filters;
