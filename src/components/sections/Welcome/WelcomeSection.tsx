import type { ReactElement } from "react";
import Doodle from "../../effects/Doodle";
import "./WelcomeSection.css";

const renderChars = (text: string, offset = 0) =>
  text.split("").map((char, index) => (
    <span className="char" key={`${char}-${index}`} style={{ animationDelay: `${(index + offset) * 34}ms` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

// little hand-drawn marks scattered around the title; depth sets how far each leans with the cursor
const doodles = [
  { name: "sparkle", depth: 14, tone: "clay" },
  { name: "burst", depth: 10, tone: "clay" },
  { name: "squiggle", depth: 6, tone: "moss" },
  { name: "ring", depth: 8, tone: "ink" },
] as const;

function WelcomeSection(): ReactElement {
  const lead = "Welcome to ";
  const name = "JADCS";

  return (
    <section className="welcomeSection" aria-labelledby="welcome-title">
      {doodles.map((doodle, index) => (
        <Doodle
          key={doodle.name}
          name={doodle.name}
          depth={doodle.depth}
          tone={doodle.tone}
          draw="load"
          className={`welcomeDoodle-${doodle.name}`}
          style={{ "--float-offset": `${index * -1.7}s` } as React.CSSProperties}
        />
      ))}

      <h1 className="welcomeTitle" id="welcome-title">
        {renderChars(lead)}
        <span className="welcomeName">
          {renderChars(name, lead.length)}
          <svg className="welcomeScribble" viewBox="0 0 240 20" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 15 C 58 6.5, 150 4, 236 8" pathLength="1" />
          </svg>
        </span>
      </h1>

      <p className="welcomeQuote">
        Real help shouldn’t come with barriers. We provide hands-on STEM instruction and assistive technology access for
        children and communities that need it most, making support practical, accessible, and free.
      </p>
    </section>
  );
}

export default WelcomeSection;
