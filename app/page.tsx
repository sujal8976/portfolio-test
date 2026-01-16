import {
  About,
  // Experience,
  Footer,
  FooterMarquee,
  Header,
  Hero,
  Project,
  Skills,
  Socials,
} from "@/components/sections";
import { GridLines } from "@/components/ui/grid-utils";
import { PreLoader } from "@/components/ui/preloader";
import SmoothScrolling from "@/components/ui/smoothScrolling";

export default function Main() {
  return (
    <>
      <PreLoader />
      <SmoothScrolling>
        <Header />
        <main className="w-full container-main relative">
          <GridLines />
          <Hero />
          <About />
          <Project />
          <Skills />
          {/* <Experience /> */}
          <Socials />
        </main>
        <FooterMarquee />
        <Footer />
      </SmoothScrolling>
    </>
  );
}
