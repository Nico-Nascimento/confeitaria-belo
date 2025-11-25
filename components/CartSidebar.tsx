"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  cartOpen: boolean;
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  showFreteInput: boolean;
  endereco: string;
  setEndereco: (v: string) => void;

  closeCart: () => void;
  removeOne: (id: number) => void;
  addOne: (id: number) => void;
  clearCart: () => void;
  sendFrete: () => void;
  toggleFrete: () => void;
  sendToWhatsApp: () => void;
  formatCurrency: (n: number) => string;
}

export default function CartSidebar({
  cartOpen,
  cart,
  totalItems,
  totalPrice,
  showFreteInput,
  endereco,
  setEndereco,

  closeCart,
  removeOne,
  addOne,
  clearCart,
  sendFrete,
  toggleFrete,
  sendToWhatsApp,
  formatCurrency,
}: Props) {
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Fundo escuro */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            key="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col z-50"
          >
            <h2 className="text-xl font-bold mb-4">
              Carrinho ({totalItems} itens)
            </h2>

            {/* Lista */}
            <motion.ul
              layout
              className="flex-1 overflow-y-auto space-y-3"
              transition={{ layout: { duration: 0.3 } }}
            >
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between bg-white/80 rounded-md p-2 shadow-sm"
                  >
                    <div className="flex-1 pr-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeOne(item.id)}
                        className="bg-[#c1856d] text-white px-3 py-1 rounded hover:bg-[#b87358] transition-all"
                      >
                        -
                      </button>

                      <span className="px-1 font-medium">{item.quantity}</span>

                      <button
                        onClick={() => addOne(item.id)}
                        className="bg-[#613424] text-white px-3 py-1 rounded hover:bg-[#642711] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {/* Total */}
            <p className="mt-4 font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>

            {/* Ações */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={clearCart}
                className="bg-[#613424] text-white px-4 py-2 rounded hover:bg-[#4e1f0e]"
              >
                Esvaziar Carrinho
              </button>

              <AnimatePresence mode="wait">
                {!showFreteInput ? (
                  <motion.button
                    key="freteButton"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onClick={toggleFrete}
                    className="bg-[#c9b290] text-white px-4 py-2 rounded hover:bg-[#b19b7a]"
                  >
                    Solicitar Taxa de Entrega
                  </motion.button>
                ) : (
                  <motion.div
                    key="freteInput"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Digite seu endereço"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="border p-2 rounded w-full"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={sendFrete}
                        className="bg-[#03a064] text-white px-3 py-1 rounded hover:bg-green-600 flex-1"
                      >
                        Enviar Endereço
                      </button>

                      <button
                        onClick={toggleFrete}
                        className="bg-[#c9b290] text-white px-3 py-1 rounded hover:bg-[#642711] flex-1"
                      >
                        Voltar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={sendToWhatsApp}
                className="bg-[#03a064] text-white px-4 py-2 rounded hover:bg-[#036b43]"
              >
                Enviar Pedido no WhatsApp
              </button>

              <button
                onClick={closeCart}
                className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#240d04]"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
