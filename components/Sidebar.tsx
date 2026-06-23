"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "SKILLS", href: "/skills" },
  { name: "WEBAR", href: "/webar" },
  { name: "CREDENTIALS", href: "/credentials" },
  { name: "CONTACT", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 w-[200px] h-[calc(100vh-64px)] border-r border-line bg-[#07090F] hidden md:flex flex-col py-12 px-6 z-40 select-none">
        <ul className="flex flex-col gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-2 text-[11px] font-sans tracking-widest uppercase transition-colors duration-150 cursor-target ${
                    isActive ? "text-text-1" : "text-text-3 hover:text-text-2"
                  }`}
                >
                  <span
                    className={`transition-opacity duration-150 ${
                      isActive ? "opacity-100 text-accent font-bold" : "opacity-30 group-hover:opacity-60"
                    }`}
                  >
                    —
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile Hamburger Trigger - Fixed at top-right */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 text-text-2 hover:text-text-1 transition-colors md:hidden cursor-target bg-[#0D1220]/80 backdrop-blur border border-line rounded"
        aria-label="Toggle navigation menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between items-center relative">
          <span
            className={`w-5 h-[2px] bg-current rounded transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-current rounded transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-current rounded transition-all duration-300 ${
              isOpen ? "-rotate-45 translate-y-[-7px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-full bg-[#07090F]/95 backdrop-blur-lg z-45 md:hidden flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`group flex items-center justify-center gap-2 text-base font-sans tracking-widest uppercase transition-colors duration-150 cursor-target ${
                        isActive ? "text-text-1 font-semibold" : "text-text-3 hover:text-text-2"
                      }`}
                    >
                      <span
                        className={`transition-opacity duration-150 ${
                          isActive ? "opacity-100 text-accent font-bold" : "opacity-30 group-hover:opacity-60"
                        }`}
                      >
                        —
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
