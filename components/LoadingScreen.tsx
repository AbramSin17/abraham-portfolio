"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// SVG Tech Icons with stroke-dashoffset animation
const ReactSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(30 12 12)" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(90 12 12)" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(150 12 12)" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" className="opacity-80" />
  </svg>
);

const NextSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <path d="M7 17V7l10 10V7" strokeDasharray="50" strokeDashoffset={50 - (progress / 100) * 50} />
  </svg>
);

const TsSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#3178C6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <path d="M9 9h4M11 9v6M15 9h2v6" strokeDasharray="30" strokeDashoffset={30 - (progress / 100) * 30} />
  </svg>
);

const PythonSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#3776AB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4a3 3 0 0 0-3 3h4a1 1 0 0 1 1 1v4h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4V2" strokeDasharray="80" strokeDashoffset={80 - (progress / 100) * 80} />
    <path d="M12 22v-4a3 3 0 0 0 3-3h-4a1 1 0 0 1-1-1v-4H6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h4v4" strokeDasharray="80" strokeDashoffset={80 - (progress / 100) * 80} />
  </svg>
);

const UnitySvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#EDF2FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
    <path d="M12 22V12M3 7l9 5 9-5" strokeDasharray="50" strokeDashoffset={50 - (progress / 100) * 50} />
  </svg>
);

const FigmaSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#F24E1E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 3h3v6H9a3 3 0 1 1 0-6zm0 6h3v6H9a3 3 0 1 1 0-6zm0 6h3a3 3 0 1 1-3 3v-3zm6-6h3a3 3 0 1 1-3 3V9zm0-6a3 3 0 1 1 3 3h-3V3z" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
  </svg>
);

const GitSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="18" r="3" strokeDasharray="20" strokeDashoffset={20 - (progress / 100) * 20} />
    <circle cx="6" cy="6" r="3" strokeDasharray="20" strokeDashoffset={20 - (progress / 100) * 20} />
    <circle cx="18" cy="6" r="3" strokeDasharray="20" strokeDashoffset={20 - (progress / 100) * 20} />
    <path d="M6 9v3a3 3 0 0 0 3 3h6" strokeDasharray="30" strokeDashoffset={30 - (progress / 100) * 30} />
  </svg>
);

const TailwindSvg = ({ progress }: { progress: number }) => (
  <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8h4V9.8c0-1.2-.6-2.4-1.8-3.6C15 5 13.8 4.4 12.6 4.4c-1.2 0-2.4.6-3.6 1.8m0 4.4c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6s.6 2.4 1.8 3.6c1.2 1.2 2.4 1.8 3.6 1.8h4v-4c0-1.2-.6-2.4-1.8-3.6C12 12.6 10.8 12 9.6 12z" strokeDasharray="100" strokeDashoffset={100 - (progress / 100) * 100} />
  </svg>
);

const icons = [
  { name: "React", component: ReactSvg },
  { name: "Next.js", component: NextSvg },
  { name: "TypeScript", component: TsSvg },
  { name: "Python", component: PythonSvg },
  { name: "Unity", component: UnitySvg },
  { name: "Figma", component: FigmaSvg },
  { name: "Git", component: GitSvg },
  { name: "Tailwind", component: TailwindSvg },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    const duration = 2800; // 2.8 seconds
    const intervalTime = 30; // Update every 30ms
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExited(true);
        // Fire completion callback after curtain animation finishes (0.6s)
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(completeTimer);
      }, 200);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#07090F] flex items-center justify-center">
      {/* Curtain Panels */}
      {/* Top Half */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExited ? "-100%" : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#07090F] border-b border-line z-10"
      />
      {/* Bottom Half */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExited ? "100%" : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#07090F] border-t border-line z-10"
      />

      {/* Interactive elements block during load */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
        {/* Core Loading Ring */}
        <motion.div
          animate={{ opacity: isExited ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-80 h-80 flex items-center justify-center"
        >
          {/* Inner orbit guide circle */}
          <div className="absolute w-[240px] h-[240px] border border-line rounded-full pointer-events-none opacity-40" />

          {/* Orbit icons */}
          {icons.map((item, index) => {
            const startAngle = (360 / icons.length) * index;
            const IconComponent = item.component;

            return (
              <motion.div
                key={item.name}
                className="absolute w-0 h-0 flex items-center justify-center"
                initial={{ rotate: startAngle }}
                animate={{ rotate: startAngle + 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
              >
                {/* Positional offset representing orbit radius (120px) */}
                <div className="absolute -translate-y-[120px]">
                  {/* Counter-rotation to keep the icon upright */}
                  <motion.div
                    initial={{ rotate: -startAngle }}
                    animate={{ rotate: -startAngle - 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                    className="w-10 h-10 rounded-full border border-line bg-bg-raised/90 backdrop-blur flex items-center justify-center shadow-lg"
                  >
                    <IconComponent progress={progress} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* Central Logo Indicator */}
          <div className="w-16 h-16 rounded-full border border-line flex items-center justify-center bg-bg-card shadow-inner">
            <span className="font-display italic text-text-1 text-2xl font-bold">A</span>
          </div>
        </motion.div>

        {/* Progress Bar Area */}
        <motion.div
          animate={{ opacity: isExited ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-24 flex flex-col items-center gap-3 w-64 px-4"
        >
          <span className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase">
            Loading... {Math.round(progress)}%
          </span>
          <div className="w-full h-[2px] bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
