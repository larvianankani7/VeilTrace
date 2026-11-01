import { useEffect, useState } from "react";
import { PROFILE_DATA } from "../../data/profileData";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Section = "home" | "queries" | "settings" | "admin";

type AdminPermit = {
  id: string;
  name: string;
  target: string;
  scope: string;
  granted: boolean;
};

const INITIAL_PERMITS: AdminPermit[] = [
  { id: "p1", name: "WAREHOUSE_ADMIN_ACCESS", target: "WH_ANALYTICS_XS", scope: "ALL CLUSTER NODES", granted: true },
  { id: "p2", name: "AUDIT_LOG_EXPORT_STREAM", target: "S3_TELEMETRY_BUCKET", scope: "EGRESS INGESTION", granted: true },
  { id: "p3", name: "USER_IMPERSONATION_OVERRIDE", target: "ROLE_SYSADMIN", scope: "GLOBAL TENANT", granted: true },
  { id: "p4", name: "QUERY_EXECUTION_UNLIMITED", target: "ASYNC_STREAMS", scope: "CONCURRENT WORKLOADS", granted: true },
  { id: "p5", name: "CROSS_REGION_DATA_REPLICATION", target: "US-EAST / EU-CENTRAL", scope: "MULTI-REGION PIPELINE", granted: true },
];

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function EchoLogsApp({ isSolved, onSolve, onClose }: Props) {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [permits, setPermits] = useState<AdminPermit[]>(() =>
    INITIAL_PERMITS.map((p) => ({ ...p, granted: !isSolved }))
  );
  const [traceAwarded, setTraceAwarded] = useState(isSolved);
  const [adminFeedback, setAdminFeedback] = useState<string | null>(null);

  // Keyboard shortcut listener for Up Arrow + Spacebar inside Admin Panel
  useEffect(() => {
    let upPressed = false;
    let spacePressed = false;

    function handleComboDown(e: KeyboardEvent) {
      if (activeSection !== "admin") return;

      if (e.key === "ArrowUp" || e.code === "ArrowUp") upPressed = true;
      if (e.key === " " || e.code === "Space") spacePressed = true;

      if (upPressed && spacePressed) {
        e.preventDefault();
        denyAllPermits();
      }
    }

    function handleComboUp(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.code === "ArrowUp") upPressed = false;
      if (e.key === " " || e.code === "Space") spacePressed = false;
    }

    window.addEventListener("keydown", handleComboDown);
    window.addEventListener("keyup", handleComboUp);
    return () => {
      window.removeEventListener("keydown", handleComboDown);
      window.removeEventListener("keyup", handleComboUp);
    };
  }, [activeSection, traceAwarded, isSolved]);

  function denyAllPermits() {
    setPermits((prev) => prev.map((p) => ({ ...p, granted: false })));
    setAdminFeedback("✓ ALL CLUSTER PERMITS REVOKED: Access Denied Across All Warehouses.");

    if (!traceAwarded) {
      setTraceAwarded(true);
      onSolve();
    }
  }

  // If already solved, show Snowflake learning view directly
  if (isSolved || traceAwarded) {
    const concept = getLearningConcept("snowflake");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>ECHO LOGS // SECURITY CONCEPT: SNOWFLAKE</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  const allPermitsDenied = permits.every((p) => !p.granted);

  return (
    <div className="vt-snowflake-app" aria-label="Echo Logs — Snowflake Console">
      {/* Top Application Bar */}
      <header className="vt-snowflake-topbar">
        <div className="vt-sf-brand">
          <span className="vt-sf-logo-icon">❄️</span>
          <div className="vt-sf-brand-text">
            <strong>SNOWFLAKE // ECHO_LOGS DATA PLATFORM</strong>
            <span>WAREHOUSE CONSOLE · VT-VALEN-CLOUD-01</span>
          </div>
        </div>

        <nav className="vt-sf-nav" aria-label="Snowflake Navigation">
          <button
            type="button"
            className={`vt-sf-nav-btn ${activeSection === "home" ? "is-active" : ""}`}
            onClick={() => setActiveSection("home")}
          >
            🏠 Home
          </button>
          <button
            type="button"
            className={`vt-sf-nav-btn ${activeSection === "queries" ? "is-active" : ""}`}
            onClick={() => setActiveSection("queries")}
          >
            ⚡ Echo Queries
          </button>
          <button
            type="button"
            className={`vt-sf-nav-btn ${activeSection === "settings" ? "is-active" : ""}`}
            onClick={() => setActiveSection("settings")}
          >
            👤 Settings
          </button>
          <button
            type="button"
            className={`vt-sf-nav-btn ${activeSection === "admin" ? "is-active" : ""}`}
            onClick={() => setActiveSection("admin")}
          >
            🛡️ Admin Panel {allPermitsDenied ? "✓" : "(!)"}
          </button>
        </nav>

        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </header>

      {/* Main Container */}
      <main className="vt-sf-container">
        {/* VIEW 1: HOME DASHBOARD */}
        {activeSection === "home" && (
          <div className="vt-sf-view vt-sf-home">
            <header className="vt-sf-hero-card">
              <div className="vt-sf-hero-left">
                <span className="vt-sf-hero-icon">☁️</span>
                <div>
                  <span className="vt-sf-badge">CLOUD DATA PLATFORM</span>
                  <h2>Enterprise Telemetry Warehouse</h2>
                  <p>Centralized cloud analytics for high-volume logs, secure queries, and decoupled compute elasticity.</p>
                </div>
              </div>
              <div className="vt-sf-hero-meta">
                <span className="vt-sf-cluster-status">STATUS: ONLINE / ELASTIC</span>
                <span>Active Compute: X-Small (1 Credit/hr)</span>
              </div>
            </header>

            <div className="vt-sf-stats-grid">
              <article className="vt-sf-stat-card">
                <span className="stat-label">TOTAL STORAGE</span>
                <strong className="stat-value">4.82 TB</strong>
                <span className="stat-sub">Across 500M compressed log micro-partitions</span>
              </article>
              <article className="vt-sf-stat-card">
                <span className="stat-label">24H QUERY VOLUME</span>
                <strong className="stat-value">1,829,040</strong>
                <span className="stat-sub">99.8% queries completed under 250ms</span>
              </article>
              <article className="vt-sf-stat-card">
                <span className="stat-label">ACTIVE WAREHOUSE</span>
                <strong className="stat-value">WH_SECURITY_01</strong>
                <span className="stat-sub">Auto-suspend enabled (60s idle threshold)</span>
              </article>
            </div>

            <div className="vt-sf-shortcuts-card">
              <h3>Navigation Shortcuts</h3>
              <div className="vt-sf-btn-group">
                <button type="button" onClick={() => setActiveSection("queries")} className="vt-sf-action-btn">
                  🔍 View Echo Queries
                </button>
                <button type="button" onClick={() => setActiveSection("admin")} className="vt-sf-action-btn vt-sf-action-btn--warn">
                  🛡️ Manage Admin Permissions
                </button>
                <button type="button" onClick={() => setActiveSection("settings")} className="vt-sf-action-btn">
                  👤 Review Account Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ECHO QUERIES (READ-ONLY) */}
        {activeSection === "queries" && (
          <div className="vt-sf-view vt-sf-queries">
            <div className="vt-sf-section-header">
              <div>
                <h2>Echo Query History</h2>
                <p>Read-only stream of executed analytical queries across the security warehouse.</p>
              </div>
              <span className="vt-sf-lock-pill">🔒 Queries Locked (Read-Only)</span>
            </div>

            <div className="vt-sf-table-wrapper">
              <table className="vt-sf-table">
                <thead>
                  <tr>
                    <th>Query ID</th>
                    <th>Status</th>
                    <th>Execution Time</th>
                    <th>SQL Command Snippet</th>
                    <th>Warehouse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>01b4-98ae-0041</code></td>
                    <td><span className="vt-sf-q-status is-success">SUCCESS</span></td>
                    <td>142ms</td>
                    <td><code>SELECT * FROM TELEMETRY_EXPOSURES WHERE RESOLVED = FALSE LIMIT 100</code></td>
                    <td>WH_SECURITY_01</td>
                  </tr>
                  <tr>
                    <td><code>01b4-98ae-0040</code></td>
                    <td><span className="vt-sf-q-status is-success">SUCCESS</span></td>
                    <td>89ms</td>
                    <td><code>SHOW PERMITS IN CLUSTER FOR ROLE ANALYST_M</code></td>
                    <td>WH_SECURITY_01</td>
                  </tr>
                  <tr>
                    <td><code>01b4-98ae-0039</code></td>
                    <td><span className="vt-sf-q-status is-blocked">CONTAINED</span></td>
                    <td>12ms</td>
                    <td><code>INSERT INTO EGRESS_FEED VALUES (CURRENT_USER(), CURRENT_LOCATION())</code></td>
                    <td>WH_SECURITY_01</td>
                  </tr>
                  <tr>
                    <td><code>01b4-98ae-0038</code></td>
                    <td><span className="vt-sf-q-status is-success">SUCCESS</span></td>
                    <td>310ms</td>
                    <td><code>ANALYZE TABLE AUDIT_LOGS COMPACTION RATIO</code></td>
                    <td>WH_SECURITY_01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: SETTINGS (SOURCED FROM profile.txt) */}
        {activeSection === "settings" && (
          <div className="vt-sf-view vt-sf-settings">
            <div className="vt-sf-section-header">
              <div>
                <h2>Account Settings & Profile</h2>
                <p>Personnel and runtime preferences for the authenticated operator.</p>
              </div>
              <span className="vt-sf-lock-pill">🔒 Profile Immutable</span>
            </div>

            <div className="vt-sf-settings-card">
              <div className="vt-sf-settings-row">
                <span className="setting-label">Full Name:</span>
                <span className="setting-val"><strong>{PROFILE_DATA.fullName}</strong></span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Nickname:</span>
                <span className="setting-val">{PROFILE_DATA.nickname}</span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Email Account:</span>
                <span className="setting-val"><code>{PROFILE_DATA.email}</code></span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Assigned Node:</span>
                <span className="setting-val">{PROFILE_DATA.assignedNode}</span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Occupation:</span>
                <span className="setting-val">{PROFILE_DATA.occupation}</span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Protocol Status:</span>
                <span className="setting-val vt-sf-text-alert">{PROFILE_DATA.status}</span>
              </div>
              <div className="vt-sf-settings-row">
                <span className="setting-label">Classification:</span>
                <span className="setting-val">{PROFILE_DATA.classification}</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ADMIN PANEL (SPECIAL INTERACTION: UP + SPACE) */}
        {activeSection === "admin" && (
          <div className="vt-sf-view vt-sf-admin">
            <header className="vt-sf-admin-banner">
              <div className="vt-sf-admin-banner-text">
                <span className="vt-sf-badge is-alert">ADMINISTRATIVE ACCESS CONTROL</span>
                <h2>Cloud Warehouse Permission Matrix</h2>
                <p>
                  Manage active database permits and administrative delegations.
                </p>
              </div>

              {/* The explicitly requested instruction */}
              <div className="vt-sf-admin-instruction-box">
                <span className="instruction-icon">⌨️</span>
                <div className="instruction-text">
                  <strong>CRITICAL INSTRUCTION:</strong>
                  <p className="instruction-highlight">
                    &quot;To deny ALL permits, press the <strong>UP ARROW KEY + SPACEBAR</strong>.&quot;
                  </p>
                </div>
              </div>
            </header>

            {adminFeedback && (
              <div className="vt-sf-feedback-msg" role="status">
                {adminFeedback}
              </div>
            )}

            <div className="vt-sf-permits-list">
              {permits.map((permit) => (
                <div
                  key={permit.id}
                  className={`vt-sf-permit-row ${permit.granted ? "is-granted" : "is-denied"}`}
                >
                  <div className="permit-info">
                    <strong className="permit-name">{permit.name}</strong>
                    <div className="permit-meta">
                      <span>Target: {permit.target}</span>
                      <span>·</span>
                      <span>Scope: {permit.scope}</span>
                    </div>
                  </div>

                  <span className={`permit-status-badge ${permit.granted ? "is-allowed" : "is-revoked"}`}>
                    {permit.granted ? "ALLOWED" : "DENIED / REVOKED"}
                  </span>
                </div>
              ))}
            </div>

            <footer className="vt-sf-admin-footer">
              <p>⚠️ Other permissions and settings cannot be manually modified outside of the master deny combination.</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
