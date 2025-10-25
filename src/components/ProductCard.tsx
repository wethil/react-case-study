import React, { memo } from "react";
import { Product } from "@/types/products.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => (
  <article
    className="bg-white rounded-lg shadow p-4 border border-gray-200 transition-colors duration-200 hover:shadow-lg"
    role="article"
    aria-labelledby={`product-${product.id}-name`}
  >
    <h3
      id={`product-${product.id}-name`}
      className="text-lg font-semibold text-gray-900 mb-2"
    >
      {product.name}
    </h3>
    <p className="text-sm text-gray-600 mb-1">
      <strong>Category:</strong>{" "}
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 transition-colors duration-200">
        {product.category}
      </span>
    </p>
    <p className="text-sm text-gray-600 mb-1">
      <strong>Price:</strong> ${product.price.toFixed(2)}
    </p>
    <p className="text-sm text-gray-600">
      <strong>Stock:</strong> {product.stock} units
    </p>
  </article>
));

ProductCard.displayName = "ProductCard";

export default ProductCard;
