import type { CSSProperties, ReactElement } from "react";
import "./Doodle.css";

// hand-drawn marks, each drawn as a single stroke so it can sketch itself in. the little sketches (laptop, plane,
// pencil) are deliberately a bit wonky, like something drawn in the margin of a notebook
const shapes = {
  laptop: {
    viewBox: "0 0 64 46",
    d: "M13 7 C 22 6, 40 5.5, 50 7 C 50.5 15, 50 24, 49 31 C 38 31.5, 24 31.5, 14 31 C 13 23, 12.5 14, 13 7 Z M5 33 C 22 32, 42 32, 59 33.5 C 58 36, 56 38.5, 53 39 C 38 40, 24 40, 10 39 C 7.5 38, 6 35.5, 5 33 Z M27 35.5 C 30 36, 34 36, 37 35.5",
  },
  plane: {
    viewBox: "0 0 70 46",
    d: "M4 22 C 22 15, 42 9, 62 4 C 55 16, 48 28, 42 40 C 38 34, 34 29, 30 25 C 22 24, 12 23, 4 22 Z M30 25 C 40 18, 52 10, 62 4 M30 25 C 31 29, 31.5 33, 31 37 L 36 31",
  },
  pencil: {
    viewBox: "0 0 70 26",
    d: "M6 19 C 20 15.5, 36 11.5, 52 7.5 L 60 6 C 62.5 7.5, 63.5 10, 63 12.5 L 55 14.5 C 40 18, 24 22, 9 25 C 7 23.5, 6 21.5, 6 19 Z M52 7.5 C 53.5 10, 54.5 12, 55 14.5 M9 25 L 3 24 L 6 19",
  },
  book: {
    viewBox: "0 0 64 40",
    d: "M32 10 C 24 5, 12 5, 4 8 C 4 17, 4 26, 4.5 34 C 12 31, 24 31, 32 36 C 40 31, 52 31, 59.5 34 C 60 26, 60 17, 60 8 C 52 5, 40 5, 32 10 Z M32 10 C 32 19, 32 28, 32 36",
  },
  bulb: {
    viewBox: "0 0 40 56",
    d: "M20 4 C 9 4, 3 13, 6 22 C 8 28, 13 31, 14 37 L 26 37 C 27 31, 32 28, 34 22 C 37 13, 31 4, 20 4 Z M15 42 C 18 43, 22 43, 25 42 M16.5 47 C 19 48, 21 48, 23.5 47 M20 37 C 20 33, 20 29, 20 26 C 19 23, 16 24, 16.5 26 C 17 28, 23 28, 23.5 26 C 24 24, 21 23, 20 26",
  },
  sprout: {
    viewBox: "0 0 50 56",
    d: "M25 54 C 25 44, 24 34, 25 26 M25 31 C 22 21, 12 15, 4 17 C 6 26, 16 31, 25 31 M25 26 C 28 15, 37 8, 46 9 C 45 19, 36 26, 25 26",
  },
  code: {
    viewBox: "0 0 60 36",
    d: "M18 6 C 12 12, 8 15, 4 18 C 8 21, 12 24, 18 30 M42 6 C 48 12, 52 15, 56 18 C 52 21, 48 24, 42 30 M34 4 C 31 14, 29 22, 26 32",
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
  laptop: -8,
  book: 8,
  bulb: -10,
  sprout: 6,
  code: -14,
  plane: 14,
  pencil: -12,
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
        <path d={shape.d} pathLength="1" filter="url(#pencil)" />
      </svg>
    </span>
  );
}

export default Doodle;
