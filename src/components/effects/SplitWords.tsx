import type { CSSProperties, ReactElement } from "react";

// time to "write" one character when a heading is handwritten in (see .handwritten in index.css)
const MS_PER_CHAR = 55;
// a short lift of the pen between words
const MS_BETWEEN_WORDS = 90;

// wraps each word so a heading can rise in word by word, or be written in by hand word after word (the reveal is
// triggered from App.tsx). for handwriting, each word gets a start time and a duration from its length, so longer
// words take longer to write and the next one starts once the pen has finished.
function SplitWords({ text, startDelay = 0 }: { text: string; startDelay?: number }): ReactElement {
  const words = text.split(" ");
  // each word starts once every word before it has been written, plus a pen-lift between them
  const starts = words.map(
    (_, index) =>
      startDelay +
      words.slice(0, index).reduce((total, previous) => total + previous.length * MS_PER_CHAR + MS_BETWEEN_WORDS, 0),
  );

  return (
    <>
      {words.map((word, index) => {
        const style = {
          "--w": index,
          "--write-start": `${starts[index]}ms`,
          "--write-duration": `${word.length * MS_PER_CHAR}ms`,
        };
        return (
          <span key={index}>
            <span className="word" style={style as CSSProperties}>
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}

export default SplitWords;
