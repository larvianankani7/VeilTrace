import { useEffect, useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  onSolve?: () => void;
  onClose: () => void;
};

export default function ChromeApp({ isSolved, onSolve, onClose }: Props) {
  const [contextMenu, setContextMenu] = useState(false);
  const [exposureActive, setExposureActive] = useState(!isSolved);
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (
        exposureActive &&
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "i"
      ) {
        event.preventDefault();
        disableExposure();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [exposureActive]);

  function disableExposure() {
    setExposureActive(false);
    setContextMenu(false);
    if (!traceAwarded) {
      setTraceAwarded(true);
      onSolve?.();
    }
  }

  // If already solved on reopen, show ONLY the learning explanation!
  if (isSolved) {
    const concept = getLearningConcept("hashing");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>CHROME // SECURITY CONCEPT</strong>
          <button type="button" onClick={onClose}>← Back to desktop</button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Chrome simulation">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // CHROME SIMULATION</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <article
        className="vt-browser-window"
        onContextMenu={(event) => {
          event.preventDefault();
          setContextMenu(true);
        }}
      >
        <div className="vt-browser-tabs">
          <span>● Merdin Morov — Profile</span>
          <span>＋</span>
        </div>
        <div className="vt-browser-address">
          ←　→　↻　　🔒　https://social.example.test/profile/merdin-morov
        </div>

        <div className="vt-profile-page">
          <div className="vt-profile-cover" />
          <div className="vt-profile-avatar">M</div>
          <h2>Merdin Morov</h2>
          <p>@merdin.morov · Systems Infrastructure Analyst</p>
          <div className="vt-profile-stats">
            <span><b>128</b> posts</span>
            <span><b>340</b> followers</span>
            <span><b>216</b> following</span>
          </div>
          <p className="vt-profile-bio">
            Maps, late-night builds, and the places that make a city feel like home.
          </p>

          <div className="vt-location-exposure">
            <span>LOCATION STATUS</span>
            <strong className={exposureActive ? "vt-risk-text" : "vt-safe-text"}>
              {exposureActive ? "EXPOSURE ACTIVE" : "EXPOSURE DISABLED"}
            </strong>
            <p>
              {exposureActive
                ? "A simulated network request is exposing a location hint."
                : "Location hint is no longer included in the simulated request."}
            </p>
            {exposureActive && (
              <button
                type="button"
                style={{
                  marginTop: "8px",
                  padding: "5px 10px",
                  background: "rgba(220, 50, 70, 0.2)",
                  border: "1px solid rgba(220, 50, 70, 0.5)",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
                onClick={() => setContextMenu(true)}
              >
                Inspect Network Request
              </button>
            )}
          </div>
        </div>

        {contextMenu && exposureActive && (
          <div className="vt-network-panel" role="dialog" aria-label="Simulated Network panel">
            <header>
              <strong>Network</strong>
              <button type="button" onClick={() => setContextMenu(false)}>×</button>
            </header>
            <p className="vt-explorer-kicker">SIMULATED REQUEST DETAILS</p>
            <div>
              <span>Request</span>
              <b>GET /api/profile/location</b>
            </div>
            <div>
              <span>Exposed field</span>
              <b className="vt-risk-text">lastKnownArea</b>
            </div>
            <div>
              <span>Location hint</span>
              <b>North District · Building 08</b>
            </div>
            <div>
              <span>Source</span>
              <b>Fictional profile metadata</b>
            </div>
            <p className="vt-network-note">
              Press <b>Ctrl + Shift + I</b> or click below to stop the location exposure.
            </p>
            <button
              type="button"
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#dc2626",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "11px",
              }}
              onClick={disableExposure}
            >
              Stop Location Exposure
            </button>
          </div>
        )}

        {traceAwarded && (
          <div className="vt-trace-banner">
            You've contained the location trace.
          </div>
        )}
      </article>

      <p className="vt-context-hint">
        Right-click the profile to inspect the simulated Network panel. Press Ctrl + Shift + I to disable exposure.
      </p>
    </section>
  );
}
