import { useEffect, useState } from "react";
import { PROFILE_DATA } from "../../data/profileData";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  currentLocation: string;
  onUpdateLocation: (newLocation: string) => void;
  onSolve: () => void;
  onClose: () => void;
};

export default function PersonalHuApp({
  isSolved,
  currentLocation,
  onUpdateLocation,
  onSolve,
  onClose,
}: Props) {
  const [locationInput, setLocationInput] = useState(currentLocation);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Keyboard shortcut listener for Ctrl+U
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        saveLocation();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locationInput]);

  function saveLocation() {
    const trimmed = locationInput.trim();
    if (!trimmed) {
      setIsError(true);
      setStatusMessage("Location cannot be blank. Enter a valid simulated location.");
      return;
    }

    setIsError(false);
    onUpdateLocation(trimmed);
    setStatusMessage("✓ Location updated successfully via secure buffer cache.");
    onSolve();
  }

  // If already solved, show ONLY the Caching learning explanation!
  if (isSolved) {
    const concept = getLearningConcept("caching");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>PERSONAL HU // SECURITY CONCEPT: CACHING</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-personal-hu-app" aria-label="Personal Profile Hub">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // PERSONAL HU_PRJ — IDENTITY HUB</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-dashboard-container">
        {/* Header Hero Card */}
        <header className="vt-dashboard-hero">
          <div className="vt-dashboard-hero-inner">
            <div className="vt-dashboard-avatar">
              <span>{PROFILE_DATA.nickname}</span>
            </div>
            <div className="vt-dashboard-hero-meta">
              <span className="vt-kicker-badge">PROFILE REGISTRATION EDITOR</span>
              <h2 className="vt-hero-fullname">{PROFILE_DATA.fullName}</h2>
              <p className="vt-role-text">{PROFILE_DATA.occupation} · {PROFILE_DATA.nationality}</p>
            </div>
          </div>
        </header>

        {/* Notice Instruction Box */}
        <div className="vt-shortcut-banner">
          <div className="vt-shortcut-inner">
            <span className="vt-shortcut-icon">💡</span>
            <div className="vt-shortcut-instruction">
              <strong>Instruction:</strong> Update your location by editing the field below, then press <kbd>Ctrl</kbd> + <kbd>U</kbd> on your keyboard to commit to cache.
            </div>
          </div>
        </div>

        {statusMessage && (
          <p
            className={`vt-status-feedback ${isError ? "is-error" : "is-success"}`}
            role="status"
          >
            {statusMessage}
          </p>
        )}

        <div className="vt-dashboard-grid">
          {/* Card 1: Read-Only Identification */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">🪪</span>
              </div>
              <div>
                <span className="vt-card-kicker">RECORD ARCHIVE</span>
                <h3>Identification (Read-Only)</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Full Name</dt>
                <dd>{PROFILE_DATA.fullName}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Nickname</dt>
                <dd>{PROFILE_DATA.nickname}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Age / Sex</dt>
                <dd>{PROFILE_DATA.age} / {PROFILE_DATA.sex}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Nationality</dt>
                <dd>{PROFILE_DATA.nationality}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Occupation</dt>
                <dd>{PROFILE_DATA.occupation}</dd>
              </div>
            </dl>
          </article>

          {/* Card 2: Read-Only Contacts & Family */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">✉️</span>
              </div>
              <div>
                <span className="vt-card-kicker">COMMUNICATIONS</span>
                <h3>Contact & Family (Read-Only)</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Email</dt>
                <dd><code>{PROFILE_DATA.email}</code></dd>
              </div>
              <div className="vt-dl-row">
                <dt>Phone Number</dt>
                <dd>{PROFILE_DATA.phoneNumber}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Father's Name</dt>
                <dd>{PROFILE_DATA.fathersName}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Mother's Name</dt>
                <dd>{PROFILE_DATA.mothersName}</dd>
              </div>
            </dl>
          </article>

          {/* Card 3: Editable Location Field */}
          <article className="vt-dash-card vt-dash-card--editable">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">📍</span>
              </div>
              <div>
                <span className="vt-card-kicker">ACTIVE CACHE</span>
                <h3>Simulated Location (Editable)</h3>
              </div>
            </div>
            <div className="vt-editable-field-group">
              <label htmlFor="editable-location-input" className="vt-input-label">
                Current Registered Location:
              </label>
              <input
                id="editable-location-input"
                type="text"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setStatusMessage(null);
                }}
                className="vt-input-text vt-input-editable"
                placeholder="Enter new simulated location..."
              />
              <p className="vt-input-hint">
                Type a new location and press <kbd>Ctrl</kbd>+<kbd>U</kbd> to save and cache.
              </p>
            </div>
          </article>

          {/* Card 4: Assignment Details (Read-Only) */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">🏢</span>
              </div>
              <div>
                <span className="vt-card-kicker">SECTOR STATUS</span>
                <h3>Assignment Details (Read-Only)</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Assigned Node</dt>
                <dd>{PROFILE_DATA.assignedNode}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Status</dt>
                <dd>{PROFILE_DATA.status}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Incident Code</dt>
                <dd><code>{PROFILE_DATA.incidentCode}</code></dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
