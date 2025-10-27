import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductDataProviderContext } from "@/contexts/ProductDataProviderContext.tsx";
import MockProductDataService from "@services/MockProductDataService";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <ProductDataProviderContext service={MockProductDataService}>
    <BrowserRouter>{children}</BrowserRouter>
  </ProductDataProviderContext>
);

Providers.displayName = "Providers";

export default Providers;
