"use client";

import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  resolution?: number;
}

export default function LiquidEther({
  colors = ["#0D1220", "#1E3A5F", "#2563EB", "#0D1220"],
  mouseForce = 25,
  cursorSize = 120,
  autoDemo = true,
  autoSpeed = 0.3,
  autoIntensity = 1.8,
  resolution = 0.5,
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert colors to Three.js Color objects
  const threeColors = useMemo(() => {
    return colors.map((hex) => new THREE.Color(hex));
  }, [colors]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Initialize WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio * resolution);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Initialize Orthographic Scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Position Vectors
    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);

    // Material setup with Custom WebGL shaders
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: mouse },
      u_colors: { value: threeColors },
      u_mouseForce: { value: mouseForce },
      u_intensity: { value: autoIntensity },
      u_autoSpeed: { value: autoSpeed },
      u_cursorSize: { value: cursorSize },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_colors[4];
      uniform float u_mouseForce;
      uniform float u_intensity;
      uniform float u_autoSpeed;
      uniform float u_cursorSize;

      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // Coordinates centered on screen
        vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

        // Convert u_mouse from [0, 1] to coordinate space matching st
        vec2 mouseScreen = (u_mouse * 2.0 - 1.0);
        mouseScreen.x *= u_resolution.x / u_resolution.y;

        float distToMouse = length(st - mouseScreen);
        
        // Ripple effect around mouse pointer
        float rippleRadius = u_cursorSize / 400.0;
        float mouseEffect = smoothstep(rippleRadius, 0.0, distToMouse);

        float t = u_time * u_autoSpeed;

        // Multi-layered Sine-based Domain Warping for fluid aesthetic
        vec2 q = vec2(0.0);
        q.x = sin(st.x + st.y + t * 1.1) * 0.4;
        q.y = cos(st.x - st.y + t * 0.9) * 0.4;

        vec2 r = vec2(0.0);
        r.x = sin(st.x + q.x * 2.0 + t * 0.7) * 0.3;
        r.y = cos(st.y + q.y * 2.0 + t * 0.8) * 0.3;

        // Apply dynamic mouse warp push
        vec2 distortion = (st - mouseScreen) * mouseEffect * (u_mouseForce / 120.0);
        vec2 distortedCoord = st + q + r - distortion;

        // Fluid noise computation
        float f = sin(length(distortedCoord) * u_intensity - t * 1.4) * 0.5 + 0.5;

        // Layer color blending based on domain noise
        vec3 col = mix(u_colors[0], u_colors[1], f);
        col = mix(col, u_colors[2], clamp(length(q), 0.0, 1.0));
        col = mix(col, u_colors[3], clamp(r.x * 0.5 + 0.5, 0.0, 1.0));

        // Overlay vignette gradient to blend edges elegantly
        float vignette = 1.0 - smoothstep(1.1, 2.3, length(st));
        col *= mix(0.75, 1.0, vignette);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Track mouse coordinates on document
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip y-axis
      targetMouse.set(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamically resize renderer bounds
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.u_resolution.value.set(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse positions for fluid feedback lag
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_mouse.value = mouse;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolution, threeColors, mouseForce, cursorSize, autoSpeed, autoIntensity]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none" />;
}
