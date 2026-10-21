import type { CSSProperties, ReactElement } from "react";
import "./HandNote.css";

// small arrows drawn by hand, each pointing from the note toward the thing it's about
const arrows = {
  up: { viewBox: "0 0 44 40", d: "M38 36 C 26 34, 12 26, 9 6 M3 13 C 6 10, 8 7, 9 5 C 11 8, 13 10, 16 12" },
  upRight: { viewBox: "0 0 48 40", d: "M4 34 C 14 34, 32 28, 40 8 M33 9 C 36 8, 38 6, 41 4 C 41 8, 42 11, 43 14" },
  down: { viewBox: "0 0 44 44", d: "M36 4 C 30 14, 22 26, 10 36 M8 28 C 8 31, 9 34, 9 37 C 12 37, 15 37, 18 36" },
} as const;

type HandNoteProps = {
  text: string;
  arrow: keyof typeof arrows;
  className?: string;
  // "load" writes the note shortly after the page opens; "view" waits until it scrolls into view (App.tsx adds .isIn)
  reveal?: "load" | "view";
  delay?: number;
};

// a short note in the margin, written in by hand with an arrow to what it's about
function HandNote({ text, arrow, className = "", reveal = "view", delay = 0 }: HandNoteProps): ReactElement {
  const shape = arrows[arrow];
  return (
    <span
      className={`handNote handNote-${arrow} handNote-${reveal} ${className}`}
      style={{ "--note-delay": `${delay}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox={shape.viewBox}>
        <path d={shape.d} pathLength="1" filter="url(#pencil)" />
      </svg>
      <span className="handNoteText">{text}</span>
    </span>
  );
}

export default HandNote;
