type Props = {
  onClose: () => void;
};

export default function BraveApp({ onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Brave security search">
      <div className="vt-second-topbar">
        <strong>BRAVE // SECURITY SEARCH</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <article className="vt-brave-browser">
        <header>
          <span>🦁 Brave</span>
          <span>−　□　×</span>
        </header>
        <div className="vt-brave-address">
          🔒 https://search.example.test/?q=database+security
        </div>
        <div className="vt-brave-search">
          <div className="vt-brave-logo">
            brave<span> search</span>
          </div>
          <div className="vt-brave-query">
            database security <span>⌕</span>
          </div>
          <p>About 8,420,000 results (0.42 seconds) · simulated</p>
          <article>
            <small>security.example.org › database</small>
            <h3>Database Security: Access Control, Encryption &amp; Auditing</h3>
            <p>
              Protect sensitive records with least-privilege access, encryption at rest and in transit, and auditable database activity.
            </p>
          </article>
          <article>
            <small>learn.example.net › secure-databases</small>
            <h3>Best Practices for Securing a Database</h3>
            <p>
              Use strong authentication, patch database software, restrict network exposure, and monitor unusual queries.
            </p>
          </article>
          <article>
            <small>docs.example.dev › database-hardening</small>
            <h3>Database Hardening Checklist</h3>
            <p>
              Separate application roles, rotate credentials safely, back up data, and test recovery procedures.
            </p>
          </article>
          <p className="vt-readonly-note">
            READ-ONLY TRAINING PAGE · Search results are simulated.
          </p>
        </div>
      </article>
    </section>
  );
}
