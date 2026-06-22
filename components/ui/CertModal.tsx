"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Cert {
  id: number;
  title: string;
  issuer: string;
  year: string;
  type: string;
  file: string;
}

interface CertModalProps {
  cert: Cert | null;
  onClose: () => void;
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#07090F]/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Centered Modal Content Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[75vw] max-w-[800px] h-[85vh] bg-bg-card border border-line rounded-xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
          >
            {/* Header Area */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-bg-raised select-none">
              <h3 className="font-sans font-semibold text-sm md:text-base text-text-1 truncate max-w-[60%]">
                {cert.title}
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href={cert.file}
                  download
                  className="text-[11px] font-sans tracking-widest font-semibold bg-accent text-text-1 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors duration-150 cursor-target flex items-center gap-1 uppercase"
                >
                  DOWNLOAD ↓
                </a>
                <button
                  onClick={onClose}
                  className="text-text-3 hover:text-text-1 text-2xl leading-none transition-colors duration-150 cursor-target"
                  aria-label="Close Modal"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Document Body Area */}
            <div className="flex-1 w-full bg-[#111827] overflow-hidden">
              {cert.type === "PDF" ? (
                <iframe
                  src={cert.file}
                  className="w-full h-full border-none"
                  title={cert.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 bg-black/40">
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
