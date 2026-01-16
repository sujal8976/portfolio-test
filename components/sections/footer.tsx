"use client";
import portfolioData from "@/lib/config/portfolio-data";
import { SocialLink, SocialPlatform } from "@/lib/config/portfolio-types";
import {
  NAVIGATION_CONSTANTS,
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
} from "@/lib/navigation";
import {
  Discord,
  GitHub,
  Instagram,
  LinkedIn,
  Reddit,
  Telegram,
  Twitter,
  YouTube,
} from "@/public/svg/socials"; // adjust the import path as needed
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GridLines, GridSeperator, GridWrapper } from "../ui/grid-utils";
import { NavItem } from "../ui/nav-item";

const CURRENT_YEAR = new Date().getFullYear();
const CREATION_YEAR = 2025;

export default function Footer() {
  const { firstName, lastName } = portfolioData.personalInfo;
  const copyrightPeriod =
    CREATION_YEAR === CURRENT_YEAR
      ? CURRENT_YEAR
      : `${CREATION_YEAR}-${CURRENT_YEAR}`;

  return (
    <footer className="relative overflow-y-hidden bg-background/80 backdrop-blur-lg min-h-screen">
      <div className="relative container-main flex flex-col min-h-screen">
        <GridLines />
        <GridSeperator />
        <FooterSignature />
        <FooterGridContent />
        <GridSeperator className="relative" />
        <div className="z-ui shadow-black py-4 text-sm text-muted">
          <p className="mx-spacer px-spacer flex flex-wrap gap-3 justify-around sm:justify-between">
            <span>{`© ${copyrightPeriod}, ${firstName} ${lastName}.`}</span>
            <span>All rights reserved.</span>
          </p>
        </div>
      </div>
      <div className="absolute gradient-circle -translate-half" />
    </footer>
  );
}

// Component to handle time display with proper hydration
function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateTime = () => {
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "shortOffset",
      }).format(new Date());
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Render placeholder during SSR and initial hydration
  if (!isMounted) {
    return <p className="text-lg">--:--:--</p>;
  }

  return <p className="text-lg">{currentTime}</p>;
}

const FooterGridContent = () => {
  const { email } = portfolioData.personalInfo;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen to both native scroll and Lenis scroll events
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("lenis:scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("lenis:scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        offset: NAVIGATION_CONSTANTS.LENIS_SCROLL_OFFSET,
        duration: NAVIGATION_CONSTANTS.LENIS_SCROLL_DURATION,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <GridWrapper className="relative z-ui mb-10 gap-10 mb-max flex-1">
      <div className="flex flex-col gap-y-10 px-spacer max-md:text-center">
        {portfolioData.socialLinks.length > 0 && (
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="shadow-black text-muted">SOCIAL</p>
            <div className="flex gap-3 max-md:gap-4 max-md:justify-center text-sm">
              {/* Your existing social links */}
              {portfolioData.socialLinks.map((platform) => (
                <SocialItem key={platform.platform} data={platform} />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="shadow-black text-muted">EMAIL</p>
          <Link
            className="hover:text-accent active:text-accent transition-colors duration-200 md:w-fit"
            href={`mailto:${email}`}
          >
            {email}
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-y-10 px-spacer max-md:text-center">
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="shadow-black text-muted">LOCAL TIME</p>
          <TimeDisplay />
        </div>
      </div>

      <div className="flex flex-col gap-y-10 px-spacer max-md:text-center">
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="shadow-black text-muted">NAVIGATION</p>
          <div className="flex justify-between text-left">
            {/* First column - Primary navigation items */}
            <ul className="flex flex-col gap-2 md:gap-4 xl:gap-6">
              {PRIMARY_NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={item.label}
                  item={item}
                  index={index}
                  showIndex={false} // Hide index numbers in footer
                  className="hover:text-accent active:text-accent transition-colors duration-200"
                />
              ))}
            </ul>

            {/* Second column - Secondary navigation items */}
            <ul className="flex flex-col gap-2 md:gap-4 xl:gap-6">
              {SECONDARY_NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={item.label}
                  item={item}
                  index={index + PRIMARY_NAV_ITEMS.length}
                  showIndex={false} // Hide index numbers in footer
                  className="hover:text-accent active:text-accent transition-colors duration-200"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-10 px-spacer max-md:text-center items-center md:justify-end md:items-end lg:max-xl:items-start">
        <button
          onClick={scrollToTop}
          className={`text-muted flex items-center gap-4 hover:text-accent active:text-accent transition-all duration-300 ${
            !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={20} strokeWidth={1.75} className="mt-1" />
        </button>
      </div>
    </GridWrapper>
  );
};

const iconClassName =
  "hover:text-accent stroke-[1.5] h-6 w-6 transition-colors duration-200";

const getSocialIcon = (platform: SocialPlatform) => {
  const commonProps = {
    className: iconClassName,
    "aria-label": `${platform} icon`,
  };

  switch (platform) {
    case SocialPlatform.GITHUB:
      return <GitHub {...commonProps} />;
    case SocialPlatform.LINKEDIN:
      return <LinkedIn {...commonProps} />;
    case SocialPlatform.TWITTER:
      return <Twitter {...commonProps} />;
    case SocialPlatform.TELEGRAM:
      return <Telegram {...commonProps} />;
    case SocialPlatform.DISCORD:
      return <Discord {...commonProps} />;
    case SocialPlatform.INSTAGRAM:
      return <Instagram {...commonProps} />;
    case SocialPlatform.REDDIT:
      return <Reddit {...commonProps} />;
    case SocialPlatform.YOUTUBE:
      return <YouTube {...commonProps} />;
  }
};

const SocialItem = ({ data }: { data: SocialLink }) => {
  return (
    <Link href={data.url} target="_blank">
      {getSocialIcon(data.platform)}
    </Link>
  );
};

const FooterSignature = () => {
  const { firstName, lastName } = portfolioData.personalInfo;
  const textRef = useRef<SVGTextElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      const containerWidth = 1000;
      const textWidth = bbox.width;
      const scaleX = containerWidth / textWidth;
      setScale(scaleX);
    }
  }, [firstName, lastName]);

  return (
    <svg
      className="w-full h-auto px-spacer py-14 relative z-ui font-monument uppercase pointer-events-none select-none"
      viewBox="0 0 1000 100"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`scale(${scale}, ${scale})`}>
        <text
          ref={textRef}
          x="0"
          y={60 / scale}
          fontWeight="600"
          fontSize="61"
          textAnchor="start"
          dominantBaseline="middle"
        >
          <tspan className="fill-foreground">{firstName} </tspan>
          <tspan className="fill-accent">{lastName}</tspan>
        </text>
      </g>
    </svg>
  );
};
