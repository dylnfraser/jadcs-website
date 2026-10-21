import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/caveat";
import "./index.css";
import App from "./App.tsx";

// Safari works out scroll-driven animations on the main thread while it moves pinned (sticky) elements on its
// scrolling thread, and the two drift apart for a frame, making the pinned headings judder. there, the
// scroll-linked effects fall back to one-off reveals (see App.tsx and the `scroll-timelines-off` rules).
const isSafari = /^((?!chrome|chromium|crios|fxios|android).)*safari/i.test(navigator.userAgent);
if (isSafari) document.documentElement.classList.add("scroll-timelines-off");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
