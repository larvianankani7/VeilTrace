import { useEffect, useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function FootprintLogApp({ isSolved, onSolve, onClose }: Props) {
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  // Keyboard shortcut listener: Ctrl+Space while active
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && (e.code === "Space" || e.key === " ")) {
        e.preventDefault();
        if (!traceAwarded) {
          setTraceAwarded(true);
          onSolve();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [traceAwarded, onSolve]);

  // If already solved, reopening must show ONLY the Ciphertext learning content!
  if (isSolved || traceAwarded) {
    const concept = getLearningConcept("ciphertext");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>FOOTPRINT LOG // SECURITY CONCEPT: CIPHERTEXT</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  const logEntries = [
    {
      timestamp: "2026-10-28 22:41:09.114",
      action: "SESSION_HANDSHAKE",
      sourceIp: "10.142.68.24",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 VT-Terminal",
      fingerprint: "SHA256:7e91ac48bf09...28d4",
      status: "TRACE_EXPOSED",
    },
    {
      timestamp: "2026-10-28 22:42:33.802",
      action: "TELEMETRY_BEACON",
      sourceIp: "10.142.68.24",
      userAgent: "VeilOS-BackgroundService/2.4 (VT-NODE-08)",
      fingerprint: "SHA256:4f08bc12ea99...87fa",
      status: "TRACE_EXPOSED",
    },
    {
      timestamp: "2026-10-28 22:45:12.441",
      action: "AUTH_TOKEN_EXCHANGE",
      sourceIp: "10.142.68.24",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 VT-Terminal",
      fingerprint: "SHA256:b812ee64aa11...55cc",
      status: "TRACE_EXPOSED",
    },
    {
      timestamp: "2026-10-28 22:47:58.005",
      action: "DIAGNOSTIC_QUERY",
      sourceIp: "10.142.68.24",
      userAgent: "VeilOS-RelayMonitor/1.0",
      fingerprint: "SHA256:29da77cc01ff...12aa",
      status: "TRACE_EXPOSED",
    },
  ];

  return (
    <section className="vt-location-flow vt-second-desktop vt-footprint-app" aria-label="Digital Footprint Audit Log">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // FOOTPRINT LOG — DIGITAL TELEMETRY AUDIT</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-footprint-workspace">
        <header className="vt-footprint-header">
          <div className="vt-footprint-hero">
            <span className="vt-kicker-badge">AUDIT DISPATCH // SEC-TRACE-08</span>
            <h2>Digital Footprint Investigation Log</h2>
            <p className="vt-muted-text">
              Active telemetry audit reveals persistent session fingerprints and unencrypted access logs.
              Isolate and encrypt exposed activity traces immediately.
            </p>
          </div>

          <div className="vt-footprint-shortcut-box">
            <span className="vt-footprint-key-tag">REQUIRED REMEDIATION</span>
            <p className="vt-footprint-hint-text">
              Press <kbd>Ctrl</kbd> + <kbd>Space</kbd> on your keyboard to encrypt and secure these trace logs.
            </p>
          </div>
        </header>

        <div className="vt-footprint-log-table-wrap">
          <table className="vt-footprint-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>ACTION</th>
                <th>SIMULATED IP</th>
                <th>DEVICE FINGERPRINT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry, idx) => (
                <tr key={idx} className="vt-log-row">
                  <td className="vt-log-time"><code>{entry.timestamp}</code></td>
                  <td className="vt-log-action"><strong>{entry.action}</strong></td>
                  <td className="vt-log-ip"><code>{entry.sourceIp}</code></td>
                  <td className="vt-log-fp"><code>{entry.fingerprint}</code></td>
                  <td>
                    <span className="vt-footprint-risk-tag">
                      ● {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="vt-footprint-footer">
          <div className="vt-footprint-status-bar">
            <span>AUDIT STATUS: 4 EXPOSED TELEMETRY ENTRIES DETECTED</span>
            <span>PRESS CTRL+SPACE TO ENCRYPT</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
