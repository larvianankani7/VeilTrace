type Props = {
  remainingSeconds: number;
  onClose: () => void;
};

export function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function SentinelAlertsApp({ remainingSeconds, onClose }: Props) {
  const formattedTime = formatTime(remainingSeconds);

  let threatLevel = "NOMINAL // WATCH";
  let alertClass = "is-green";
  let statusNotice = "Internal defense perimeter operating within containment tolerance.";

  if (remainingSeconds <= 60) {
    threatLevel = "CRITICAL // DETONATION PROTOCOL IMMINENT";
    alertClass = "is-red";
    statusNotice = "CRITICAL WARNING: System purge countdown reaching terminal sequence. Contain exposures immediately!";
  } else if (remainingSeconds <= 300) {
    threatLevel = "ELEVATED // BREACH EXPOSURE DETECTED";
    alertClass = "is-yellow";
    statusNotice = "WARNING: Time reserves decaying. Active automated tracing beacons are triangulating this workstation.";
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-sentinel-app" aria-label="Sentinel Alerts Panel">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // SENTINEL-ALERTS_PRJ</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-sentinel-panel">
        <header className="vt-sentinel-header">
          <div className="vt-sentinel-radar-icon" aria-hidden="true">
            <span className="vt-radar-sweep" />
          </div>
          <div>
            <span className="vt-kicker-badge is-danger">EMERGENCY MONITORING SYSTEM</span>
            <h2>Sentinel Priority Threat Monitor</h2>
            <p className="vt-muted-text">Real-time facility telemetry and countdown status.</p>
          </div>
        </header>

        {/* Live Countdown Display Card */}
        <div className={`vt-sentinel-countdown-card ${alertClass}`}>
          <div className="vt-sentinel-timer-eyebrow">
            <span>AUTHORITATIVE COUNTDOWN TIMER</span>
            <span className="vt-threat-pill">{threatLevel}</span>
          </div>

          <div className="vt-sentinel-digits" role="timer" aria-live="polite">
            <span className="vt-sentinel-dot" aria-hidden="true" />
            <span className="vt-sentinel-time">{formattedTime}</span>
          </div>

          <p className="vt-sentinel-notice">{statusNotice}</p>
        </div>

        {/* Threat Indicators Grid */}
        <div className="vt-sentinel-grid">
          <div className="vt-sentinel-indicator">
            <span className="vt-indicator-label">PRIMARY PROTOCOL</span>
            <strong>SEC-BREACH-0x4B</strong>
            <small>Active Lockdown</small>
          </div>

          <div className="vt-sentinel-indicator">
            <span className="vt-indicator-label">FACILITY SIREN STATUS</span>
            <strong className="vt-risk-text">ARMED (AUTOMATIC LOOP)</strong>
            <small>Silenced during learning analysis</small>
          </div>

          <div className="vt-sentinel-indicator">
            <span className="vt-indicator-label">CONTAINMENT INTEGRITY</span>
            <strong>{Math.max(0, Math.round((remainingSeconds / 600) * 100))}%</strong>
            <small>Decaying monotonically</small>
          </div>
        </div>
      </div>
    </section>
  );
}
