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
    missionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <title>JADCS | Expanding Access to STEM Education</title>
      <Background />
      <ProgressiveBlur></ProgressiveBlur>
      <Navbar />
      <WelcomeSection />
      <button id="learnMore" onClick={handleLearnMore}>
        Learn More
      </button>
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
