type CountdownProps = {
  seconds: number;
};

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function Countdown({ seconds }: CountdownProps) {
  const remaining = Math.max(0, Math.floor(seconds));
  const isCritical = remaining <= 60;

  return (
    <div
      className={`countdown${isCritical ? " countdown--critical" : ""}`}
      role="timer"
      aria-label={`${Math.floor(remaining / 60)} minutes and ${remaining % 60} seconds remaining`}
    >
      <span className="countdown-label">TIME REMAINING</span>
      <span className="countdown-value">{formatTime(remaining)}</span>
    </div>
  );
}

export default Countdown;
