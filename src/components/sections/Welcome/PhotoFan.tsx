import type { CSSProperties, ReactElement } from "react";
import Doodle from "../../effects/Doodle";
import "./PhotoFan.css";

// photos for the hero fan. drop image files into src/assets/photos and set `src` (e.g. via an import) to replace
// a placeholder; `alt` should describe the photo for screen readers.
type Photo = { src?: string; alt: string; caption: string; tint: string };

const photos: Photo[] = [
  { alt: "", caption: "Workshop day", tint: "var(--prim-color2)" },
  { alt: "", caption: "A donated laptop", tint: "var(--clay-soft)" },
  { alt: "", caption: "Mentoring session", tint: "var(--prim-color3)" },
];

function PhotoFan(): ReactElement {
  return (
    <div className="photoFan" aria-hidden={photos.every((photo) => !photo.src)}>
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
      {photos.map((photo, index) => (
        <figure
          className="photoCard"
          key={photo.caption}
          style={{ "--i": index - 1, "--a": Math.abs(index - 1), "--tint": photo.tint } as CSSProperties}
        >
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          ) : (
            <div className="photoPlaceholder">
              <span>Photo coming soon</span>
            </div>
          )}
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default PhotoFan;
