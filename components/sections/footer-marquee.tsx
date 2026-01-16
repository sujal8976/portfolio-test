"use client";
import portfolioData from "@/lib/config/portfolio-data";
import { useEffect, useRef, useState } from "react";

export default function FooterMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const currentXRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll detection logic
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

  // Animation logic
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

      // Determine movement direction based on scroll direction
      // down = left, up = right (same as DynamicMarquee defaults)
      const moveDirection = scrollDirection === "down" ? "left" : "right";

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
  }, [scrollDirection, isScrolling]);

  // Duplicate items for seamless looping
  const duplicatedItems = [
    ...portfolioData.footerMarquee,
    ...portfolioData.footerMarquee,
  ];

  return (
    <>
      {duplicatedItems.length > 0 && (
        <div className="bg-accent text-background rounded-t-md overflow-hidden py-4 -mb-8">
          <div
            ref={marqueeRef}
            className="w-full flex items-center whitespace-nowrap will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {duplicatedItems.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="text-4xl lg:text-5xl xl:text-6xl font-monument uppercase pr-4 list-none"
              >
                {item} -
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
