import { useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function RouteTraceApp({ isSolved, onSolve, onClose }: Props) {
  const [camera, setCamera] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [locationSetting, setLocationSetting] = useState(!isSolved);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [clipboardAccess, setClipboardAccess] = useState(false);
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  // If already solved, reopening must show ONLY the Race Condition learning!
  if (isSolved || traceAwarded) {
    const concept = getLearningConcept("race-condition");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>ROUTE TRACE // SECURITY CONCEPT: RACE CONDITION</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  function handleLocationToggle() {
    if (locationSetting) {
      // User is switching Location OFF -> Triggers trace solution!
      setLocationSetting(false);
      if (!traceAwarded) {
        setTraceAwarded(true);
        onSolve();
      }
    } else {
      setLocationSetting(true);
    }
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-route-trace-app" aria-label="Route Trace Privacy Settings">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // ROUTE TRACE — PRIVACY & SETTINGS INVESTIGATION</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-settings-workspace">
        <header className="vt-settings-header">
          <span className="vt-kicker-badge">SYSTEM SECURITY AUDIT // SENSOR POLICIES</span>
          <h2>Privacy & Peripheral Telemetry Settings</h2>
          <p className="vt-muted-text">
            Audit hardware telemetry endpoints and location beacons. Active location telemetry leaks positional coordinates across relay nodes.
          </p>
        </header>

        <div className="vt-settings-list" role="list">
          {/* Setting 1: Camera */}
          <div className="vt-setting-row" role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">📷</span>
              <div>
                <strong className="vt-setting-title">Camera Access</strong>
                <p className="vt-setting-desc">Allow optical capture devices to stream to local applications.</p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${camera ? "is-on" : "is-off"}`}
              onClick={() => setCamera(!camera)}
              aria-label={`Camera access currently ${camera ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{camera ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Setting 2: Microphone */}
          <div className="vt-setting-row" role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">🎙️</span>
              <div>
                <strong className="vt-setting-title">Microphone Access</strong>
                <p className="vt-setting-desc">Permit acoustic audio input from ambient containment sensors.</p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${microphone ? "is-on" : "is-off"}`}
              onClick={() => setMicrophone(!microphone)}
              aria-label={`Microphone access currently ${microphone ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{microphone ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Setting 3: Location — Trace target (Initially ON) */}
          <div className={`vt-setting-row vt-setting-row--critical ${locationSetting ? "is-critical-active" : "is-secured"}`} role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">📍</span>
              <div>
                <div className="vt-setting-title-row">
                  <strong className="vt-setting-title">Location Services</strong>
                  {locationSetting && <span className="vt-risk-badge">● EXPOSURE ACTIVE</span>}
                </div>
                <p className="vt-setting-desc">
                  Transmit simulated physical node coordinates to external routing relays. Switch Off to contain trace.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${locationSetting ? "is-on is-danger" : "is-off is-safe"}`}
              onClick={handleLocationToggle}
              aria-label={`Location services currently ${locationSetting ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{locationSetting ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Setting 4: Dark Mode (Initially ON) */}
          <div className="vt-setting-row" role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">🌙</span>
              <div>
                <strong className="vt-setting-title">Dark Mode</strong>
                <p className="vt-setting-desc">High-contrast luminescence palette for low-light terminal operations.</p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${darkMode ? "is-on" : "is-off"}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label={`Dark mode currently ${darkMode ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{darkMode ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Setting 5: Notifications */}
          <div className="vt-setting-row" role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">🔔</span>
              <div>
                <strong className="vt-setting-title">System Notifications</strong>
                <p className="vt-setting-desc">Display desktop pop-up alerts from background daemon processes.</p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${notifications ? "is-on" : "is-off"}`}
              onClick={() => setNotifications(!notifications)}
              aria-label={`System notifications currently ${notifications ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{notifications ? "On" : "Off"}</span>
            </button>
          </div>

          {/* Setting 6: Clipboard Access */}
          <div className="vt-setting-row" role="listitem">
            <div className="vt-setting-meta">
              <span className="vt-setting-icon">📋</span>
              <div>
                <strong className="vt-setting-title">Clipboard Inspection</strong>
                <p className="vt-setting-desc">Allow applications to monitor ephemeral text buffer data.</p>
              </div>
            </div>
            <button
              type="button"
              className={`vt-toggle-btn ${clipboardAccess ? "is-on" : "is-off"}`}
              onClick={() => setClipboardAccess(!clipboardAccess)}
              aria-label={`Clipboard inspection currently ${clipboardAccess ? "On" : "Off"}`}
            >
              <span className="vt-toggle-knob" />
              <span className="vt-toggle-label">{clipboardAccess ? "On" : "Off"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
