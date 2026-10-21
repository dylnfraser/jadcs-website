import contours from "../../../assets/contours.svg?raw";
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
    // the highlighter's multiply ink would muddy the dark band, so the footer keeps native selection
    <footer className="contactFooter" id="contact" data-highlight-exclude>
      {/* inlined rather than a background image so the rings can be animated from css in every browser */}
      <div className="footerContours" aria-hidden="true" dangerouslySetInnerHTML={{ __html: contours }} />
      <div className="contactFooterMain">
        <div>
          <h2>Let’s expand STEM access, together.</h2>
          <p>
            Have a laptop to donate, want to volunteer, or want to bring JADCS to your school? Contact us at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>

        <div className="footerLinks">
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
        <p>© {new Date().getFullYear()} JADCS</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}

export default ContactFooter;
