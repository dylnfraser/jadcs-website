import React, { useEffect, useRef } from "react";
import Doodle from "../../effects/Doodle";
import SplitWords from "../../effects/SplitWords";
import HandNote from "../../effects/HandNote";
import "./MissionSection.css";

const goals = [
  { value: 5, prefix: "", label: "Founding members" },
  { value: 100, prefix: "", label: "Student members" },
  { value: 1000, prefix: "$", label: "Initial fundraising goal" },
];

const formatGoal = (value: number, prefix: string) => `${prefix}${Math.round(value).toLocaleString("en-US")}`;

// press a stamped figure to stamp it again: a rubber stamp drops in over it, presses down, and lifts away, and
// the figure is re-inked at the moment of contact, at a new slight angle and taking the ink a little differently
const CONTACT_MS = 300;
let pressCount = 0;
const restamp = (event: React.MouseEvent<HTMLElement>) => {
  const figure = event.currentTarget;
  const tool = figure.parentElement?.querySelector<HTMLElement>(".stampTool");
  if (tool) {
    // the rubber face is sized to cover the figure, and its bottom comes down onto the figure's face
    tool.style.width = `${Math.max(80, figure.offsetWidth + 16)}px`;
    tool.style.left = `${figure.offsetLeft + figure.offsetWidth / 2}px`;
    tool.style.top = `${figure.offsetTop + figure.offsetHeight}px`;
    // restart the press even if the last one is still playing
    tool.classList.remove("isStamping");
    void tool.offsetWidth;
    tool.classList.add("isStamping");
  }
  window.setTimeout(() => {
    pressCount += 1;
    figure.dataset.press = pressCount % 2 ? "a" : "b";
    figure.style.setProperty("--stamp-tilt", `${(Math.random() * 7 - 3.5).toFixed(1)}deg`);
    figure.style.filter = `url(#${["ink", "ink-2", "ink-3"][pressCount % 3]})`;
  }, CONTACT_MS);
};

const MissionSection: React.FC = () => {
  const goalsRef = useRef<HTMLDListElement>(null);

  // count each goal up from zero the first time the row scrolls into view
  useEffect(() => {
    const list = goalsRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const numbers = [...list.querySelectorAll<HTMLElement>("dd")];
    numbers.forEach((dd, index) => (dd.textContent = formatGoal(0, goals[index].prefix)));

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          numbers.forEach((dd, index) => {
            dd.textContent = formatGoal(goals[index].value * eased, goals[index].prefix);
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(list);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="missionSection" id="mission">
      <Doodle name="arrow" tone="clay" depth={12} style={{ top: "15%", left: "calc(50% - 46vw)", width: 60 }} />
      <Doodle name="bulb" tone="moss" depth={9} style={{ top: "34%", right: "calc(50% - 45vw)", width: 38 }} />
      <Doodle name="sprout" tone="moss" depth={10} style={{ top: "76%", right: "calc(50% - 46vw)", width: 46 }} />
      <div className="missionContent">
        <div className="missionSpread">
          <div className="missionIntro">
            {/* the shadow is its own layer under the note, so it can sit behind it while the note folds in */}
            <span className="stickyShadow" aria-hidden="true" />
            <div className="stickyNote">
              <h2 className="missionHeading splitWords handwritten">
                {/* written in once the note has swung down into place */}
                <SplitWords text="Talent is ~rare~ everywhere. Access isn’t." startDelay={750} />
              </h2>
            </div>
          </div>
          <div className="missionText">
            <p>
              <strong>JADCS</strong> exists to close the opportunity gap in STEM education by equipping curious,
              STEM-driven young minds with the knowledge, tools, and technology they need to thrive.
            </p>
            <p>
              Too many students with the talent and drive to succeed in STEM are held back,{" "}
              <u>not by ability, but by access</u>. Under-resourced schools, outdated equipment, and a lack of exposure
              to computer science leave entire communities on the sidelines of the technology revolution.
            </p>
            <p>
              We’re working to change that. Through hands-on computer science instruction, mentorship, and the direct
              donation of computers and resources to underfunded students, JADCS meets young learners where they are and
              gives them what they need to build toward where they want to go.
            </p>
            <p>
              We believe that <u>access, not circumstance</u>, should determine who gets to shape the future of
              technology. Every student deserves the chance to learn, create, and lead.
            </p>
          </div>
        </div>

        <div className="missionGoalsBlock">
          <h3 className="sectionEyebrow missionGoalsTitle">Our goals for this year</h3>
          <HandNote text="help us get there!" arrow="down" delay={900} className="noteGoals" />
          <dl id="missionGoals" ref={goalsRef}>
            {goals.map((goal, index) => (
              <div
                key={goal.label}
                style={{ "--stamp": index, "--stamp-tilt": `${[-4, 2.5, -2][index]}deg` } as React.CSSProperties}
              >
                <dt>{goal.label}</dt>
                <dd onClick={restamp}>{formatGoal(goal.value, goal.prefix)}</dd>
                {/* the rubber stamp that comes down when a figure is clicked */}
                <span
                  className="stampTool"
                  aria-hidden="true"
                  onAnimationEnd={(event) => event.currentTarget.classList.remove("isStamping")}
                >
                  <span className="stampKnob" />
                  <span className="stampHandle" />
                  <span className="stampBlock" />
                  <span className="stampRubber" />
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
