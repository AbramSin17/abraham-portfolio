import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-line py-5 px-6 md:px-12 flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#07090F] z-20 select-none">
      <span className="font-sans text-xs text-text-3">
        Abraham <span className="mx-1 text-line">/</span> 2026
      </span>
      <span className="font-sans text-xs text-text-3 text-center sm:text-left">
        Software Engineering Student · Politeknik WBI
      </span>
      <span className="font-sans text-xs text-text-3">
        @abrahamseputra
      </span>
    </footer>
  );
}
