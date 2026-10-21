import type { CSSProperties } from "react";
import Doodle from "../../effects/Doodle";
import SplitWords from "../../effects/SplitWords";
import InkStamp from "../../effects/InkStamp";
import "./ProgramsSection.css";

const programs = [
  {
    title: "Computer Science Workshops",
    description: "Hands-on lessons for students learning programming, robotics, and digital literacy.",
  },
  {
    title: "Laptop & Technology Donations",
    description: "Collect, refurbish, and distribute devices to students who need reliable technology access.",
  },
  {
    title: "Mentorship",
    description: "Pair students with volunteers who can support STEM learning and career exploration.",
  },
  {
    title: "School & Community Partnerships",
    description: "Work with schools, libraries, and nonprofits to reach students directly in their communities.",
  },
];

function ProgramsSection() {
  return (
    <section className="siteSection programsSection" id="programs">
      <Doodle name="book" tone="ink" depth={8} style={{ top: "12%", left: "calc(50% - 46vw)", width: 62 }} />
      <Doodle name="spiral" tone="clay" depth={11} style={{ top: "30%", right: "calc(50% - 44vw)", width: 50 }} />
      <Doodle name="code" tone="moss" depth={7} style={{ top: "60%", left: "calc(50% - 46vw)", width: 58 }} />
      <Doodle name="pencil" tone="clay" depth={13} style={{ top: "80%", right: "calc(50% - 46vw)", width: 66 }} />
      <div className="programsSpread">
        <header className="programsHeader">
          <h2 className="splitWords">
            <SplitWords text="Four ways we close the gap." />
          </h2>
          <p className="sectionIntro">
            JADCS connects students with practical STEM learning, mentorship, and the technology needed to keep building
            outside the classroom.
          </p>
          <InkStamp className="programsStamp" />
        </header>

        {/* each program is an index card: a stamped number and title above the red line, the detail on the rules
            below, clipped together and dealt out at slightly different angles */}
        <ol className="programList">
          {programs.map((program, index) => (
            <li
              className="programItem"
              key={program.title}
              style={{ "--tilt": `${[-1.4, 1.1, -0.7, 1.5][index]}deg` } as CSSProperties}
            >
              <svg className="paperClip" viewBox="0 0 22 56" aria-hidden="true">
                <path d="M8 40 V10 a5 5 0 0 1 10 0 V44 a8 8 0 0 1 -16 0 V15" />
              </svg>
              <div className="cardHead">
                <span className="programNumber" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{program.title}</h3>
              </div>
              <div className="cardBody">
                <p>{program.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProgramsSection;
