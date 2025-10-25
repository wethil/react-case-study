import { renderHook, act } from "@testing-library/react";
import { Product } from "@/types/products.types";
import useCategoryFilter from "./useCategoryFilter";

// Sample products for testing
const mockProducts: Product[] = [
  { id: 1, name: "Product A", category: "electronics", price: 100, stock: 10 },
  { id: 2, name: "Product B", category: "books", price: 20, stock: 5 },
  { id: 3, name: "Product C", category: "electronics", price: 150, stock: 8 },
  { id: 4, name: "Product D", category: "clothing", price: 50, stock: 12 },
];

describe("useCategoryFilter", () => {
  it("should initialize with selectedCategory as 'all'", () => {
    const { result } = renderHook(() => useCategoryFilter(mockProducts));
    expect(result.current.selectedCategory).toBe("all");
  });

  it("should return all products when selectedCategory is 'all'", () => {
    const { result } = renderHook(() => useCategoryFilter(mockProducts));
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });

  it("should filter products by selected category", () => {
    const { result } = renderHook(() => useCategoryFilter(mockProducts));
    act(() => {
      result.current.setSelectedCategory("electronics");
    });
    expect(result.current.filteredProducts).toEqual([
      {
        id: 1,
        name: "Product A",
        category: "electronics",
        price: 100,
        stock: 10,
      },
      {
        id: 3,
        name: "Product C",
        category: "electronics",
        price: 150,
        stock: 8,
      },
    ]);
  });

  it("should return empty array if no products match the category", () => {
    const { result } = renderHook(() => useCategoryFilter(mockProducts));
    act(() => {
      result.current.setSelectedCategory("nonexistent");
    });
    expect(result.current.filteredProducts).toEqual([]);
  });

  it("should extract unique categories including 'all'", () => {
    const { result } = renderHook(() => useCategoryFilter(mockProducts));
    expect(result.current.categories).toEqual([
      "all",
      "electronics",
      "books",
      "clothing",
    ]);
  });

  it("should handle empty products array", () => {
    const { result } = renderHook(() => useCategoryFilter([]));
    expect(result.current.filteredProducts).toEqual([]);
    expect(result.current.categories).toEqual(["all"]);
  });

  it("should update filteredProducts when products change", () => {
    const { result, rerender } = renderHook(
      (products: Product[]) => useCategoryFilter(products),
      { initialProps: mockProducts }
    );
    act(() => {
      result.current.setSelectedCategory("electronics");
    });
    expect(result.current.filteredProducts.length).toBe(2);

    const newProducts: Product[] = [
      {
        id: 5,
        name: "Product E",
        category: "electronics",
        price: 200,
        stock: 3,
      },
    ];
    rerender(newProducts);
    expect(result.current.filteredProducts).toEqual(newProducts);
  });

  it("should maintain selectedCategory across re-renders", () => {
    const { result, rerender } = renderHook(() =>
      useCategoryFilter(mockProducts)
    );
    act(() => {
      result.current.setSelectedCategory("books");
    });
    expect(result.current.selectedCategory).toBe("books");

    rerender();
    expect(result.current.selectedCategory).toBe("books");
  });
});
