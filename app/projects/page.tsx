"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  num: string;
  name: string;
  category: string;
  tech: string[];
  desc: string;
  live: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1,
    num: "01",
    name: "UMKMInsight",
    category: "AI",
    tech: ["FastAPI", "HTML/CSS/JS", "Chart.js", "Gemini AI"],
    desc: "Platform analitik UMKM berbasis Google Gemini 2.5 Flash.",
    live: "https://ai.studio/apps/ef03bf01-9f36-433e-9684-03266906565f",
    github: "#",
  },
  {
    id: 2,
    num: "02",
    name: "GBI Connect",
    category: "WEB",
    tech: ["Supabase", "Vercel", "Leaflet.js"],
    desc: "Sistem manajemen gereja GBI Letda Sujono Medan.",
    live: "#",
    github: "https://github.com/AbramSin17/manajemen-gereja",
  },
  {
    id: 3,
    num: "03",
    name: "LaporKu",
    category: "WEB",
    tech: ["React", "Next.js", "HTML/CSS"],
    desc: "Website pelaporan fasilitas kampus.",
    live: "https://laporku-pi.vercel.app/",
    github: "#",
  },
  {
    id: 4,
    num: "04",
    name: "Hans Street",
    category: "WEB",
    tech: ["React", "Next.js", "HTML/CSS"],
    desc: "Website bisnis lokal Medan.",
    live: "https://hansstreet.vercel.app/",
    github: "#",
  },
  {
    id: 5,
    num: "05",
    name: "Ankala Journey",
    category: "WEB",
    tech: ["PHP Native", "HTML/CSS"],
    desc: "Website bisnis semester 3, PHP native.",
    live: "https://ankaladocument-lne1jhe94-abramsin17s-projects.vercel.app/",
    github: "#",
  },
  {
    id: 6,
    num: "06",
    name: "Info Artists Music",
    category: "WEB",
    tech: ["React", "JavaScript", "HTML/CSS"],
    desc: "Fetch API musik menggunakan React.",
    live: "#",
    github: "https://github.com/AbramSin17/info-artists-music-",
  },
  {
    id: 7,
    num: "07",
    name: "Balige Writers Festival",
    category: "WEB",
    tech: ["PHP", "WordPress", "HTML/CSS"],
    desc: "Contributor & maintenance selama 1 bulan.",
    live: "https://www.baligewritersfestival.com/",
    github: "#",
  },
  {
    id: 8,
    num: "08",
    name: "P-WBI",
    category: "AR/VR",
    tech: ["Roblox", "Lua", "Game Dev"],
    desc: "Game development di platform Roblox.",
    live: "https://www.roblox.com/id/games/83216065103478/P-WBI",
    github: "#",
  },
];

