// lib/navigation.ts
export interface NavItemType {
  label: string;
  href: string;
  isExternal?: boolean;
  isAnchor?: boolean;
  isHome?: boolean; // New flag for home button
}

// Navigation items configuration - can be reused in header and footer
export const PRIMARY_NAV_ITEMS: NavItemType[] = [
  { label: "Home", href: "/", isHome: true }, // Added isHome flag
  // { label: "Blogs", href: "#blogs", isAnchor: true },
  { label: "Projects", href: "#projects", isAnchor: true },
  // { label: "Experience", href: "#experience", isAnchor: true },
  // { label: "Works", href: "#works", isAnchor: true },
  { label: "Skills", href: "#skills", isAnchor: true },
];

export const SECONDARY_NAV_ITEMS: NavItemType[] = [
  // { label: "Experience", href: "#experience", isAnchor: true },
  { label: "Socials", href: "#socials", isAnchor: true },
  { label: "Resume", href: "/resume", isExternal: true },
];

// All navigation items combined for easy access
export const ALL_NAV_ITEMS = [...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];

// Navigation constants
export const NAVIGATION_CONSTANTS = {
  SCROLL_THRESHOLD: 10,
  HIDE_HEADER_THRESHOLD: 100,
  MENU_CLOSE_DELAY: 350,
  ANIMATION_DURATION: 1000,
  LENIS_SCROLL_DURATION: 2.5,
  LENIS_SCROLL_OFFSET: 0,
} as const;
