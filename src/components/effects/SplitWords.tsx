import type { CSSProperties, ReactElement } from "react";

// time to "write" one character when a heading is handwritten in (see .handwritten in index.css)
const MS_PER_CHAR = 55;
// a short lift of the pen between words
const MS_BETWEEN_WORDS = 90;
// a word wrapped in ~tildes~ is written, then crossed out before the pen moves on
const MS_TO_STRIKE = 380;
const MS_AFTER_STRIKE = 160;

const isStruck = (word: string) => word.length > 2 && word.startsWith("~") && word.endsWith("~");
const clean = (word: string) => (isStruck(word) ? word.slice(1, -1) : word);
const timeFor = (word: string) =>
  clean(word).length * MS_PER_CHAR + MS_BETWEEN_WORDS + (isStruck(word) ? MS_TO_STRIKE + MS_AFTER_STRIKE : 0);

// wraps each word so a heading can rise in word by word, or be written in by hand word after word (the reveal is
// triggered from App.tsx). for handwriting, each word gets a start time and a duration from its length, so longer
// words take longer to write and the next one starts once the pen has finished. a ~struck~ word is written and then
// scribbled out, like a correction; it's hidden from screen readers so the heading still reads as the final text.
function SplitWords({ text, startDelay = 0 }: { text: string; startDelay?: number }): ReactElement {
  const words = text.split(" ");
  const starts = words.map(
    (_, index) => startDelay + words.slice(0, index).reduce((total, previous) => total + timeFor(previous), 0),
  );

  return (
    <>
      {words.map((word, index) => {
        const duration = clean(word).length * MS_PER_CHAR;
        const style = {
          "--w": index,
          "--write-start": `${starts[index]}ms`,
          "--write-duration": `${duration}ms`,
          "--strike-start": `${starts[index] + duration + 60}ms`,
        };
        return (
          <span key={index} aria-hidden={isStruck(word) || undefined}>
            <span className={`word${isStruck(word) ? " struck" : ""}`} style={style as CSSProperties}>
              {clean(word)}
              {isStruck(word) && (
                <svg className="strike" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 13 C 20 9, 40 12, 58 8 S 88 7, 98 9 M6 10 C 30 13, 64 6, 95 12" pathLength="1" />
                </svg>
              )}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}

export default SplitWords;
