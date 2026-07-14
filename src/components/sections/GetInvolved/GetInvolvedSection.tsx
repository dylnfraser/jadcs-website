import "./GetInvolvedSection.css";

const contactEmail = "jadcsfund@gmail.com";

const involvementOptions = [
  {
    title: "Volunteer",
    description: "Help teach workshops, mentor students, repair devices, or support events.",
    linkLabel: "Email to volunteer",
    href: `mailto:${contactEmail}?subject=Volunteer with JADCS`,
  },
  {
    title: "Donate a laptop",
    description: "Contribute a used or new device that can be refurbished for a student in need.",
    linkLabel: "Offer a device",
    href: `mailto:${contactEmail}?subject=Laptop donation for JADCS`,
  },
  {
    title: "Partner with JADCS",
    description: "Bring programming, device donations, or mentorship to your school or community group.",
    linkLabel: "Start a partnership",
    href: `mailto:${contactEmail}?subject=Partner with JADCS`,
  },
  {
    title: "Join as a student member",
    description: "Learn with JADCS, attend workshops, and connect with other STEM-focused students.",
    linkLabel: "Ask about membership",
    href: `mailto:${contactEmail}?subject=Student membership with JADCS`,
  },
  {
    title: "Contact the team",
    description: "Have another idea, question, or resource to share? Reach out and we’ll follow up.",
    linkLabel: "Contact us",
    href: `mailto:${contactEmail}?subject=Contact JADCS`,
  },
];

function GetInvolvedSection() {
  return (
    <section className="siteSection getInvolvedSection" id="get-involved">
      <p className="sectionEyebrow">Get Involved</p>
      <h2>Choose the path that fits you</h2>
      <p className="sectionIntro">
        Whether you can donate time, technology, space, or expertise, there are multiple ways to help students access
        STEM opportunities.
      </p>

      <div className="involvementList">
        {involvementOptions.map((option) => (
          <article className="involvementOption" key={option.title}>
            <div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
            <a href={option.href}>{option.linkLabel}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GetInvolvedSection;
