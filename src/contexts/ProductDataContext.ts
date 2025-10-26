import { createContext } from "react";
import type { ProductDataService } from "@/services/ProductDataService";

export const ProductDataContext = createContext<ProductDataService | null>(
  null
);
