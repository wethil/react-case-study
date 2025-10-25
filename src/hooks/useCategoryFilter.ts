import { useState, useMemo } from "react";
import { Product } from "@/types/products.types";

// Custom hook for category filtering (SRP: handles only category state and client-side filtering)
export default function useCategoryFilter(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  return {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categories,
  };
}
