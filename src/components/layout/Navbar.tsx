import "./Navbar.css";
import React from "react";
import bookmark from "../../assets/icon/bookmark.svg";
import contact from "../../assets/icon/contact.svg";
import link from "../../assets/icon/link.svg";
import star from "../../assets/icon/star.svg";

const donationUrl = "https://givebutter.com/laptops-for-stem-students-y64rsa";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-layer">
      <nav className="navbar navbar-left" aria-label="Main navigation">
        <a href="#mission">
          <img src={bookmark} alt="" /> Our Mission
        </a>
        <a href="#programs">
          <img src={star} alt="" /> Programs
        </a>
        <a href="#contact">
          <img src={contact} alt="" /> Contact Us
        </a>
      </nav>

      <nav className="navbar navbar-right" aria-label="Donation">
        <a href={donationUrl} target="_blank" rel="noreferrer">
          <img src={link} alt="" /> Donate
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
