import portfolioData from "@/lib/config/portfolio-data";
import Link from "next/link";
import { MatrixButton } from "../ui/button";
import { GridWrapper } from "../ui/grid-utils";
import DynamicMarquee from "../ui/marquee";
import { TypeHead } from "../ui/typehead";

export default function Skills() {
  const hardcodedItems: string[] = [
    // "Pikachu",
    // "Did you catch any pokémon in here?",
    // "Team Rocket",
  ];

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const marqueeItems: string[] = shuffleArray([
    ...hardcodedItems,
    ...Object.values(portfolioData.skills).flatMap((skill) =>
      skill.map((item: string) => item)
    ),
  ]);

  return (
    <div id="skills" className=" py-[min(20%,20vh)] min-h-[40vh] relative">
      <TypeHead index="003" content="SKILLS" mainClassName="mx-spacer" />
      <div className="2xl:full-bleed">
        <div className="relative z-ui">
          {marqueeItems.length > 0 && (
            <div className="w-full overflow-hidden h-24 flex items-center">
              <DynamicMarquee
                marqueeItems={marqueeItems}
                downDirection="left"
                upDirection="right"
              />
            </div>
          )}
        </div>
        <div className="gradient-circle -translate-half absolute" />
      </div>
      <GridWrapper>
        <Link
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="-col-end-1 lg:-col-end-2 mt-8"
        >
          <MatrixButton content="SEE ALL MY SKILLS" />
        </Link>
      </GridWrapper>
    </div>
  );
}
