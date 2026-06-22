"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import TargetCursor from "./TargetCursor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="global-loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="app-root" className="min-h-screen flex flex-col selection:bg-accent/30 selection:text-text-1">
            {/* Global Custom Target Cursor */}
            <TargetCursor
              spinDuration={3}
              hideDefaultCursor={true}
              parallaxOn={true}
              cursorColor="#4A5878"
              cursorColorOnTarget="#EDF2FF"
            />

            {/* Navbar (fixed top) */}
            <Navbar />

            {/* Main Layout Container */}
            <div className="flex pt-16 min-h-[calc(100vh-64px)] w-full">
              {/* Sidebar (fixed left on desktop) */}
              <Sidebar />

              {/* Main Content Area (offset by sidebar width on desktop) */}
              <main className="flex-1 w-full md:pl-[200px] min-h-full flex flex-col justify-between">
                <PageWrapper>
                  <div className="flex-grow">{children}</div>
                  <Footer />
                </PageWrapper>
              </main>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