const filters = ["ALL", "WEB", "AR/VR", "AI"];

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "ALL") return true;
    return project.category === selectedFilter;
  });

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    const newFiltered = projects.filter((project) => {
      if (filter === "ALL") return true;
      return project.category === filter;
    });
    if (newFiltered.length > 0) {
      setSelectedProject(newFiltered[0]);
    }
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col lg:flex-row relative z-10 select-none">
      {/* PANEL LEFT: List and Filters (38% width on desktop) */}
      <aside className="w-full lg:w-[38%] border-b lg:border-b-0 lg:border-r border-line bg-bg lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto flex flex-col py-8 px-6 md:px-8">
        <div className="mb-6">
          <p className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-2">
            PROJECTS / WORK
          </p>
          <h2 className="font-display italic text-3xl md:text-[36px] leading-tight text-text-1">
            Selected Works
          </h2>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 text-[11px] font-sans tracking-widest font-semibold text-text-3 mb-8">
          {filters.map((filter, index) => {
            const isActive = selectedFilter === filter;
            return (
              <React.Fragment key={filter}>
                <button
                  onClick={() => handleFilterClick(filter)}
                  className={`hover:text-text-2 transition-colors duration-150 cursor-target uppercase ${
                    isActive ? "text-text-1 underline decoration-accent decoration-2 underline-offset-4" : ""
                  }`}
                >
                  {filter}
                </button>
                {index < filters.length - 1 && <span className="opacity-30 select-none">·</span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Project Items List */}
        <div className="flex flex-col gap-2">
          {filteredProjects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <div
                key={project.id}
                className="w-full flex flex-col border border-line/30 rounded-lg overflow-hidden"
              >
                {/* Header item button */}
                <button
                  onClick={() => selectProject(project)}
                  className={`w-full flex items-center justify-between p-4 transition-all duration-150 cursor-target text-left group ${
                    isSelected
                      ? "bg-bg-raised border-l-[3px] border-accent pl-5"
                      : "hover:bg-bg-raised border-l-[3px] border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[11px] text-text-3 font-semibold">
                      {project.num}
                    </span>
                    <span className="font-display italic text-lg md:text-[20px] text-text-1 group-hover:text-accent transition-colors duration-150">
                      {project.name}
                    </span>
                  </div>
                  <span className="font-sans text-[9px] tracking-widest font-semibold px-2 py-0.5 rounded border border-line bg-bg-card text-text-3 uppercase">
                    {project.category}
                  </span>
                </button>

                {/* Mobile Accordion details expander */}
                <div className="block lg:hidden">
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-line bg-bg-card"
                      >
                        <div className="p-5 flex flex-col gap-4">
                          {/* Tech Badges */}
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="font-sans text-[10px] tracking-wider font-semibold text-text-2 bg-bg-raised border border-line rounded px-2.5 py-0.5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="font-sans text-xs md:text-sm leading-relaxed text-text-2">
                            {project.desc}
                          </p>

                          {/* Preview Area */}
                          <div className="aspect-video w-full rounded-lg border border-line bg-bg-raised/75 flex items-center justify-center relative overflow-hidden select-none">
                            <div className="absolute inset-0 bg-gradient-radial from-accent-dim/10 to-transparent pointer-events-none" />
                            <span className="font-sans text-[10px] tracking-widest font-semibold text-text-3 uppercase">
                              PROJECT PREVIEW
                            </span>
                          </div>

                          {/* Links */}
                          <div className="flex items-center gap-6 text-[10px] font-sans tracking-widest font-semibold">
                            {project.live === "#" ? (
                              <span className="text-text-3 cursor-not-allowed select-none">
                                LIVE DEMO (COMING SOON)
                              </span>
                            ) : (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline cursor-target"
                              >
                                LIVE DEMO <span>→</span>
                              </a>
                            )}
                            <a
                              href={project.github}
                              target={project.github === "#" ? "_self" : "_blank"}
                              rel="noopener noreferrer"
                              className={`text-accent hover:underline cursor-target ${
                                project.github === "#" ? "opacity-30 pointer-events-none" : ""
                              }`}
                            >
                              GITHUB <span>→</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* PANEL RIGHT: Detail Preview (62% width on desktop, hidden on mobile) */}
      <main className="hidden lg:flex lg:w-[62%] lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto flex-col p-10 bg-bg-card justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 max-w-[560px]"
          >
            {/* Project Title Banner */}
            <div className="flex items-baseline gap-4 select-none">
              <span className="font-sans text-lg text-text-3 font-semibold">
                {selectedProject.num}
              </span>
              <h1 className="font-display italic text-5xl md:text-[54px] leading-tight text-text-1">
                {selectedProject.name}
              </h1>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 select-none">
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  className="font-sans text-[11px] tracking-widest font-semibold text-text-2 bg-bg border border-line rounded px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="font-sans text-sm md:text-[15px] leading-relaxed text-text-2">
              {selectedProject.desc}
            </p>

            {/* Image Preview Container */}
            <div className="aspect-video w-full rounded-xl border border-line bg-bg/80 flex items-center justify-center relative overflow-hidden select-none shadow-inner">
              {/* Decorative Background dot alignment */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)] pointer-events-none" />
              <span className="font-sans text-[10px] tracking-widest font-semibold text-text-3 uppercase">
                PROJECT PREVIEW
              </span>
            </div>

            {/* Link Rows */}
            <div className="flex items-center gap-8 text-[11px] font-sans tracking-widest font-semibold mt-2">
              {selectedProject.live === "#" ? (
                <span className="text-text-3 cursor-not-allowed select-none">
                  LIVE DEMO (COMING SOON)
                </span>
              ) : (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline cursor-target flex items-center gap-1"
                >
                  LIVE DEMO <span>→</span>
                </a>
              )}

              {selectedProject.github === "#" ? (
                <span className="text-text-3 cursor-not-allowed select-none">
                  GITHUB (PRIVATE)
                </span>
              ) : (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline cursor-target flex items-center gap-1"
                >
                  GITHUB <span>→</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
