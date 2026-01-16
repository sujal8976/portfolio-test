"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function PreLoader() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Select all div children of the container
      const visibleDivs = Array.from(containerRef.current!.children).filter(
        (div) => isLargeScreen || !div.classList.contains("hidden"),
      );

      // Calculate total animation duration
      const staggerAmount = isLargeScreen ? 0.3 : 0.2;

      // Create staggered animation for individual divs
      gsap.to(visibleDivs, {
        y: "-100%",
        duration: 0.8,
        ease: "power2.inOut",
        stagger: {
          amount: staggerAmount,
          from: "start",
        },
        delay: 0.8,
        onComplete: () => {
          // After individual divs animation completes, animate the main container
          gsap.to(containerRef.current, {
            y: "-100%",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLargeScreen]);

  return (
    <div
      ref={containerRef}
      className="z-preloader inset-0 fixed flex [&>div]:rounded-b-md [&>div]:h-full [&>div]:border-x [&>div]:bg-accent [&>div]:border-x-neutral-950/10"
    >
      <div className="w-spacer" />
      <div className="grow" />
      <div className="grow" />
      <div className="grow hidden lg:block" />
      <div className="grow hidden lg:block" />
      <div className="w-spacer" />
    </div>
  );
}
