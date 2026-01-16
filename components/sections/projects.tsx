"use client";
import { useCarousel } from "@/hooks/use-carousel"; // Adjust path as needed
import portfolioData from "@/lib/config/portfolio-data";
import { Card as CardType } from "@/lib/config/portfolio-types";
import ProjectData from "@/lib/config/project-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../ui/card";
import { GridSeperator } from "../ui/grid-utils";
import { TypeHead } from "../ui/typehead";

export default function Project() {
  const controlBtnStyle = "bg-accent/80 hover:bg-accent text-secondary";
  // const controlBtnStyle = "bg-secondary/80 hover:bg-secondary text-accent";
  const github: CardType = {
    title: "Check out all projects",
    description: "See all my open source projects on my github profile.",
    projectUrl: "",
  };

  const { emblaRef, prevBtnDisabled, nextBtnDisabled, scrollPrev, scrollNext } =
    useCarousel({
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
        "(min-width: 1280px)": { slidesToScroll: 4 },
      },
    });

  return (
    <div id="projects" className="py-16">
      <TypeHead index="002" content="PROJECTS" mainClassName="mx-spacer" />
      <GridSeperator />
      <div className="relative z-ui">
        {/* Carousel Container */}
        <div
          className="overflow-hidden max-2xl:px-spacer 2xl:mx-spacer"
          ref={emblaRef}
        >
          <div className="flex">
            {ProjectData.map((project, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0  md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
              >
                <Card data={project} variant="light" />
              </div>
            ))}
            {portfolioData.includeGitHubInProjects && (
              <div className="flex-[0_0_100%] min-w-0  md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]">
                <Card data={github} variant="pattern" />
              </div>
            )}
          </div>
        </div>
        {/* Navigation Buttons */}
        <button
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10 shadow-lg rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
            controlBtnStyle,
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10 shadow-lg rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
            controlBtnStyle,
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
