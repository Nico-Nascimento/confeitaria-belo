"use client";

import { useEffect, useState } from "react";

interface BackToTopButtonProps {
  cartOpen: boolean;
}

export default function BackToTopButton({ cartOpen }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const shouldShow = visible && !cartOpen;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`
        fixed bottom-24 right-5 z-50
        w-12 h-12 rounded-full
        bg-[#c1856d] text-white
        flex items-center justify-center
        shadow-lg
        transition-all duration-300 ease-out
        hover:bg-[#4e1f0e]
        ${shouldShow
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
