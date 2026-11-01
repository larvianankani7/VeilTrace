type Props = {
  remainingSeconds: number;
  totalDurationSeconds: number;
  onClose: () => void;
};

function formatTime(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function TimerApp({
  remainingSeconds,
  totalDurationSeconds,
  onClose,
}: Props) {
  const percentage = Math.min(
    100,
    Math.max(0, (remainingSeconds / totalDurationSeconds) * 100)
  );

  const isCritical = remainingSeconds <= 60;
  const isWarning = remainingSeconds <= 180 && !isCritical;

  return (
    <div className="vt-timer-app-window" aria-label="Synchronized Emergency Countdown Clock">
      {/* Top Bar */}
      <div className="vt-second-topbar">
        <div className="vt-timer-title-wrap">
          <span className="vt-timer-pulse-dot" aria-hidden="true" />
          <strong>VEILTRACE // SYSTEM COUNTDOWN RELAY — CHRONOMETER [READ-ONLY]</strong>
        </div>
        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </div>

      <div className="vt-timer-body">
        <header className="vt-timer-hero">
          <span className="vt-timer-hero-icon">{isCritical ? "🚨" : isWarning ? "⚠️" : "⏱️"}</span>
          <span className="vt-timer-kicker">AUTONOMOUS CONTAINMENT DEADLINE</span>
          <h2 className="vt-timer-digits-large">{formatTime(remainingSeconds)}</h2>
          <p className="vt-timer-desc">
            {isCritical
              ? "CRITICAL STATUS: Automated containment sequence imminent. Trace resolution required immediately."
              : isWarning
              ? "ELEVATED ALERT: Countdown progressing. Telemetry capture window narrowing."
              : "Synchronized with primary workstation system clock. All background services will purge upon expiry."}
          </p>
        </header>

        {/* Progress Bar */}
        <div className="vt-timer-progress-wrap">
          <div className="vt-timer-progress-labels">
            <span>TIME REMAINING: {percentage.toFixed(0)}%</span>
            <span>TOTAL BUDGET: {formatTime(totalDurationSeconds)}</span>
          </div>
          <div className="vt-timer-progress-bar">
            <div
              className={`vt-timer-progress-fill ${isCritical ? "is-red" : isWarning ? "is-yellow" : "is-green"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Diagnostic Metadata Cards */}
        <div className="vt-timer-meta-grid">
          <div className="vt-timer-meta-card">
            <span className="meta-lbl">CLOCK SYNCHRONIZATION</span>
            <strong className="meta-val">HARDWARE RTC LOCK</strong>
            <span className="meta-sub">Zero drift detected</span>
          </div>
          <div className="vt-timer-meta-card">
            <span className="meta-lbl">ACTIVE PROTOCOL</span>
            <strong className="meta-val">TIER-2 PURGE</strong>
            <span className="meta-sub">Irreversible terminal lock at 00:00</span>
          </div>
          <div className="vt-timer-meta-card">
            <span className="meta-lbl">SIREN STATUS</span>
            <strong className="meta-val">ARMED / LOOPING</strong>
            <span className="meta-sub">Acoustic alert broadcast active</span>
          </div>
        </div>

        <footer className="vt-timer-footer">
          <span>🔒 Read-only view. The timer cannot be manually edited or delayed from this interface.</span>
        </footer>
      </div>
    </div>
  );
}
