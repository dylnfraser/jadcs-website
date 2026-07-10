import type { ReactElement } from "react";
import "./Background.css";

function Background(): ReactElement {
  return (
    <div className="backgroundContainer" aria-hidden="true">
      <div className="animatedBackgroundGrid"></div>
      <div className="backgroundGradient"></div>
    </div>
  );
}

export default Background;
