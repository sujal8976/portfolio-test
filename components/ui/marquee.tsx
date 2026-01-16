"use client";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface DynamicMarqueeProps {
  marqueeItems: string[];
  separatorClassName?: string;
  downDirection?: "left" | "right";
  upDirection?: "left" | "right";
}

const DynamicMarquee = ({
  marqueeItems,
  separatorClassName,
  downDirection = "left",
  upDirection = "right",
}: DynamicMarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const currentXRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.pageYOffset;

          if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
            const direction =
              currentScrollY > lastScrollY.current ? "down" : "up";
            setScrollDirection(direction);
            lastScrollY.current = currentScrollY;

            // Set scrolling state to true
            setIsScrolling(true);

            // Clear existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            // Set timeout to detect when scrolling stops
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 150); // 150ms after scrolling stops
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const baseSpeed = 1.5;
    const scrollMultiplier = 1.5; // 1.5x speed when scrolling

    // Calculate total width for looping
    const getMarqueeWidth = () => {
      return marquee.scrollWidth / 2; // Divided by 2 since we duplicate items
    };

    const animate = () => {
      const marqueeWidth = getMarqueeWidth();
      const currentSpeed = isScrolling
        ? baseSpeed * scrollMultiplier
        : baseSpeed;

      // Determine movement direction based on scroll direction and props
      const moveDirection =
        scrollDirection === "down" ? downDirection : upDirection;

      if (moveDirection === "left") {
        currentXRef.current -= currentSpeed;
        if (currentXRef.current <= -marqueeWidth) {
          currentXRef.current = 0;
        }
      } else {
        // moveDirection === "right"
        currentXRef.current += currentSpeed;
        if (currentXRef.current >= 0) {
          currentXRef.current = -marqueeWidth;
        }
      }

      marquee.style.transform = `translateX(${currentXRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollDirection, isScrolling, downDirection, upDirection]); // Added direction props to dependencies

  // Duplicate items for seamless looping
  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={marqueeRef}
      className="w-full flex items-center whitespace-nowrap will-change-transform"
      style={{ transform: "translateX(0px)" }}
    >
      {duplicatedItems.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-center">
          <div
            className={cn(
              "font-monument inline-flex items-center justify-center px-6 py-2 text-inherit uppercase whitespace-nowrap text-4xl lg:text-5xl xl:text-6xl",
            )}
          >
            {item}
          </div>
          {/* Separator line between items */}
          <span
            className={cn("h-2 w-12 bg-neutral-700 mx-0", separatorClassName)}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicMarquee;
