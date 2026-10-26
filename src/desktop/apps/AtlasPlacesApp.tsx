import { useState } from "react";

function AtlasPlacesApp() {
  const [sharingActive, setSharingActive] = useState(true);

  return (
    <section className="desktop-app atlas-places">
      <header className="desktop-app__header">
        <div>
          <p className="desktop-app__eyebrow">LOCATION SERVICES</p>
          <h2>Atlas Places</h2>
        </div>
        <span className={`status-pill ${sharingActive ? "is-risk" : "is-safe"}`}>
          {sharingActive ? "SHARING ACTIVE" : "SHARING REVOKED"}
        </span>
      </header>

      <div className="app-panel">
        <h3>Shared location link</h3>
        <p className="app-muted">
          A fictional link is allowing another account to view location updates.
        </p>

        <div className="data-row">
          <span>Link ID</span>
          <code>AT-7F2A-91</code>
        </div>

        <div className="data-row">
          <span>Access</span>
          <strong>{sharingActive ? "Active" : "Revoked"}</strong>
        </div>

        {sharingActive ? (
          <button type="button" onClick={() => setSharingActive(false)}>
            Revoke sharing link
          </button>
        ) : (
          <p className="success-message" role="status">
            Location-sharing link revoked.
          </p>
        )}
      </div>
    </section>
  );
}

export default AtlasPlacesApp;
