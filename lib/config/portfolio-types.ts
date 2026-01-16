// Enums for better type safety and maintainability
enum SocialPlatform {
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  GITHUB = "github",
  TELEGRAM = "telegram",
  REDDIT = "reddit",
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
  DISCORD = "discord",
  CREDLY = "credly",
}

// Base interfaces with improved naming
interface SocialLink {
  platform: SocialPlatform;
  url: string;
  username: string;
  displayName?: string; // Optional display name if different from username
}

interface MediaAsset {
  url: string;
  alt: string; // Better than 'caption' for accessibility
  title?: string; // Optional title attribute
}

interface DateRange {
  startDate: Date;
  endDate: Date | null; // null indicates current/ongoing
}

interface WorkExperience extends DateRange {
  company: string;
  position: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Card {
  title: string;
  description: string;
  thumbnail?: string;
  projectUrl: string;
}

interface Education extends DateRange {
  institution: string;
  degree: string;
}

interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  url: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string; // Professional title
  location: string;
  email: string;
}

type Skills = Record<string, string[]>

// Main configuration interface with improved structure
interface PortfolioConfig {
  // Personal Information
  personalInfo: PersonalInfo;

  // Content sections
  content: {
    tagline: string;
    about: string[];
    svgLink?: string;
  };

  // Skills and expertise
  skills: Skills;

  // External links and profiles
  socialLinks: SocialLink[];

  // Professional experience
  // workExperience: WorkExperience[];

  // Educational background
  education: Education[];

  // Certifications
  certification: Certification[];

  // Footer Marquee Items
  footerMarquee: string[];

  includeGitHubInProjects: boolean;
}

// Utility types for better type inference
type SocialPlatformKey = keyof typeof SocialPlatform;
type SkillCategory = keyof PortfolioConfig["skills"];

// Type guards for runtime validation
const isSocialPlatform = (platform: string): platform is SocialPlatform => {
  return Object.values(SocialPlatform).includes(platform as SocialPlatform);
};

export type {
  Card,
  DateRange,
  Education,
  MediaAsset,
  PersonalInfo,
  PortfolioConfig,
  SkillCategory,
  // Skills,
  SocialLink,
  SocialPlatformKey,
  WorkExperience,
  Certification
};

export { isSocialPlatform, SocialPlatform };
