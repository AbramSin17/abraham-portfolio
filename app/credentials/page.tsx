"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import CertModal from "@/components/ui/CertModal";

interface Cert {
  id: number;
  title: string;
  issuer: string;
  year: string;
  type: string;
  file: string;
}

const certs: Cert[] = [
  {
    id: 1,
    title: "Next.js Fundamentals",
    issuer: "Vercel",
    year: "2024",
    type: "PDF",
    file: "/certs/cert1.pdf",
  },
  {
    id: 2,
    title: "Unity AR Developer",
    issuer: "Unity Learn",
    year: "2024",
    type: "PDF",
    file: "/certs/cert2.pdf",
  },
  {
    id: 3,
    title: "Python for Data Science",
    issuer: "Coursera",
    year: "2024",
    type: "PDF",
    file: "/certs/cert3.pdf",
  },
  {
    id: 4,
    title: "Google IT Support",
    issuer: "Google",
    year: "2023",
    type: "PDF",
    file: "/certs/cert4.pdf",
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    year: "2023",
    type: "PDF",
    file: "/certs/cert5.pdf",
  },
  {
    id: 6,
    title: "Figma UI/UX Design",
    issuer: "Figma",
    year: "2023",
    type: "IMAGE",
    file: "/certs/cert6.jpg",
  },
];

export default function CredentialsPage() {
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
          CREDENTIALS / CERTIFICATES
        </p>
        <SplitText
          text="Certifications & achievements."
          className="font-display italic text-4xl md:text-5xl lg:text-[52px] leading-tight text-text-1 font-normal tracking-tight"
          stagger={0.06}
        />
      </div>

      {/* Grid: 3 columns desktop, 2 tablet, 1 mobile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {certs.map((cert) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            onClick={() => setSelectedCert(cert)}
            className="group w-full bg-bg-card border border-line rounded-xl overflow-hidden shadow-md cursor-target hover:border-accent/35 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Thumbnail Preview Area */}
            <div className="aspect-video w-full bg-bg-raised border-b border-line flex items-center justify-center relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none opacity-40" />
              {/* Folded paper document SVG icon */}
              <svg
                className="w-10 h-10 text-text-3 group-hover:text-accent transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>

            {/* Bottom Content Body */}
            <div className="p-4 flex flex-col gap-2.5">
              <h3 className="font-sans font-semibold text-sm text-text-1 truncate group-hover:text-accent transition-colors duration-150">
                {cert.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-text-2">{cert.issuer}</span>
                <span className="font-sans text-[9px] tracking-wider font-bold text-accent bg-accent-dim border border-accent/20 px-1.5 py-0.5 rounded uppercase">
                  {cert.type}
                </span>
              </div>

              <span className="font-sans text-[10px] text-text-3 font-semibold tracking-wider">
                {cert.year}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certificate Preview Modal */}
      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
}
