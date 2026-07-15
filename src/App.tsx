import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import "./App.css";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import WelcomeSection from "./components/sections/Welcome/WelcomeSection";
import MissionSection from "./components/sections/Mission/MissionSection";
import ProgramsSection from "./components/sections/Programs/ProgramsSection";

import ContactFooter from "./components/sections/ContactFooter/ContactFooter";
import ProgressiveBlur from "./components/effects/ProgressiveBlur";
function App(): ReactElement {
  const missionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>(
      ".missionContent > h2, .missionContent > p, #missionGoals > span, " +
        ".programsSection > .sectionEyebrow, .programsSection > h2, " +
        ".programsSection > .sectionIntro, .programCard, .contactFooterRule, .contactFooterMain, .footerBottom",
    );

    elements.forEach((element, index) => {
      if (!element.classList.contains("contactFooterRule")) {
        element.classList.add("scrollReveal");
        element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("isVisible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleLearnMore = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    missionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <title>JADCS | Expanding Access to STEM Education</title>
      <Background />
      <ProgressiveBlur></ProgressiveBlur>
      <Navbar />
      <WelcomeSection />
      <div className="heroCtas" aria-label="Primary actions">
        <button id="learnMore" onClick={handleLearnMore}>
          Learn More
        </button>
      </div>
      <main className="pageSections" ref={missionRef}>
        <MissionSection />
        <ProgramsSection />
        {/*<GetInvolvedSection />*/}
        <ContactFooter />
      </main>
      {/*<ProgressiveBlur />*/}
    </>
  );
}

export default App;
