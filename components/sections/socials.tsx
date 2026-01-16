import portfolioData from "@/lib/config/portfolio-data";
import { SocialLink, SocialPlatform } from "@/lib/config/portfolio-types";
import { cn } from "@/lib/utils";
import {
  Discord,
  GitHub,
  Instagram,
  LinkedIn,
  Reddit,
  Telegram,
  X,
  YouTube,
  
} from "@/public/svg/socials"; // adjust the import path as needed
import Link from "next/link";
import { GridSeperator } from "../ui/grid-utils";
import { TypeHead } from "../ui/typehead";

export default function Socials() {
  return (
    <>
      {portfolioData.socialLinks.length > 0 && (
        <div id="socials" className="py-16">
          {/* <div className="flex justify-center"> */}
            <TypeHead index="004" content="SOCIALS" mainClassName="mx-spacer" />
          {/* </div> */}
          <GridSeperator />
          {/* Original list design */}
          <ul className="relative font-monorama text-center lg:text-lg xl:text-xl">
            {portfolioData.socialLinks.map((platform) => (
              <SocialItem key={platform.platform} data={platform} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

const iconClassName =
  "text-accent stroke-[1.5] h-6 w-6 transition-colors duration-200";

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
      return <X {...commonProps} />;
    case SocialPlatform.TELEGRAM:
      return <Telegram {...commonProps} />;
    case SocialPlatform.DISCORD:
      return <Discord className={cn("mt-0.5", commonProps.className)} />;
    case SocialPlatform.INSTAGRAM:
      return <Instagram {...commonProps} />;
    case SocialPlatform.REDDIT:
      return <Reddit {...commonProps} />;
    case SocialPlatform.YOUTUBE:
      return <YouTube {...commonProps} />;
  }
};

// Marquee item component
const MarqueeItem = ({ data }: { data: SocialLink }) => {
  return (
    <div className="flex gap-4 px-2 whitespace-nowrap">
      <span>@{data.username}</span>
      {getSocialIcon(data.platform)}
      <span>{data.platform}</span>
      {getSocialIcon(data.platform)}
    </div>
  );
};

const SocialItem = ({ data }: { data: SocialLink }) => {
  return (
    <li id={data.platform} className="relative z-ui  2xl:full-bleed">
      <Link
        href={data.url}
        target="_blank"
        className="group relative overflow-hidden block text-muted"
      >
        <p className="my-8 overflow-hidden">
          <span className="inline-block transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">
            {data.platform}
          </span>
        </p>
        <div className="absolute top-full left-0 w-full bg-neutral-800 transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full overflow-hidden">
          <div className="flex animate-marquee py-8">
            {/* First set of items */}
            {Array.from({ length: 10 }, (_, index) => (
              <MarqueeItem key={`${data.platform}-${index}`} data={data} />
            ))}
            {/* Duplicate set for seamless loop */}
            {Array.from({ length: 10 }, (_, index) => (
              <MarqueeItem
                key={`${data.platform}-duplicate-${index}`}
                data={data}
              />
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
};
