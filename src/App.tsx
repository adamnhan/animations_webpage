import { useEffect, useRef, useState } from "react";
import { videos } from "./videos";

type Video = (typeof videos)[number];

/* ---------- Small reusable player ---------- */
function VideoPlayer({ video }: { video: Video }) {
  return (
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
  );
}

/* ---------- Image Lightbox (second modal) ---------- */
function ImageLightbox({
  images,
  index,
  onClose,
  setIndex,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        zIndex: 2000,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          position: "relative",
          width: "min(100%, 1100px)",
          maxHeight: "90vh",
          borderRadius: 12,
          border: "1px solid #333",
          background: "#0b0b0b",
          boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
          display: "grid",
          placeItems: "center",
          padding: "1rem",
        }}
      >
        <img
          src={images[index]}
          alt={`image-${index + 1}`}
          style={{
            maxWidth: "90vw",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
            borderRadius: 8,
          }}
        />

        {/* Controls */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#1a1a1a",
            color: "#eee",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                padding: "8px 12px",
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
              onClick={next}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #444",
                background: "#1a1a1a",
                color: "#eee",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Expanded Card (first modal) ---------- */
function ExpandedCard({ video, onClose }: { video: Video; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // image lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ESC to close expanded card (disabled while lightbox open)
  useEffect(() => {
    if (lightboxIndex !== null) return; // let lightbox handle ESC
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lightboxIndex]);

  // click backdrop to close (disabled while lightbox open)
  const onBackdropClick = (e: React.MouseEvent) => {
    if (lightboxIndex !== null) return;
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          zIndex: 1000,
        }}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{
            width: "min(100%, 1100px)",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 12,
            border: "1px solid #333",
            background: "#111",
            color: "#eee",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "sticky",
              top: 0,
              marginLeft: "auto",
              display: "block",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #444",
              background: "#1a1a1a",
              color: "#eee",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            ✕
          </button>

          <VideoPlayer video={video} />

          <div style={{ padding: "1rem 1.25rem 1.5rem" }}>
            <h2 style={{ marginTop: 0 }}>{video.title}</h2>
            {video.notes && <p style={{ marginTop: 0, opacity: 0.9 }}>{video.notes}</p>}

            {/* simple horizontal scroller of thumbnails */}
            {video.images && video.images.length > 0 && (
              <div style={{ marginTop: "0.75rem" }}>
                <strong>Images</strong>
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "grid",
                    gridAutoFlow: "column",
                    gridAutoColumns: "minmax(180px, 1fr)",
                    gap: "10px",
                    overflowX: "auto",
                    paddingBottom: "6px",
                    scrollbarWidth: "thin" as any,
                  }}
                >
                  {video.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        border: "1px solid #333",
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#0d0d0d",
                        minHeight: 0,
                      }}
                      aria-label={`Open image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`image-${i + 1}`}
                        style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* second modal: image lightbox */}
      {video.images && lightboxIndex !== null && (
        <ImageLightbox
          images={video.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          setIndex={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
}

/* ---------- Main App ---------- */
export default function App() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expanded = videos.find((v) => v.id === expandedId) || null;

  return (
    <div style={{ paddingLeft: "200px", paddingTop: "2rem", paddingRight: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Computer Animations - Adam N</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {videos.map((video) => (
          <article
            key={video.id}
            onClick={() => setExpandedId(video.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setExpandedId(video.id)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#111",
              color: "#eee",
              cursor: "pointer",
              transition: "transform 120ms ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget.style.transform = "scale(1.01)"))}
            onMouseLeave={(e) => ((e.currentTarget.style.transform = "scale(1)"))}
          >
            <VideoPlayer video={video} />
            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: "0 0 .5rem" }}>{video.title}</h2>
              {video.notes && (
                <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.4", opacity: 0.9 }}>
                  {video.notes}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {expanded && <ExpandedCard video={expanded} onClose={() => setExpandedId(null)} />}
    </div>
  );
}
