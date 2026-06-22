"use client";

import React from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import MarqueeSkills from "@/components/ui/MarqueeSkills";

interface Category {
  name: string;
  skills: string;
}

const categories: Category[] = [
  { name: "Design", skills: "Figma · Canva · Adobe XD" },
  { name: "Video Editing", skills: "CapCut · DaVinci Resolve" },
  { name: "Microsoft Office", skills: "Word · PowerPoint · Excel" },
  { name: "Frontend", skills: "React · Next.js · TypeScript · Tailwind CSS · HTML/CSS" },
  { name: "Backend", skills: "Node.js · Python · FastAPI · Supabase · PostgreSQL" },
  { name: "AR/VR", skills: "Unity · AR Foundation · A-Frame" },
  { name: "DevTools", skills: "Git · GitHub · VS Code · Postman · Vercel" },
];

export default function SkillsPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-full w-full py-12 px-6 md:px-12 relative z-10 flex flex-col justify-start select-none">
      {/* Top Heading */}
      <div className="max-w-3xl mb-12">
        <p className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-2">
          SKILLS / CAPABILITIES
        </p>
        <SplitText
          text="Tools & technologies I work with."
          className="font-display italic text-4xl md:text-5xl lg:text-[52px] leading-tight text-text-1 font-normal tracking-tight"
          stagger={0.06}
        />
      </div>

      {/* Infinite Horizontal Marquee Carousel */}
      <MarqueeSkills />

      {/* Skill Categories Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={cardVariants}
            className="w-full bg-bg-raised border border-line rounded-xl p-5 hover:border-accent/40 transition-colors duration-200"
          >
            <h3 className="font-sans text-[11px] tracking-widest font-semibold text-text-3 uppercase mb-3">
              {cat.name}
            </h3>
            <p className="font-sans text-sm text-text-2 leading-relaxed font-normal">
              {cat.skills}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
