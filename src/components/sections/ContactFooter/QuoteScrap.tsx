import type { ReactElement } from "react";
import "./QuoteScrap.css";

// a quote written on a scrap torn from a notebook and taped to the page.
// PLACEHOLDER: replace the quote and attribution with real words from a student or volunteer (with their
// permission) before publishing.
const quote = {
  text: "What I love about JADCS is that it gives both the kids and me a chance to learn.",
  name: "James Pecoraro",
  role: "Co-founder",
};

function QuoteScrap(): ReactElement {
  return (
    // the wrapper carries the tape, shadow and drop-in; the paper inside is clipped to its torn edge, which would
    // otherwise cut off both the tape and the shadow
    <div className="quoteScrap">
      <span className="quoteTape" aria-hidden="true" />
      <figure className="quotePaper">
        <blockquote>
          <p>“{quote.text}”</p>
        </blockquote>
        <figcaption>
          — {quote.name}, <span>{quote.role}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export default QuoteScrap;
