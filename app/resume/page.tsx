"use client";
import { DateDisplay } from "@/components/ui/date-display";
import {
  default as data,
  default as portfolioData,
} from "@/lib/config/portfolio-data";
import {
  Card,
  Certification,
  Education,
  PersonalInfo,
  SocialPlatform,
  // WorkExperience,
} from "@/lib/config/portfolio-types";
import ProjectData from "@/lib/config/project-data";
import Star from "@/public/svg/star.svg";
import { ArrowDownToLine, Link as LinkIcon, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Header Components
interface ContactItemProps {
  icon: React.ComponentType<{ size: number; className: string }>;
  text: string;
  href?: string;
  isLink?: boolean;
}

function ContactItem({ icon: Icon, text, href, isLink }: ContactItemProps) {
  const iconElement = <Icon size={20} className="text-accent" />;
  const textElement = (
    <p
      className={
        isLink
          ? "group-hover:text-accent ease-in transition-all duration-200"
          : ""
      }
    >
      {text}
    </p>
  );

  if (isLink && href) {
    return (
      <Link
        className="group flex gap-2 items-center"
        href={href}
        target="_blank"
      >
        {iconElement}
        {textElement}
      </Link>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {iconElement}
      {textElement}
    </div>
  );
}

interface ResumeHeaderProps {
  personalInfo: PersonalInfo;
}

function ResumeHeader({ personalInfo }: ResumeHeaderProps) {
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="flex flex-col gap-4 items-center p-spacer text-center">
      <h1 className="font-monument text-4xl uppercase">{fullName}</h1>
      <p className="text-xl text-muted">{personalInfo.title}</p>

      <div className="flex gap-x-6 px-2 gap-y-3 mt-4 text-sm flex-wrap justify-center">
        <ContactItem icon={MapPin} text={personalInfo.location} />
        <ContactItem
          icon={Mail}
          text={personalInfo.email}
          href={`mailto:${personalInfo.email}`}
          isLink
        />
      </div>
    </div>
  );
}

// Experience Components
// interface AchievementsListProps {
//   achievements: string[];
// }

// function AchievementsList({ achievements }: AchievementsListProps) {
//   if (achievements.length === 0) return null;

//   return (
//     <div className="mb-4">
//       <ul className="list-disc pl-4 space-y-2">
//         {achievements.map((achievement, index) => (
//           <li key={index}>
//             <p>{achievement}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// interface TechnologiesListProps {
//   technologies: string[];
// }

// function TechnologiesList({ technologies }: TechnologiesListProps) {
//   if (technologies.length === 0) return null;

//   const formatTechnologies = () => {
//     return technologies.map((tech, index) => (
//       <span key={index}>
//         <span className="text-accent font-semibold">{tech}</span>
//         {index < technologies.length - 2 && ", "}
//         {index === technologies.length - 2 && " and "}
//       </span>
//     ));
//   };

//   return (
//     <div>
//       <p>
//         <strong className="text-foreground">Technologies used</strong>:{" "}
//         {formatTechnologies()}
//       </p>
//     </div>
//   );
// }

// interface ExperienceItemProps {
//   experience: WorkExperience;
// }

// function ExperienceItem({ experience }: ExperienceItemProps) {
//   return (
//     <div className="flex flex-col gap-2 pb-6 last:pb-0 border-b border-b-borders last:border-b-0">
//       <p className="text-lg">{experience.company}</p>
//       <p>{experience.position}</p>
//       <DateDisplay
//         date={{ from: experience.startDate, to: experience.endDate }}
//         showCounter
//       />

//       <div className="prose prose-custom text-sm text-muted [&_svg]:hidden">
//         <p className="my-4">{experience.description}</p>
//         <AchievementsList achievements={experience.achievements} />
//         <TechnologiesList technologies={experience.technologies} />
//       </div>
//     </div>
//   );
// }

// interface ExperienceSectionProps {
//   workExperience: WorkExperience[];
// }

// function ExperienceSection({ workExperience }: ExperienceSectionProps) {
//   return (
//     <div className="px-spacer border-y border-y-borders print:border-y-transparent">
//       <div className="p-spacer flex flex-col gap-8 break-inside-avoid border-b border-b-borders last:border-b-0">
//         <h2 className="text-xl font-medium text-accent">Experience</h2>
//         <div className="flex flex-col gap-6">
//           {workExperience.map((experience, index) => (
//             <ExperienceItem key={index} experience={experience} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

interface EducationSectionProps {
  education: Education[];
}

function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="px-spacer mb-5 border-y border-y-borders print:border-y-transparent">
      <div className="p-spacer flex flex-col gap-8 break-inside-avoid border-b border-b-borders last:border-b-0">
        <h2 className="text-xl font-medium text-accent">Education</h2>
        <div className="flex flex-col gap-6">
          {education.map((x, i) => {
            return (
              <div key={i} className="flex flex-col gap-2">
                <p className="text-lg">
                  <span>{x.institution}</span>
                  <span className="text-muted ml-4">- {x.degree}</span>
                </p>
                <DateDisplay date={{ from: x.startDate, to: x.endDate }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface CertificationSectionProps {
  certifications: Certification[];
}

function CertificationsSection({ certifications }: CertificationSectionProps) {
  const credlyLink = portfolioData.socialLinks?.find(
    (e) => e.platform === SocialPlatform.CREDLY
  );

  return (
    <div className="px-spacer border-y border-y-borders print:border-y-transparent">
      <div className="p-spacer flex flex-col gap-8 break-inside-avoid border-b border-b-borders last:border-b-0">
        <h2 className="text-xl font-medium text-accent">Certifications</h2>
        <div className="flex flex-col gap-6">
          {certifications.map((cert, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-2 pb-6 items-start border-b border-b-borders last:border-b-0"
              >
                <p className="text-lg">{cert.name}</p>
                <p className="text-muted text-sm">{cert.issuingOrganization}</p>
                <DateDisplay
                  date={{ from: cert.issueDate, to: null }}
                  showEndDate={false}
                />
                <div className="text-sm max-w-full">
                  <Link
                    href={cert.url}
                    target="_blank"
                    className="group flex gap-2 items-center pl-2 pr-3 py-1 bg-neutral-800 rounded-full"
                  >
                    <LinkIcon
                      size={12}
                      className="text-accent print:text-black transition-transform duration-500 ease-quint group-hover:rotate-[180deg]"
                    />
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {cert.url}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 flex-wrap gap-y-4">
          {credlyLink && (
            <div className="flex items-center gap-2">
              <Star />
              <p>
                {"see all my badges on my "}
                <Link
                  className="text-accent"
                  href={credlyLink.url}
                  target="_blank"
                >
                  Credly
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProjectSectionProps {
  projects: Card[];
}

function ProjectSection({ projects }: ProjectSectionProps) {
  const githubLink = portfolioData.socialLinks?.find(
    (e) => e.platform === SocialPlatform.GITHUB
  );
  return (
    <div className="px-spacer border-y border-y-borders print:border-y-transparent">
      <div className="p-spacer flex flex-col gap-8 break-inside-avoid border-b border-b-borders last:border-b-0">
        <h2 className="text-xl font-medium text-accent">Featured Projects</h2>
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-start pb-6 border-b border-b-borders last:border-b-0"
            >
              <p className="text-lg">{project.title}</p>
              <p className="text-muted text-sm">{project.description}</p>
              <div className="text-sm max-w-full">
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  className="group flex gap-2 items-center pl-2 pr-3 py-1 bg-neutral-800 rounded-full"
                >
                  <LinkIcon
                    size={12}
                    className="text-accent print:text-black transition-transform duration-500 ease-quint group-hover:rotate-[180deg]"
                  />
                  <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {project.projectUrl}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap gap-y-4">
          {githubLink && (
            <div className="flex items-center gap-2">
              <Star />
              <p>
                {"see all my projects on my "}
                <Link
                  className="text-accent"
                  href={githubLink.url}
                  target="_blank"
                >
                  Github
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

function SkillsSection({ skills }: SkillsSectionProps) {
  const Chip = ({ item }: { item: string }) => (
    <span className="bg-neutral-800 py-1 px-2 rounded-md text-sm min-w-[4ch] text-center">
      {item}
    </span>
  );
  return (
    <div className="px-spacer border-y border-y-borders print:border-y-transparent">
      <div className="p-spacer flex flex-col gap-8 break-inside-avoid border-b border-b-borders last:border-b-0">
        <h2 className="text-xl font-medium text-accent">{"Skills & Tools"}</h2>
        <div className="flex flex-col gap-6">
          {Object.entries(skills).map(
            ([category, items]: [string, string[]]) => (
              <div key={category}>
                <p className="mb-3 text-lg">{category}</p>
                <div className="flex gap-3 flex-wrap">
                  {items.map((item: string, i: number) => (
                    <Chip key={i} item={item} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// Sidebar Components
interface DownloadButtonProps {
  onDownload?: () => void;
}

function DownloadButton({ onDownload }: DownloadButtonProps) {
  const handleClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Default download behavior
      window.print();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group flex gap-2 items-center bg-neutral-800 py-[0.35em] px-4 rounded-full group hover:bg-accent hover:border-accent/80 hover:text-background transition-colors duration-200 border border-neutral-600"
    >
      <ArrowDownToLine
        size={20}
        strokeWidth={2}
        className="text-accent group-hover:text-background"
      />
      <span className="whitespace-nowrap group-hover:text-background">
        Download as PDF
      </span>
    </button>
  );
}

function ResumeSidebar() {
  const handleDownloadPDF = () => {
    // Add your PDF download logic here
    console.log("Downloading PDF...");
    // For now, use browser print
    window.print();
  };

  return (
    <div className="hidden lg:block print:lg:hidden">
      <div className="sticky top-10 flex flex-col gap-4 mt-10">
        <DownloadButton onDownload={handleDownloadPDF} />
      </div>
    </div>
  );
}

// Layout Components
interface ResumeLayoutProps {
  children: React.ReactNode;
}

function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div className="bg-gradient-to-b from-accent/20 to-transparent to-10%">
      <div className="flex justify-center gap-spacer mx-auto container-main sm:px-spacer">
        <main className="max-w-7xl relative w-full">
          <div className="w-[1px] h-full absolute top-0 left-spacer bg-borders" />
          <div className="w-[1px] h-full absolute top-0 right-spacer bg-borders" />
          {children}
        </main>
        <ResumeSidebar />
      </div>
    </div>
  );
}

// Main Component
export default function ResumePage() {
  return (
    <ResumeLayout>
      <ResumeHeader personalInfo={data.personalInfo} />
      <SkillsSection skills={data.skills} />
      {/* {data.workExperience.length > 0 && (
        <ExperienceSection workExperience={data.workExperience} />
      )} */}
      {ProjectData.length > 0 && <ProjectSection projects={ProjectData} />}
      {data.certification.length > 0 && (
        <CertificationsSection certifications={data.certification} />
      )}
      {data.education.length > 0 && (
        <EducationSection education={data.education} />
      )}
    </ResumeLayout>
  );
}
