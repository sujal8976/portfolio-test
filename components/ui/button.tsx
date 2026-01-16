"use client";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  content?: string;
}

export const MatrixButton = ({
  content = "CLICK ME",
  className,
  ...props
}: ButtonProps) => {
  const [displayText, setDisplayText] = useState(content);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = useRef(content);
  const mountedRef = useRef(true);

  // Update originalText when content prop changes
  useEffect(() => {
    originalText.current = content;
    if (!isAnimating) {
      setDisplayText(content);
    }
  }, [content, isAnimating]);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const scrambleDuration = 60; // ms per frame
  const scrambleDelay = 3.5; // iterations before starting to reveal

  const clearAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (isAnimating || !mountedRef.current) return;

    clearAnimation();
    setIsAnimating(true);

    let iterations = 0;
    const maxIterations = originalText.current.length + scrambleDelay;

    const animate = () => {
      if (!mountedRef.current) return;

      setDisplayText(
        originalText.current
          .split("")
          .map((char, index) => {
            if (iterations > index + scrambleDelay) {
              return originalText.current[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      iterations += 1;

      if (iterations <= maxIterations && mountedRef.current) {
        animationRef.current = setTimeout(animate, scrambleDuration);
      } else if (mountedRef.current) {
        setIsAnimating(false);
        setDisplayText(originalText.current);
      }
    };

    animate();
  }, [isAnimating, clearAnimation, chars, scrambleDuration, scrambleDelay]);

  const stopAnimation = useCallback(() => {
    if (!mountedRef.current) return;

    clearAnimation();

    if (isAnimating) {
      setIsAnimating(false);
    }

    setDisplayText(originalText.current);
  }, [isAnimating, clearAnimation]);

  // Clean up animation on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearAnimation();
    };
  }, [clearAnimation]);

  // Handle keyboard interactions for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        startAnimation();
      }
    },
    [startAnimation],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        stopAnimation();
      }
    },
    [stopAnimation],
  );

  return (
    <button
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      onTouchStart={startAnimation}
      onTouchEnd={stopAnimation}
      onFocus={startAnimation}
      onBlur={stopAnimation}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={cn(
        `group relative h-14 py-4 px-spacer flex items-center justify-between w-full border-l border-l-accent z-40
        before:absolute before:top-0 before:right-0 before:h-[1px] before:bg-borders before:w-0 
        hover:before:w-full focus:before:w-full active:before:w-full before:transition-all before:duration-300 before:ease-out
        after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-borders after:w-0 
        hover:after:w-full focus:after:w-full active:after:w-full after:transition-all after:duration-300 after:ease-out
        transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50`,
        className,
      )}
      // disabled={isAnimating}
      aria-busy={isAnimating}
      aria-label={isAnimating ? `Animating: ${originalText.current}` : content}
      {...props}
    >
      <span
        className="tracking-wider truncate font-monorama"
        aria-live="polite"
        aria-atomic="true"
      >
        {displayText}
      </span>
      <ChevronRight
        className="mt-1 h-4 w-4 transition-all ease-in group-hover:translate-x-1 group-hover:scale-110 group-hover:text-accent group-focus:translate-x-1 group-focus:scale-110 group-focus:text-accent group-active:translate-x-1 group-active:scale-110 group-active:text-accent"
        aria-hidden="true"
      />
    </button>
  );
};
