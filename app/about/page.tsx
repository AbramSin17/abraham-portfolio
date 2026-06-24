"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const experienceData = [
  {
    year: "2026",
    title: "GBI Connect",
    subtitle: "Client Project · Supabase + Vercel + Leaflet.js",
  },
  {
    year: "2025",
    title: "UMKMInsight",
    subtitle: "Competition · FastAPI + Gemini AI",
  },
];

const educationData = [
  {
    year: "2023–Now",
    title: "Politeknik WBI",
    subtitle: "D4 Teknologi Rekayasa Perangkat Lunak",
  },
  {
    year: "2020–2023",
    title: "SMA Budi Murni 01 Medan",
    subtitle: "Science Major",
  },
];

export default function AboutPage() {
  const lanyardRef = useRef<HTMLDivElement>(null);

  // Manual 3D Tilt calculation based on mouse coordinates relative to element dimensions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = lanyardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12; // Max ±8 degrees approx
    const rotateY = (x - centerX) / 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = lanyardRef.current;
    if (!card) return;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (idx: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: idx * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="min-h-full w-full py-12 px-6 md:px-12 relative z-10 flex flex-col justify-start">
      {/* Top Header */}
      <div className="max-w-3xl mb-12">
        <p className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-2">
          ABOUT / BACKGROUND
        </p>
        <SplitText
          text="Building web systems, AR/VR experiences, and AI-powered tools."
          className="font-display italic text-4xl md:text-5xl lg:text-[52px] leading-tight text-text-1 font-normal tracking-tight"
          stagger={0.05}
        />
      </div>

      {/* Grid: 3 Columns on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* COLUMN 1: Lanyard Card (35% width) */}
        <div className="w-full lg:w-[35%] flex flex-col">
          <div
            ref={lanyardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              const card = lanyardRef.current;
              if (card) card.style.boxShadow = "0 0 0 1px rgba(37,99,235,0.4)";
            }}
            onMouseLeave={() => {
              const card = lanyardRef.current;
              if (card) card.style.boxShadow = "none";
              handleMouseLeave();
            }}
            className="w-full bg-bg-card border border-line rounded-2xl overflow-hidden shadow-lg select-none group"
            style={{
              transition: "transform 0.15s ease-out, box-shadow 0.25s ease",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Header Banner */}
            <div className="h-[80px] bg-gradient-to-r from-accent to-bg-raised" />

            {/* Avatar Profile */}
            <div className="-mt-10 ml-4 relative z-10 w-20 h-20 rounded-full border-2 border-text-1 overflow-hidden bg-bg-raised">
              <img
                src="/abram.jpeg"
                alt="Abraham avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback in case avatar.jpg doesn't exist
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238896B3'><circle cx='12' cy='8' r='4'/><path d='M2 20c0-3.3 2.7-6 6-6h8c3.3 0 6 2.7 6 6v2H2v-2z'/></svg>";
                }}
              />
            </div>

            {/* Lower Profile Body */}
            <div className="p-4 flex flex-col">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-sans text-base font-semibold text-text-1">Abraham</span>
                {/* Active Indicator status */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] inline-block animate-pulse" />
                  <span className="font-sans text-[11px] text-text-2 tracking-wide font-medium">
                    Available for work
                  </span>
                </div>
              </div>

              <span className="font-sans text-[12px] text-text-2 mb-0.5">
                Software Engineering Student
              </span>
              <span className="font-sans text-[11px] text-text-3 mb-2">
                Politeknik WBI — D4 TRPL
              </span>
              <span className="font-sans text-[11px] text-text-3 mb-4">Medan, North Sumatra, ID</span>

              <hr className="border-line mb-4" />

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "Unity", "Python"].map((tech) => (
                  <span
                    key={tech}
                    className="font-sans text-[10px] tracking-wider font-semibold text-text-2 bg-bg-raised border border-line rounded px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: GitHub Stats (30% width) */}
        <div className="w-full lg:w-[30%] flex flex-col">
          <div className="w-full bg-bg-raised border border-line rounded-xl p-5 select-none flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] tracking-widest font-semibold text-text-3 uppercase">
                GITHUB CONTRIBUTIONS
              </span>
              <svg className="w-4 h-4 fill-current text-text-3" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>

            {/* Embedded GitHub Chart Image */}
            <div className="w-full overflow-hidden rounded border border-line bg-black/30 p-1 flex items-center justify-center">
              <img
                src="https://ghchart.rshah.org/AbramSin17"
                alt="GitHub contributions graph"
                className="w-full select-none"
                style={{
                  filter: "invert(1) hue-rotate(180deg) brightness(0.85) contrast(1.1)",
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans">
              <span className="text-text-3 font-semibold tracking-wider">AbramSin17</span>
              <a
                href="https://github.com/AbramSin17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-semibold tracking-widest cursor-target uppercase"
              >
                View Profile <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Timeline sub-columns (35% width) */}
        <div className="w-full lg:w-[35%] flex flex-col gap-8 select-none">
          {/* Experience Sub-column */}
          <div className="w-full">
            <span className="font-sans text-[11px] tracking-widest font-semibold text-text-3 uppercase block pb-2 border-b border-line mb-4">
              EXPERIENCE
            </span>
            <div className="relative border-l border-accent/20 pl-4 ml-1 flex flex-col gap-6">
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={timelineItemVariants}
                  className="relative flex flex-col"
                >
                  {/* Marker Dot */}
                  <span className="absolute left-[-20.5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <span className="font-sans text-[10px] text-text-3 font-semibold mb-0.5">
                    {item.year}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-text-1 leading-snug">
                    {item.title}
                  </span>
                  <span className="font-sans text-[11px] text-text-2 mt-0.5 leading-snug">
                    {item.subtitle}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Sub-column */}
          <div className="w-full">
            <span className="font-sans text-[11px] tracking-widest font-semibold text-text-3 uppercase block pb-2 border-b border-line mb-4">
              EDUCATION
            </span>
            <div className="relative border-l border-accent/20 pl-4 ml-1 flex flex-col gap-6">
              {educationData.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={timelineItemVariants}
                  className="relative flex flex-col"
                >
                  {/* Marker Dot */}
                  <span className="absolute left-[-20.5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <span className="font-sans text-[10px] text-text-3 font-semibold mb-0.5">
                    {item.year}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-text-1 leading-snug">
                    {item.title}
                  </span>
                  <span className="font-sans text-[11px] text-text-2 mt-0.5 leading-snug">
                    {item.subtitle}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
