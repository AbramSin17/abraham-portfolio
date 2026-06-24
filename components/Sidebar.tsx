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

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sidebar Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              style={{ zIndex: 45 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-[#07090F] border-l border-line shadow-2xl p-8 pt-24 md:hidden flex flex-col justify-between select-none"
            >
              {/* Top Section: Nav Links */}
              <div className="flex flex-col gap-8">
                <span className="font-sans text-[10px] text-text-3 font-semibold tracking-widest uppercase">
                  NAVIGATION
                </span>

                <ul className="flex flex-col gap-5">
                  {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 + 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`group flex items-center gap-3 text-sm font-sans tracking-widest uppercase transition-colors duration-150 cursor-target ${
                            isActive ? "text-text-1 font-semibold" : "text-text-3 hover:text-text-2"
                          }`}
                        >
                          <span
                            className={`transition-all duration-150 ${
                              isActive ? "opacity-100 text-accent font-bold w-4" : "opacity-30 group-hover:opacity-60 w-2"
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
              </div>

              {/* Bottom Section: Footer / Social Info */}
              <div className="border-t border-line/40 pt-6 flex flex-col gap-4">
                <span className="font-sans text-[9px] text-text-3 tracking-widest uppercase">
                  GET IN TOUCH
                </span>
                
                <div className="flex gap-5">
                  <a
                    href="https://github.com/AbramSin17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-3 hover:text-accent transition-colors duration-150 cursor-target"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-3 hover:text-accent transition-colors duration-150 cursor-target"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  
                  <a
                    href="mailto:abrahamseputra@gmail.com"
                    className="text-text-3 hover:text-accent transition-colors duration-150 cursor-target"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
