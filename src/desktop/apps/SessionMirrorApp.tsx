import { useState } from "react";

function SessionMirrorApp() {
  const [sessionActive, setSessionActive] = useState(true);

  return (
    <section className="desktop-app session-mirror">
      <header className="desktop-app__header">
        <div>
          <p className="desktop-app__eyebrow">IDENTITY & ACCESS</p>
          <h2>Session Mirror</h2>
        </div>
        <span className={`status-pill ${sessionActive ? "is-risk" : "is-safe"}`}>
          {sessionActive ? "REVIEW REQUIRED" : "SESSION REVOKED"}
        </span>
      </header>

      <div className="app-panel">
        <h3>Active sessions</h3>
        <p className="app-muted">
          One simulated session has not been recognised.
        </p>

        <div className="session-card">
          <div>
            <strong>Unknown desktop session</strong>
            <p className="app-muted">Device: Unrecognised workstation</p>
            <p className="app-muted">Last activity: 02:14 AM</p>
          </div>
          <span aria-label={sessionActive ? "Active" : "Revoked"}>
            {sessionActive ? "●" : "✓"}
          </span>
        </div>

        {sessionActive ? (
          <button type="button" onClick={() => setSessionActive(false)}>
            Revoke session
          </button>
        ) : (
          <p className="success-message" role="status">
            Unrecognised session revoked.
          </p>
        )}
      </div>
    </section>
  );
}

export default SessionMirrorApp;
