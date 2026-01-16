"use client";
import portfolioData from "@/lib/config/portfolio-data";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MatrixButton } from "../ui/button";
import { GridWrapper } from "../ui/grid-utils";

export default function Hero() {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Function to split text into words with individual letter spans
  const splitTextIntoWords = (text: string, className = "") => {
    return (
      <span>
        {text.split(" ").map((word, wordIndex) => (
          <span
            key={wordIndex}
            className={`word ${className}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                id="letter"
                className={className}
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
            {wordIndex < text.split(" ").length - 1 && (
              <span id="letter" style={{ display: "inline-block" }}>
                {"\u00A0"}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  // Function to handle smooth scrolling to socials section
  const handleScrollToSocials = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById("socials");

    if (targetElement) {
      const lenis = window.lenis;
      if (lenis) {
        // Use Lenis for smooth scrolling if available
        lenis.scrollTo(targetElement, {
          offset: -80, // Adjust this value based on your header height
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback to native smooth scroll
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  // Intersection Observer to detect when element is in viewport
  useEffect(() => {
    const currentRef = heroRef.current; // Copy ref to variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true); // Prevent re-animation
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -10% 0px", // Adjust trigger point
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // GSAP animations - only run when visible
  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      // Set initial state - letters start from below and invisible
      gsap.set("#letter", {
        y: 105,
        rotate: 5,
        opacity: 0,
      });

      // Animate letters with stagger effect
      gsap.to("#letter", {
        y: 0,
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
        delay: 1.8, // Reduced delay since we're already waiting for visibility
      });

      // Animate the description paragraph separately
      gsap.set("#hero-description", {
        y: 60,
        opacity: 0,
      });

      gsap.to("#hero-description", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 3.2, // Adjusted timing relative to visibility trigger
      });

      // Button growing effect - set initial state
      gsap.set("#hero-button", {
        y: 105,
        overflow: "hidden",
      });

      // Animate buttons growing from bottom to top
      gsap.to("#hero-button", {
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.4, // Small delay between buttons
        delay: 3.6, // Start after description animation
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <div ref={heroRef} className="h-svh flex flex-col justify-center">
      <h1 className="mx-spacer px-spacer flex flex-col z-ui">
        <span className="overflow-hidden">
          <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-monument">
            {splitTextIntoWords("HEY")}
          </span>
        </span>

        <span className="overflow-hidden mt-5 md:mt-6">
          <span className="leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-monument">
            <span>{splitTextIntoWords("I'M ")}</span>
            <span className="text-accent uppercase">
              {splitTextIntoWords(portfolioData.personalInfo.firstName)}
            </span>
            {splitTextIntoWords(".")}
          </span>
        </span>
        <span className="overflow-hidden">
          <p id="hero-description" className="mt-5 md:mt-6 max-w-[60ch]">
            {portfolioData.content.tagline}
          </p>
        </span>
      </h1>
      <GridWrapper>
        <div className="overflow-hidden">
          <MatrixButton
            id="hero-button"
            className=" mt-8"
            onClick={(e) => handleScrollToSocials(e)}
            content="GET IN TOUCH"
          />
        </div>
        <div className="overflow-hidden">
          <Link href="/resume" target="_blank" rel="noopener noreferrer">
            <MatrixButton
              id="hero-button"
              className="mt-8"
              content="VIEW RESUME"
            />
          </Link>
        </div>
      </GridWrapper>
    </div>
  );
}
