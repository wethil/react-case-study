import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

type Item = { id: number; name: string };

const items: Item[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

describe("usePagination", () => {
  it("returns correct paginated items and total pages for page 2", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10, currentPage: 2 })
    );
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedItems).toHaveLength(10);
    expect(result.current.itemsRange).toEqual({
      start: 11,
      end: 20,
      total: 25,
    });
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrevious).toBe(true);
  });

  it("returns correct paginated items for first page", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10, currentPage: 1 })
    );
    expect(result.current.paginatedItems[0].id).toBe(1);
    expect(result.current.itemsRange).toEqual({
      start: 1,
      end: 10,
      total: 25,
    });
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it("returns correct paginated items for last page", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10, currentPage: 3 })
    );
    expect(result.current.paginatedItems).toHaveLength(5);
    expect(result.current.itemsRange).toEqual({
      start: 21,
      end: 25,
      total: 25,
    });
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrevious).toBe(true);
  });

  it("handles out-of-bounds currentPage gracefully", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10, currentPage: 99 })
    );
    expect(result.current.paginatedItems).toHaveLength(0);
    expect(result.current.itemsRange).toEqual({
      start: 0,
      end: 0,
      total: 25,
    });
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrevious).toBe(false);
  });

  it("returns correct paginated items when items change", () => {
    const { result, rerender } = renderHook(
      ({ items, currentPage }) =>
        usePagination(items, { itemsPerPage: 10, currentPage }),
      { initialProps: { items, currentPage: 2 } }
    );
    expect(result.current.paginatedItems).toHaveLength(10);
    rerender({ items: items.slice(0, 5), currentPage: 1 });
    expect(result.current.paginatedItems).toHaveLength(5);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.itemsRange).toEqual({
      start: 1,
      end: 5,
      total: 5,
    });
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrevious).toBe(false);
  });
});
