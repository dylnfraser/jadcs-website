import type { CSSProperties, ReactElement } from "react";
import "./Doodle.css";

// hand-drawn marks, each drawn as a single stroke so it can sketch itself in
const shapes = {
  sparkle: {
    viewBox: "0 0 40 40",
    d: "M20 2 C 21 14, 26 19, 38 20 C 26 21, 21 26, 20 38 C 19 26, 14 21, 2 20 C 14 19, 19 14, 20 2 Z",
  },
  burst: {
    viewBox: "0 0 40 40",
    d: "M20 4 V12 M20 28 V36 M4 20 H12 M28 20 H36 M8.7 8.7 L14 14 M26 26 L31.3 31.3 M31.3 8.7 L26 14 M14 26 L8.7 31.3",
  },
  squiggle: { viewBox: "0 0 80 16", d: "M2 8 Q 12 0 22 8 T 42 8 T 62 8 T 78 8" },
  ring: { viewBox: "0 0 50 50", d: "M40 12 C 30 2, 8 6, 6 24 C 4 42, 30 48, 42 36 C 50 27, 46 14, 34 10" },
  arrow: { viewBox: "0 0 64 40", d: "M4 34 C 14 12, 34 4, 56 12 M46 4 L57 12 L47 20" },
  spiral: {
    viewBox: "0 0 40 40",
    d: "M20 20 C 23 20, 24 23, 22 25 C 19 28, 13 26, 13 21 C 13 14, 22 11, 27 16 C 33 22, 29 32, 21 33",
  },
  loop: {
    viewBox: "0 0 90 30",
    d: "M2 22 C 14 22, 20 4, 30 6 C 40 8, 30 26, 22 18 C 16 10, 40 4, 52 14 C 60 22, 74 20, 88 10",
  },
} as const;

export type DoodleName = keyof typeof shapes;

// how far (in degrees) each shape turns as it scrolls through the screen; some just stay put
const defaultTurn: Record<DoodleName, number> = {
  sparkle: 24,
  burst: -18,
  squiggle: 0,
  ring: 0,
  arrow: 10,
  spiral: -30,
  loop: 0,
};

type DoodleProps = {
  name: DoodleName;
  // how many pixels it leans with the cursor at the edge of the screen
  depth?: number;
  tone?: "clay" | "moss" | "ink";
  // the hero sketches its doodles in on load; further down they draw as they scroll into view
  draw?: "load" | "scroll";
  turn?: number;
  className?: string;
  style?: CSSProperties;
};

function Doodle({
  name,
  depth = 8,
  tone = "clay",
  draw = "scroll",
  turn = defaultTurn[name],
  className = "",
  style,
}: DoodleProps): ReactElement {
  const shape = shapes[name];

  return (
    <span
      className={`doodle doodle-${tone} doodle-draw-${draw} ${className}`}
      style={{ "--depth": depth, "--turn": turn, ...style } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox={shape.viewBox}>
        <path d={shape.d} pathLength="1" />
      </svg>
    </span>
  );
}

export default Doodle;
