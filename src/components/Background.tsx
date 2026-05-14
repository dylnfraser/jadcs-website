import type { ReactElement } from "react";

const backgroundGrid: React.CSSProperties = {
  position: "fixed",
  zIndex: -1,

  left: 0,
  top: 0,

  width: "100vw",
  height: "200vh", // double height for smooth parallax

  backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.35) 1px, transparent 1px)",
  backgroundSize: "20px 20px",

  // fade at edges
  maskImage: "radial-gradient(ellipse 50% 45% at 50% 50%, black 75%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 50% 45% at 50% 50%, black 75%, transparent 100%)",

  // slow parallax scroll loop
  animation: "parallax-scroll 1.5s linear infinite",
};

const backgroundGradient: React.CSSProperties = {
  position: "fixed",
  zIndex: -1,

  left: "-25vw",
  top: 0,

  width: "150vw",
  height: "250vh",

  background: "radial-gradient(var(--prim-color), white)",

  opacity: 0.25,
};

function Background(): ReactElement {
  return (
    <>
      <div id="bgContainer">
        <div style={backgroundGrid}></div>
        <div style={backgroundGradient}></div>
      </div>
    </>
  );
}

export default Background;
