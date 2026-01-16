"use client";
import { Card as CardType } from "@/lib/config/portfolio-types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

// Define variant configurations
const VARIANT_CONFIGS = {
  light: {
    container: "bg-[#e5e5e5] text-background",
    description: "text-background/70",
    icon: "bg-background text-foreground",
    pattern: "",
  },
  pattern: {
    container: "bg-[#e5e5e5] text-foreground",
    description: "text-muted/90",
    icon: "bg-accent text-background",
    pattern:
      "bg-[url(/images/pattern.webp)] bg-[length:300%] bg-right-bottom hover:bg-center",
  },
  dark: {
    container: "bg-[#171717] text-muted",
    description: "text-muted/70",
    icon: "bg-muted text-background",
    pattern: "",
  },
  glass: {
    container: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
    description: "text-white/70",
    icon: "bg-white/20 text-white",
    pattern: "",
  },
  minimal: {
    container: "bg-white text-gray-900 border border-gray-200",
    description: "text-gray-600",
    icon: "bg-gray-100 text-gray-700",
    pattern: "",
  },
} as const;

export type CardVariant = keyof typeof VARIANT_CONFIGS;

export interface CardProps {
  data: CardType;
  displayStr?: string;
  variant?: CardVariant;
  icon?: "arrow" | "right";
  className?: string;
}

export default function Card({
  data,
  displayStr = "CHECK OUT",
  variant = "light",
  icon = "arrow",
  className = "",
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(displayStr);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const variantConfig = VARIANT_CONFIGS[variant];

  const scrambleText = (targetText: string, duration: number = 1000) => {
    const startTime = Date.now();
    const textLength = targetText.length;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setDisplayText(targetText);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      const revealIndex = Math.floor(progress * textLength);
      let scrambled = "";

      for (let i = 0; i < textLength; i++) {
        if (i < revealIndex) {
          scrambled += targetText[i];
        } else if (targetText[i] === " ") {
          scrambled +=
            CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        } else {
          scrambled +=
            CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }

      setDisplayText(scrambled);
    }, 50);
  };

  useEffect(() => {
    if (isHovered) {
      scrambleText(displayStr, 600);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(displayStr);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, displayStr]);

  return (
    <Link href={data.projectUrl} target="_blank">
      <div
        className={cn(
          "border border-borders min-h-[22.5rem] rounded-md m-4 my-8 transition-[transform,background-position] duration-350 ease-cubic flex",
          className,
        )}
      >
        <div
          className={cn(
            "group flex-1 w-full flex flex-col justify-between hover:translate-x-3 hover:-translate-y-3 active:translate-x-3 active:-translate-y-3 rounded-md transition-all duration-350 ease-cubic p-8 font-primary",
            variantConfig.container,
            variantConfig.pattern,
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div>
            <p className="text-lg md:text-xl">{data.title}</p>
            <p className={cn("mt-4 text-sm", variantConfig.description)}>
              {data.description}
            </p>
          </div>

          {data.thumbnail && (
            <div className="h-10 w-40 flex items-center">
              <Image
                width={0}
                height={0}
                className="w-max h-full"
                src={data.thumbnail}
                alt="logo"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className={"text-xs font-monorama"}>{displayText}</span>
            <div
              className={cn(
                "relative rounded-full p-1 overflow-hidden",
                variantConfig.icon,
              )}
            >
              {icon === "arrow" ? (
                <>
                  <ArrowUpRight
                    className="transition-transform duration-350 ease-cubic group-hover:translate-x-6 group-hover:-translate-y-6 group-active:translate-x-6 group-active:-translate-y-6"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight
                    className="absolute top-1 left-1 transition-transform duration-350 ease-cubic -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 group-active:translate-x-0 group-active:translate-y-0"
                    size={20}
                    strokeWidth={1.5}
                  />
                </>
              ) : (
                <>
                  <ChevronRight
                    className="transition-transform duration-350 ease-cubic group-active:translate-x-6 group-hover:translate-x-6"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <ChevronRight
                    className="absolute top-1 left-1 transition-transform duration-350 ease-cubic -translate-x-6 group-hover:translate-x-0 group-active:translate-x-0"
                    size={20}
                    strokeWidth={1.5}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
