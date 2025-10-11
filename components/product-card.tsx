"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  serves: string; // NOVO campo
  price: number;
  image: string;
  quantity: number;
  onAddToCart: () => void;
}

export default function ProductCard({
  id,
  name,
  description,
  serves,
  price,
  image,
  quantity,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="w-64 h-auto shadow-lg relative flex flex-col">
      {/* Badge de quantidade */}
      {quantity > 0 && (
        <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {quantity}
        </span>
      )}

      <CardContent className="p-4 flex flex-col items-start gap-3 flex-1">
        {/* Imagem mais no canto superior esquerdo */}
        <div className="w-full h-full flex justify-start">
          <Image
            src={image}
            alt={name}
            width={120}
            height={180}
            className="rounded-md object-cover"
          />
        </div>

        {/* Preço e botão logo abaixo da imagem */}
        <div className="w-full flex items-center justify-between">
          <span className="text-pink-700 font-bold">R$ {price.toFixed(2)}</span>
          <Button size="sm" onClick={onAddToCart}>
            Adicionar
          </Button>
        </div>

        {/* Nome, descrição e "serve X pessoas" */}
        <div className="w-full">
          <h3 className="mt-2 font-semibold text-lg">{name}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
          <p className="mt-1 text-xs text-gray-500 italic">{serves}</p>
        </div>
      </CardContent>
    </Card>
  );
}
