type TraceInfo = {
  id: string;
  puzzleId: string;
  name: string;
  icon: string;
  screen: string;
  interactionKey: string;
  description: string;
};

const ALL_TRACES: TraceInfo[] = [
  {
    id: "maps",
    puzzleId: "atlas-places",
    name: "Maps",
    icon: "🗺️",
    screen: "Screen 1",
    interactionKey: "Toggle Scrollbar OFF",
    description: "Disable horizontal tracking scrollbar to prevent continuous location beaconing.",
  },
  {
    id: "chrome",
    puzzleId: "location-exposure",
    name: "Chrome",
    icon: "🌐",
    screen: "Screen 2",
    interactionKey: "Ctrl + Shift + I (or Context Menu)",
    description: "Inspect active browser session and sever exposed geolocation headers.",
  },
  {
    id: "py",
    puzzleId: "bloom-filter",
    name: "py.py",
    icon: "🐍",
    screen: "Screen 3",
    interactionKey: "py --hide_loc",
    description: "Execute Python CLI utility in terminal to initialize a probabilistic Bloom filter mask.",
  },
  {
    id: "login_prj",
    puzzleId: "token-cabinet",
    name: "login_prj",
    icon: "🔐",
    screen: "Screen 4",
    interactionKey: "Vault Pass + Double-Click Button",
    description: "Authenticate using password saved in Key Vault and double-click to revoke broadcast session token.",
  },
  {
    id: "personal_hu_prj",
    puzzleId: "persona-hub",
    name: "personal hu_prj",
    icon: "👤",
    screen: "Screen 4",
    interactionKey: "Ctrl + U",
    description: "Update personnel location coordinates and commit directly to local cache buffer.",
  },
  {
    id: "footprint_log",
    puzzleId: "footprint-log",
    name: "Footprint Log",
    icon: "📜",
    screen: "Screen 5",
    interactionKey: "Ctrl + Space",
    description: "Encrypt exposed activity trails and convert plaintext telemetry into secure ciphertext.",
  },
  {
    id: "route_trace",
    puzzleId: "race-condition",
    name: "Route Trace",
    icon: "📡",
    screen: "Screen 5",
    interactionKey: "Location Toggle OFF",
    description: "Deactivate active location probe to eliminate concurrent timing race conditions.",
  },
  {
    id: "permits",
    puzzleId: "permission-garden",
    name: "permits",
    icon: "🛡️",
    screen: "Screen 5",
    interactionKey: "Ctrl + Shift + E",
    description: "Revoke persistent background application permissions to minimize network latency exposure.",
  },
  {
    id: "nearby_devices",
    puzzleId: "nearfield-devices",
    name: "Nearby_Devices",
    icon: "📶",
    screen: "Screen 7",
    interactionKey: "Switch All Devices OFF",
    description: "Disconnect all active RF/Bluetooth nearby peripheral links to secure channel cryptography.",
  },
  {
    id: "echo_logs",
    puzzleId: "echo-logs",
    name: "Echo_Logs",
    icon: "❄️",
    screen: "Screen 7",
    interactionKey: "Up Arrow + Spacebar (Admin Panel)",
    description: "Deny all cloud administrative access permits inside the Snowflake query console.",
  },
  {
    id: "origin_gate",
    puzzleId: "origin-gate",
    name: "Origin_Gate",
    icon: "🌍",
    screen: "Screen 7",
    interactionKey: "Ctrl + Left Click on Delete → Confirm",
    description: "Force remove all insecure CORS allowed origins to lock down CDN edge perimeter.",
  },
];

type Props = {
  solvedPuzzleIds: string[];
  onClose: () => void;
};

