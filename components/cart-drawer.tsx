"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  items: { id: string; name: string; price: number; quantity: number }[];
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onClear: () => void;
}

export default function CartDrawer({
  items,
  onDecrease,
  onIncrease,
  onClear,
}: CartDrawerProps) {
  const [open, setOpen] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // Formatador BRL
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Carrinho ({totalQuantity})</Button>
      </SheetTrigger>

      {/* Animação do conteúdo do carrinho */}
      <AnimatePresence>
        {open && (
          <SheetContent
            side="right"
            className="w-80 bg-white p-0 overflow-hidden"
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full flex flex-col p-6"
            >
              <SheetHeader>
                <SheetTitle>Seu Carrinho</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Carrinho vazio</p>
                ) : (
                  <>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)} — {item.quantity}x
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="font-semibold">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onIncrease(item.id)}
                            >
                              +
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDecrease(item.id)}
                            >
                              -
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Total e ações */}
              {items.length > 0 && (
                <div className="mt-auto pt-4 border-t">
                  <div className="flex justify-between font-semibold mb-4">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={onClear}
                    >
                      Esvaziar
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        Fechar
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              )}
            </motion.div>
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  );
}
