import "./Navbar.css";
import React, { useEffect, useRef } from "react";

const donationUrl = "https://givebutter.com/laptops-for-stem-students-y64rsa";

const Navbar: React.FC = () => {
  const barRef = useRef<HTMLElement>(null);

  // the bar sits clear over the hero and picks up a paper backing once the page scrolls under it
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => bar.classList.toggle("isScrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="navbar" ref={barRef}>
      <a className="navbarMark" href="#top" aria-label="JADCS, back to top">
        JADCS
      </a>

      <nav className="navbarLinks" aria-label="Main navigation">
        <a href="#mission">Mission</a>
        <a href="#programs">Programs</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="pillButton pillButton-solid navbarDonate" href={donationUrl} target="_blank" rel="noreferrer">
        Donate
      </a>
    </header>
  );
};

export default Navbar;
