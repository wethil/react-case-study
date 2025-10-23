// filepath: /home/wethil/Prep/react-case-study-main/src/services/MockProductDataService.ts
import products from "@/data/products.json";
import type { Product } from "@/types/products.types";
import type {
  ProductDataService,
  ProductQueryParams,
} from "./ProductDataService";

// Strategy interface for filtering (OCP: open for new strategies)
interface IFilterStrategy {
  filter(products: Product[], params: ProductQueryParams): Product[];
}

class CategoryFilter implements IFilterStrategy {
  filter(products: Product[], params: ProductQueryParams) {
    return params.category && params.category !== "all"
      ? products.filter((p) => p.category === params.category)
      : products;
  }
}

// Service depends on abstractions (DIP)
const MockProductDataService: ProductDataService = {
  async getProducts(params?: ProductQueryParams) {
    let filtered = products as Product[];
    const filterStrategy: IFilterStrategy = new CategoryFilter(); // Can inject different strategies
    filtered = filterStrategy.filter(filtered, params || {});
    // Add sorting/pagination strategies similarly
    return { products: filtered, total: filtered.length };
  },
};

export default MockProductDataService;
