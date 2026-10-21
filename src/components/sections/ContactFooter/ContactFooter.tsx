import type { CSSProperties } from "react";
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
        <h2>Let’s expand STEM access, together.</h2>
        <p>
          Have a laptop to donate, want to volunteer, or want to bring JADCS to your school? We’d love to hear from you.
        </p>
        <div className="footerActions">
          <a className="pillButton pillButton-cream" href={`mailto:${contactEmail}`}>
            Email us{" "}
            <span className="pillArrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="pillButton pillButton-outline" href={donationUrl} target="_blank" rel="noreferrer">
            Donate
          </a>
        </div>
      </div>

      <div className="footerColumns">
        <div>
          <p className="footerLabel">Write to us</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <div>
          <p className="footerLabel">Follow along</p>
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="footerUp">
          <p className="footerLabel">© {new Date().getFullYear()} JADCS</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      {/* the name set huge and cropped by the bottom of the page, like a signature at the foot of a letter */}
      <p className="footerWordmark" aria-hidden="true">
        {"JADCS".split("").map((letter, index) => (
          <span key={index} style={{ "--l": index } as CSSProperties}>
            {letter}
          </span>
        ))}
      </p>
    </footer>
  );
}

export default ContactFooter;
