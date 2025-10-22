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
  it("sorts by single column ascending", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSort: [{ column: "name", order: "asc" }] })
    );
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Apple",
      "Banana",
      "Carrot",
    ]);
  });

  it("sorts by single column descending", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSort: [{ column: "price", order: "desc" }] })
    );
    expect(result.current.sortedData.map((p) => p.price)).toEqual([3, 2, 1]);
  });

  it("changes sort order when handleSort is called on same column", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSort: [{ column: "name", order: "asc" }] })
    );
    act(() => {
      result.current.handleSort("name");
    });
    expect(result.current.sort[0].order).toBe("desc");
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Carrot",
      "Banana",
      "Apple",
    ]);
  });

  it("changes sort column and resets order to asc", () => {
    const { result } = renderHook(() =>
      useSort(products, { initialSort: [{ column: "name", order: "desc" }] })
    );
    act(() => {
      result.current.handleSort("price");
    });
    expect(result.current.sort[0].column).toBe("price");
    expect(result.current.sort[0].order).toBe("asc");
    expect(result.current.sortedData.map((p) => p.price)).toEqual([1, 2, 3]);
  });

  it("supports multi-column sorting", () => {
    const multiProducts = [
      { id: 1, name: "Banana", price: 2 },
      { id: 2, name: "Apple", price: 2 },
      { id: 3, name: "Carrot", price: 1 },
    ];
    const { result } = renderHook(() =>
      useSort(multiProducts, {
        initialSort: [
          { column: "price", order: "asc" },
          { column: "name", order: "asc" },
        ],
      })
    );
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Carrot", // price 1
      "Apple", // price 2, name A
      "Banana", // price 2, name B
    ]);
  });

  it("returns empty array if data is not array", () => {
    // @ts-expect-error
    const { result } = renderHook(() => useSort(undefined));
    expect(result.current.sortedData).toEqual([]);
  });
});
