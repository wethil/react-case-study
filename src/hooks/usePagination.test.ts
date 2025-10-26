import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "./usePagination";

type Item = { id: number; name: string };

const items: Item[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

describe("usePagination", () => {
  it("returns correct initial page and items", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10, initialPage: 2 })
    );
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedItems).toHaveLength(10);
    expect(result.current.itemsRange).toEqual({
      start: 11,
      end: 20,
      total: 25,
    });
  });

  it("goes to next and previous pages", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10 })
    );
    act(() => result.current.goToNext());
    expect(result.current.currentPage).toBe(2);
    act(() => result.current.goToPrevious());
    expect(result.current.currentPage).toBe(1);
  });

  it("does not go beyond page limits", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10 })
    );
    act(() => result.current.goToPrevious());
    expect(result.current.currentPage).toBe(1);
    act(() => result.current.goToPage(99));
    expect(result.current.currentPage).toBe(3);
  });

  it("resets to page 1 when items change", () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, { itemsPerPage: 10, initialPage: 2 }),
      { initialProps: { items } }
    );
    expect(result.current.currentPage).toBe(2);
    rerender({ items: items.slice(0, 5) });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.paginatedItems).toHaveLength(5);
  });

  it("returns correct hasNext and hasPrevious", () => {
    const { result } = renderHook(() =>
      usePagination(items, { itemsPerPage: 10 })
    );
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);
    act(() => result.current.goToNext());
    expect(result.current.hasPrevious).toBe(true);
    expect(result.current.hasNext).toBe(true);
    act(() => result.current.goToNext());
    expect(result.current.hasNext).toBe(false);
  });
});
