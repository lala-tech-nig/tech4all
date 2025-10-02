'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {children}
      </motion.div>
    </div>
  );
}
