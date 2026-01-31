"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import CartFloatingButton from "@/components/CartFloatingButton";
import CartSidebar from "@/components/CartSidebar";
import ImagePreviewModal from "@/components/ImagePreviewModal";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

export interface Product {
  id: number;
  name: string;
  description: string;
  serves: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [showFreteInput, setShowFreteInput] = useState<boolean>(false);
  const [endereco, setEndereco] = useState<string>("");
  const [cartBounce, setCartBounce] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappNumber = "555192316351";

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  };

  const removeOneFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const addOneFromCart = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const handleClearCart = () => {
    const audio = new Audio("/clear.wav");
    audio.volume = 0.4;
    audio.play();
    clearCart();
  };

  const formatCartMessage = () => {
    if (cart.length === 0)
      return "Olá Belô! Gostaria de fazer um pedido.";

    const cartText = cart
      .map(
        (item) =>
          `• *${item.name}*\nQuantidade: ${item.quantity}\nUnitário: R$${item.price
            .toFixed(2)
            .replace(".", ",")}\nSubtotal: R$${(item.price * item.quantity)
              .toFixed(2)
              .replace(".", ",")}`
      )
      .join("\n\n");

    const total = cart.reduce((a, i) => a + i.price * i.quantity, 0);

    return `🛒 *Meu Carrinho de Compras* 🛒\n\n${cartText}\n\n💰 *Total Geral:* R$${total
      .toFixed(2)
      .replace(".", ",")}`;
  };

  const sendToWhatsApp = () => {
    const message = formatCartMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const sendHelloWhatsApp = () => {
    const message =
      "Olá Belô! Gostaria de fazer um pedido ou mais informações.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleSendFrete = () => {
    if (!endereco.trim()) {
      alert("Por favor, digite um endereço.");
      return;
    }
    const message = `Olá Belô, gostaria de calcular o frete para: ${endereco}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setShowFreteInput(false);
    setEndereco("");
  };

  const totalItems = cart.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = cart.reduce((a, i) => a + i.price * i.quantity, 0);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(n);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <Header />

      <ProductList
        cart={cart}
        formatCurrency={formatCurrency}
        addToCart={addToCart}
        onImageClick={(img) => setSelectedImage(img)}
      />


      <CartFloatingButton
        totalItems={totalItems}
        cartBounce={cartBounce}
        openCart={() => setCartOpen(true)}
      />


      <CartSidebar
        cartOpen={cartOpen}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        showFreteInput={showFreteInput}
        endereco={endereco}
        setEndereco={setEndereco}
        closeCart={() => setCartOpen(false)}
        removeOne={removeOneFromCart}
        addOne={addOneFromCart}
        clearCart={handleClearCart}
        sendFrete={handleSendFrete}
        toggleFrete={() => setShowFreteInput(!showFreteInput)}
        sendToWhatsApp={sendToWhatsApp}
        formatCurrency={formatCurrency}
      />

      <ImagePreviewModal
        image={selectedImage}
        close={() => setSelectedImage(null)}
      />

      <Footer />
    </div>
  );
}
