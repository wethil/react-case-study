import React, { useState, Suspense } from "react";
import {
  render,
  renderHook,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ProductDataContext } from "@/contexts/ProductDataProviderContext";
import { Product } from "@/types/products.types";
import useGetProducts, { IResourceCache } from "./useGetProducts";
import { ErrorBoundary } from "react-error-boundary";

let testCache: IResourceCache;

// Mock the service
const mockGetProducts = vi.fn();
const mockService = { getProducts: mockGetProducts };

// Mock products data
const mockProducts: Product[] = [
  { id: 1, name: "Product A", category: "electronics", price: 100, stock: 10 },
  { id: 2, name: "Product B", category: "books", price: 20, stock: 5 },
];
const mockResponse = { products: mockProducts, total: 2 };

// Wrapper component for context
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProductDataContext.Provider value={mockService}>
    {children}
  </ProductDataContext.Provider>
);

// Create a fresh cache for each test
const createTestCache = () => {
  let store: Record<string, any> = {};
  return {
    get: (key: string) => store[key],
    set: (key: string, value: any) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
};

// Test component for Suspense and ErrorBoundary tests
const ProductsList: React.FC<{ params?: Record<string, unknown> }> = ({
  params,
}) => {
  // Use cache from context if available, else default to globalCache
  // For tests, useGetProducts(params, cache) will work as expected
  const data = useGetProducts(params, testCache);
  return (
    <div data-testid="products-list">
      <ul>
        {data.products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <p data-testid="total">Total: {data.total}</p>
    </div>
  );
};

describe("useGetProducts", () => {
  let resolvePromise: (value: any) => void;
  let rejectPromise: (reason?: any) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllMocks();
    testCache = createTestCache();
    // Create controllable promise for Suspense/Error tests
    const controllablePromise = new Promise((res, rej) => {
      resolvePromise = res;
      rejectPromise = rej;
    });
    mockGetProducts.mockReturnValue(controllablePromise);
  });

  it("should call the service with correct params", async () => {
    const params = { category: "electronics" };
    mockGetProducts.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useGetProducts(params, testCache), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current).toEqual(mockResponse);
    });

    expect(mockGetProducts).toHaveBeenCalledWith(params);
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
  });

  it("should return cached result for same params", async () => {
    const params = { page: 1 };
    mockGetProducts.mockResolvedValue(mockResponse);
    const { result: result1 } = renderHook(
      () => useGetProducts(params, testCache),
      { wrapper: Wrapper }
    );
    const { result: result2 } = renderHook(
      () => useGetProducts(params, testCache),
      { wrapper: Wrapper }
    );

    await waitFor(() => {
      expect(result1.current).toEqual(mockResponse);
      expect(result2.current).toEqual(mockResponse);
    });

    expect(mockGetProducts).toHaveBeenCalledTimes(1); // Only called once due to cache
  });

  it("should call service again for different params", async () => {
    const params1 = { page: 1 };
    const params2 = { page: 2 };
    mockGetProducts
      .mockResolvedValueOnce(mockResponse)
      .mockResolvedValueOnce(mockResponse);
    const { result: result1 } = renderHook(
      () => useGetProducts(params1, testCache),
      { wrapper: Wrapper }
    );
    await waitFor(() => expect(result1.current).toEqual(mockResponse));

    const { result: result2 } = renderHook(
      () => useGetProducts(params2, testCache),
      { wrapper: Wrapper }
    );
    await waitFor(() => expect(result2.current).toEqual(mockResponse));

    expect(mockGetProducts).toHaveBeenCalledTimes(2);
    expect(mockGetProducts).toHaveBeenCalledWith(params1);
    expect(mockGetProducts).toHaveBeenCalledWith(params2);
  });

  it("should use JSON.stringify for params key", async () => {
    const params = { category: "books", limit: 10 };
    mockGetProducts.mockResolvedValue(mockResponse);
    renderHook(() => useGetProducts(params, testCache), { wrapper: Wrapper });

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledWith(params);
    });

    // Test that different object with same content uses cache
    const sameParams = { category: "books", limit: 10 };
    renderHook(() => useGetProducts(sameParams, testCache), {
      wrapper: Wrapper,
    });

    expect(mockGetProducts).toHaveBeenCalledTimes(1);
  });
});

describe("useGetProducts Error and Suspense Handling", () => {
  let resolvePromise: (value: any) => void;
  let rejectPromise: (reason?: any) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    testCache = createTestCache();
    // Create controllable promise for Suspense/Error tests
    const controllablePromise = new Promise((res, rej) => {
      resolvePromise = res;
      rejectPromise = rej;
    });
    mockGetProducts.mockReturnValue(controllablePromise);
  });

  it("should show Suspense fallback during loading", async () => {
    render(
      <Wrapper>
        <Suspense
          fallback={<div data-testid="loading">Loading products...</div>}
        >
          <ProductsList />
        </Suspense>
      </Wrapper>
    );

    // Should show fallback initially
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("products-list")).not.toBeInTheDocument();

    // Resolve to exit Suspense
    act(() => {
      resolvePromise(mockResponse);
    });

    await waitFor(() => {
      expect(screen.getByTestId("products-list")).toBeInTheDocument();
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByTestId("total")).toBeInTheDocument();
    });
  });
  it("should catch error with ErrorBoundary on rejection", async () => {
    const errorSpy = vi.fn();

    // Create a pending promise and expose rejectPromise
    let rejectPromise: (reason?: any) => void;
    const pendingPromise = new Promise((_, rej) => {
      rejectPromise = rej;
    });
    mockGetProducts.mockReturnValue(pendingPromise);

    // Use a fresh cache instance
    const cache = {
      store: {} as Record<string, any>,
      get(key: string) {
        return this.store[key];
      },
      set(key: string, value: any) {
        this.store[key] = value;
      },
    };

    render(
      <ProductDataContext.Provider value={mockService}>
        <Suspense
          fallback={<div data-testid="loading">Loading products...</div>}
        >
          <ErrorBoundary
            fallback={<div>Error occurred!</div>}
            onError={errorSpy}
          >
            {/* Pass cache directly to hook via ProductsList */}
            <ProductsList params={undefined} />
          </ErrorBoundary>
        </Suspense>
      </ProductDataContext.Provider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await act(async () => {
      rejectPromise(new Error("Fetch failed"));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.getByText("Error occurred!")).toBeInTheDocument();
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
  });
});
