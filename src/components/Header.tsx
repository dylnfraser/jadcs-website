import type { ReactElement } from "react";

const gradientText: React.CSSProperties = {
  color: "transparent",
  background: "linear-gradient(12deg, var(--prim-color), var(--prim-color2))",
  WebkitBackgroundClip: "text",
  width: "100%",
  textAlign: "center",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "calc(2rem + 2vw)",
  fontWeight: 400,
  lineHeight: "calc(2.5rem + 1.75vw)",
  userSelect: "none",
  marginTop: "calc(7.5% + 5vh)",
};

const quote: React.CSSProperties = {
  color: "rgba(0, 0, 0, 1)",
  userSelect: "none",
  width: "60%",
  textAlign: "justify",
  marginLeft: "20%",
  marginTop: "-1.5rem",
  fontSize: "calc(0.8rem + 0.5vw)",
  fontWeight: 300,
  lineHeight: "1.5rem",
};

function Header(): ReactElement {
  const text = "Welcome to JADCS";

  return (
    <div>
      <h1 style={gradientText}>
        {text.split("").map((char) => (
          <span className="char">{char === " " ? "\u00A0" : char}</span>
        ))}
      </h1>

      <h2 style={quote}>
        We're a group of students aiming to provide interactive STEM instruction to children and
        narrow the digital divide by providing assistive technology access to those in need.
      </h2>
    </div>
  );
}

export default Header;
