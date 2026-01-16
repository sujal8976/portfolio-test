// "use client";
// import portfolioData from "@/lib/config/portfolio-data";
// import { WorkExperience } from "@/lib/config/portfolio-types";
// import { isEqual } from "lodash";
// import Link from "next/link";
// import { useState } from "react";
// import { MatrixButton } from "../ui/button";
// import { DateDisplay } from "../ui/date-display";
// import { GridSeperator, GridWrapper } from "../ui/grid-utils";
// import { TypeHead } from "../ui/typehead";

// export default function Experience() {
//   const { workExperience } = portfolioData;
//   const [selectedWork, setSelectedWork] = useState<WorkExperience | null>(
//     workExperience[0] || null,
//   );

//   const handleSetWork = (data: WorkExperience) => {
//     if (!isEqual(data, selectedWork)) {
//       setSelectedWork(data);
//     }
//   };
//   return (
//     <>
//       {workExperience.length > 0 && (
//         <div id="experience" className="py-16 relative z-ui">
//           <TypeHead
//             index="003"
//             content="EXPERIENCE"
//             mainClassName="mx-spacer"
//           />
//           <GridSeperator />
//           <GridWrapper className="!px-0 gap-y-8 xl:!px-spacer">
//             <div className="col-span-full xl:col-span-2">
//               <ul>
//                 {workExperience.map((work, index) => (
//                   <ExperienceItem
//                     key={index}
//                     setWork={handleSetWork}
//                     data={work}
//                   />
//                 ))}
//               </ul>
//               <div className="mt-16 max-xl:px-spacer">
//                 <Link href="/resume" target="_blank">
//                   <MatrixButton
//                     content="DOWNLOAD RESUME"
//                     className="md:w-1/2 lg:w-1/3 xl:w-1/2"
//                   />
//                 </Link>
//               </div>
//             </div>
//             {selectedWork && <ExperienceContents data={selectedWork} />}
//           </GridWrapper>
//         </div>
//       )}
//     </>
//   );
// }

// const ExperienceItem = ({
//   data,
//   setWork,
// }: {
//   data: WorkExperience;
//   setWork: (data: WorkExperience) => void;
// }) => {
//   return (
//     <li
//       onClick={() => setWork(data)}
//       className="group rounded-md hover:bg-accent hover:text-background hover:select-none"
//     >
//       <div className="px-spacer rounded-md xl:hover:bg-accent">
//         <div className="py-4 lg:py-6 max-xl:px-spacer">
//           <p className="md:text-lg mb-1">{data.company}</p>
//           <p className="text-sm text-muted group-hover:text-neutral-600 mb-2">
//             {data.position}
//           </p>
//           <DateDisplay
//             className="group-hover:before:!bg-background"
//             date={{ from: data.startDate, to: data.endDate }}
//             showCounter
//           />
//         </div>
//       </div>
//     </li>
//   );
// };

// const ExperienceContents = ({ data }: { data: WorkExperience }) => {
//   return (
//     <div className="col-span-full xl:col-span-2">
//       <div className="max-xl:px-spacer">
//         <h3 className="p-spacer font-monument text-lg lg:text-2xl uppercase">
//           {data.company}
//         </h3>
//         <div className="px-spacer text-muted">
//           <div className="text-[#e5e5e5] max-w-[70ch] [&amp;_.anchor-link]:hidden">
//             <p>{data.description}</p>
//             {data.achievements.length > 0 && (
//               <ul className="list-disc marker:text-[#525252] p-6 space-y-6">
//                 {data.achievements.map((achievement, i) => (
//                   <li key={i}>{achievement}</li>
//                 ))}
//               </ul>
//             )}
//             {data.technologies.length > 0 && (
//               <p>
//                 <strong className="text-foreground">Technologies used</strong>
//                 {": "}
//                 {data.technologies.map((tech, index) => (
//                   <span key={index}>
//                     <span className="text-accent font-semibold">{tech}</span>
//                     {index < data.technologies.length - 2 && ", "}
//                     {index === data.technologies.length - 2 && " and "}
//                   </span>
//                 ))}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
