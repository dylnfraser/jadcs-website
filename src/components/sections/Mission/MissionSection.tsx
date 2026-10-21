import React, { useEffect, useRef } from "react";
import Doodle from "../../effects/Doodle";
import SplitWords from "../../effects/SplitWords";
import "./MissionSection.css";

const goals = [
  { value: 5, prefix: "", label: "Founding members" },
  { value: 100, prefix: "", label: "Student members" },
  { value: 1000, prefix: "$", label: "Initial fundraising goal" },
];

const formatGoal = (value: number, prefix: string) => `${prefix}${Math.round(value).toLocaleString("en-US")}`;

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
      <Doodle name="sparkle" tone="moss" depth={9} style={{ top: "36%", right: "calc(50% - 44vw)", width: 34 }} />
      <Doodle name="loop" tone="ink" depth={6} style={{ top: "60%", left: "calc(50% - 45vw)", width: 84 }} />
      <Doodle name="burst" tone="clay" depth={10} style={{ top: "78%", right: "calc(50% - 46vw)", width: 40 }} />
      <div className="missionContent">
        <div className="missionSpread">
          <div className="missionIntro">
            <h2 className="missionHeading splitWords">
              <SplitWords text="Talent is everywhere. Access isn’t." />
            </h2>
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
          <dl id="missionGoals" ref={goalsRef}>
            {goals.map((goal) => (
              <div key={goal.label}>
                <dt>{goal.label}</dt>
                <dd>{formatGoal(goal.value, goal.prefix)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
