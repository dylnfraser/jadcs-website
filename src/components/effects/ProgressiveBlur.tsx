import type { ReactElement } from "react";

const backgroundBlur: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  pointerEvents: "none",

  left: 0,
  top: 0,

  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(5px)",
  maskImage: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 15%)",
};

function ProgressiveBlur(): ReactElement {
  return (
    <>
      <div style={backgroundBlur}></div>
    </>
  );
}

export default ProgressiveBlur;
