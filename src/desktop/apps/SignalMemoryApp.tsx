type Props = {
  onClose: () => void;
};

export default function SignalMemoryApp({ onClose }: Props) {
  const properties = [
    { label: "Simulated Device IP Address", value: "10.240.18.94 / 24", highlight: true, note: "Private Isolated Demozone" },
    { label: "Hardware Terminal Identifier", value: "VT-NODE-08-WORKSTATION", highlight: false, note: "Containment Wing Sector 5" },
    { label: "Operating System Environment", value: "VeilOS Enterprise v4.18 (Kernel 6.1-x86_64-sec)", highlight: false, note: "Air-Gapped Build" },
    { label: "Physical Network Adapter", value: "Optical Fiber Uplink (10 Gbps)", highlight: false, note: "Full Duplex" },
    { label: "Subnet Gateway Router", value: "10.240.18.1", highlight: false, note: "Internal Relay Ward" },
    { label: "Hardware MAC Address", value: "52:54:00:1A:8F:C4", highlight: false, note: "Virtual NIC Layer" },
    { label: "Terminal Architecture", value: "x86_64 Secure Cryptographic Core", highlight: false, note: "Hardware Enclave Active" },
    { label: "System Memory Allocation", value: "32,768 MB ECC DDR5 (28,416 MB Available)", highlight: false, note: "Protected Buffer" },
    { label: "Active Containment Session", value: "VT-SESSION-CONTAINMENT-0x4B", highlight: false, note: "Protocol Locked" },
    { label: "Clock Synchronization", value: "PTP Local Hardware Sync (±0.02ms)", highlight: false, note: "Precision Time Clock" },
  ];

  return (
    <section className="vt-location-flow vt-second-desktop vt-signal-memory-app" aria-label="Device Properties and Signal Memory">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // SIGNAL MEMORY — HARDWARE & NETWORK PROPERTIES</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-signal-workspace">
        <header className="vt-signal-header">
          <div className="vt-signal-brand">
            <span className="vt-kicker-badge">HARDWARE TELEMETRY // PROPERTY REGISTER</span>
            <h2>Terminal Device Diagnostics & Signal Memory</h2>
            <p className="vt-muted-text">
              Comprehensive hardware specifications, local network interface adapters, and memory buffer allocations for this workstation.
            </p>
          </div>

          <div className="vt-signal-ip-callout">
            <span className="vt-ip-label">SIMULATED DEVICE IP (LOCAL)</span>
            <strong className="vt-ip-digits">10.240.18.94</strong>
            <span className="vt-ip-subnet">SUBNET MASK 255.255.255.0</span>
          </div>
        </header>

        {/* Properties Grid */}
        <div className="vt-signal-grid">
          {properties.map((prop, idx) => (
            <article key={idx} className={`vt-prop-card ${prop.highlight ? "is-highlighted" : ""}`}>
              <div className="vt-prop-header">
                <span className="vt-prop-label">{prop.label}</span>
                <span className="vt-prop-note">{prop.note}</span>
              </div>
              <div className="vt-prop-value-row">
                <code className="vt-prop-value">{prop.value}</code>
              </div>
            </article>
          ))}
        </div>

        <footer className="vt-signal-footer">
          <div className="vt-signal-status-bar">
            <span>● ADAPTER STATUS: OPTICAL LINK CONNECTED</span>
            <span>SIMULATED TELEMETRY: READ-ONLY AUDIT</span>
            <span>SECURITY LEVEL: TIER-2 CONTAINMENT</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
