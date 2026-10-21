import type { CSSProperties, ReactElement } from "react";

// wraps each word so a heading can rise in word by word (the reveal is triggered from App.tsx)
function SplitWords({ text }: { text: string }): ReactElement {
  return (
    <>
      {text.split(" ").map((word, index, words) => (
        <span key={index}>
          <span className="word" style={{ "--w": index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export default SplitWords;
