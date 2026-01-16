"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TypeHeadProps {
  index?: string;
  content: string;
  speed?: number;
  startDelay?: number;
  mainClassName?: string;
  contentClassName?: string;
  indexClassName?: string;
}

export const TypeHead = ({
  index,
  content,
  speed = 50,
  startDelay = 200,
  mainClassName,
  contentClassName,
  indexClassName,
}: TypeHeadProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const elementRef = useRef<HTMLHeadingElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && displayedContent === "") {
          observerRef.current?.disconnect();

          setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
              if (i < content.length) {
                setDisplayedContent(content.slice(0, ++i));
                setTimeout(typeWriter, speed);
              }
            };
            typeWriter();
          }, startDelay);
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(element);
    return () => observerRef.current?.disconnect();
  }, [content, speed, startDelay, displayedContent]);

  return (
    <h2
      ref={elementRef}
      className={cn(
        "px-spacer mb-10 text-2xl lg:text-3xl font-monument relative z-ui",
        mainClassName,
      )}
    >
      {index && (
        <span
          className={cn(
            "text-accent text-base font-monorama mr-2 align-top",
            indexClassName,
          )}
        >
          {index}
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center after:inline-block after:bg-foreground after:w-[1.5px] after:h-[1em] after:ml-2 after:mb-1 after:animate-blink",
          contentClassName,
        )}
      >
        {displayedContent}
      </span>
    </h2>
  );
};
