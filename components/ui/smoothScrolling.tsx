// components/SmoothScrolling.jsx
"use client";
import Lenis from "@studio-freight/lenis";
import { ReactNode, useEffect } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Make lenis instance globally accessible
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // Clean up global reference
      delete window.lenis;
    };
  }, []);

  return children;
}
