import type { CSSProperties, ReactElement } from "react";
import FooterContours from "./FooterContours";
import QuoteScrap from "./QuoteScrap";
import "./ContactFooter.css";

const contactEmail = "jadcsfund@gmail.com";
const donationUrl = "https://givebutter.com/laptops-for-stem-students-y64rsa";

// single-colour line icons drawn in the link's own colour
const InstagramIcon = (): ReactElement => (
  <svg className="footerIcon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

const MailIcon = (): ReactElement => (
  <svg className="footerIcon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7.5 8 5.5 8-5.5" />
  </svg>
);

const ArrowUpIcon = (): ReactElement => (
  <svg className="footerIcon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

const LinkedInIcon = (): ReactElement => (
  <svg className="footerIcon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-6M11.5 13.2c0-1.6 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3.3" />
  </svg>
);

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/jadcsfund", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/jadcs", Icon: LinkedInIcon },
  // { label: "Facebook", href: "https://facebook.com/jadcs.org" },
];

function ContactFooter() {
  return (
    <>
      {/* the green band reads as a sheet laid over the page: it casts a soft shadow onto the paper above it */}
      <div className="footerFoldShadow" aria-hidden="true" />
      <footer className="contactFooter" id="contact">
        <FooterContours />
        {/* the statement on the left, a taped quote from someone involved on the right */}
        <div className="footerTop">
          <div className="contactFooterMain">
            <h2>Let’s expand STEM access, together.</h2>
            <p>
              Have a laptop to donate, want to volunteer, or want to bring JADCS to your school? We’d love to hear from
              you.
            </p>
            <div className="footerActions">
              <a className="pillButton pillButton-cream" href={`mailto:${contactEmail}`}>
                Email us
              </a>
              <a className="pillButton pillButton-outline" href={donationUrl} target="_blank" rel="noreferrer">
                Donate
              </a>
            </div>
          </div>
          <QuoteScrap />
        </div>

        <div className="footerColumns">
          <div>
            <p className="footerLabel">Write to us</p>
            <a href={`mailto:${contactEmail}`}>
              <MailIcon />
              <span className="linkText">{contactEmail}</span>
            </a>
          </div>
          <div>
            <p className="footerLabel">Follow along</p>
            {socialLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                <link.Icon />
                <span className="linkText">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="footerUp">
            <p className="footerLabel">© {new Date().getFullYear()} JADCS</p>
            <a href="#top">
              <span className="linkText">Back to top</span>
              <ArrowUpIcon />
            </a>
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
    </>
  );
}

export default ContactFooter;
