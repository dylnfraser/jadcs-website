import type { ReactElement } from "react";

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0.85'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.72'/%3E%3C/svg%3E\")";

const backgroundGrid: React.CSSProperties = {
  position: "fixed",
  zIndex: -1,

  left: 0,
  top: 0,

  width: "100vw",
  height: "200vh", // double height for smooth parallax

  backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
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

  backgroundImage: `${grainTexture}, radial-gradient(var(--prim-color), var(--prim-color), white)`,
  backgroundSize: "140px 140px, cover",
  backgroundBlendMode: "soft-light, normal",

  opacity: 0.3,
};

function Background(): ReactElement {
  return (
    <>
      <div id="bgContainer">
        <div className="animatedBackgroundGrid" style={backgroundGrid}></div>
        <div style={backgroundGradient}></div>
      </div>
    </>
  );
}

export default Background;
