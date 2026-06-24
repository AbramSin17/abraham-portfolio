"use client";

import React from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

interface IdentityItem {
  label: string;
  val: string;
}

interface SocialCard {
  name: string;
  url: string;
  handle: string;
  icon: React.ReactNode;
}

const identities: IdentityItem[] = [
  { label: "📧", val: "abrahamseputra@gmail.com" },
  { label: "📱", val: "083827413433" },
  { label: "📍", val: "Medan, North Sumatra, Indonesia" },
];

const socialCards: SocialCard[] = [
  {
    name: "GitHub",
    url: "https://github.com/AbramSin17",
    handle: "github.com/AbramSin17",
    icon: (
      <svg
        className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors duration-150 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323",
    handle: "linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323",
    icon: (
      <svg
        className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors duration-150 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/abrhm_sin17",
    handle: "@abrhm_sin17",
    icon: (
      <svg
        className="w-5 h-5 text-text-2 group-hover:text-accent transition-colors duration-150"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (idx: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: idx * 0.1,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="min-h-full w-full py-12 px-6 md:px-12 relative z-10 flex flex-col justify-start select-none">
      {/* Top Heading */}
      <div className="max-w-3xl mb-12">
        <p className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-2">
          CONTACT / GET IN TOUCH
        </p>
        <SplitText
          text="Let's connect."
          className="font-display italic text-5xl md:text-6xl lg:text-[64px] leading-tight text-text-1 font-normal tracking-tight"
          stagger={0.06}
        />
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-12 w-full mt-4 items-start">
        {/* COLUMN LEFT: Info list (60% width) */}
        <div className="w-full lg:w-[60%] flex flex-col justify-start select-none">
          {/* Big Clickable Email */}
          <a
            href="mailto:abrahamseputra@gmail.com"
            className="font-display italic text-2xl md:text-[28px] text-text-1 hover:text-accent tracking-wide cta-underline self-start cursor-target transition-colors duration-150"
          >
            abrahamseputra@gmail.com
          </a>
          <span className="font-sans italic text-[11px] md:text-xs text-text-3 mt-2 block">
            Response within 24 hours
          </span>

          <hr className="border-line my-8 w-full" />

          {/* Identity Rows */}
          <div className="flex flex-col w-full">
            {identities.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3.5 py-4 border-b border-line font-sans text-sm text-text-2 items-center"
              >
                <span className="text-base select-none leading-none">{item.label}</span>
                <span className="leading-none">{item.val}</span>
              </div>
            ))}
          </div>

          {/* Bottom Open Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-sans italic text-xs md:text-[13px] text-text-3 mt-8"
          >
            Currently open for freelance projects and collaborations.
          </motion.p>
        </div>

        {/* COLUMN RIGHT: Social Media Cards (40% width) */}
        <div className="w-full lg:w-[40%] flex flex-col gap-4">
          {socialCards.map((card, idx) => (
            <motion.a
              key={card.name}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group w-full bg-bg-raised border border-line rounded-xl px-5 py-4 flex items-center justify-between cursor-target hover:bg-bg-card hover:border-l-2 hover:border-l-accent hover:pl-3.5 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                {card.icon}
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-sm text-text-1 group-hover:text-accent transition-colors duration-150">
                    {card.name}
                  </span>
                  <span className="font-sans text-xs text-text-3 select-none">
                    {card.handle}
                  </span>
                </div>
              </div>
              <span className="font-sans text-text-3 text-lg leading-none group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
