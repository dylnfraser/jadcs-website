import "./Navbar.css";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div id="heroContainer">
      <div id="hero">
        <h1> Here's where we're headed</h1>
        <div id="goals">
          <span>
            <pre>5</pre>
            <h4>Founding Members</h4>
          </span>
          <span>
            <pre>100</pre>
            <h4>Student Member Goal</h4>
          </span>
          <span>
            <pre>$1,000</pre>
            <h4>Initial Fundraising Goal</h4>
          </span>
        </div>

        {[...Array(5)].map(() => (
          <br />
        ))}

        <h1 style={{ textAlign: "right" }}> Our Mission </h1>
        <p style={{ textAlign: "right" }}>
          We exist to close the opportunity gap in STEM education by equipping curious, STEM-driven
          young minds with the knowledge, tools, and technology they need to thrive. Through
          hands-on CS instruction and direct donation of computers and resources to underfunded
          students, we believe that access — not circumstance — should determine who gets to shape
          the future of technology.
        </p>

        {[...Array(5)].map(() => (
          <br />
        ))}

        <h1> Where we're headed </h1>
        <p>
          <li>
            <b>Instagram content.</b> Informational posts about underfunded CS students, problem of
            the day, fact of the day, events coverage, and STEM current events. In-person events.
          </li>
          <br />

          <li>
            <b>Interactive CS workshops</b> at libraries, Boys & Girls Clubs, or YMCAs — teaching
            kids the basics of computer science and other STEM fields while raising money for the
            cause.
          </li>
          <br />
          <li>
            <b>Fundraising.</b> Online fundraising via Givebutter, Instagram campaigns, email
            outreach, and dedicated fundraising events.
          </li>
        </p>
      </div>
    </div>
  );
};

export default Hero;
