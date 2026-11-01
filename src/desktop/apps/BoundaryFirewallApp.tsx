type Props = {
  onClose: () => void;
};

export default function BoundaryFirewallApp({ onClose }: Props) {
  return (
    <div className="vt-firewall-window" aria-label="Boundary Firewall & Antivirus Dashboard">
      {/* Top Header */}
      <div className="vt-second-topbar">
        <div className="vt-firewall-title-wrap">
          <span className="vt-firewall-shield-icon" aria-hidden="true">🛡️</span>
          <strong>VEILTRACE // BOUNDARY FIREWALL & SENTINEL SHIELD [ACTIVE]</strong>
        </div>
        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </div>

      <div className="vt-firewall-body">
        {/* Top Summary Banner */}
        <header className="vt-firewall-hero">
          <div className="vt-firewall-hero-status">
            <span className="vt-firewall-pulse-ring" aria-hidden="true">
              <span className="vt-firewall-pulse-core" />
            </span>
            <div>
              <span className="vt-firewall-kicker">NETWORK BOUNDARY DEFENSE</span>
              <h2>Perimeter Shield: Fully Active & Enforcing</h2>
              <p>Inbound and outbound kernel-level packet inspection enabled. Zero unauthorized ingress allowed.</p>
            </div>
          </div>
          <div className="vt-firewall-stats-badge">
            <span className="vt-firewall-blocked-count">1,429</span>
            <span className="vt-firewall-blocked-label">INTRUSIONS BLOCKED</span>
          </div>
        </header>

        {/* 3 Protection Cards */}
        <div className="vt-firewall-cards-row">
          <article className="vt-firewall-card">
            <div className="vt-firewall-card-top">
              <span className="vt-card-symbol">🔥</span>
              <span className="vt-firewall-pill is-on">ENABLED</span>
            </div>
            <h3>Stateful Packet Filter</h3>
            <p>Monitors TCP/UDP sessions, dropping unestablished SYN packets and asymmetric spoofed routes.</p>
            <div className="vt-firewall-metric">
              <span>Inspection Engine:</span>
              <strong>Deep Packet v4.1</strong>
            </div>
          </article>

          <article className="vt-firewall-card">
            <div className="vt-firewall-card-top">
              <span className="vt-card-symbol">🦠</span>
              <span className="vt-firewall-pill is-on">RUNNING</span>
            </div>
            <h3>Real-Time Antivirus Sentinel</h3>
            <p>Continuous heuristic memory scanning for trojans, beacon implants, and keylogger processes.</p>
            <div className="vt-firewall-metric">
              <span>Signatures Updated:</span>
              <strong>00:04:12 Ago</strong>
            </div>
          </article>

          <article className="vt-firewall-card">
            <div className="vt-firewall-card-top">
              <span className="vt-card-symbol">🌐</span>
              <span className="vt-firewall-pill is-on">FILTERING</span>
            </div>
            <h3>Telemetry Isolation Ward</h3>
            <p>Blocks non-whitelisted telemetry reporting endpoints from reaching external command servers.</p>
            <div className="vt-firewall-metric">
              <span>Egress Policy:</span>
              <strong>Strict Deny-All</strong>
            </div>
          </article>
        </div>

        {/* Security Rules & Blocked Log Table */}
        <section className="vt-firewall-logs-section">
          <div className="vt-firewall-section-hdr">
            <h3>Recent Blocked Connection History</h3>
            <span className="vt-firewall-readonly-tag">🔒 Enforced by Local Root Policy (Read-Only)</span>
          </div>

          <div className="vt-firewall-table-wrap">
            <table className="vt-firewall-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Source IP / Port</th>
                  <th>Target Destination</th>
                  <th>Protocol</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>23:58:12.401</td>
                  <td>192.168.1.104:54820</td>
                  <td>telemetry-east.valen.net:443</td>
                  <td>TCP / TLS</td>
                  <td><span className="vt-log-badge is-blocked">BLOCKED</span></td>
                </tr>
                <tr>
                  <td>23:55:04.112</td>
                  <td>10.0.8.22:38901</td>
                  <td>beacon.unauth-relay.org:8080</td>
                  <td>HTTP</td>
                  <td><span className="vt-log-badge is-blocked">DROPPED</span></td>
                </tr>
                <tr>
                  <td>23:51:49.880</td>
                  <td>172.16.4.15:1900</td>
                  <td>239.255.255.250:1900</td>
                  <td>SSDP / UDP</td>
                  <td><span className="vt-log-badge is-blocked">FILTERED</span></td>
                </tr>
                <tr>
                  <td>23:48:33.204</td>
                  <td>192.168.1.104:49152</td>
                  <td>metrics.internal-probe.io:9092</td>
                  <td>TCP</td>
                  <td><span className="vt-log-badge is-blocked">REJECTED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
