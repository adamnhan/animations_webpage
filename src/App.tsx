import React from "react";
import { videos } from "./videos";

export default function App() {
  return (
    <div style={{ paddingLeft: "200px", paddingTop: "2rem", paddingRight: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>My Animations</h1>

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
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: "0 0 .5rem" }}>{video.title}</h2>
              <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.4" }}>
                {video.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
