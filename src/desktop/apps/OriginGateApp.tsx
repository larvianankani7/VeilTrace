import React, { useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type OriginEntry = {
  id: string;
  origin: string;
  scope: string;
  trusted: boolean;
};

const INITIAL_ORIGINS: OriginEntry[] = [
  { id: "o1", origin: "http://localhost:3000", scope: "Local Developer Server", trusted: true },
  { id: "o2", origin: "http://127.0.0.1:8080", scope: "Direct Loopback Diagnostic", trusted: true },
  { id: "o3", origin: "http://localhost:5173", scope: "Vite Hot-Reload Client", trusted: true },
  { id: "o4", origin: "https://api.valen-relay.internal", scope: "Internal Subnet Gateway", trusted: true },
  { id: "o5", origin: "https://cdn-telemetry.veiltrace.cloud", scope: "Public Edge Broadcast Relay", trusted: true },
];

type Props = {
  isSolved: boolean;
  totalSolvedBeforeThis: number; // to check if this makes it 11/11
  onSolve: () => void;
  onClose: () => void;
};

export default function OriginGateApp({
  isSolved,
  totalSolvedBeforeThis,
  onSolve,
  onClose,
}: Props) {
  const [origins, setOrigins] = useState<OriginEntry[]>(() =>
    isSolved ? [] : INITIAL_ORIGINS
  );
  const [corsPolicyActive, setCorsPolicyActive] = useState(!isSolved);
  const [permissionWarning, setPermissionWarning] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showFinalCdnLearning, setShowFinalCdnLearning] = useState(false);
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  // If already solved and reopened, show the CDN learning view directly
  if (isSolved && !showAchievement && !showFinalCdnLearning) {
    const concept = getLearningConcept("cdn");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>ORIGIN GATE // SECURITY CONCEPT: CDN</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  function handleDeleteClick(e: React.MouseEvent, _id: string) {
    // Normal click without Ctrl key
    if (!e.ctrlKey && !e.metaKey) {
      setPermissionWarning(
        "You cannot delete this origin because you don't have the required permissions."
      );
      return;
    }

    // Ctrl + Left Click opens force confirmation card
    setPermissionWarning(null);
    setConfirmModalOpen(true);
  }

  function handleConfirmPurgeDelete() {
    setOrigins([]);
    setCorsPolicyActive(false);
    setConfirmModalOpen(false);
    setPermissionWarning(null);

    if (!traceAwarded) {
      setTraceAwarded(true);
      onSolve();

      // If this was the 11th trace (total before this was 10)
      if (totalSolvedBeforeThis >= 10) {
        setShowAchievement(true);
      } else {
        setShowFinalCdnLearning(true);
      }
    }
  }

  function handleDismissAchievement() {
    setShowAchievement(false);
    setShowFinalCdnLearning(true);
  }

  return (
    <div className="vt-origin-gate-window" aria-label="Origin Gate — CORS Configuration">
      {/* Top Header */}
      <div className="vt-second-topbar">
        <div className="vt-og-title-wrap">
          <span className="vt-og-icon" aria-hidden="true">🌐</span>
          <strong>VEILTRACE // ORIGIN_GATE — CORS POLICY CONTROLLER</strong>
        </div>
        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </div>

      <div className="vt-og-body">
        {/* Policy Header Banner */}
        <header className={`vt-og-banner ${corsPolicyActive ? "is-permissive" : "is-strict"}`}>
          <div className="vt-og-banner-left">
            <span className="vt-og-banner-icon">{corsPolicyActive ? "⚠️" : "🛡️"}</span>
            <div>
              <h2>Cross-Origin Resource Sharing (CORS) Access Control</h2>
              <p>
                {corsPolicyActive
                  ? "Allowed origins can make cross-domain HTTP requests to local resources and read responses."
                  : "STRICT PERIMETER: All external cross-origin permissions purged. Zero unauthorized access permitted."}
              </p>
            </div>
          </div>
          <span className={`vt-og-status-pill ${corsPolicyActive ? "is-active" : "is-purged"}`}>
            {corsPolicyActive ? "PERMISSIVE CORS ACTIVE" : "STRICT / ORIGINS PURGED"}
          </span>
        </header>

        {/* Warning Callout when clicked without Ctrl */}
        {permissionWarning && (
          <aside className="vt-og-warning-card" role="alert">
            <div className="warning-top">
              <span className="warning-icon">⛔</span>
              <strong>{permissionWarning}</strong>
            </div>
            <p className="warning-sub">
              If you want to force delete, use: <code>CTRL + LEFT CLICK</code>.
            </p>
          </aside>
        )}

        {/* Allowed Origins List */}
        <section className="vt-og-list-section">
          <div className="vt-og-list-hdr">
            <h3>Allowed Origin Entries ({origins.length})</h3>
            <span className="vt-og-hint-text">Click 🗑️ to remove an allowed domain</span>
          </div>

          {origins.length === 0 ? (
            <div className="vt-og-empty-state">
              <span className="vt-og-empty-icon">✓</span>
              <h4>All CORS Origins Successfully Purged</h4>
              <p>No external origin may query local or edge resources without explicit TLS attestation.</p>
            </div>
          ) : (
            <div className="vt-og-origins-list">
              {origins.map((item) => (
                <div key={item.id} className="vt-og-origin-row">
                  <div className="vt-og-origin-info">
                    <span className="vt-og-globe">🌐</span>
                    <div>
                      <code className="vt-og-url">{item.origin}</code>
                      <span className="vt-og-scope">{item.scope}</span>
                    </div>
                  </div>

                  <div className="vt-og-actions">
                    <button
                      type="button"
                      className="vt-og-delete-btn"
                      onClick={(e) => handleDeleteClick(e, item.id)}
                      title="Delete this origin (Ctrl+Click to force)"
                      aria-label={`Delete origin ${item.origin}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Force Delete Confirmation Modal */}
      {confirmModalOpen && (
        <div className="vt-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cors-delete-title">
          <div className="vt-modal-card vt-cors-confirm-card">
            <span className="vt-modal-warn-icon">⚠️</span>
            <h3 id="cors-delete-title">Are you sure you want to delete CORS?</h3>
            <p className="vt-cors-confirm-desc">
              This action cannot be reversed. All allowed CORS origins will be removed at once.
            </p>
            <div className="vt-modal-buttons">
              <button
                type="button"
                className="vt-btn-cancel"
                onClick={() => setConfirmModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="vt-btn-danger-action"
                onClick={handleConfirmPurgeDelete}
              >
                DELETE CORS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🏆 ACHIEVEMENT CARD (Shown if 11/11 Completed) */}
      {showAchievement && (
        <div className="vt-modal-backdrop vt-achievement-backdrop" role="dialog" aria-modal="true">
          <div className="vt-achievement-card">
            <div className="vt-achievement-confetti" aria-hidden="true" />
            <span className="vt-achievement-trophy">🏆</span>
            <span className="vt-achievement-eyebrow">ACHIEVEMENT UNLOCKED</span>
            <h2 className="vt-achievement-title">VEILTRACE — ALL TRACES RESOLVED</h2>
            <p className="vt-achievement-quote">
              &quot;Congratulations! You&apos;ve successfully uncovered every trace, investigated the hidden configurations,
              and resolved all the security challenges before time ran out.&quot;
            </p>
            <div className="vt-achievement-stats">
              <div className="vt-ach-stat">
                <span className="ach-val">11 / 11</span>
                <span className="ach-lbl">TRACES RESOLVED</span>
              </div>
              <div className="vt-ach-stat">
                <span className="ach-val">100%</span>
                <span className="ach-lbl">CONTAINMENT SCORE</span>
              </div>
            </div>
            <button
              type="button"
              className="vt-btn-primary vt-btn-claim-achievement"
              onClick={handleDismissAchievement}
            >
              Continue to Final Educational Concept →
            </button>
          </div>
        </div>
      )}

      {/* Final CDN Learning Modal */}
      {showFinalCdnLearning && (
        <div className="vt-modal-backdrop" role="dialog" aria-modal="true">
          <div className="vt-modal-card vt-learning-overlay-card">
            {getLearningConcept("cdn") && (
              <LearningConceptView
                concept={getLearningConcept("cdn")!}
                onClose={() => {
                  setShowFinalCdnLearning(false);
                  onClose();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
