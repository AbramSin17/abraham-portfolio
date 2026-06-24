"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import CVModal from "@/components/CVModal";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { ssr: false });

const rotatingWords = ["web systems", "mobile apps", "AR experiences", "digital tools"];
const nameText = "Abraham";

export default function Home() {
  const [typedName, setTypedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    // Starts character drawing after 0.3s stagger delay
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < nameText.length) {
          setTypedName(nameText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 140); // types roughly over 1 second

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(startDelay);
  }, []);

  // Blinking cursor logic (stays blinking)
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Rotating words interval logic (every 2.5 seconds)
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(rotateInterval);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row items-center justify-center px-6 pl-12 md:pl-16 lg:pl-24 pr-6 md:pr-12 lg:pr-24 py-16 overflow-hidden z-10 select-none gap-8 lg:gap-16 w-full max-w-none">
      {/* Dynamic full-screen shader background */}
      <LiquidEther
        colors={["#0D1220", "#1E3A5F", "#2563EB", "#0D1220"]}
        mouseForce={25}
        cursorSize={120}
        autoDemo={true}
        autoSpeed={0.3}
        autoIntensity={1.8}
        resolution={0.5}
      />

      {/* Global CSS Inject for cursor blink and slide underline styling */}
      <style jsx global>{`
        @keyframes custom-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .custom-cursor-blink {
          animation: custom-cursor-blink 0.8s step-end infinite;
        }

        .cta-underline {
          position: relative;
        }
        .cta-underline::after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transform-origin: bottom left;
          transition: transform 0.25s ease-out;
        }
        .cta-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* Hero Content Area */}
      <div className="relative z-10 flex flex-col max-w-[600px] w-full pointer-events-auto flex-1">
        {/* 1. Eyebrow */}
        <motion.p
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-3"
        >
          PORTFOLIO 2026 / SOFTWARE ENGINEERING
        </motion.p>

        {/* 2. Large Typewriter Name */}
        <motion.h1
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="font-display italic text-text-1 text-7xl md:text-8xl leading-none font-normal tracking-tight mb-4 flex items-center select-none"
        >
          {typedName}
          <span
            className={`font-sans font-light text-accent text-5xl md:text-7xl ml-1 ${showCursor ? "opacity-100" : "opacity-0"
              }`}
            style={{ transition: "opacity 0.15s ease" }}
          >
            |
          </span>
        </motion.h1>

        {/* 3. Rotating Text Line */}
        <motion.div
          custom={1.6}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="flex items-center gap-3 text-text-2 font-mono text-sm md:text-base mb-6 select-none h-8"
        >
          <span>I build</span>
          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-accent-dim border border-accent/20 px-2 py-0.5 rounded text-text-1 font-mono font-medium inline-block text-[13px] md:text-sm"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4. Description */}
        <motion.p
          custom={1.8}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="font-sans text-sm md:text-[15px] leading-relaxed text-text-2 max-w-[480px] mb-8"
        >
          A software engineering student from Medan, building full-stack web systems, AR/VR experiences, and AI-powered tools.
        </motion.p>

        {/* 5. CTA Links */}
        <motion.div
          custom={2.0}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="flex items-center gap-8 text-[11px] font-sans tracking-widest font-semibold text-text-1"
        >
          <Link
            href="/projects"
            className="cta-underline hover:text-accent transition-colors duration-150 cursor-target flex items-center gap-1.5 uppercase"
          >
            VIEW PROJECTS <span>→</span>
          </Link>
          <button
            onClick={() => setIsCVOpen(true)}
            className="cta-underline hover:text-accent transition-colors duration-150 cursor-target flex items-center gap-1.5 uppercase"
          >
            OPEN CV <span>↗</span>
          </button>
        </motion.div>
      </div>

      {/* Lanyard 3D Card Area */}
      <div className="relative w-full lg:w-[500px] xl:w-[600px] h-[450px] lg:h-[650px] z-20 flex items-center justify-center pointer-events-auto flex-1">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          frontImage="/abram.jpeg"
          imageFit="cover"
        />
      </div>

      {/* Curriculum Vitae Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}
