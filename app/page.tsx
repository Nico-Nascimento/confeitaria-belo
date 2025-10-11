"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // ⬅️ Import Framer Motion

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

const products = [
  {
    id: 1,
    name: "Bolo Caseiro Vulcão - Delícia de Morango",
    description: "Massa branca, geleia de morango artesanal, brigadeiro branco e morangos in-natura.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 21.90,
    image: "/caseirinho-morango.jpg",
  },
  {
    id: 2,
    name: "Bolo Caseiro Vulcão - Sensação",
    description: "Massa de chocolate, geleia de morango artesanal, brigadeiro de chocolate, fios de creme de avelã e morangos in-natura.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 21.90,
    image: "/caseirinho-sensacao.jpg",
  },
  {
    id: 3,
    name: "Bolo Caseiro Vulcão - Chocolatudo",
    description: "Massa chocolate, brigadeiro de chocolate e pedaços de Brownie.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 18.90,
    image: "/caseirinho-brownie.jpg",
  },
  {
    id: 4,
    name: "Bolo Caseiro Vulcão - Choco-Ninho",
    description: "Massa chocolate, brigadeiro branco, Ninho e bombom.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 18.90,
    image: "/caseirinho-choco-ninho.jpg",
  },
  {
    id: 5,
    name: "Bolo Caseiro Vulcão -Kit Kat",
    description: "Massa branca, brigadeiro branco e pedaços de Kit Kat.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 20.90,
    image: "/caseirinho-kitkat.jpg",
  },
  {
    id: 6,
    name: "Bolo Caseiro Vulcão - Ninho com Creme de Avelã",
    description: "Massa branca, brigadeiro de creme de avelã, brigadeiro branco e fios de creme de avelã.",
    serves: "Serve 1 a 2 pessoas (aprox. 400g).",
    price: 21.50,
    image: "/caseirinho-ninho-avela.jpg",
  },
  /*{
    id: 7,
    name: "Bolo no Pote - Delícia de Morango",
    description: "Camadas de massa branca, geleia de morango artesanal, brigadeiro branco e mousse de Ninho.",
    serves: "Serve 1 pessoa (aprox. 200g).",
    price: 13.90,
    image: "/pote-morango.jpg",
  },*/
  {
    id: 8,
    name: "Bolo no Pote - Choco-Ninho",
    description: "Camadas de massa de chocolate, brigadeiro branco, Ninho e mousse de Ninho.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 13.90,
    image: "/pote-choco-ninho.jpg",
  },
  {
    id: 9,
    name: "Bolo no Pote - Chocolatudo",
    description: "Camadas de massa de chocolate, brigadeiro de chocolate e mousse de chocolate.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 13.90,
    image: "/pote-chocolatudo.jpg",
  },
  {
    id: 10,
    name: "Bolo no Pote - Ouro Branco",
    description: "Camadas de massa branca, brigadeiro branco, mousse de Ninho e Ouro Branco em pedaços.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 15.90,
    image: "/pote-ouro-branco.jpg",
  },
  {
    id: 12,
    name: "Bolo no Pote - Prestígio",
    description: "Camadas de massa de chocolate, brigadeiro branco e de chocolate, mousse de chocolate e coco ralado.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 13.90,
    image: "/pote-prestigio.jpg",
  },
  {
    id: 13,
    name: "Bolo Gelado - Abacaxi com coco",
    description: "Massa branca, brigadeiro de coco, doce de abacaxi e coco ralado.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 11.90,
    image: "/gelado-abacaxi-coco.jpg",
  },
  {
    id: 14,
    name: "Bolo Gelado - Limão",
    description: "Massa branca, brigadeiro de limão, biscoito de limão e raspas de limão.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 11.50,
    image: "/gelado-limao.jpg",
  },
  {
    id: 15,
    name: "Bolo Gelado - Prestígio",
    description: "Massa de chocolate, brigadeiro de coco, brigadeiro de chocolate e coco ralado.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 10.50,
    image: "/gelado-prestigio.jpg",
  },
  {
    id: 16,
    name: "Bolo Gelado - Amendoim com Creme de Avelã",
    description: "Massa de chocolate, brigadeiro de creme de avelã, brigadeiro de chocolate, amendoim granulado e fios de creme de avelã.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 11.90,
    image: "/gelado-avela-amendoim.jpg",
  },
  {
    id: 17,
    name: "Bolo Gelado - DuoChoco",
    description: "Massa de chocolate, brigadeiro branco e brigadeiro de chocolate.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 10.90,
    image: "/gelado-duo-choco.jpg",
  },
  {
    id: 18,
    name: "Brownie - Brownie Recheado de Ninho",
    description: "Brownie que desmancha na boca, recheado com brigadeiro de Ninho.",
    serves: "Serve 1 pessoa (aprox. 130g).",
    price: 7.90,
    image: "/brownie-ninho.jpg",
  },
  {
    id: 19,
    name: "Brownie Recheado de Doce de Leite",
    description: "Brownie que desmancha na boca, recheado com doce de leite.",
    serves: "Serve 1 pessoa (aprox. 130g).",
    price: 7.90,
    image: "/brownie-doceleite.jpg",
  },
  {
    id: 20,
    name: "Brownie Recheado de Brigadeiro",
    description: "Brownie que desmancha na boca, recheado com brigadeiro de chocolate.",
    serves: "Serve 1 pessoa (aprox. 130g).",
    price: 7.90,
    image: "/brownie-brigadeiro.jpg",
  },
  /*{
    id: 21,
    name: "Brownie no Pote - Bombom de Morango",
    description: "Camadas de mousse de Ninho e mousse de chocolate, brigadeiro de chocolate e brigadeiro branco, morangos frescos e lasquinhas de Brownie.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 11.50,
    image: "/caseirinho-morango.jpg",
  },
  {
    id: 22,
    name: "Brownie no Pote - Duo Choco",
    description: "Camadas de mousse de Ninho e mousse de chocolate, brigadeiro de chocolate e brigadeiro branco e lasquinhas de Brownie.",
    serves: "Serve 1 pessoa (aprox. 220g).",
    price: 11.50,
    image: "/caseirinho-morango.jpg",
  },*/
  {
    id: 23,
    name: "Afogadaço de Brownie - Ninho com Avelã",
    description: "Brownie coberto com brigadeiro branco, Ninho e fios de creme de avelã.",
    serves: "Serve 1 pessoa (aprox. 230g).",
    price: 11.90,
    image: "/afogadaco-ninho-avela.jpg",
  },
  /*{
    id: 24,
    name: "Afogadaço de Brownie - Floresta Negra",
    description: "Brownie coberto com brigadeiro de chocolate, geleia de morango e fios de creme de avelã.",
    serves: "Serve 1 pessoa (aprox. 200g).",
    price: 11.90,
    image: "/caseirinho-morango.jpg",
  },
  {
    id: 25,
    name: "Fatia de Brownie - Duo Kit Kat",
    description: "Fatia de Brownie coberto com brigadeiro de chocolate e brigadeiro branco, fios de creme de avelã e Kit Kat.",
    serves: "Serve 1 pessoa (aprox. 200g).",
    price: 11.50,
    image: "/fatia-kitkat.jpg",
  },
  {
    id: 26,
    name: "Fatia de Brownie - Morangos com Avelã",
    description: "Fatia de Brownie coberto com brigadeiro branco, fios de creme de avelã e morangos frescos.",
    serves: "Serve 1 pessoa (aprox. 200g).",
    price: 11.50,
    image: "/fatia-kitkat.jpg",
  },*/
];