export default function ReadmeTxtApp({ solvedPuzzleIds, onClose }: Props) {
  function isSolved(puzzleId: string): boolean {
    if (puzzleId === "atlas-places") return solvedPuzzleIds.includes("atlas-places");
    if (puzzleId === "location-exposure") return solvedPuzzleIds.includes("location-exposure");
    if (puzzleId === "bloom-filter") return solvedPuzzleIds.includes("bloom-filter") || solvedPuzzleIds.includes("route-trace");
    if (puzzleId === "token-cabinet") return solvedPuzzleIds.includes("token-cabinet") || solvedPuzzleIds.includes("access-token");
    if (puzzleId === "persona-hub") return solvedPuzzleIds.includes("persona-hub") || solvedPuzzleIds.includes("caching");
    if (puzzleId === "footprint-log") return solvedPuzzleIds.includes("footprint-log") || solvedPuzzleIds.includes("ciphertext");
    if (puzzleId === "race-condition") return solvedPuzzleIds.includes("race-condition") || solvedPuzzleIds.includes("route-trace");
    if (puzzleId === "permission-garden") return solvedPuzzleIds.includes("permission-garden") || solvedPuzzleIds.includes("latency");
    if (puzzleId === "nearfield-devices") return solvedPuzzleIds.includes("nearfield-devices") || solvedPuzzleIds.includes("cryptography");
    if (puzzleId === "echo-logs") return solvedPuzzleIds.includes("echo-logs") || solvedPuzzleIds.includes("snowflake");
    if (puzzleId === "origin-gate") return solvedPuzzleIds.includes("origin-gate") || solvedPuzzleIds.includes("cdn");
    return solvedPuzzleIds.includes(puzzleId);
  }

  const confirmedCount = ALL_TRACES.filter((t) => isSolved(t.puzzleId)).length;

  return (
    <div className="vt-notepad-window" aria-label="readme.txt - Notepad">
      {/* Window Title Bar */}
      <div className="vt-notepad-titlebar">
        <div className="vt-notepad-title-left">
          <span className="vt-notepad-icon" aria-hidden="true">📄</span>
          <span className="vt-notepad-filename">readme.txt — Notepad [READ-ONLY]</span>
        </div>
        <div className="vt-notepad-title-right">
          <span className="vt-notepad-stats-pill">
            {confirmedCount} / 11 TRACES CONTAINED
          </span>
          <button
            type="button"
            onClick={onClose}
            className="vt-notepad-close-btn"
            aria-label="Close readme.txt"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Notepad Menu Strip */}
      <div className="vt-notepad-menustrip" aria-hidden="true">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
        <span className="vt-notepad-readonly-flag">⚠️ MODE: READ-ONLY AUDIT LOG</span>
      </div>

      {/* Text Area Content */}
      <div className="vt-notepad-content">
        <pre className="vt-notepad-raw-header">
{`================================================================================
VEILTRACE DIRECTIVE // CRITICAL TRACE REGISTRY & EXPOSURE AUDIT
SYSTEM CLASSIFICATION: TIER-2 READ-ONLY DOSSIER
STATUS: ${confirmedCount === 11 ? "ALL TRACES CONTAINED — SECURE" : "EXPOSURES DETECTED IN LOCAL RUNTIME"}
================================================================================`}
        </pre>

        <p className="vt-notepad-intro">
          Below is the complete ledger of all 11 security traces discovered within the terminal environment.
          Investigate each application or directory and perform the indicated interaction before time expires.
        </p>

        <div className="vt-notepad-trace-list">
          {ALL_TRACES.map((trace, index) => {
            const solved = isSolved(trace.puzzleId);
            return (
              <article
                key={trace.id}
                className={`vt-notepad-trace-card ${solved ? "is-confirmed" : "is-pending"}`}
              >
                <div className="vt-notepad-trace-top">
                  <div className="vt-notepad-trace-id-group">
                    <span className="vt-notepad-trace-emoji">{trace.icon}</span>
                    <strong className="vt-notepad-trace-num">TRACE #{String(index + 1).padStart(2, "0")}</strong>
                    <span className="vt-notepad-trace-app">{trace.name}</span>
                    <span className="vt-notepad-trace-screen">[{trace.screen}]</span>
                  </div>
                  <span className={`vt-notepad-trace-badge ${solved ? "is-confirmed" : "is-pending"}`}>
                    {solved ? "✓ CONFIRMED" : "⏳ PENDING"}
                  </span>
                </div>

                <div className="vt-notepad-trace-body">
                  <p className="vt-notepad-trace-desc">{trace.description}</p>
                  <div className="vt-notepad-trace-key-row">
                    <span className="vt-notepad-key-label">REQUIRED INTERACTION:</span>
                    <code className="vt-notepad-key-code">{trace.interactionKey}</code>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <pre className="vt-notepad-raw-footer">
{`================================================================================
END OF TRACE MANIFEST — REVIEW SENSITIVE EVIDENCE & CONTAIN EVERY EXPOSURE
================================================================================`}
        </pre>
      </div>

      {/* Notepad Status Bar */}
      <div className="vt-notepad-statusbar">
        <span>Ln 11, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
        <span className="vt-notepad-status-lock">🔒 Protected Document</span>
      </div>
    </div>
  );
}
