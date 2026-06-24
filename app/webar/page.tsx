"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Declare global JSX elements for A-Frame so TypeScript compiler does not throw errors.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-marker': any;
      'a-camera': any;
      'a-entity': any;
      'a-box': any;
      'a-ring': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-plane': any;
      'a-circle': any;
      'a-text': any;
      'a-image': any;
    }
  }
  interface Window {
    AFRAME: any;
  }
}

export default function WebARPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [arActive, setArActive] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [loadingAR, setLoadingAR] = useState(false);
  const [markerDetected, setMarkerDetected] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markerDownloadUrl, setMarkerDownloadUrl] = useState("/marker.png");
  const [useCustomPattern, setUseCustomPattern] = useState(false);

  // Reference to save body styles for cleanup when turning off AR
  const originalBodyStyleRef = useRef<{
    className: string;
    style: string;
  } | null>(null);

  // Reference to the container div for injected A-Frame scene to avoid React unmount conflicts
  const arContainerRef = useRef<HTMLDivElement>(null);

  // Avoid hydration issues by waiting for client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen to the custom window events triggered by our A-Frame component
  useEffect(() => {
    const handleFound = () => setMarkerDetected(true);
    const handleLost = () => setMarkerDetected(false);

    window.addEventListener("ar-marker-found", handleFound);
    window.addEventListener("ar-marker-lost", handleLost);

    return () => {
      window.removeEventListener("ar-marker-found", handleFound);
      window.removeEventListener("ar-marker-lost", handleLost);
    };
  }, []);

  // Auto cleanup on page component unmount
  useEffect(() => {
    return () => {
      // Revert styles and classes
      document.body.classList.remove("ar-active");
      document.documentElement.classList.remove("ar-active");
      document.documentElement.classList.remove("a-html");
      document.documentElement.removeAttribute("style");

      // Stop media tracks and remove dynamic tags
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        video.remove();
      });

      const canvases = document.querySelectorAll(".a-canvas");
      canvases.forEach((canvas) => canvas.remove());

      const scenes = document.querySelectorAll("a-scene");
      scenes.forEach((scene) => scene.remove());
    };
  }, []);

  // Dynamically inject A-Frame scene HTML into container to avoid React unmount (removeChild) errors
  useEffect(() => {
    if (arActive && scriptsLoaded && arContainerRef.current) {
      const container = arContainerRef.current;

      const handleSceneClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest(".clickable");
        const actionUrl = clickable?.getAttribute("data-url");
        if (actionUrl) {
          window.open(actionUrl, "_blank");
        }
      };

      container.addEventListener("click", handleSceneClick);

      const markerUrl = typeof window !== 'undefined' ? `${window.location.origin}/marker.patt` : '/marker.patt';
      const markerTag = useCustomPattern
        ? `<a-marker type="pattern" url="${markerUrl}" marker-handler smooth="true" smooth-count="10" smooth-tolerance="0.01" smooth-threshold="5">`
        : '<a-marker preset="hiro" marker-handler smooth="true" smooth-count="10" smooth-tolerance="0.01" smooth-threshold="5">';

      container.innerHTML = `
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          vr-mode-ui="enabled: false"
        >
          <!-- Raycaster cursor to enable clicking on 3D elements -->
          <a-entity cursor="rayOrigin: mouse" raycaster="objects: .clickable"></a-entity>

          <!-- Load custom pattern marker or preset Hiro dynamically -->
          ${markerTag}
            
            <!-- ====== CENTER 3D GLB MODEL ====== -->
            <a-gltf-model
              class="clickable"
              data-url="https://github.com/AbramSin17"
              src="/cool_man.glb"
              position="0 0.02 -0.1"
              rotation="-90 90 -90"
              scale="0 0 0"
              animation="property: scale; from: 0 0 0; to: 1.5 1.5 1.5; dur: 1000; easing: easeOutBack; delay: 300"
            ></a-gltf-model>

            <!-- ====== HOLOGRAPHIC CONCENTRIC RINGS (BASE) ====== -->
            <a-ring
              position="0 0.02 -0.1"
              rotation="-90 0 0"
              radius-inner="0.75"
              radius-outer="0.77"
              color="#10B981"
              material="shader: flat; opacity: 0.6; transparent: true; depthWrite: false"
            ></a-ring>
            <a-ring
              position="0 0.02 -0.1"
              rotation="-90 0 0"
              radius-inner="0.48"
              radius-outer="0.49"
              color="#2563EB"
              material="shader: flat; opacity: 0.4; transparent: true; depthWrite: false"
            ></a-ring>

            <!-- ====== CENTER BACK: HOLOGRAPHIC BACKDROP SCREEN ====== -->
            <a-plane
              position="0 0.5 -0.7"
              rotation="-60 0 0"
              width="1.6"
              height="0.8"
              color="#0A0F1D"
              scale="0 0 0"
              material="opacity: 0.85; transparent: true; depthWrite: false; shader: flat"
              animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 800; easing: easeOutBack; delay: 200"
            >
              <!-- Glowing Border Frame (Z-shifted backward) -->
              <a-plane position="0 0 -0.05" width="1.64" height="0.84" color="#10B981" material="shader: flat; opacity: 0.5"></a-plane>
              
              <!-- Profile Info (Z-shifted forward) -->
              <a-text value="ABRAHAM SINAGA" position="0 0.25 0.05" align="center" width="1.4" color="#10B981" font="roboto" wrap-count="16" material="shader: flat"></a-text>
              <a-text value="Software Engineering Student" position="0 0.12 0.05" align="center" width="1.3" color="#FFFFFF" font="roboto" wrap-count="30" material="shader: flat"></a-text>
              
              <!-- Blue Divider -->
              <a-plane position="0 0 0.05" width="1.3" height="0.01" color="#2563EB" material="shader: flat"></a-plane>

              <!-- Bio Texts -->
              <a-text value="D4 Software Engineering at WBI" position="0 -0.12 0.05" align="center" width="1.2" color="#E5E7EB" font="roboto" wrap-count="32" material="shader: flat"></a-text>
              <a-text value="Specializing in Web Development, AR/VR, and AI Tools." position="0 -0.24 0.05" align="center" width="1.2" color="#9CA3AF" font="roboto" wrap-count="40" material="shader: flat"></a-text>
            </a-plane>

            <!-- ====== LEFT WING: FEATURED WORK WIDGET ====== -->
            <a-plane
              class="clickable"
              data-url="https://github.com/AbramSin17/abraham-portfolio"
              position="-0.8 0.3 -0.1"
              rotation="-60 0 0"
              width="0.7"
              height="0.45"
              color="#0A0F1D"
              scale="0 0 0"
              material="opacity: 0.85; transparent: true; depthWrite: false; shader: flat"
              animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 800; easing: easeOutBack; delay: 400"
            >
              <a-plane position="0 0 -0.05" width="0.72" height="0.47" color="#2563EB" material="shader: flat; opacity: 0.5"></a-plane>
              <a-text value="FEATURED WORK" position="0 0.15 0.05" align="center" width="0.6" color="#8896B3" font="roboto" wrap-count="15" material="shader: flat"></a-text>
              <a-text value="UMKMInsight" position="0 0.05 0.05" align="center" width="0.6" color="#10B981" font="roboto" wrap-count="12" material="shader: flat"></a-text>
              <a-text value="AI Sales & Growth Insights" position="0 -0.05 0.05" align="center" width="0.6" color="#D1D5DB" font="roboto" wrap-count="25" material="shader: flat"></a-text>
              <a-plane position="0 -0.15 0.05" width="0.4" height="0.08" color="#2563EB" material="shader: flat">
                <a-text value="PROJECTS" align="center" position="0 0 0.01" width="0.35" color="#FFFFFF" font="roboto" wrap-count="12"></a-text>
              </a-plane>
            </a-plane>

            <!-- ====== RIGHT WING: SKILLS WIDGET ====== -->
            <a-plane
              class="clickable"
              data-url="https://github.com/AbramSin17"
              position="0.8 0.3 -0.1"
              rotation="-60 0 0"
              width="0.7"
              height="0.45"
              color="#0A0F1D"
              scale="0 0 0"
              material="opacity: 0.85; transparent: true; depthWrite: false; shader: flat"
              animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 800; easing: easeOutBack; delay: 500"
            >
              <a-plane position="0 0 -0.05" width="0.72" height="0.47" color="#2563EB" material="shader: flat; opacity: 0.5"></a-plane>
              <a-text value="SKILLS & STACK" position="0 0.15 0.05" align="center" width="0.6" color="#8896B3" font="roboto" wrap-count="15" material="shader: flat"></a-text>
              <a-text value="Next.js & React" position="0 0.05 0.05" align="center" width="0.6" color="#38BDF8" font="roboto" wrap-count="18" material="shader: flat"></a-text>
              <a-text value="TailwindCSS & WebGL" position="0 -0.03 0.05" align="center" width="0.6" color="#38BDF8" font="roboto" wrap-count="18" material="shader: flat"></a-text>
              <a-text value="AI Tools & AR/VR" position="0 -0.11 0.05" align="center" width="0.6" color="#38BDF8" font="roboto" wrap-count="18" material="shader: flat"></a-text>
            </a-plane>

            <!-- ====== FRONT ARC: INTERACTIVE SOCIAL MEDIA PODS (BOBBING ANIMATIONS) ====== -->
            <!-- Email Pod -->
            <a-entity
              position="-0.65 0.08 0.25"
              rotation="-90 0 0"
              animation="property: position; to: -0.65 0.14 0.25; dir: alternate; dur: 1600; loop: true; easing: easeInOutSine"
            >
              <a-circle
                class="clickable"
                data-url="mailto:abrahamseputra@gmail.com"
                radius="0.1"
                color="#EA4335"
                scale="0 0 0"
                material="shader: flat"
                animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 600; easing: easeOutBack; delay: 800"
              >
                <a-image class="clickable" data-url="mailto:abrahamseputra@gmail.com" src="https://api.iconify.design/mdi:email.svg?color=%23ffffff" position="0 0 0.01" width="0.12" height="0.12"></a-image>
              </a-circle>
            </a-entity>

            <!-- GitHub Pod -->
            <a-entity
              position="-0.25 0.08 0.55"
              rotation="-90 0 0"
              animation="property: position; to: -0.25 0.14 0.55; dir: alternate; dur: 1800; loop: true; easing: easeInOutSine"
            >
              <a-circle
                class="clickable"
                data-url="https://github.com/AbramSin17"
                radius="0.1"
                color="#0D1220"
                scale="0 0 0"
                material="shader: flat"
                animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 600; easing: easeOutBack; delay: 900"
              >
                <a-image class="clickable" data-url="https://github.com/AbramSin17" src="https://api.iconify.design/mdi:github.svg?color=%23ffffff" position="0 0 0.01" width="0.12" height="0.12"></a-image>
              </a-circle>
            </a-entity>

            <!-- LinkedIn Pod -->
            <a-entity
              position="0.25 0.08 0.55"
              rotation="-90 0 0"
              animation="property: position; to: 0.25 0.14 0.55; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine"
            >
              <a-circle
                class="clickable"
                data-url="https://www.linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323"
                radius="0.1"
                color="#0A66C2"
                scale="0 0 0"
                material="shader: flat"
                animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 600; easing: easeOutBack; delay: 1000"
              >
                <a-image class="clickable" data-url="https://www.linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323" src="https://api.iconify.design/mdi:linkedin.svg?color=%23ffffff" position="0 0 0.01" width="0.12" height="0.12"></a-image>
              </a-circle>
            </a-entity>

            <!-- Instagram Pod -->
            <a-entity
              position="0.65 0.08 0.25"
              rotation="-90 0 0"
              animation="property: position; to: 0.65 0.14 0.25; dir: alternate; dur: 2200; loop: true; easing: easeInOutSine"
            >
              <a-circle
                class="clickable"
                data-url="https://www.instagram.com/abrhm_sin17/"
                radius="0.1"
                color="#E1306C"
                scale="0 0 0"
                material="shader: flat"
                animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 600; easing: easeOutBack; delay: 1100"
              >
                <a-image class="clickable" data-url="https://www.instagram.com/abrhm_sin17/" src="https://api.iconify.design/mdi:instagram.svg?color=%23ffffff" position="0 0 0.01" width="0.12" height="0.12"></a-image>
              </a-circle>
            </a-entity>

          </a-marker>
          
          <!-- Active Camera View Entity -->
          <a-entity camera></a-entity>
        </a-scene>
      `;

      return () => {
        container.removeEventListener("click", handleSceneClick);
      };
    }
  }, [arActive, scriptsLoaded, useCustomPattern]);

  // Load A-Frame & AR.js dynamically
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(new Error(`Gagal memuat skrip: ${src}`));
      document.head.appendChild(script);
    });
  };

  const startAR = async () => {
    setLoadingAR(true);
    setErrorMsg(null);
    try {
      // 1. Load A-Frame (stable 1.2.0 version compatible with AR.js served locally)
      await loadScript("/aframe.min.js");
      // 2. Load AR.js (stable 3.4.5 version served locally)
      await loadScript("/aframe-ar.js");

      // 3. Register custom component in A-Frame to dispatch window events
      if (window.AFRAME && !window.AFRAME.components["marker-handler"]) {
        window.AFRAME.registerComponent("marker-handler", {
          init: function (this: any) {
            const el = this.el;
            el.addEventListener("markerFound", () => {
              window.dispatchEvent(new CustomEvent("ar-marker-found"));
            });
            el.addEventListener("markerLost", () => {
              window.dispatchEvent(new CustomEvent("ar-marker-lost"));
            });
          },
        });
      }

      // Check if custom marker.patt exists in public folder to determine whether to use pattern or preset Hiro
      // Using standard GET request which is universally supported on local Next.js servers
      try {
        const response = await fetch("/marker.patt");
        if (response.ok) {
          setUseCustomPattern(true);
        } else {
          setUseCustomPattern(false);
        }
      } catch (e) {
        setUseCustomPattern(false);
      }

      setScriptsLoaded(true);
      setArActive(true);

      // Save original document body styles for restoration later
      originalBodyStyleRef.current = {
        className: document.body.className || "",
        style: document.body.getAttribute("style") || "",
      };

      // Add active classes for full screen AR take-over
      document.body.classList.add("ar-active");
      document.documentElement.classList.add("ar-active");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Terjadi kesalahan saat memproses AR Engine.");
    } finally {
      setLoadingAR(false);
    }
  };

  const stopAR = () => {
    setArActive(false);
    setMarkerDetected(false);

    // Remove active styles and body class
    document.body.classList.remove("ar-active");
    document.documentElement.classList.remove("ar-active");
    if (originalBodyStyleRef.current) {
      document.body.className = originalBodyStyleRef.current.className;
      if (originalBodyStyleRef.current.style) {
        document.body.setAttribute("style", originalBodyStyleRef.current.style);
      } else {
        document.body.removeAttribute("style");
      }
    }

    // Stop camera video element track streams
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      const stream = video.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      video.remove();
    });

    // Remove A-Frame rendering canvas elements
    const canvases = document.querySelectorAll(".a-canvas");
    canvases.forEach((canvas) => canvas.remove());

    // Remove scene instances
    const sceneEls = document.querySelectorAll("a-scene");
    sceneEls.forEach((scene) => scene.remove());

    // Clean up document html classes set by A-Frame
    document.documentElement.classList.remove("a-html");
    document.documentElement.removeAttribute("style");
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-between py-12 px-6 md:px-12 z-10 select-none max-w-5xl mx-auto">
      {/* Global CSS Inject to override layout constraints and style custom canvases when AR is active */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        html.ar-active, body.ar-active {
          overflow: hidden !important;
          height: 100vh !important;
          width: 100vw !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        body.ar-active nav {
          display: none !important;
        }
        body.ar-active aside {
          display: none !important;
        }
        body.ar-active footer {
          display: none !important;
        }
        body.ar-active main {
          padding-left: 0 !important;
        }
        body.ar-active .a-canvas {
          z-index: 10 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
        }
        body.ar-active video {
          z-index: 5 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          margin: 0 !important;
        }
      ` }} />

      {!arActive ? (
        // === Landing & Setup View ===
        <div className="flex-grow flex flex-col justify-center items-stretch md:grid md:grid-cols-12 gap-8 my-auto">
          {/* Left Panel: Instructions and Buttons */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Header / Eyebrow */}
            <p className="font-sans text-[11px] font-medium tracking-widest text-text-3 uppercase mb-2">
              WEB AUGMENTED REALITY / AR PORTFOLIO
            </p>
            <h1 className="font-display italic text-4xl md:text-5xl lg:text-[56px] leading-tight text-text-1 font-normal tracking-tight mb-6">
              WebAR: Kartu Nama Futuristik
            </h1>

            {/* Instruction Body */}
            <div className="space-y-4 text-sm text-text-2 mb-8 max-w-xl">
              <p>
                Selamat datang di pengalaman interaktif Augmented Reality (WebAR) untuk kartu nama digital saya.
                Di sini, Anda dapat memindai kartu nama kustom saya untuk memproyeksikan kartu nama 3D interaktif secara spasial.
              </p>

              <div className="border-l border-accent/20 pl-4 space-y-2 mt-4">
                <span className="block font-sans text-xs text-text-3 font-semibold uppercase tracking-wider">
                  Cara Penggunaan:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-text-2">
                  <li>
                    Unduh pola marker kustom menggunakan tombol <span className="text-text-1 font-semibold">Download Marker</span> di bawah.
                  </li>
                  <li>
                    Tampilkan marker kustom tersebut di layar perangkat lain (smartphone/tablet) atau cetak di selembar kertas.
                  </li>
                  <li>
                    Tekan tombol <span className="text-text-1 font-semibold">Aktifkan Kamera AR</span> dan izinkan akses kamera browser Anda.
                  </li>
                  <li>
                    Arahkan kamera ke pola marker untuk menampilkan kartu nama digital 3D interaktif tepat di sebelah kanan marker Anda.
                  </li>
                </ol>
              </div>
            </div>

            {/* Control Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={startAR}
                disabled={loadingAR}
                className="px-6 py-3.5 bg-accent hover:bg-blue-600 border border-blue-500/20 rounded-xl text-[11px] font-sans font-bold tracking-widest text-text-1 flex items-center justify-center gap-2 cursor-target transition-all duration-200 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingAR ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>MENGHUBUNGKAN...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span>AKTIFKAN KAMERA AR</span>
                  </>
                )}
              </button>

              <a
                href={markerDownloadUrl}
                download={markerDownloadUrl.endsWith(".png") ? "marker.png" : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-bg-raised hover:bg-bg-card border border-line rounded-xl text-[11px] font-sans font-bold tracking-widest text-text-2 hover:text-text-1 flex items-center justify-center gap-2 cursor-target transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>DOWNLOAD MARKER</span>
              </a>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 font-mono mt-2 bg-red-950/30 border border-red-900/30 px-3 py-2 rounded-lg">
                ERR: {errorMsg}
              </p>
            )}
          </div>

          {/* Right Panel: Marker Image Preview Card */}
          <div className="md:col-span-5 flex flex-col justify-center items-center">
            <div className="w-full max-w-[280px] bg-bg-raised border border-line rounded-2xl p-5 flex flex-col items-center shadow-lg">
              <span className="font-sans text-[10px] text-text-3 font-semibold tracking-widest uppercase mb-3">
                {markerDownloadUrl.includes("hiro") ? "Hiro Marker Preview" : "Custom Marker Preview"}
              </span>

              <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-slate-900 bg-white p-6 relative group">
                <img
                  src="/marker.png"
                  alt="Marker Pattern"
                  className="w-full h-full object-contain select-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/marker.png";
                    setMarkerDownloadUrl("https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/marker.png");
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 pointer-events-none">
                  <span className="text-[10px] font-sans font-bold text-white tracking-wider border border-white/20 px-3 py-1.5 rounded-lg bg-black/40">
                    SCAN ME
                  </span>
                </div>
              </div>

              <span className="font-sans text-[9px] text-text-3 text-center mt-3 leading-relaxed">
                Tampilkan pola ini secara penuh di perangkat lain atau cetak pada permukaan rata.
              </span>
            </div>
          </div>
        </div>
      ) : (
        // === Fullscreen AR Overlay View ===
        <div className="fixed inset-0 z-20 pointer-events-none">
          {/* Floating Close Button */}
          <div className="fixed top-6 left-6 z-[100] pointer-events-auto">
            <button
              onClick={stopAR}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 hover:bg-slate-900 border border-white/10 rounded-xl text-[10px] font-sans font-semibold tracking-widest text-text-1 cursor-target hover:border-red-500/50 hover:text-red-400 transition-all duration-200 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>MATIKAN AR</span>
            </button>
          </div>

          {/* Floating Instructions Banner on Top */}
          <div className="fixed top-6 right-6 z-[100] bg-slate-950/60 border border-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 max-w-[200px] md:max-w-xs select-none">
            <p className="text-[9px] font-sans text-text-3 font-bold tracking-widest uppercase">
              STATUS SYSTEM
            </p>
            <p className="text-[10px] font-sans text-text-2 mt-0.5 leading-snug">
              {!markerDetected
                ? `Arahkan kamera ke marker '${useCustomPattern ? "Custom" : "Hiro"}'...`
                : "Marker terdeteksi! Membaca data profil..."}
            </p>
          </div>

          {/* Scanner Reticle Overlay when Marker is not Detected */}
          {!markerDetected && (
            <div className="fixed inset-0 flex items-center justify-center z-15 pointer-events-none">
              <div className="relative w-64 h-64 border border-dashed border-accent/40 rounded-3xl flex items-center justify-center animate-pulse">
                {/* Corner frames */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-lg"></span>
                <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr-lg"></span>
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl-lg"></span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-lg"></span>

                {/* Visual Scanner line effect */}
                <div className="absolute top-4 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent animate-[bounce_3s_infinite]" />

                <span className="text-[9px] font-mono tracking-widest text-accent font-semibold bg-slate-950/80 px-2.5 py-1 border border-accent/20 rounded">
                  SCANNING FOR MARKER
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Container for raw A-Frame scene HTML to avoid React DOM unmounting conflicts */}
      {arActive && (
        <div ref={arContainerRef} className="fixed inset-0 z-10" />
      )}

      {/* === Footer Section === */}
      {!arActive && (
        <footer className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <p className="text-text-3 font-mono">
            &copy; 2026 ABRAHAM. ALL RIGHTS RESERVED.
          </p>

          {/* Social media connections */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/AbramSin17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-2 hover:text-accent transition-colors duration-150 cursor-target flex items-center gap-1.5 font-bold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GITHUB</span>
            </a>

            <a
              href="mailto:abrahamseputra@gmail.com"
              className="text-text-2 hover:text-accent transition-colors duration-150 cursor-target flex items-center gap-1.5 font-bold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>EMAIL</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abraham-alex-tanuse-putra-sinaga-172b17323"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-2 hover:text-accent transition-colors duration-150 cursor-target flex items-center gap-1.5 font-bold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LINKEDIN</span>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}
