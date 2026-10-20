import type { ReactElement } from "react";

const backgroundGradient: React.CSSProperties = {
  position: "fixed",
  zIndex: -1,

  left: "-25vw",
  top: 0,

  width: "150vw",
  height: "250vh",

  background: "radial-gradient(var(--prim-color2), var(--prim-color3) 45%, var(--paper) 75%)",

  opacity: 0.55,
};

function Background(): ReactElement {
  return (
    <div id="bgContainer" aria-hidden="true">
      <div className="backgroundGradient" style={backgroundGradient} />
    </div>
  );
}

export default Background;
