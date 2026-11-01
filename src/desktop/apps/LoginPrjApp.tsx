import { useState } from "react";
import { PROFILE_DATA } from "../../data/profileData";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  savedVaultPassword: string | null;
  location: string;
  isLocationBroadcastDisabled: boolean;
  onDisableLocationBroadcast: () => void;
  onSolve: () => void;
  onOpenLearning?: () => void;
  onClose: () => void;
};

export default function LoginPrjApp({
  isSolved,
  savedVaultPassword,
  location,
  isLocationBroadcastDisabled,
  onDisableLocationBroadcast,
  onSolve,
  onOpenLearning,
  onClose,
}: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isLocationBroadcastDisabled || isSolved);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  // If already solved, show ONLY the Access Token learning explanation!
  if (isSolved) {
    const concept = getLearningConcept("access-token");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>LOGIN // SECURITY CONCEPT: ACCESS TOKEN</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setClickNotice(null);

    const emailMatch =
      emailInput.trim().toLowerCase() === PROFILE_DATA.email.toLowerCase();
    const passwordMatch =
      savedVaultPassword !== null &&
      passwordInput.trim() === savedVaultPassword.trim();

    if (!emailMatch || !passwordMatch) {
      setErrorMessage("Authentication failed. Invalid email or password combination.");
      return;
    }

    setIsLoggedIn(true);
  }

  function handleSingleClick() {
    if (isLocationBroadcastDisabled) return;
    setClickNotice("Single-click received. You must double-click this button to deactivate broadcast.");
  }

  function handleDoubleClick() {
    if (isLocationBroadcastDisabled) return;
    onDisableLocationBroadcast();
    onSolve();
  }

  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Login Simulation">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // LOGIN_PRJ</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-sim-app vt-login-container">
        {!isLoggedIn ? (
          <div>
            <p className="vt-explorer-kicker">SIMULATED PORTAL AUTHENTICATION</p>
            <h2>User Login</h2>
            <p className="vt-muted-text">
              Enter your authorized account email and the passphrase saved in <code>key-vault_prj</code>.
            </p>

            <form onSubmit={handleLogin} className="vt-login-form">
              <div className="vt-form-group">
                <label htmlFor="login-email-input">Email:</label>
                <input
                  id="login-email-input"
                  type="email"
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="vt-input-text"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="vt-form-group">
                <label htmlFor="login-password-input">Password:</label>
                <input
                  id="login-password-input"
                  type="password"
                  placeholder="Enter vault password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="vt-input-text"
                  autoComplete="current-password"
                  required
                />
              </div>

              {errorMessage && (
                <p className="vt-status-feedback is-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" className="vt-btn-primary">
                Log In
              </button>
            </form>
          </div>
        ) : (
          <div className="vt-post-login-panel">
            <div className="vt-success-banner" role="status">
              <span className="vt-status-icon">✓</span>
              <div>
                <strong>Authentication Successful</strong>
                <p>Identity confirmed for {PROFILE_DATA.fullName}. Session token issued.</p>
              </div>
            </div>

            <div className="vt-revealed-location-card">
              <p className="vt-kicker-badge">REVEALED TELEMETRY STREAM</p>
              <h3>Active Simulated Broadcast Location</h3>
              <p className="vt-location-val">
                📍 <strong>{location}</strong>
              </p>

              <div className="vt-exposure-box">
                <p className="vt-exposure-text">
                  ⚠️ <strong>Security Notice:</strong> This active login session is currently broadcasting your simulated live location marker across internal relays. You can permanently disable this simulated live-location exposure.
                </p>

                <div className="vt-double-click-zone">
                  <p className="vt-instruction-callout">
                    👉 <strong>Instruction:</strong> You must <strong>double-click</strong> the button below to permanently deactivate the simulated live-location exposure and view the security concept. A single click will not activate it.
                  </p>

                  <div className="vt-continue-learning-row" style={{ margin: "10px 0 14px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenLearning) {
                          onOpenLearning();
                        } else {
                          onSolve();
                        }
                      }}
                      className="vt-btn-secondary vt-btn-continue-learning"
                      aria-label="Continue to Learning"
                    >
                      Continue to Learning →
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSingleClick}
                    onDoubleClick={handleDoubleClick}
                    disabled={isLocationBroadcastDisabled}
                    className={`vt-btn-danger vt-btn-doubleclick ${isLocationBroadcastDisabled ? "is-disabled is-confirmed" : ""}`}
                    aria-label="Double-click to disable simulated live location exposure and open learning"
                  >
                    {isLocationBroadcastDisabled
                      ? "✓ Live Location Broadcast Disabled & Access Token Unlocked"
                      : "⚡ Deactivate Broadcast & View Access Token Concept (Double-Click)"}
                  </button>

                  {clickNotice && !isLocationBroadcastDisabled && (
                    <p className="vt-click-warning" role="alert">
                      {clickNotice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