export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showFreteInput, setShowFreteInput] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [cartBounce, setCartBounce] = useState(false); // ⬅️ controla bounce do carrinho

  const whatsappNumber = "555192316351"; // Número da confeitaria

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // ativa o bounce do carrinho
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  };

  const removeOneFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addOneFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const handleClearCart = () => {
    const audio = new Audio("/clear.wav");
    audio.volume = 0.4; // volume mais suave
    audio.play();

    clearCart(); // função que limpa o carrinho
  };

  const formatCartMessage = () => {
    if (cart.length === 0) return "Olá Belô! Gostaria de fazer um pedido.";

    const cartText = cart
      .map(
        (item) =>
          `• *${item.name}*  
   Quantidade: ${item.quantity}  
   Unitário: R$${item.price.toFixed(2).replace(".", ",")} 
   Subtotal: R$${(item.price * item.quantity).toFixed(2).replace(".", ",")}`
      )
      .join("\n\n");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return `🛒 *Meu Carrinho de Compras* 🛒\n\n${cartText}\n\n💰 *Total Geral:* R$${total.toFixed(2).replace(".", ",")}`;
  };

  const sendToWhatsApp = () => {
    const message = formatCartMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Função para enviar só um "Olá"
  const sendHelloWhatsApp = () => {
    const message = "Olá Belô! Gostaria de fazer um pedido ou mais informações.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSendFrete = () => {
    if (!endereco.trim()) {
      alert("Por favor, digite um endereço.");
      return;
    }
    const message = `Olá Belô, gostaria de calcular o frete para: ${endereco}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowFreteInput(false);
    setEndereco("");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // formatador BRL
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: -20 }} // começa invisível e levemente acima
        animate={{ opacity: 1, y: 0 }}   // aparece e desce suavemente
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/logo.png"
          alt="Logo Confeitaria"
          width={170}
          height={170}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* Título com animação */}
      <motion.h1
        className="text-2xl font-bold mb-4 text-white drop-shadow text-center"
        initial={{ opacity: 0, y: 10 }} // começa invisível e levemente abaixo
        animate={{ opacity: 1, y: 0 }}  // aparece e sobe suavemente
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} // delay para dar efeito sequencial
      >
        🍰 Cardápio da Belô 🍰
      </motion.h1>

      {/* Lista de produtos */}
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {products.map((product, index) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }} // começa invisível e levemente abaixo
              animate={{ opacity: 1, y: 0 }} // aparece e sobe suavemente
              transition={{ duration: 0.4, delay: index * 0.08 }} // delay progressivo para efeito em cascata
              className="flex items-center gap-4 border p-4 rounded-lg shadow bg-white/80 relative hover:shadow-xl transition-shadow duration-300"
            >
              {/* Imagem com contador animado */}
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={140}
                  height={140}
                  className="rounded-md object-cover"
                />

                <AnimatePresence>
                  {cartItem && (
                    <motion.span
                      key={cartItem.quantity}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-[#613424] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md"
                    >
                      {cartItem.quantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Infos do produto */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold ">{product.name}</h2>
                  <p className="text-sm text-gray-700 ">{product.description}</p>
                  <p className="text-sm text-gray-500 italic">{product.serves}</p>
                </div>

                {/* Preço + botão */}
                <div className="flex justify-end items-center gap-12 mt-3">
                  <p className="font-bold text-[#613424]">
                    {formatCurrency(product.price)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#613424] text-white px-3 py-1 rounded hover:bg-[#2e0e02] transition-all"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Botão do carrinho com bounce animado */}
      <motion.button
        onClick={() => setCartOpen(true)}
        animate={cartBounce ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-4 bg-[#c1856d] text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-colors"
      >
        <ShoppingCart />
        {totalItems > 0 && (
          <span className="bg-[#613424] text-white text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>
        )}
      </motion.button>

      {/* Botão WhatsApp */}
      <motion.button onClick={sendHelloWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-3 left-4 p-3 transition-colors">
        <Image src="/whatsapp.png" alt="WhatsApp" width={56} height={56} />
      </motion.button>

      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Fundo escuro com fade */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setCartOpen(false)}
            />

            {/* Drawer do carrinho com slide suave */}
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

              {/* Itens com fade suave ao esvaziar */}
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
                          onClick={() => removeOneFromCart(item.id)}
                          className="bg-[#c1856d] text-white px-3 py-1 rounded hover:bg-[#b87358] transition-all"
                        >
                          -
                        </button>
                        <span className="px-1 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addOneFromCart(item.id)}
                          className="bg-[#613424] text-white px-3 py-1 rounded hover:bg-[#642711] transition-all"
                        >
                          +
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              <p className="mt-4 font-bold">
                Total: {formatCurrency(totalPrice)}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handleClearCart}
                  className="bg-[#613424] text-white px-4 py-2 rounded hover:bg-[#4e1f0e]"
                >
                  Esvaziar Carrinho
                </button>

                {/* Animação de fade+slide ao alternar entre Solicitar e Voltar */}
                <AnimatePresence mode="wait">
                  {!showFreteInput ? (
                    <motion.button
                      key="freteButton"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setShowFreteInput(true)}
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
                          onClick={handleSendFrete}
                          className="bg-[#03a064] text-white px-3 py-1 rounded hover:bg-green-600 flex-1"
                        >
                          Enviar Endereço
                        </button>
                        <button
                          onClick={() => setShowFreteInput(false)}
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
                  onClick={() => setCartOpen(false)}
                  className="bg-[#4B352A] text-white px-4 py-2 rounded hover:bg-[#240d04]"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="w-full text-center py-4 bg-[#6d3927d3] text-white mt-8">
        <p>
          © Nicolas Nascimento {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
}
