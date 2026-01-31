"use client";

import { products } from "@/constants/products";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  serves: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductListProps {
  cart: CartItem[];
  formatCurrency: (n: number) => string;
  addToCart: (product: Product) => void;
  onImageClick: (img: string) => void;
}

export default function ProductList({
  cart,
  formatCurrency,
  addToCart,
  onImageClick,
}: ProductListProps) {
  
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      {Object.entries(productsByCategory).map(
        ([category, items]) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white text-center py-2 rounded-lg bg-[#613424] shadow">
              {category}
            </h2>

            {items.map((product, index) => {
              const cartItem = cart.find(
                (item) => item.id === product.id
              );

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  cartItem={cartItem}
                  formatCurrency={formatCurrency}
                  addToCart={addToCart}
                  onImageClick={onImageClick}
                />
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
