import { useContext, useMemo } from "react";
import { ProductDataContext } from "@/contexts/ProductDataContext";
import Resource from "@/utils/createResource";
import { Product } from "@/types/products.types";

type ProductResource = { products: Product[]; total: number };

export interface IResourceCache {
  get(key: string): Resource<ProductResource> | undefined;
  set(key: string, resource: Resource<ProductResource>): void;
  clear(): void;
}

export class ResourceCache implements IResourceCache {
  private cache: Map<string, Resource<ProductResource>> = new Map();
  get(key: string) {
    return this.cache.get(key);
  }
  set(key: string, resource: Resource<ProductResource>) {
    this.cache.set(key, resource);
  }
  clear() {
    this.cache.clear();
  }
}

export const globalCache = new ResourceCache();

const useGetProducts = (
  params?: Record<string, unknown>,
  cache: IResourceCache = globalCache
): ProductResource => {
  const productService = useContext(ProductDataContext);
  if (!productService) {
    throw new Error(
      "ProductDataContext.Provider is missing. Please wrap your component tree with the provider."
    );
  }

  const paramsKey = useMemo(() => JSON.stringify(params ?? {}), [params]);

  let resource = cache.get(paramsKey);

  if (!resource) {
    const promise = productService.getProducts(params);
    resource = new Resource<ProductResource>(promise);
    cache.set(paramsKey, resource);
  }
  const result = resource.read();
  return result;
};

export default useGetProducts;
