"use client";

import Image from "next/image";
import { useState } from "react";
import ProductDescriptionModal from "./ProductDescriptionModal";
import { motion, AnimatePresence } from "framer-motion";


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

interface ProductCardProps {
  product: Product;
  index: number;
  cartItem: CartItem | undefined;
  formatCurrency: (value: number) => string;
  addToCart: (product: Product) => void;
  onImageClick: (img: string) => void;
}


export default function ProductCard({
  product,
  cartItem,
  index,
  formatCurrency,
  addToCart,
  onImageClick,
  
}: ProductCardProps) {
  const [openDescription, setOpenDescription] = useState(false);
  return (
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
    >
      {/* TEXTO */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold leading-tight">
            {product.name}
          </h2>

          <p
            onClick={() => setOpenDescription(true)}
            className="text-sm text-gray-600 mt-1 line-clamp-2 cursor-pointer hover:underline">
            {product.description}
          </p>

          <p className="text-xs text-gray-500 italic mt-1">
            {product.serves}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-[#613424] text-lg">
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#613424] text-white text-sm px-4 py-1.5 rounded-full hover:bg-[#4e1f0e] transition"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* IMAGEM */}
      <div className="relative shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          width={96}
          height={96}
          className="rounded-lg object-cover cursor-pointer"
          onClick={() => onImageClick(product.image)}
        />

        <ProductDescriptionModal
          open={openDescription}
          onClose={() => setOpenDescription(false)}
          name={product.name}
          description={product.description}
          serves={product.serves}
        />


        <AnimatePresence>
          {cartItem && (
            <motion.span
              key={cartItem.quantity}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -top-2 -right-2 bg-[#613424] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow"
            >
              {cartItem.quantity}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
