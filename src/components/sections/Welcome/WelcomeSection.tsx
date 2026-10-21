import type { ReactElement } from "react";
import "./WelcomeSection.css";

const renderChars = (text: string, offset = 0) =>
  text.split("").map((char, index) => (
    <span className="char" key={`${char}-${index}`} style={{ animationDelay: `${(index + offset) * 34}ms` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

function WelcomeSection(): ReactElement {
  const lead = "Welcome to ";
  const name = "JADCS";

  return (
    <section className="welcomeSection" aria-labelledby="welcome-title">
      {/* screen readers get the title as one phrase; the per-letter spans are only there for the animation */}
      <h1 className="welcomeTitle" id="welcome-title">
        <span className="srOnly">
          {lead}
          {name}
        </span>
        <span aria-hidden="true">
          {renderChars(lead)}
          <span className="welcomeName">
            {renderChars(name, lead.length)}
            <svg className="welcomeScribble" viewBox="0 0 240 20" preserveAspectRatio="none">
              <path d="M4 15 C 58 6.5, 150 4, 236 8" pathLength="1" />
            </svg>
          </span>
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
