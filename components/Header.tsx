"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <>
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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

      <motion.h1
        className="text-2xl font-bold mb-4 text-white drop-shadow text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        🍰 Cardápio da Belô 🍰
      </motion.h1>
    </>
  );
}
