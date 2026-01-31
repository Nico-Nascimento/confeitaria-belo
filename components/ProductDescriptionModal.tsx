"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ProductDescriptionModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  description: string;
  serves: string;
}

export default function ProductDescriptionModal({
  open,
  onClose,
  name,
  description,
  serves,
}: ProductDescriptionModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto"
          >
            <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

            <h2 className="text-lg font-bold mb-2">{name}</h2>

            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {description}
            </p>

            <p className="text-sm text-gray-500 italic">{serves}</p>

            <button
              onClick={onClose}
              className="mt-5 w-full bg-[#613424] text-white py-2 rounded-lg font-semibold"
            >
              Fechar
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
