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
        Real help shouldn’t come with barriers. We provide hands-on STEM instruction and assistive technology access for
        children and communities that need it most, making support practical, accessible, and free.
      </p>
    </section>
  );
}

export default WelcomeSection;
