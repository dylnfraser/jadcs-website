import type { CSSProperties, ReactElement } from "react";
import Doodle from "../../effects/Doodle";
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
