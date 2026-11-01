type WhiteboardLearning = {
  conceptId: string;
  puzzleId: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  analogy: string;
  flowchart: string[];
  connectedTo: string[];
};

const WHITEBOARD_KNOWLEDGE: WhiteboardLearning[] = [
  {
    conceptId: "rate-limiting",
    puzzleId: "atlas-places",
    title: "Rate Limiting",
    icon: "⏱️",
    color: "#38bdf8",
    explanation: "Controls request frequency within a window to stop brute-force attacks and resource exhaustion.",
    analogy: "Like a turnstile allowing one passenger every few seconds rather than letting a mob surge through.",
    flowchart: ["Client Request", "Rate Check Filter", "Pass or 429 Delay"],
    connectedTo: ["Latency", "Access Token"],
  },
  {
    conceptId: "location-exposure",
    puzzleId: "location-exposure",
    title: "Location Exposure",
    icon: "🌐",
    color: "#0ea5e9",
    explanation: "Applications and HTTP requests can unintentionally broadcast user coordinates via headers and metadata.",
    analogy: "Sending a postcard where the postmark and stamp reveal your exact physical doorstep.",
    flowchart: ["Browser Viewport", "Telemetry Headers", "Server Geo-Correlator"],
    connectedTo: ["CORS", "Rate Limiting"],
  },
  {
    conceptId: "bloom-filter",
    puzzleId: "bloom-filter",
    title: "Bloom Filter",
    icon: "🐍",
    color: "#10b981",
    explanation: "A space-efficient probabilistic data structure that tests set membership with zero false negatives.",
    analogy: "A nightclub bouncer with a memory trick: can say with 100% certainty if you are NOT on the guest list.",
    flowchart: ["Element Hash", "Bit Array Indices", "Definite No / Maybe Yes"],
    connectedTo: ["Hashing", "Caching"],
  },
  {
    conceptId: "access-token",
    puzzleId: "token-cabinet",
    title: "Access Token",
    icon: "🎟️",
    color: "#818cf8",
    explanation: "A temporary digital credential verifying identity without having to resend master passwords repeatedly.",
    analogy: "A concert wristband stamped at the entrance: show the wristband at every stage instead of your ID.",
    flowchart: ["Credentials", "Auth Server", "Signed JWT", "API Access"],
    connectedTo: ["Rate Limiting", "Cryptography"],
  },
  {
    conceptId: "caching",
    puzzleId: "persona-hub",
    title: "Caching",
    icon: "⚡",
    color: "#34d399",
    explanation: "Stores high-frequency data in rapid memory layers so slow database round-trips are avoided.",
    analogy: "A chef keeping sliced tomatoes on the prep counter rather than walking to the cellar for every burger.",
    flowchart: ["Request", "Cache Hit? -> Return", "Cache Miss -> DB Query -> Store"],
    connectedTo: ["CDN", "Bloom Filter"],
  },
  {
    conceptId: "ciphertext",
    puzzleId: "footprint-log",
    title: "Ciphertext",
    icon: "📜",
    color: "#a855f7",
    explanation: "Encrypted, scrambled output generated from plaintext using cryptographic keys.",
    analogy: "Writing 'MEET AT 5' and feeding it into an enigma cipher to produce unreadable characters 'X7#K92@P'.",
    flowchart: ["Plaintext Msg", "Cipher + Key", "Ciphertext", "Secure Transit"],
    connectedTo: ["Cryptography", "Access Token"],
  },
  {
    conceptId: "race-condition",
    puzzleId: "race-condition",
    title: "Race Condition",
    icon: "📡",
    color: "#f59e0b",
    explanation: "A concurrency bug occurring when the timing or sequence of asynchronous actions causes erratic behavior.",
    analogy: "Two people simultaneously grabbing the last box on a shelf before the inventory count updates.",
    flowchart: ["Thread A Read", "Thread B Read", "Thread A Write", "Thread B Overwrite (Corrupt)"],
    connectedTo: ["Rate Limiting", "Latency"],
  },
  {
    conceptId: "latency",
    puzzleId: "permission-garden",
    title: "Network Latency",
    icon: "🛡️",
    color: "#f43f5e",
    explanation: "The transit time required for a packet to travel across nodes from origin to destination and return.",
    analogy: "The round-trip delay between ordering a delivery and hearing the courier ring your doorbell.",
    flowchart: ["Client Probe", "Transit Hops", "Server Processing", "ACK Response"],
    connectedTo: ["CDN", "Rate Limiting"],
  },
  {
    conceptId: "cryptography",
    puzzleId: "nearfield-devices",
    title: "Cryptography",
    icon: "🔐",
    color: "#38bdf8",
    explanation: "Using mathematical algorithms to guarantee confidentiality, message integrity, and identity authentication.",
    analogy: "Putting your secret letter into a heavy locked box where only the recipient holds the matching key.",
    flowchart: ["Secret Data", "Math Transform", "Locked Container", "Key Holder Open"],
    connectedTo: ["Ciphertext", "Access Token"],
  },
  {
    conceptId: "snowflake",
    puzzleId: "echo-logs",
    title: "Snowflake Cloud Warehouse",
    icon: "❄️",
    color: "#0ea5e9",
    explanation: "A multi-cluster shared-data platform separating storage from compute for elastic analytical queries.",
    analogy: "A massive central distribution warehouse with independent truck fleets that scale up or down on demand.",
    flowchart: ["Big Data (10M Users)", "Cloud Storage", "Elastic Compute", "Actionable Insights"],
    connectedTo: ["Caching", "CDN"],
  },
  {
    conceptId: "cdn",
    puzzleId: "origin-gate",
    title: "Content Delivery Network (CDN)",
    icon: "🌍",
    color: "#c084fc",
    explanation: "A worldwide network of edge proxy servers delivering content from nodes physically closest to users.",
    analogy: "A national pizza chain having regional kitchens in Delhi, Mumbai, and Kolkata instead of one slow kitchen.",
    flowchart: ["User in Mumbai", "Nearby Edge Cache", "Instant Static Assets", "Zero Lag"],
    connectedTo: ["Caching", "Latency"],
  },
];

