import { useRef } from "react";
import { videos } from "./videos";

function ImageScroller({ images }: { images: string[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const amount = dir === "left" ? -300 : 300;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!images?.length) return null;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <strong>Images</strong>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => scrollByAmount("left")}
            className="scroll-left"
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #444",
              background: "#1a1a1a",
              color: "#eee",
              cursor: "pointer",
            }}
          >
            ◀
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            className="scroll-right"
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #444",
              background: "#1a1a1a",
              color: "#eee",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(180px, 1fr)",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "6px",
          scrollbarWidth: "thin" as any,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #333",
              borderRadius: 10,
              overflow: "hidden",
              background: "#0d0d0d",
              minHeight: 0,
            }}
          >
            <img
              src={src}
              alt={`image-${i + 1}`}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    // keeping your padding hack so it “looks centered” to you
    <div style={{ paddingLeft: "200px", paddingTop: "2rem", paddingRight: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Project 1 - Adam Nhan, 9/16/2025</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#111",
              color: "#eee",
            }}
          >
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={video.url}
                title={video.title}
                // @ts-ignore
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>

            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: "0 0 .5rem" }}>{video.title}</h2>
              <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.4" }}>{video.notes}</p>

              {/* Only shows if images exist (e.g., your second video) */}
              {video.images && video.images.length > 0 && (
                <ImageScroller images={video.images} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
