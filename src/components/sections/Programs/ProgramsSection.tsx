import "./ProgramsSection.css";

const programs = [
  {
    label: "Learn",
    title: "Computer Science Workshops",
    description: "Hands-on lessons for students learning programming, robotics, and digital literacy.",
  },
  {
    label: "Equip",
    title: "Laptop & Technology Donations",
    description: "Collect, refurbish, and distribute devices to students who need reliable technology access.",
  },
  {
    label: "Guide",
    title: "Mentorship",
    description: "Pair students with volunteers who can support STEM learning and career exploration.",
  },
  {
    label: "Connect",
    title: "School & Community Partnerships",
    description: "Work with schools, libraries, and nonprofits to reach students directly in their communities.",
  },
];

function ProgramsSection() {
  return (
    <section className="siteSection programsSection" id="programs">
      <p className="sectionEyebrow">What We Do</p>
      <h2>Programs that turn access into opportunity</h2>

      <div className="programCards">
        {programs.map((program, index) => (
          <article className="programCard" key={program.title}>
            <div className="programCardMeta" aria-hidden="true">
              <span>{program.label}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <span className="programCardArrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <p className="sectionIntro">
        JADCS connects students with practical STEM learning, mentorship, and the technology needed to keep building
        outside the classroom.
      </p>
    </section>
  );
}

export default ProgramsSection;
