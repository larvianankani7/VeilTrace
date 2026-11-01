import { PROFILE_DATA } from "../../data/profileData";

type Props = {
  onClose: () => void;
};

export default function DocsApp({ onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop vt-docs-app" aria-label="Official Document Record">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // DOCS — PERSONNEL RECORD</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-doc-viewport">
        {/* Paper-style letter sheet */}
        <article className="vt-paper-letter" role="document">
          <header className="vt-letter-header">
            <div className="vt-letterhead-brand">
              <span className="vt-letter-seal">VT</span>
              <div>
                <h1 className="vt-letter-title">VALEN CENTRAL INFRASTRUCTURE DIRECTORY</h1>
                <p className="vt-letter-subtitle">DIVISION OF NETWORK SECURITY & CONTAINMENT</p>
              </div>
            </div>
            <div className="vt-letter-meta-box">
              <div><span>DOC ID:</span> <strong>{PROFILE_DATA.documentId}</strong></div>
              <div><span>RESTRICTION:</span> <strong>{PROFILE_DATA.restriction}</strong></div>
              <div><span>CLASSIFICATION:</span> <strong>{PROFILE_DATA.classification}</strong></div>
            </div>
          </header>

          <div className="vt-letter-divider" />

          <section className="vt-letter-body">
            <h2 className="vt-letter-section-heading">PERSONNEL DOSSIER // OFFICIAL DISPATCH</h2>

            <p className="vt-letter-para">
              This official document confirms the active personnel registry record for the employee identified below.
              All credentials and records contained herein are strictly read-only and maintained under containment protocols.
            </p>

            <div className="vt-letter-grid">
              <div className="vt-letter-field">
                <span className="vt-field-label">Full Legal Name:</span>
                <span className="vt-field-value">{PROFILE_DATA.fullName}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Identifier / Nickname:</span>
                <span className="vt-field-value">{PROFILE_DATA.nickname}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Age / Sex:</span>
                <span className="vt-field-value">{PROFILE_DATA.age} / {PROFILE_DATA.sex}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Nationality:</span>
                <span className="vt-field-value">{PROFILE_DATA.nationality}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Professional Occupation:</span>
                <span className="vt-field-value">{PROFILE_DATA.occupation}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Contact Email:</span>
                <span className="vt-field-value">{PROFILE_DATA.email}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Contact Telephone:</span>
                <span className="vt-field-value">{PROFILE_DATA.phoneNumber}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Father's Name:</span>
                <span className="vt-field-value">{PROFILE_DATA.fathersName}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Mother's Name:</span>
                <span className="vt-field-value">{PROFILE_DATA.mothersName}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Assigned Node:</span>
                <span className="vt-field-value">{PROFILE_DATA.assignedNode}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Operational Status:</span>
                <span className="vt-field-value">{PROFILE_DATA.status}</span>
              </div>
              <div className="vt-letter-field">
                <span className="vt-field-label">Incident Reference:</span>
                <span className="vt-field-value">{PROFILE_DATA.incidentCode}</span>
              </div>
            </div>

            <div className="vt-letter-notes">
              <h3 className="vt-notes-heading">INVESTIGATION DISPATCH NOTES</h3>
              <p className="vt-notes-body">{PROFILE_DATA.investigationNotes}</p>
            </div>
          </section>

          <footer className="vt-letter-footer">
            <div className="vt-signature-block">
              <div className="vt-signature-line" />
              <p>AUTHORIZED CUSTODIAN // INTERNAL AFFAIRS</p>
            </div>
            <div className="vt-letter-stamp">[VERIFIED RECORD - READ ONLY]</div>
          </footer>
        </article>
      </div>
    </section>
  );
}
