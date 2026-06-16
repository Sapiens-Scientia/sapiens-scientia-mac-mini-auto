"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { EarthOverlay } from "@/components/earth-overlay";
import { EarthScene } from "@/components/earth-scene";
import { HomeNav } from "@/components/home-nav";

export function EarthHero() {
  const [isPanelPointerActive, setIsPanelPointerActive] = useState(false);
  const [isMetaEarthMerged, setIsMetaEarthMerged] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = localStorage.getItem("sapiens-theme");
    return savedTheme === "light" || document.documentElement.classList.contains("light-theme")
      ? "light"
      : "dark";
  });
  const toggleMetaEarth = () => setIsMetaEarthMerged((value) => !value);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light-theme");
      localStorage.setItem("sapiens-theme", "light");
    } else {
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("sapiens-theme", "dark");
    }
  };

  return (
    <section className="relative min-h-screen bg-black">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.28, 9.99], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: false }}
          className="!h-full !w-full"
          style={{ height: "100%", width: "100%" }}
        >
          <Suspense fallback={null}>
            <EarthScene
              enableZoom={!isPanelPointerActive}
              isMerged={isMetaEarthMerged}
              onToggleMerged={toggleMetaEarth}
              theme={theme}
            />
          </Suspense>
        </Canvas>
      </div>

      <HomeNav />

      <div className="pointer-events-auto absolute right-6 top-8 z-50 max-lg:top-4">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn pointer-events-auto rounded border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-300 transition-all hover:bg-black/60 hover:text-white cursor-pointer backdrop-blur-sm"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
      </div>

      <EarthOverlay
        isMetaEarthMerged={isMetaEarthMerged}
        onMetaEarthToggle={toggleMetaEarth}
        onPanelPointerEnter={() => setIsPanelPointerActive(true)}
        onPanelPointerLeave={() => setIsPanelPointerActive(false)}
      />
    </section>
  );
}
