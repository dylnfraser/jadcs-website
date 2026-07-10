import "./Navbar.css";
import React from "react";
import bookmark from "../../assets/icon/bookmark.svg";
import contact from "../../assets/icon/contact.svg";
import link from "../../assets/icon/link.svg";
import star from "../../assets/icon/star.svg";

const Navbar: React.FC = () => {
  const redirect = (): void => {
    window.location.href = "https://givebutter.com/laptops-for-stem-students-y64rsa";
  };

  return (
    <div>
      <nav className="navbar navbar-left">
        <button>
          <img src={star} /> Events
        </button>
        <button>
          <img src={bookmark} /> Our Mission
        </button>
        <button>
          <img src={contact} /> Contact Us
        </button>
      </nav>

      <nav className="navbar navbar-right">
        <button onClick={redirect}>
          <img src={link} /> Donate
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
