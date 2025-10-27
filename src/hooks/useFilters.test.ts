import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilters } from "./useFilters";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Apple", category: "Fruit", price: 2 },
  { id: 2, name: "Banana", category: "Fruit", price: 1 },
  { id: 3, name: "Carrot", category: "Vegetable", price: 3 },
  { id: 4, name: "Broccoli", category: "Vegetable", price: 2 },
];

describe("useFilters", () => {
  it("returns all items when filters are set to 'all'", () => {
    const { result } = renderHook(() =>
      useFilters(products, [
        { key: "category", options: ["Fruit", "Vegetable"] },
      ])
    );
    expect(result.current.filteredItems).toHaveLength(4);
    expect(result.current.filters.category).toBe("all");
  });

  it("filters items by category", () => {
    const { result } = renderHook(() =>
      useFilters(products, [
        { key: "category", options: ["Fruit", "Vegetable"] },
      ])
    );
    act(() => {
      result.current.setFilter("category", "Fruit");
    });
    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.map((p) => p.name)).toEqual([
      "Apple",
      "Banana",
    ]);
  });

  it("filters items by multiple filters", () => {
    const { result } = renderHook(() =>
      useFilters(products, [
        { key: "category", options: ["Fruit", "Vegetable"] },
        { key: "price", options: ["1", "2", "3"] },
      ])
    );
    act(() => {
      result.current.setFilter("category", "Vegetable");
      result.current.setFilter("price", "2");
    });
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe("Broccoli");
  });

  it("returns correct filterOptions including 'all'", () => {
    const { result } = renderHook(() =>
      useFilters(products, [
        { key: "category", options: ["Fruit", "Vegetable"] },
      ])
    );
    const categoryOptions = result.current.filterOptions.find(
      (opt) => opt.key === "category"
    );
    expect(categoryOptions?.options).toContain("all");
    expect(categoryOptions?.options).toContain("Fruit");
    expect(categoryOptions?.options).toContain("Vegetable");
  });

  it("updates filters state correctly", () => {
    const { result } = renderHook(() =>
      useFilters(products, [
        { key: "category", options: ["Fruit", "Vegetable"] },
      ])
    );
    act(() => {
      result.current.setFilter("category", "Vegetable");
    });
    expect(result.current.filters.category).toBe("Vegetable");
  });
});
