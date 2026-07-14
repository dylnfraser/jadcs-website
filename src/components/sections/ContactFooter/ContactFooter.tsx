import "./ContactFooter.css";

const contactEmail = "jadcsfund@gmail.com";
const donationUrl = "https://givebutter.com/laptops-for-stem-students-y64rsa";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/jadcsfund" },
  { label: "LinkedIn", href: "https://linkedin.com/company/jadcs" },
  // { label: "Facebook", href: "https://facebook.com/jadcs.org" },
];

function ContactFooter() {
  return (
    <footer className="contactFooter" id="contact">
      <div className="contactFooterMain">
        <div>
          <p className="sectionEyebrow">Contact</p>
          <h2>Let’s expand STEM access, together.</h2>
          <p>
            Have a laptop to donate, want to volunteer, or want to bring JADCS to your school? Contact us at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>

        <div className="footerLinks">
          <br />
          <br />
          <a href={donationUrl} target="_blank" rel="noreferrer">
            Donate
          </a>
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footerBottom">
        <p>
          JADCS helps close the STEM opportunity gap through computer science instruction, mentorship, and technology
          donations.
        </p>
        <p>© {new Date().getFullYear()} JADCS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default ContactFooter;
