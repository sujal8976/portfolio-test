// components/ui/nav-item.tsx
"use client";
import { NAVIGATION_CONSTANTS, NavItemType } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  item: NavItemType;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  closeMenu?: () => void;
  showIndex?: boolean; // Option to hide/show index numbers
}

export const NavItem = ({
  item,
  index,
  className,
  style,
  closeMenu,
  showIndex = true,
}: NavItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle home button - scroll to top
    if (item.isHome) {
      e.preventDefault();
      const lenis = window.lenis;

      if (lenis) {
        lenis.scrollTo(0, {
          offset: NAVIGATION_CONSTANTS.LENIS_SCROLL_OFFSET,
          duration: NAVIGATION_CONSTANTS.LENIS_SCROLL_DURATION,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      closeMenu?.();
      return;
    }

    // Handle anchor links
    if (item.isAnchor) {
      e.preventDefault();
      const targetId = item.href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const lenis = window.lenis;

        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: NAVIGATION_CONSTANTS.LENIS_SCROLL_OFFSET,
            duration: NAVIGATION_CONSTANTS.LENIS_SCROLL_DURATION,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          // Fallback to native smooth scroll
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      closeMenu?.();
      return;
    }

    // For regular links, just close menu
    closeMenu?.();
  };

  const linkClasses = cn(
    `relative w-max flex gap-2 items-center z-desktop-menu-layer after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[1px] after:bg-accent 
    after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:origin-right 
    after:transition-transform after:duration-300 after:ease-out transition-colors duration-200`,
    item.isAnchor || item.isHome ? "cursor-pointer" : "",
    className,
  );

  const content = (
    <>
      {showIndex && (
        <span className={cn("text-sm text-accent font-monorama")}>
          {(index + 1).toString().padStart(2, "0")}
        </span>
      )}
      {item.label}
    </>
  );

  // Handle home and anchor links as <a> tags
  if (item.isAnchor || item.isHome) {
    return (
      <li>
        <a
          href={item.href}
          onClick={handleClick}
          className={linkClasses}
          style={style}
        >
          {content}
        </a>
      </li>
    );
  }

  // Handle regular and external links as Next.js Link components
  return (
    <li>
      <Link
        href={item.href}
        className={linkClasses}
        style={style}
        target={item.isExternal ? "_blank" : undefined}
        rel={item.isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    </li>
  );
};
