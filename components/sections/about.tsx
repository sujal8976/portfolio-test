"use client";
import portfolioData from "@/lib/config/portfolio-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { GridWrapper } from "../ui/grid-utils";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Split text into words and wrap each word in a span
    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent || "";
      const words = text.split(/(\s+)/); // Split by spaces but keep the spaces

      paragraph.innerHTML = words
        .map((word) => {
          if (word.trim() === "") {
            return word; // Return spaces as-is
          }
          return `<span class="word-reveal">${word}</span>`;
        })
        .join("");
    });

    // Get all word spans
    const wordSpans = container.querySelectorAll(".word-reveal");

    // Create the reveal animation using fromTo with stagger
    gsap.fromTo(
      wordSpans,
      {
        opacity: 0.2,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.05, // This creates the smooth word-by-word effect
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "bottom 80%",
          scrub: true,
          markers: false,
        },
      },
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {portfolioData.content.about.length > 0 && (
        <GridWrapper>
          <div
            ref={containerRef}
            className="col-span-2 -col-end-1 p-spacer space-y-6 lg:text-2xl z-ui"
          >
            {portfolioData.content.about.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </GridWrapper>
      )}
    </>
  );
}
