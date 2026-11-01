import { useEffect, useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function PermitsApp({ isSolved, onSolve, onClose }: Props) {
  const [locationPermit, setLocationPermit] = useState(!isSolved);
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  // Keyboard shortcut listener: Ctrl+Shift+E
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        if (locationPermit) {
          setLocationPermit(false);
          if (!traceAwarded) {
            setTraceAwarded(true);
            onSolve();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locationPermit, traceAwarded, onSolve]);

  // If already solved, reopening must show ONLY the Latency learning!
  if (isSolved || traceAwarded) {
    const concept = getLearningConcept("latency");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>PERMITS // SECURITY CONCEPT: LATENCY</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-permits-app" aria-label="Permissions and Consent Management">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // PERMITS — RUNTIME CONSENT AUDIT</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-permits-workspace">
        <header className="vt-permits-header">
          <span className="vt-kicker-badge">RUNTIME PERMISSIONS // SECURITY POLICY</span>
          <h2>Application Telemetry Consent</h2>
          <p className="vt-muted-text">
            Background telemetry daemon holds elevated location privileges on this terminal node.
          </p>
        </header>

        {/* Primary setting box: No scrollbar, cleanly fitted within panel */}
        <div className="vt-permits-card">
          <div className="vt-permit-item">
            <div className="vt-permit-info">
              <span className="vt-permit-icon">📍</span>
              <div>
                <strong className="vt-permit-title">Allow location while using this app</strong>
                <p className="vt-permit-description">
                  Grants active runtime tracking permissions to background relay processes.
                </p>
              </div>
            </div>

            <div className="vt-permit-status-badge">
              <span className={`vt-badge-pill ${locationPermit ? "is-active-risk" : "is-revoked"}`}>
                {locationPermit ? "● ON (ACTIVE)" : "✓ OFF (REVOKED)"}
              </span>
            </div>
          </div>

          <div className="vt-permit-callout">
            <div className="vt-callout-icon">💡</div>
            <div className="vt-callout-text">
              <strong>Short-Cut Command:</strong>
              <p>
                Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> on your keyboard to instantly revoke and turn off this location permission.
              </p>
            </div>
          </div>
        </div>

        <footer className="vt-permits-footer">
          <span>CONTAINMENT CONSENT MANAGER // ISOLATED TERMINAL BUFFER</span>
          <span>NO THIRD-PARTY ACCESS DETECTED</span>
        </footer>
      </div>
    </section>
  );
}
