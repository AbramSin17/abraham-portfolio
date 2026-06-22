"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#07090F]/85 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Centered Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-[80vw] max-w-[900px] h-[85vh] bg-bg-card border border-line rounded-xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-bg-raised select-none">
              <div className="flex items-center gap-4">
                <h3 className="font-display italic text-lg text-text-1">
                  Curriculum Vitae — Abraham
                </h3>
                <a
                  href="/cv-placeholder.pdf"
                  download="CV_Abraham.pdf"
                  className="text-[11px] font-sans tracking-widest font-semibold bg-accent text-text-1 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors duration-150 cursor-target flex items-center gap-1"
                >
                  DOWNLOAD CV ↓
                </a>
              </div>
              <button
                onClick={onClose}
                className="text-text-3 hover:text-text-1 text-2xl leading-none transition-colors duration-150 cursor-target"
                aria-label="Close CV Modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Iframe Content */}
            <div className="flex-1 w-full bg-[#111827]">
              <iframe
                src="/cv-placeholder.pdf"
                className="w-full h-full border-none"
                title="Abraham Curriculum Vitae"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
