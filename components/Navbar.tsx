import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#07090F]/80 backdrop-blur-md border-b border-line flex items-center justify-between px-6 md:px-12 z-50">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-4">
        {/* Monogram A */}
        <div className="w-8 h-8 border border-line flex items-center justify-center rounded bg-[#0D1220]">
          <span className="font-display italic text-text-1 text-lg font-bold">A</span>
        </div>
        {/* Name / Year */}
        <span className="font-sans text-[13px] font-medium tracking-wider text-text-3 uppercase select-none">
          ABRAHAM <span className="mx-1 text-line">/</span> 2026
        </span>
      </div>

      {/* Right: Social Icons */}
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/AbramSin17"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-2 hover:text-text-1 transition-opacity duration-150 cursor-target opacity-50 hover:opacity-100 flex items-center justify-center"
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
          className="text-text-2 hover:text-text-1 transition-opacity duration-150 cursor-target opacity-50 hover:opacity-100 flex items-center justify-center"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
