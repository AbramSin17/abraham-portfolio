"use client";

import React from "react";

const row1 = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "TW" },
  { name: "Supabase", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "FastAPI", icon: "FA" },
  { name: "PostgreSQL", icon: "🐘" },
];

const row2 = [
  { name: "Unity", icon: "🎮" },
  { name: "AR Foundation", icon: "AR" },
  { name: "A-Frame", icon: "AF" },
  { name: "Figma", icon: "🎨" },
  { name: "Canva", icon: "CV" },
  { name: "CapCut", icon: "🎬" },
  { name: "Git", icon: "Git" },
  { name: "Vercel", icon: "▲" },
  { name: "Word", icon: "W" },
  { name: "Excel", icon: "X" },
  { name: "PowerPoint", icon: "P" },
];

export default function MarqueeSkills() {
  const renderRowItems = (items: typeof row1) => {
    return (
      <>
        {items.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-3 bg-bg-card border border-line rounded-lg mr-4 cursor-target hover:border-accent/60 transition-colors duration-200 select-none flex-shrink-0"
          >
            <span className="w-5 h-5 flex items-center justify-center text-xs font-mono font-bold bg-bg-raised text-accent rounded-sm select-none">
              {skill.icon}
            </span>
            <span className="font-sans text-xs md:text-[13px] font-medium text-text-2 tracking-wide">
              {skill.name}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden py-4 select-none">
      {/* Row 1: Moves Left */}
      <div className="flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee-left hover-pause">
          <div className="flex flex-row">
            {renderRowItems(row1)}
          </div>
          <div className="flex flex-row" aria-hidden="true">
            {renderRowItems(row1)}
          </div>
        </div>
      </div>

      {/* Row 2: Moves Right */}
      <div className="flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee-right hover-pause">
          <div className="flex flex-row">
            {renderRowItems(row2)}
          </div>
          <div className="flex flex-row" aria-hidden="true">
            {renderRowItems(row2)}
          </div>
        </div>
      </div>
    </div>
  );
}
