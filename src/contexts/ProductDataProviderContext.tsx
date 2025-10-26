import type { ProductDataService } from "@/services/ProductDataService";
import { ProductDataContext } from "@/contexts/ProductDataContext";

export const ProductDataProviderContext: React.FC<{
  service: ProductDataService;
  children: React.ReactNode;
}> = ({ service, children }) => (
  <ProductDataContext.Provider value={service}>
    {children}
  </ProductDataContext.Provider>
);
