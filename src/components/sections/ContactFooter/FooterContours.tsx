import type { CSSProperties, ReactElement } from "react";
import { useEffect, useRef } from "react";
import contours from "../../../assets/contours.svg?raw";

// the rings drawn in contours.svg, each with the peak it's centred on
const rings = [...contours.matchAll(/transform-origin:(\d+)px (\d+)px[^"]*" d="([^"]+)"/g)].map(([, x, y, d]) => ({
  peak: `${x},${y}`,
  d,
}));
const peaks = [...new Set(rings.map((ring) => ring.peak))];

// each hill's rings are split into three bands (inner, middle, outer). every band is its own layer that the graphics
// card can scale without redrawing, so the terrain still ripples outward but the footer isn't repainted every frame
// (animating each ring separately did that, and made the page choppy around the footer)
const BANDS = 3;
const bands = peaks.flatMap((peak, hill) => {
  const ofHill = rings.filter((ring) => ring.peak === peak);
  const [cx, cy] = peak.split(",").map(Number);
  return Array.from({ length: BANDS }, (_, band) => ({
    key: `${hill}-${band}`,
    hill,
    band,
    cx,
    cy,
    paths: ofHill.filter((_, index) => Math.floor((index * BANDS) / ofHill.length) === band).map((ring) => ring.d),
  }));
});

const VIEW_W = 1200;
const VIEW_H = 520;

function FooterContours(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  // the bands scale about their hill's peak. the drawing is cropped to cover the footer (like background-size:
  // cover), so the peak's position on screen is worked out from the footer's size and kept up to date
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const place = () => {
      const { width, height } = box.getBoundingClientRect();
      const scale = Math.max(width / VIEW_W, height / VIEW_H);
      const offsetX = (width - VIEW_W * scale) / 2;
      const offsetY = (height - VIEW_H * scale) / 2;
      box.querySelectorAll<SVGSVGElement>(".contourBand").forEach((svg) => {
        const cx = Number(svg.dataset.cx);
        const cy = Number(svg.dataset.cy);
        svg.style.transformOrigin = `${offsetX + cx * scale}px ${offsetY + cy * scale}px`;
      });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="footerContours" ref={ref} aria-hidden="true">
      {bands.map(({ key, band, cx, cy, paths }) => (
        <svg
          className="contourBand"
          key={key}
          data-cx={cx}
          data-cy={cy}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          style={{ "--band": band } as CSSProperties}
        >
          {paths.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </svg>
      ))}
    </div>
  );
}

export default FooterContours;
