import { PROFILE_DATA } from "../../data/profileData";

type Props = {
  location: string;
  onClose: () => void;
};

export default function DashboardApp({ location, onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop vt-dashboard-app" aria-label="Merdin Morov Dashboard">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // DASHBOARD_PRJ — PERSONNEL DOSSIER</strong>
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
              <div className="vt-hero-tag-row">
                <span className="vt-kicker-badge">{PROFILE_DATA.classification}</span>
                <span className="vt-doc-id-badge">DOC // {PROFILE_DATA.documentId}</span>
              </div>
              <h2 className="vt-hero-fullname">{PROFILE_DATA.fullName}</h2>
              <p className="vt-role-text">
                <span className="vt-role-title">{PROFILE_DATA.occupation}</span>
                <span className="vt-role-separator">·</span>
                <span className="vt-role-nation">{PROFILE_DATA.nationality}</span>
              </p>
            </div>
          </div>

          <div className="vt-dashboard-status-tag">
            <span className="vt-status-dot is-alert" aria-hidden="true" />
            <div className="vt-status-text-wrap">
              <span className="vt-status-eyebrow">PROTOCOL STATUS</span>
              <strong className="vt-status-value">{PROFILE_DATA.status}</strong>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="vt-dashboard-grid">
          {/* Card 1: Identity & Credentials */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">🪪</span>
              </div>
              <div>
                <span className="vt-card-kicker">RECORD ARCHIVE</span>
                <h3>Identity Dossier</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Document ID</dt>
                <dd><code>{PROFILE_DATA.documentId}</code></dd>
              </div>
              <div className="vt-dl-row">
                <dt>Nickname / Call</dt>
                <dd>{PROFILE_DATA.nickname}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Age / Sex</dt>
                <dd>{PROFILE_DATA.age} yrs / {PROFILE_DATA.sex}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Nationality</dt>
                <dd>{PROFILE_DATA.nationality}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Restriction Level</dt>
                <dd className="vt-warn-text">{PROFILE_DATA.restriction}</dd>
              </div>
            </dl>
          </article>

          {/* Card 2: Contact Details */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">✉️</span>
              </div>
              <div>
                <span className="vt-card-kicker">COMMUNICATIONS</span>
                <h3>Contact & Relatives</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Contact Email</dt>
                <dd><code>{PROFILE_DATA.email}</code></dd>
              </div>
              <div className="vt-dl-row">
                <dt>Phone Relay</dt>
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

          {/* Card 3: Assignment & Telemetry */}
          <article className="vt-dash-card">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">📍</span>
              </div>
              <div>
                <span className="vt-card-kicker">SECTOR TELEMETRY</span>
                <h3>Active Assignment</h3>
              </div>
            </div>
            <dl className="vt-meta-dl">
              <div className="vt-dl-row">
                <dt>Assigned Node</dt>
                <dd>{PROFILE_DATA.assignedNode}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Incident Code</dt>
                <dd><code>{PROFILE_DATA.incidentCode}</code></dd>
              </div>
              <div className="vt-dl-row">
                <dt>Current Location</dt>
                <dd className="vt-highlight-text">{location}</dd>
              </div>
              <div className="vt-dl-row">
                <dt>Access Mode</dt>
                <dd className="vt-safe-text">AUTHENTICATED LOCAL PROFILE</dd>
              </div>
            </dl>
          </article>

          {/* Card 4: Security Notes */}
          <article className="vt-dash-card vt-dash-card--wide">
            <div className="vt-dash-card-header">
              <div className="vt-card-icon-wrap">
                <span className="vt-dash-card-icon" aria-hidden="true">🛡️</span>
              </div>
              <div>
                <span className="vt-card-kicker">INVESTIGATION LOGS</span>
                <h3>Security Containment Notes</h3>
              </div>
            </div>
            <p className="vt-notes-text">{PROFILE_DATA.investigationNotes}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
