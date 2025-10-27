import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products.types";

describe("ProductCard", () => {
  const product: Product = {
    id: 1,
    name: "Test Product",
    category: "Test Category",
    price: 99.99,
    stock: 10,
  };

  it("renders product name and category", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });

  it("renders product price and stock", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/\$99.99/)).toBeInTheDocument();
    expect(screen.getByText(/10 units/)).toBeInTheDocument();
  });
});
