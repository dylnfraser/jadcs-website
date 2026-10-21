import type { CSSProperties, KeyboardEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Doodle from "../../effects/Doodle";
import HandNote from "../../effects/HandNote";
import buildingTower from "../../../assets/photos/photo-3.jpg";
import circuitKits from "../../../assets/photos/photo-2.jpg";
import worksheets from "../../../assets/photos/photo-1.jpg";
import "./PhotoFan.css";

// photos for the hero fan (in src/assets/photos, with all camera metadata stripped). a card without `src` shows a
// tinted placeholder; `alt` describes the photo for screen readers.
type Photo = { src?: string; alt: string; caption: string; tint: string };

const photos: Photo[] = [
  {
    src: worksheets,
    alt: "Two students working through worksheets with pencils at a classroom table",
    caption: "Worksheet time",
    tint: "var(--prim-color2)",
  },
  {
    src: circuitKits,
    alt: "Students around a table building simple electromagnet circuits with batteries, wires and paper clips",
    caption: "Circuits workshop",
    tint: "var(--clay-soft)",
  },
  {
    src: buildingTower,
    alt: "A tower built from spaghetti, marshmallows and string during a design challenge",
    caption: "Spaghetti tower",
    tint: "var(--prim-color3)",
  },
];

// how long each photo stays at the front before the next one is shuffled forward
const SHUFFLE_EVERY = 2600;
// the first shuffle comes right as the fan finishes fading in, so the motion is seen straight away
const FIRST_SHUFFLE = 1500;
const SHUFFLE_DURATION = 950;

function PhotoFan(): ReactElement {
  // which photo is at the front; the others sit behind it, fanned out to either side
  const [front, setFront] = useState(1);
  // the photo currently being swiped off the front and tucked in at the back
  const [leaving, setLeaving] = useState<number | null>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef(1);
  const lastShuffle = useRef(0);
  const clearLeaving = useRef(0);

  // swipe the front print off the stack and bring the next one forward
  const shuffle = useCallback(() => {
    const current = frontRef.current;
    frontRef.current = (current + 1) % photos.length;
    lastShuffle.current = performance.now();
    setLeaving(current);
    setFront(frontRef.current);
    window.clearTimeout(clearLeaving.current);
    clearLeaving.current = window.setTimeout(() => setLeaving(null), SHUFFLE_DURATION);
  }, []);

  // like the photo stack in Messages: every few seconds the front print swipes out to the side and tucks in
  // behind the others. it waits while the fan is hovered, off screen, or the tab is hidden, a click restarts the
  // wait, and it doesn't run on its own at all with reduced motion.
  useEffect(() => {
    const fan = fanRef.current;
    if (!fan || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(fan);

    lastShuffle.current = performance.now() - SHUFFLE_EVERY + FIRST_SHUFFLE;
    const timer = window.setInterval(() => {
      if (!visible || document.hidden || fan.matches(":hover")) {
        lastShuffle.current = performance.now();
        return;
      }
      if (performance.now() - lastShuffle.current >= SHUFFLE_EVERY) shuffle();
    }, 250);

    const pending = clearLeaving;
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(pending.current);
    };
  }, [shuffle]);

  // the fan is also a control: click (or Enter/Space) to shuffle to the next photo
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    shuffle();
  };

  return (
    <div
      className="photoFan"
      ref={fanRef}
      role="button"
      tabIndex={0}
      aria-label="Show the next photo"
      onClick={shuffle}
      onKeyDown={onKeyDown}
    >
      {/* two little sketches around the prints, drawn in one after the other once the title has landed */}
      <Doodle
        name="laptop"
        tone="clay"
        depth={14}
        draw="load"
        className="fanDoodle fanDoodle-laptop"
        style={{ "--draw-delay": "1100ms" } as CSSProperties}
      />
      <Doodle
        name="plane"
        tone="moss"
        depth={10}
        draw="load"
        className="fanDoodle fanDoodle-plane"
        style={{ "--draw-delay": "1500ms", "--float-offset": "-1.7s" } as CSSProperties}
      />
      <HandNote text="from our workshops" arrow="upRight" reveal="load" delay={3000} className="noteFan" />
      {photos.map((photo, index) => {
        // 0 = front, 1 = behind on the left (next up), 2 = behind on the right (just shuffled back)
        const slot = (index - front + photos.length) % photos.length;
        return (
          <figure
            className={`photoCard photoSlot-${slot}${leaving === index ? " isLeaving" : ""}`}
            key={photo.caption}
            style={
              {
                "--tint": photo.tint,
                "--tape-tilt": `${[-4, 3, -2][index]}deg`,
                "--tape-x": `${[-6, 8, 2][index]}px`,
              } as CSSProperties
            }
          >
            {/* a strip of tape holding the print, placed a little differently on each one */}
            <span className="photoTape" aria-hidden="true" />
            {photo.src ? (
              <div className="photoWindow">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ) : (
              <div className="photoPlaceholder">
                <span>Photo coming soon</span>
              </div>
            )}
            <figcaption>{photo.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default PhotoFan;
