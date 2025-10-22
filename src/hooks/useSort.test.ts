import { renderHook, act } from "@testing-library/react";
import useSort from "./useSort.ts";

type TestProduct = {
  id: number;
  name: string;
  price: number;
};

const products: TestProduct[] = [
  { id: 1, name: "Banana", price: 2 },
  { id: 2, name: "Apple", price: 3 },
  { id: 3, name: "Carrot", price: 1 },
];

describe("useSort", () => {
  it("sorts by initialSortBy ascending", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSortBy: "name", initialSortOrder: "asc" })
    );
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Apple",
      "Banana",
      "Carrot",
    ]);
  });

  it("sorts by initialSortBy descending", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSortBy: "price", initialSortOrder: "desc" })
    );
    expect(result.current.sortedData.map((p) => p.price)).toEqual([3, 2, 1]);
  });

  it("changes sort order when handleSort is called on same column", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSortBy: "name", initialSortOrder: "asc" })
    );
    act(() => {
      result.current.handleSort("name");
    });
    expect(result.current.sortOrder).toBe("desc");
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Carrot",
      "Banana",
      "Apple",
    ]);
  });

  it("changes sort column and resets order to asc", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSortBy: "name", initialSortOrder: "desc" })
    );
    act(() => {
      result.current.handleSort("price");
    });
    expect(result.current.sortBy).toBe("price");
    expect(result.current.sortOrder).toBe("asc");
    expect(result.current.sortedData.map((p) => p.price)).toEqual([1, 2, 3]);
  });

  it("returns empty array if data is not array", () => {
    // @ts-expect-error
    const { result } = renderHook(() => useSort(undefined));
    expect(result.current.sortedData).toEqual([]);
  });
});
