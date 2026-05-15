import "./Navbar.css";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div id="heroContainer">
      <div id="hero">
        <h2 style={{ textAlign: "center" }}> Our Mission </h2>
        <p style={{ textAlign: "left", width: "90%", marginLeft: "5%", fontSize: "1.5rem" }}>
          <strong>JADCS</strong> exists to close the opportunity gap in STEM education by equipping
          curious, STEM-driven young minds with the knowledge, tools, and technology they need to
          thrive.
          <br />
          <br />
          Too many students with the <i>talent</i> and <i>drive</i> to succeed in STEM are held
          back; <u>not by ability, but by access</u>. Under-resourced schools, outdated equipment,
          and a lack of exposure to computer science leave entire communities on the sidelines of
          the technology revolution.
          <br />
          <br />
          We’re working to change that. Through hands-on computer science instruction, mentorship,
          and the direct donation of computers and resources to underfunded students, JADCS meets
          young learners where they are and gives them what they need to build toward where they
          want to go.
          <br />
          <br />
          We believe that <u>access, not circumstance</u>, should determine who gets to shape the
          future of technology. Every student deserves the chance to learn, create, and lead.
          <br />
          <br />
          <br />
          <b>Our goals for this year:</b>
        </p>

        <div id="goals">
          <span>
            <pre>5</pre>
            <h4>Founding Members</h4>
          </span>
          <div id="sep"></div>
          <span>
            <pre>100</pre>
            <h4>Student Member Goal</h4>
          </span>
          <div id="sep"></div>
          <span>
            <pre>$1,000</pre>
            <h4>Initial Fundraising Goal</h4>
          </span>
        </div>

        {[...Array(10)].map(() => (
          <br />
        ))}

        <div id="vertSep"></div>
      </div>
    </div>
  );
};

export default Hero;
