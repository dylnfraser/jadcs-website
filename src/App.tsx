import type { ReactElement } from "react";
import { useRef } from "react";
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
