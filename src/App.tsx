import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { highlightSelection } from "@highlighters/core";
import "./App.css";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import WelcomeSection from "./components/sections/Welcome/WelcomeSection";
import PhotoFan from "./components/sections/Welcome/PhotoFan";
import HandNote from "./components/effects/HandNote";
import LinkPreview from "./components/effects/LinkPreview";
import MissionSection from "./components/sections/Mission/MissionSection";
import ProgramsSection from "./components/sections/Programs/ProgramsSection";
import ContactFooter from "./components/sections/ContactFooter/ContactFooter";

function App(): ReactElement {
  const missionRef = useRef<HTMLElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const linked = [
      ...document.querySelectorAll<HTMLElement>(
        ".missionText > p, .missionGoalsTitle, #missionGoals > div, .programItem",
      ),
    ];
    // pinned headings can't follow a scroll-linked reveal: once they stick their position stops tracking
    // the scroll, so the animation stalls and jumps. they get a one-off timed reveal instead.
    // the footer holds the main actions, so it fades in once rather than drifting with the scroll, which made
    // its buttons slide and shrink while the footer arrived
    const timed = [
      ...document.querySelectorAll<HTMLElement>(".programsHeader > p, .contactFooterMain, .footerColumns"),
    ];

    // where supported, tie each reveal to scroll position so it eases in continuously as you scroll. that already
    // reveals things in page order, so the only stagger is for items sharing a row (like the three goals), which
    // cascade left to right. nothing can come in before the content above it.
    const scrollLinked =
      CSS.supports("animation-timeline: view()") &&
      !document.documentElement.classList.contains("scroll-timelines-off");
    if (scrollLinked) {
      const perRow = new Map<number, number>();
      linked.forEach((element) => {
        const row = Math.round((element.getBoundingClientRect().top + window.scrollY) / 8);
        const rank = perRow.get(row) ?? 0;
        perRow.set(row, rank + 1);
        element.classList.add("scrollLinked");
        element.style.setProperty("--reveal-offset", `${Math.min(rank, 3) * 6}%`);
      });
    }

    const elements = scrollLinked ? timed : [...timed, ...linked];
    elements.forEach((element) => element.classList.add("scrollReveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        // whatever comes into view together is revealed top to bottom, then left to right
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );

        arriving.forEach((entry, order) => {
          const element = entry.target as HTMLElement;
          const delay = Math.min(order, 5) * 80;
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          element.classList.add("isVisible");
          observer.unobserve(element);

          // hand the element back to its own hover transitions once the reveal settles
          window.setTimeout(() => element.classList.remove("scrollReveal", "isVisible"), delay + 1200);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // the ambient loops (hero washes, grid, wave, goals wash, footer contours) pause while their area is off-screen,
  // so the page isn't animating things nobody can see. the flag goes on the area itself rather than the root:
  // toggling a class on <html> restyles the whole page at once, which flashed as you scrolled across a boundary.
  useEffect(() => {
    // each area, plus anything outside it that is only visible behind it (the page wash shows only behind the hero)
    const areas: [string, string[]][] = [
      [".hero", [".backgroundGradient"]],
      [".missionGoalsBlock", []],
      [".contactFooter", []],
    ];
    const linked = new Map<Element, Element[]>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        [entry.target, ...(linked.get(entry.target) ?? [])].forEach((element) =>
          element.classList.toggle("isOffscreen", !entry.isIntersecting),
        );
      });
    });

    areas.forEach(([selector, alsoPause]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      linked.set(
        element,
        alsoPause.flatMap((other) => [...document.querySelectorAll(other)]),
      );
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // headings rise in word by word, the footer wordmark letter by letter, and the page doodles and mission
  // underlines sketch themselves in, once, as each comes into view
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".splitWords, .footerWordmark, .doodle-draw-scroll, .missionText u, .handNote-view, #missionGoals, .stickyNote, .quoteScrap, .inkStamp",
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("isIn"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // doodles that come into view together sketch themselves in one at a time, top to bottom
        let doodleOrder = 0;
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (target.classList.contains("doodle")) {
              target.style.setProperty("--draw-delay", `${doodleOrder++ * 380}ms`);
            }
            target.classList.add("isIn");
            observer.unobserve(target);
          });
      },
      { threshold: 0.35 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // light up the grid in a pool that trails the cursor, easing toward it rather than snapping. the same eased
  // pointer also drives a gentle parallax on the hero doodles.
  useEffect(() => {
    const grid = heroGridRef.current;
    if (!grid || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    const target = { x: 0, y: 0, glow: 0 };
    const current = { x: 0, y: 0, glow: 0 };
    const written = new Map<string, string>();
    let frame = 0;

    // only touch the dom when a value actually changes
    const write = (element: HTMLElement, name: string, value: string) => {
      const key = `${element === root ? "root" : "grid"}${name}`;
      if (written.get(key) === value) return;
      written.set(key, value);
      element.style.setProperty(name, value);
    };

    // the doodles' lean is written straight onto each doodle, rather than as a page-wide value: changing a value on
    // <html> on every frame of mouse movement made the browser restyle the whole page
    const doodles = [...document.querySelectorAll<HTMLElement>(".doodle")].map((element) => ({
      element,
      depth: parseFloat(element.style.getPropertyValue("--depth")) || 8,
    }));
    let leanX = "";
    let leanY = "";

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.glow += (target.glow - current.glow) * 0.08;

      // positions are tracked in viewport space and mapped into the grid, so the pool stays put while scrolling.
      // once the hero has scrolled away there's nothing to update.
      const rect = grid.getBoundingClientRect();
      if (rect.bottom > 0) {
        write(grid, "--grid-x", `${Math.round(current.x - rect.left)}px`);
        write(grid, "--grid-y", `${Math.round(current.y - rect.top)}px`);
        write(grid, "--grid-glow", current.glow.toFixed(2));
      }
      const px = ((current.x / window.innerWidth) * 2 - 1).toFixed(3);
      const py = ((current.y / window.innerHeight) * 2 - 1).toFixed(3);
      if (px !== leanX || py !== leanY) {
        leanX = px;
        leanY = py;
        for (const { element, depth } of doodles) {
          element.style.translate = `${(+px * depth * 0.35).toFixed(2)}px ${(+py * depth * 0.35).toFixed(2)}px`;
        }
      }

      const settled =
        Math.abs(target.x - current.x) < 0.5 &&
        Math.abs(target.y - current.y) < 0.5 &&
        Math.abs(target.glow - current.glow) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      // start the pool where the cursor first appears instead of sliding in from a corner
      if (current.glow < 0.01) {
        current.x = target.x;
        current.y = target.y;
      }
      target.glow = 1;
      wake();
    };

    const handleLeave = () => {
      target.glow = 0;
      wake();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    root.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", wake);
      root.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  // paint text selections as a soft highlighter stroke (touch devices keep the native selection)
  useEffect(() => {
    const handle = highlightSelection({
      // the same deep moss as the Donate buttons (--prim-color mixed 92% with black), laid on thinly
      color: "#445f3c",
      opacity: 0.3,
      // follow the selection character by character instead of jumping to whole words
      snap: "none",
      // looser, wobblier edges than the default ruler-straight band, like a hand-drawn stroke
      edge: { waviness: 2.6, frequency: 15, roughness: 0.4 },
      tip: { overshootJitter: 3, angleJitter: 4 },
    });

    // each line gets its own translucent band, taller than the line spacing, so on multi-line selections
    // neighbouring bands overlap and the ink doubles up into dark strips. trim each overlapping pair back
    // to the midpoint between them so the lines meet edge to edge instead.
    let overlayObserver: MutationObserver | null = null;

    const trimOverlaps = (overlay: Element) => {
      const bands = [...overlay.children]
        .filter((el): el is HTMLElement => el instanceof HTMLElement)
        .map((el) => ({
          el,
          left: parseFloat(el.style.left),
          top: parseFloat(el.style.top),
          width: parseFloat(el.style.width),
          height: parseFloat(el.style.height),
          clipTop: 0,
          clipBottom: 0,
        }))
        .filter((band) => [band.left, band.top, band.width, band.height].every(Number.isFinite))
        .sort((a, b) => a.top - b.top);

      bands.forEach((upper, i) => {
        bands.slice(i + 1).forEach((lower) => {
          const overlap = upper.top + upper.height - lower.top;
          const sameLine =
            lower.top + lower.height / 2 - (upper.top + upper.height / 2) < Math.min(upper.height, lower.height) * 0.3;
          const sideBySide = lower.left > upper.left + upper.width || upper.left > lower.left + lower.width;
          if (overlap <= 0 || sameLine || sideBySide) return;

          upper.clipBottom = Math.max(upper.clipBottom, overlap / 2);
          lower.clipTop = Math.max(lower.clipTop, overlap / 2);
        });
      });

      bands.forEach(({ el, clipTop, clipBottom }) => {
        // the generous side insets keep the stroke's overshoot and wavy ends untouched
        const clip = clipTop || clipBottom ? `inset(${clipTop}px -40px ${clipBottom}px -40px)` : "";
        if (el.style.clipPath !== clip) el.style.clipPath = clip;
      });
    };

    const watchOverlay = () => {
      const overlay = document.querySelector("[data-highlighters-overlay]");
      if (!overlay || overlayObserver) return;

      overlayObserver = new MutationObserver(() => trimOverlaps(overlay));
      overlayObserver.observe(overlay, {
        childList: true,
        attributes: true,
        attributeFilter: ["style"],
        subtree: true,
      });
      trimOverlaps(overlay);
    };

    // the overlay is created lazily on the first selection
    const bodyObserver = new MutationObserver(watchOverlay);
    bodyObserver.observe(document.body, { childList: true });
    watchOverlay();

    return () => {
      bodyObserver.disconnect();
      overlayObserver?.disconnect();
      handle.remove();
    };
  }, []);

  const handleLearnMore = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    missionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <Background />
      <Navbar />
      <LinkPreview />
      {/*
       * a pencil texture for the doodles: the stroke is nudged off its perfect line by low-level noise, then
       * eaten into by a finer noise so it looks like graphite dragged across paper
       */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <filter id="pencil" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="4" result="wobble" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="wobble"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="drawn"
          />
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="1" seed="9" result="tooth" />
          <feColorMatrix
            in="tooth"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.75"
            result="toothMask"
          />
          <feComposite in="drawn" in2="toothMask" operator="in" />
        </filter>
        {/* stamp ink: edges roughened and the ink broken up where the stamp didn't press evenly */}
        <filter id="ink" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="rough" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="rough"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="edges"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="11" result="blotch" />
          <feColorMatrix
            in="blotch"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.05"
            result="blotchMask"
          />
          <feComposite in="edges" in2="blotchMask" operator="in" />
        </filter>
        {/* the same ink with different noise, so a re-stamped figure takes the ink a little differently */}
        <filter id="ink-2" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="rough" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="rough"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="edges"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="17" result="blotch" />
          <feColorMatrix
            in="blotch"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.05"
            result="blotchMask"
          />
          <feComposite in="edges" in2="blotchMask" operator="in" />
        </filter>
        <filter id="ink-3" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="rough" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="rough"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="edges"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="23" result="blotch" />
          <feColorMatrix
            in="blotch"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.05"
            result="blotchMask"
          />
          <feComposite in="edges" in2="blotchMask" operator="in" />
        </filter>
      </svg>
      <div className="hero" id="top">
        <div className="heroBackdrop" aria-hidden="true">
          <span />
          <div className="gridLayer heroGrid" ref={heroGridRef} />
        </div>
        <div className="heroEdge" aria-hidden="true" />
        <div className="heroInner">
          <div className="heroCopy">
            <WelcomeSection />
            <div className="heroCtas" aria-label="Primary actions">
              <a
                className="pillButton pillButton-solid"
                href="https://givebutter.com/laptops-for-stem-students-y64rsa"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
              <button className="pillButton pillButton-ghost" onClick={handleLearnMore}>
                Read our mission
              </button>
              <HandNote
                text="helps buy laptops for students"
                arrow="up"
                reveal="load"
                delay={2300}
                className="noteDonate"
              />
            </div>
          </div>
          <PhotoFan />
        </div>
      </div>
      <main className="pageSections" ref={missionRef}>
        <MissionSection />
        <ProgramsSection />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
