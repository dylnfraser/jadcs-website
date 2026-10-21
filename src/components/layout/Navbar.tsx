import "./Navbar.css";
import React from "react";

const donationUrl = "https://givebutter.com/laptops-for-stem-students-y64rsa";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-layer">
      <nav className="navbar navbar-left" aria-label="Main navigation">
        <a href="#mission">Our mission</a>
        <a href="#programs">Programs</a>
        <a href="#contact">Contact</a>
      </nav>

      <nav className="navbar navbar-right" aria-label="Donation">
        <a href={donationUrl} target="_blank" rel="noreferrer">
          Donate
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
