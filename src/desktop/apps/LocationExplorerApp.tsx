import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function LocationExplorerApp({ onClose }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Location Directory Explorer">
      <div className="vt-second-topbar">
        <strong>FILE EXPLORER // LOCATION</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <div className="vt-explorer-window" style={{ margin: "24px auto" }}>
        <header className="vt-explorer-titlebar">
          <span>📁 File Explorer</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            —　□　×
          </button>
        </header>
        <div className="vt-explorer-toolbar">
          <span>←</span>
          <span>→</span>
          <span>↑</span>
          <div>Computer　›　Storage　›　Location</div>
          <span>⋯</span>
        </div>
        <div className="vt-explorer-body">
          <aside className="vt-explorer-sidebar">
            <p>Home</p>
            <p>Gallery</p>
            <p>Desktop</p>
            <p>Downloads</p>
            <p>Documents</p>
            <p>This PC</p>
          </aside>
          <div className="vt-explorer-files">
            <p className="vt-explorer-section-title">Location</p>
            <div
              className="vt-explorer-file"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedFile("Location Data")}
            >
              <span className="vt-file-icon">📁</span>
              <span>Location Data</span>
            </div>
            <div
              className="vt-explorer-file"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedFile("readme.txt")}
            >
              <span className="vt-file-icon">📄</span>
              <span>readme.txt</span>
            </div>

            {selectedFile === "readme.txt" && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "#f0f4f8",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#334155",
                }}
              >
                <strong>readme.txt</strong>
                <p style={{ margin: "6px 0 0", lineHeight: 1.5 }}>
                  Telemetry and location services are recording active requests across this node. Check connected browser profiles and system traces to prevent external identity correlation.
                </p>
              </div>
            )}
            {selectedFile === "Location Data" && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "#f0f4f8",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#334155",
                }}
              >
                <strong>Location Data</strong>
                <p style={{ margin: "6px 0 0", lineHeight: 1.5 }}>
                  Sub-directory contains cached broadcast markers and historical coordinates for SECTOR-04.
                </p>
              </div>
            )}
          </div>
        </div>
        <footer className="vt-explorer-status">2 items　　Ready</footer>
      </div>
    </section>
  );
}
