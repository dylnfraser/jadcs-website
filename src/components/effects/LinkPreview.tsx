import type { CSSProperties, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import "./LinkPreview.css";

// what each outside link leads to. browsers can't fetch other sites' previews, so the details live here: update
// them if a link or its page changes.
type Preview = { site: string; title: string; description: string; action: string };

const previews: { match: (href: string) => boolean; preview: Preview }[] = [
  {
    match: (href) => href.includes("givebutter.com/laptops-for-stem-students"),
    preview: {
      site: "givebutter.com",
      title: "Laptops for STEM Students",
      description: "JADCS's fundraiser on Givebutter, working toward a $1,000 goal for student laptops.",
      action: "opens the donation page",
    },
  },
  {
    match: (href) => href.includes("instagram.com/jadcsfund"),
    preview: {
      site: "instagram.com",
      title: "@jadcsfund",
      description: "Follow JADCS on Instagram.",
      action: "opens Instagram",
    },
  },
  {
    match: (href) => href.includes("linkedin.com/company/jadcs"),
    preview: {
      site: "linkedin.com",
      title: "JADCS on LinkedIn",
      description: "The JADCS organization page.",
      action: "opens LinkedIn",
    },
  },
  {
    match: (href) => href.startsWith("mailto:"),
    preview: {
      site: "email",
      title: "jadcsfund@gmail.com",
      description: "Write to the JADCS team about donating, volunteering or a school visit.",
      action: "opens your email app",
    },
  },
];

const SHOW_DELAY = 320;
const CARD_WIDTH = 280;
const GAP = 14;

type Shown = { preview: Preview; left: number; top: number; below: boolean };

// a small paper card that previews where an outside link goes, shown after a short hover (or on keyboard focus)
function LinkPreview(): ReactElement | null {
  const [shown, setShown] = useState<Shown | null>(null);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let showTimer = 0;
    let hideTimer = 0;
    let current: HTMLAnchorElement | null = null;

    const previewFor = (link: HTMLAnchorElement) => previews.find(({ match }) => match(link.href))?.preview;

    const place = (link: HTMLAnchorElement, preview: Preview) => {
      const rect = link.getBoundingClientRect();
      const height = cardRef.current?.offsetHeight || 150;
      const below = rect.top < height + GAP + 80; // not enough room above (under the navbar): open downward
      const left = Math.min(
        Math.max(rect.left + rect.width / 2 - CARD_WIDTH / 2, 12),
        window.innerWidth - CARD_WIDTH - 12,
      );
      const top = below ? rect.bottom + GAP : rect.top - GAP - height;
      setShown({ preview, left, top, below });
    };

    const open = (link: HTMLAnchorElement) => {
      const preview = previewFor(link);
      if (!preview) return;
      window.clearTimeout(hideTimer);
      window.clearTimeout(showTimer);
      current = link;
      showTimer = window.setTimeout(() => {
        place(link, preview);
        // measure once rendered, then place again with the real height before fading in
        requestAnimationFrame(() => {
          if (current !== link) return;
          place(link, preview);
          setVisible(true);
        });
      }, SHOW_DELAY);
    };

    const close = () => {
      window.clearTimeout(showTimer);
      current = null;
      setVisible(false);
      hideTimer = window.setTimeout(() => setShown(null), 200);
    };

    const onOver = (event: PointerEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (link && link !== current) open(link);
    };
    const onOut = (event: PointerEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (link && link === current && !link.contains(event.relatedTarget as Node)) close();
    };
    const onFocus = (event: FocusEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (link?.matches(":focus-visible")) open(link);
    };
    const onBlur = () => current && close();

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    window.addEventListener("scroll", onBlur, { passive: true });
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
      window.removeEventListener("scroll", onBlur);
    };
  }, []);

  if (!shown) return null;
  const { preview, left, top, below } = shown;

  return (
    <div
      ref={cardRef}
      className={`linkPreview${visible ? " isVisible" : ""}${below ? " isBelow" : ""}`}
      style={{ left, top, width: CARD_WIDTH } as CSSProperties}
      aria-hidden="true"
    >
      <span className="linkPreviewTape" />
      <p className="linkPreviewSite">{preview.site}</p>
      <p className="linkPreviewTitle">{preview.title}</p>
      <p className="linkPreviewText">{preview.description}</p>
      <p className="linkPreviewAction">{preview.action} ↗</p>
    </div>
  );
}

export default LinkPreview;
