import { renderHook, act } from "@testing-library/react";
import useSort from "./useSort";

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

  it("toggles sort order for primary column", () => {
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

  it("supports multi-column sorting and toggling with multi argument, the column that is sorted as multi, will be the primary sort", () => {
    const { result } = renderHook(() =>
      useSort(products, {
        initialSort: [{ column: "price", order: "asc" }],
      })
    );
    act(() => {
      result.current.handleSort("name", true);
    });
    expect(result.current.sort).toEqual([
      { column: "name", order: "asc" },
      { column: "price", order: "asc" },
    ]);
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Apple",
      "Banana",
      "Carrot",
    ]);

    // Toggle order of secondary column
    act(() => {
      result.current.handleSort("price", true);
    });
    expect(result.current.sort).toEqual([
      { column: "price", order: "desc" },
      { column: "name", order: "asc" },
    ]);
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Apple",
      "Banana",
      "Carrot",
    ]);
  });

  it("deletes previous column from the sort order when another column is sorted, it will change the order to opposite", () => {
    const { result } = renderHook(() =>
      useSort(products, {
        initialSort: [
          { column: "price", order: "desc" },
          { column: "name", order: "asc" },
        ],
      })
    );
    act(() => {
      result.current.handleSort("name");
    });
    expect(result.current.sort).toEqual([{ column: "name", order: "desc" }]);
    expect(result.current.sortedData.map((p) => p.name)).toEqual([
      "Carrot",
      "Banana",
      "Apple",
    ]);
  });

  it("returns empty array if data is not array", () => {
    // @ts-expect-error :Testing invalid data input
    const { result } = renderHook(() => useSort(undefined));
    expect(result.current.sortedData).toEqual([]);
  });
});
