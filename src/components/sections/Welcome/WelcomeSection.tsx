import type { ReactElement } from "react";
import "./WelcomeSection.css";

function WelcomeSection(): ReactElement {
  const text = "Welcome to JADCS";

  return (
    <section className="welcomeSection" aria-labelledby="welcome-title">
      <h1 className="welcomeTitle" id="welcome-title">
        {text.split("").map((char, index) => (
          <span className="char" key={`${char}-${index}`} style={{ animationDelay: `${index * 40}ms` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <p className="welcomeQuote">
        We're a group of students aiming to provide interactive STEM instruction to children and narrow the digital
        divide by providing assistive technology access to those in need.
      </p>
    </section>
  );
}

export default WelcomeSection;
