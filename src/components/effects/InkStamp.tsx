import type { ReactElement } from "react";
import "./InkStamp.css";

// a round rubber stamp, inked onto the page with the same rough ink as the goal figures. it thunks down when it
// scrolls into view (App.tsx adds .isIn); purely decorative, so it's hidden from screen readers
function InkStamp({ className = "" }: { className?: string }): ReactElement {
  return (
    <svg className={`inkStamp ${className}`} viewBox="0 0 160 160" aria-hidden="true">
      <defs>
        <path id="stampRing" d="M80 80 m -56 0 a 56 56 0 1 1 112 0 a 56 56 0 1 1 -112 0" />
      </defs>
      <circle cx="80" cy="80" r="74" className="inkStampLine" strokeWidth="3" />
      <circle cx="80" cy="80" r="66" className="inkStampLine" strokeWidth="1.2" />
      <circle cx="80" cy="80" r="40" className="inkStampLine" strokeWidth="1.2" />
      <text className="inkStampRing">
        {/* spread to run once round the ring exactly (2π × 56 ≈ 350) */}
        <textPath href="#stampRing" startOffset="0" textLength="348" lengthAdjust="spacing">
          JADCS · STEM FOR EVERY STUDENT · FREE ·
        </textPath>
      </text>
      {/* a small laptop in the middle of the stamp */}
      <path className="inkStampLine" strokeWidth="2.2" d="M64 70 h32 v18 h-32 z M58 92 h44 l-3 5 h-38 z" />
    </svg>
  );
}

export default InkStamp;
