import React, { createContext, useContext } from "react";
import type { ProductDataService } from "@/services/ProductDataService";

export const ProductDataContext = createContext<ProductDataService | null>(
  null
);

export const ProductDataProviderContext: React.FC<{
  service: ProductDataService;
  children: React.ReactNode;
}> = ({ service, children }) => (
  <ProductDataContext.Provider value={service}>
    {children}
  </ProductDataContext.Provider>
);

export function useProductDataService() {
  const ctx = useContext(ProductDataContext);
  if (!ctx) throw new Error("Provider not found");
  return ctx;
}
