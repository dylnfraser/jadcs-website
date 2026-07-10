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
      <p className="sectionEyebrow">What We Do</p>
      <h2>Programs that turn access into opportunity</h2>
      <p className="sectionIntro">
        JADCS connects students with practical STEM learning, mentorship, and the technology needed to keep building
        outside the classroom.
      </p>

      <div className="programCards">
        {programs.map((program) => (
          <article className="programCard" key={program.title}>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProgramsSection;
