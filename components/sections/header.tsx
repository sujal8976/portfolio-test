"use client";
import { NavItem } from "@/components/ui/nav-item";
import {
  NAVIGATION_CONSTANTS,
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { GridLines, GridSeperator, GridWrapper } from "../ui/grid-utils";

// Types
interface ScrollState {
  isVisible: boolean;
  lastScrollY: number;
  isMenuExpanded: boolean;
}

// Components
const MenuButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) => (
  <button
    className="group flex justify-between w-5 h-5"
    onClick={onClick}
    aria-expanded={isExpanded}
    aria-label="Toggle menu"
  >
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={cn(
          "menu-bar transition-transform duration-300",
          isExpanded &&
            (i === 0 || i === 3) &&
            (i === 0
              ? "rotate-45 translate-x-[9.5px]"
              : "-rotate-45 -translate-x-[9.5px]"),
          isExpanded && (i === 1 || i === 2) && "opacity-0 translate-x-2",
          !isExpanded && i === 1 && "group-hover:-translate-x-[2px]",
          !isExpanded && i === 2 && "group-hover:-translate-x-[4px]",
        )}
      />
    ))}
  </button>
);

// Custom hooks
const useScrollBehavior = () => {
  const [state, setState] = useState<ScrollState>({
    isVisible: true,
    lastScrollY: 0,
    isMenuExpanded: false,
  });

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;

    setState((prevState) => {
      const newState = { ...prevState };

      // Show header when at top of page
      if (currentScrollY < NAVIGATION_CONSTANTS.SCROLL_THRESHOLD) {
        newState.isVisible = true;
      }
      // Hide header when scrolling down, show when scrolling up
      else if (
        currentScrollY > prevState.lastScrollY &&
        currentScrollY > NAVIGATION_CONSTANTS.HIDE_HEADER_THRESHOLD
      ) {
        newState.isVisible = false;
        newState.isMenuExpanded = false; // Close menu when hiding header
      } else if (currentScrollY < prevState.lastScrollY) {
        newState.isVisible = true;
      }

      newState.lastScrollY = currentScrollY;
      return newState;
    });
  }, []);

  const handleScroll = useCallback(() => {
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Handle immediate scroll behavior
    controlNavbar();

    // Set timeout to close menu after delay if it's expanded
    if (state.isMenuExpanded) {
      scrollTimeoutRef.current = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          isMenuExpanded: false,
        }));
      }, NAVIGATION_CONSTANTS.MENU_CLOSE_DELAY);
    }
  }, [controlNavbar, state.isMenuExpanded]);

  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMenuExpanded: !prevState.isMenuExpanded,
    }));
  }, []);

  const closeMenu = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMenuExpanded: false,
    }));
  }, []);

  return {
    ...state,
    toggleMenu,
    closeMenu,
  };
};

// Animation utilities
const getStaggeredDelay = (index: number) => {
  const delays = [
    "delay-0",
    "delay-75",
    "delay-150",
    "delay-200",
    "delay-300",
    "delay-500",
    "delay-700",
    "delay-1000",
  ];
  return delays[index] || "delay-1000";
};

const getAnimationDelay = (index: number) => {
  return index * 150; // 150ms between each item
};

// Main component
export default function Header() {
  const { isVisible, isMenuExpanded, toggleMenu, closeMenu } =
    useScrollBehavior();

  return (
    <header
      className={cn(
        "hidden lg:block fixed z-desktop-menu-layer left-0 right-0 top-0 w-full transition-transform duration-1000 ease-in-out select-none",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="w-full bg-background/70 backdrop-blur-xs">
        <div className="container-main relative">
          <GridLines />
          <nav className="px-spacer">
            <ul className="w-full flex items-center justify-end gap-6 py-6">
              {PRIMARY_NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={item.label}
                  item={item}
                  index={index}
                  closeMenu={closeMenu}
                />
              ))}
              <li className="z-desktop-menu-layer">
                <MenuButton isExpanded={isMenuExpanded} onClick={toggleMenu} />
              </li>
            </ul>
          </nav>
          <GridSeperator />
        </div>
      </div>
      <GridWrapper
        className={cn(
          `px-spacer overflow-hidden transition-all ease-in-out origin-top`,
          isMenuExpanded ? "max-h-96" : "max-h-0",
        )}
        style={{
          transitionDuration: `${NAVIGATION_CONSTANTS.ANIMATION_DURATION}ms`,
        }}
      >
        <ul className="-col-end-1 p-spacer bg-secondary flex flex-col gap-6 rounded-lg">
          {SECONDARY_NAV_ITEMS.map((item, index) => (
            <NavItem
              key={item.label}
              item={item}
              index={index + PRIMARY_NAV_ITEMS.length}
              className={cn(
                "transform transition-all duration-500 ease-out",
                getStaggeredDelay(index),
                isMenuExpanded
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-5 scale-90",
              )}
              style={{
                transitionDelay: isMenuExpanded
                  ? `${getAnimationDelay(index)}ms`
                  : "0ms",
              }}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
      </GridWrapper>
    </header>
  );
}
