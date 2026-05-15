import type { ReactElement } from "react";

const backgroundBlur: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  pointerEvents: "none",

  left: 0,
  top: 0,

  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(6px)",
  maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 7.5%)",
};

function ProgBlur(): ReactElement {
  return (
    <>
      <div style={backgroundBlur}></div>
    </>
  );
}

export default ProgBlur;
