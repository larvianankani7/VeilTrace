import { useState } from "react";

function PersonaHubApp() {
  const [visibility, setVisibility] = useState<"public" | "private">(
    "public",
  );

  const isPrivate = visibility === "private";

  return (
    <section className="desktop-app persona-hub">
      <header className="desktop-app__header">
        <div>
          <p className="desktop-app__eyebrow">IDENTITY SERVICES</p>
          <h2>Persona Hub</h2>
        </div>
        <span className={`status-pill ${isPrivate ? "is-safe" : "is-risk"}`}>
          {isPrivate ? "RESTRICTED" : "EXPOSED"}
        </span>
      </header>

      <div className="app-panel">
        <h3>Public profile</h3>
        <p className="app-muted">
          This simulated profile contains identifying information.
        </p>

        <div className="profile-preview">
          <span className="profile-avatar" aria-hidden="true">M</span>
          <div>
            <strong>Morgan Vale</strong>
            <p className="app-muted">Profile visibility: {visibility}</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <strong>Profile visibility</strong>
            <p className="app-muted">
              {isPrivate
                ? "Only approved viewers can access this profile."
                : "Anyone may view this profile."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVisibility(isPrivate ? "public" : "private")}
          >
            {isPrivate ? "Make public" : "Set private"}
          </button>
        </div>

        {isPrivate && (
          <p className="success-message" role="status">
            Profile visibility restricted.
          </p>
        )}
      </div>
    </section>
  );
}

export default PersonaHubApp;