type Props = {
  solvedPuzzleIds: string[];
  onClose: () => void;
};

export default function WhiteboardApp({ solvedPuzzleIds, onClose }: Props) {
  function isUnlocked(puzzleId: string): boolean {
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

  const unlockedLearnings = WHITEBOARD_KNOWLEDGE.filter((k) => isUnlocked(k.puzzleId));

  return (
    <div className="vt-whiteboard-window" aria-label="Digital Whiteboard — Unlocked Learnings">
      {/* Top Bar */}
      <header className="vt-whiteboard-topbar">
        <div className="vt-wb-title-wrap">
          <span className="vt-wb-icon">📋</span>
          <strong>VEILTRACE // ARCHITECTURAL WHITEBOARD — UNLOCKED CONCEPTS MATRIX</strong>
        </div>
        <div className="vt-wb-topbar-right">
          <span className="vt-wb-stats-badge">
            {unlockedLearnings.length} / 11 CONCEPTS PINNED
          </span>
          <span className="vt-wb-pause-notice">⏸️ Timer & Siren Paused</span>
          <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
            Return ✕
          </button>
        </div>
      </header>

      {/* Main Whiteboard Canvas */}
      <main className="vt-whiteboard-canvas">
        <div className="vt-wb-grid-overlay" aria-hidden="true" />

        {unlockedLearnings.length === 0 ? (
          <div className="vt-whiteboard-empty">
            <span className="empty-icon">📌</span>
            <h3>No Cybersecurity Concepts Pinned Yet</h3>
            <p>
              Investigate the applications across Screens 1 through 7 and contain traces to pin educational concept diagrams onto this whiteboard.
            </p>
          </div>
        ) : (
          <div className="vt-whiteboard-cards-grid">
            {unlockedLearnings.map((item, index) => (
              <article
                key={item.conceptId}
                className="vt-wb-sticky-card"
                style={{ borderTopColor: item.color }}
              >
                {/* Pin Head */}
                <div className="vt-wb-card-pin" aria-hidden="true">
                  <span className="pin-head" style={{ backgroundColor: item.color }} />
                </div>

                <div className="vt-wb-card-header">
                  <span className="vt-wb-card-icon">{item.icon}</span>
                  <div>
                    <span className="vt-wb-card-order">MODULE #{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="vt-wb-card-title">{item.title}</h3>
                  </div>
                </div>

                <p className="vt-wb-card-desc">{item.explanation}</p>

                {/* Real-World Analogy */}
                <div className="vt-wb-analogy-box">
                  <strong>💡 Real-World Analogy:</strong>
                  <p>{item.analogy}</p>
                </div>

                {/* Micro Flowchart */}
                <div className="vt-wb-flowchart">
                  <span className="flowchart-label">DATA FLOW / SYSTEM ARCHITECTURE:</span>
                  <div className="flowchart-steps">
                    {item.flowchart.map((step, i) => (
                      <span key={i} className="flowchart-step-wrap">
                        <span className="flowchart-bubble">{step}</span>
                        {i < item.flowchart.length - 1 && (
                          <span className="flowchart-arrow">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Concepts */}
                <div className="vt-wb-connected-row">
                  <span className="connected-lbl">CONNECTED:</span>
                  {item.connectedTo.map((c) => (
                    <span key={c} className="connected-tag">{c}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="vt-whiteboard-footer">
        <span>🔒 Read-only whiteboard. Displays only cybersecurity lessons validated during active gameplay.</span>
      </footer>
    </div>
  );
}
