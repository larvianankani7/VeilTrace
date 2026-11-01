import { useMemo } from "react";
import { learningConcepts } from "../data/learningConcepts";
import "../styles/insights.css";

export type CompletedGameStats = {
  outcome: "escape" | "death";
  solvedCount: number;
  solvedPuzzleIds: string[];
  remainingSeconds: number;
};

type Props = {
  onBack: () => void;
  stats?: CompletedGameStats | null;
};

export const TRACE_LEARNING_MAP = [
  {
    id: "atlas-places",
    traceNumber: 1,
    title: "Maps / Atlas Places",
    screen: "Screen 1",
    action: "Deactivated continuous live location beaconing",
    learningId: "rate-limiting",
    learningTitle: "Rate Limiting",
    puzzleId: "atlas-places",
    conceptMatches: ["atlas-places", "rate-limiting"],
    icon: "⏱️",
    technicalExplanation:
      "Rate limiting caps the number of requests a client or IP address can issue within a given time window (e.g. 10 attempts per minute using a Leaky Bucket or Token Bucket algorithm).",
    realWorldExample:
      "A concert ticket gate that admits one person every 5 seconds rather than allowing thousands to crush through the door at the same instant.",
    keyConcepts: [
      "Token Bucket Algorithm",
      "HTTP 429 Too Many Requests",
      "Brute-Force & Credential Stuffing Prevention",
      "Server Resource Protection",
    ],
    whyItMatters:
      "Prevents attackers from overwhelming endpoints with automated scripts, guessing passwords, or causing denial-of-service outages.",
  },
  {
    id: "location-exposure",
    traceNumber: 2,
    title: "Chrome Browser Telemetry",
    screen: "Screen 2",
    action: "Severed exposed simulated browser headers",
    learningId: "hashing",
    learningTitle: "Hashing",
    puzzleId: "location-exposure",
    conceptMatches: ["location-exposure", "hashing"],
    icon: "🔐",
    technicalExplanation:
      "A one-way cryptographic algorithm that transforms arbitrarily sized input into a fixed-length digest, designed to be computationally infeasible to reverse or collide.",
    realWorldExample:
      "Stamping an indelible fingerprint from an original painting that can verify authenticity, but from which the original artwork cannot be recreated.",
    keyConcepts: [
      "One-Way Function Property",
      "Collision Resistance & Avalanche Effect",
      "Salted Hashes (Argon2id, bcrypt, scrypt)",
      "Digest Length Uniformity",
    ],
    whyItMatters:
      "Ensures that even if user authentication databases are breached, plaintext passwords cannot be immediately recovered.",
  },
  {
    id: "bloom-filter",
    traceNumber: 3,
    title: "Python Workspace (py.py)",
    screen: "Screen 3",
    action: "Deployed probabilistic Bloom mask with zero false negatives",
    learningId: "bloom-filter",
    learningTitle: "Bloom Filter",
    puzzleId: "bloom-filter",
    conceptMatches: ["bloom-filter", "route-trace"],
    icon: "🐍",
    technicalExplanation:
      "A space-efficient probabilistic data structure based on multiple hash functions mapping elements to a shared bit array. Guarantees zero false negatives with bounded false positives.",
    realWorldExample:
      "A nightclub doorman with a compact quick-lookup list who can definitively verify if someone is NOT an invited VIP.",
    keyConcepts: [
      "Probabilistic Membership Testing",
      "k Independent Hash Functions",
      "Bit Array Allocation",
      "Zero False Negatives Guarantee",
    ],
    whyItMatters:
      "Enables ultra-fast security pre-checks (such as scanning whether a URL is on a malicious blacklist) without querying slow disks for non-matches.",
  },
  {
    id: "token-cabinet",
    traceNumber: 4,
    title: "Token Cabinet & Login Session",
    screen: "Screen 4",
    action: "Revoked exposed token and severed live location broadcast",
    learningId: "access-token",
    learningTitle: "Access Token",
    puzzleId: "token-cabinet",
    conceptMatches: ["token-cabinet", "access-token"],
    icon: "🎟️",
    technicalExplanation:
      "A cryptographically signed, short-lived digital credential (such as a JWT) proving authentication and authorization claims without re-transmitting master credentials.",
    realWorldExample:
      "An amusement park wristband inspected by ride operators so visitors don't have to show their photo ID and payment receipt on every ride.",
    keyConcepts: [
      "JSON Web Tokens (JWT)",
      "Stateless Authorization",
      "Token Expiration & Refresh Cycles",
      "Cryptographic Signature Verification",
    ],
    whyItMatters:
      "Eliminates the danger of repeatedly sending plaintext passwords over the wire, and enables immediate token revocation during breaches.",
  },
  {
    id: "persona-hub",
    traceNumber: 5,
    title: "Personal Hub / Location Cache",
    screen: "Screen 4",
    action: "Updated registered location and committed to secure cache buffer",
    learningId: "caching",
    learningTitle: "Caching",
    puzzleId: "persona-hub",
    conceptMatches: ["persona-hub", "caching"],
    icon: "⚡",
    technicalExplanation:
      "Storing high-frequency computational results or remote assets in ultra-fast volatile memory (RAM/Redis) to eliminate redundant backend database queries.",
    realWorldExample:
      "A short-order cook keeping sliced burger buns on the counter instead of walking downstairs to the storeroom every time a customer orders.",
    keyConcepts: [
      "Cache Hit / Miss Ratio",
      "Time-To-Live (TTL)",
      "Cache Invalidation & Eviction (LRU)",
      "Hot Spot Mitigation",
    ],
    whyItMatters:
      "Protects backend infrastructure from crashing during traffic surges while drastically cutting user response times.",
  },
  {
    id: "footprint-log",
    traceNumber: 6,
    title: "Footprint Log Diagnostics",
    screen: "Screen 5",
    action: "Transformed plaintext activity logs into unreadable ciphertext",
    learningId: "ciphertext",
    learningTitle: "Ciphertext",
    puzzleId: "footprint-log",
    conceptMatches: ["footprint-log", "ciphertext"],
    icon: "📜",
    technicalExplanation:
      "The unreadable, pseudo-random output produced when plaintext data is transformed by a mathematical encryption algorithm under the control of a cryptographic key.",
    realWorldExample:
      "Scrambling 'MEET AT 5' through an Enigma cipher so anyone intercepting the paper only sees 'X7#K92@P'.",
    keyConcepts: [
      "Symmetric / Asymmetric Ciphers",
      "AES-256-GCM & ChaCha20",
      "Entropy & Indistinguishability",
      "Key Management & Protection",
    ],
    whyItMatters:
      "Guarantees that even if physical hard drives or communication cables are tapped, sensitive data remains entirely indecipherable without the key.",
  },
  {
    id: "race-condition",
    traceNumber: 7,
    title: "Route Trace Relay",
    screen: "Screen 5",
    action: "Enforced atomic transaction locks to eliminate concurrent race window",
    learningId: "race-condition",
    learningTitle: "Race Condition",
    puzzleId: "race-condition",
    conceptMatches: ["race-condition"],
    icon: "📡",
    technicalExplanation:
      "A concurrency defect occurring when multiple execution threads access and mutate shared state without proper synchronization or mutual exclusion locks.",
    realWorldExample:
      "Two shoppers simultaneously clicking 'Buy Last Item' when inventory is 1; without database transaction locks, both orders succeed.",
    keyConcepts: [
      "Time-of-Check to Time-of-Use (TOCTOU)",
      "Mutual Exclusion (Mutex) & Locks",
      "Atomic Operations",
      "Thread Concurrency & Asynchrony",
    ],
    whyItMatters:
      "Adversaries exploit race windows to double-spend funds, bypass privilege verification, or write to unallocated memory buffers.",
  },
  {
    id: "permission-garden",
    traceNumber: 8,
    title: "Permission Garden",
    screen: "Screen 5",
    action: "Revoked background telemetry permits and diagnosed network latency",
    learningId: "latency",
    learningTitle: "Latency",
    puzzleId: "permission-garden",
    conceptMatches: ["permission-garden", "latency", "permits"],
    icon: "🛡️",
    technicalExplanation:
      "The duration required for a network data packet to traverse physical fiber, routing switches, and edge infrastructure from origin to receiver and back (Round Trip Time).",
    realWorldExample:
      "The time delay between shouting into a canyon and hearing your echo bounce off the distant rock wall.",
    keyConcepts: [
      "Round Trip Time (RTT)",
      "Physical Propagation Delay",
      "Routing Hops & Queueing Jitter",
      "Network Profiling & RTT Probing",
    ],
    whyItMatters:
      "High latency degrades security response pipelines, slows intrusion detection telemetry, and invites timing side-channel attacks.",
  },
  {
    id: "nearfield-devices",
    traceNumber: 9,
    title: "Nearby Devices / RF Isolator",
    screen: "Screen 7",
    action: "Severed RF transceivers and enforced cryptographic shielding",
    learningId: "cryptography",
    learningTitle: "Cryptography",
    puzzleId: "nearfield-devices",
    conceptMatches: ["nearfield-devices", "cryptography"],
    icon: "🔐",
    technicalExplanation:
      "The foundational discipline of applying advanced mathematical algorithms to secure communication channels against adversarial eavesdropping, tampering, and spoofing.",
    realWorldExample:
      "Placing a secret contract inside an unbreakable steel box and mailing it, knowing only the recipient possesses the unique physical key.",
    keyConcepts: [
      "Confidentiality, Integrity, Availability",
      "Public Key Infrastructure (PKI)",
      "Digital Signatures & Non-Repudiation",
      "Zero-Knowledge Proofs",
    ],
    whyItMatters:
      "Underpins every aspect of modern digital society — from TLS web encryption and password vaults to blockchain and sovereign defense networks.",
  },
  {
    id: "echo-logs",
    traceNumber: 10,
    title: "Echo Logs Cloud Archive",
    screen: "Screen 7",
    action: "Revoked unauthorized admin permits and isolated cloud telemetry",
    learningId: "snowflake",
    learningTitle: "Snowflake",
    puzzleId: "echo-logs",
    conceptMatches: ["echo-logs", "snowflake"],
    icon: "❄️",
    technicalExplanation:
      "A modern cloud analytics platform utilizing a multi-cluster shared-data architecture that completely decouples elastic computing power from persistent cloud object storage.",
    realWorldExample:
      "An automated mega-warehouse storing 500 million inventory crates with independent robotic crane teams that dynamically deploy when demand spikes.",
    keyConcepts: [
      "Decoupled Storage & Compute",
      "Micro-Partitioning & Clustering",
      "Role-Based Access Control (RBAC)",
      "Elastic Auto-Scaling Virtual Warehouses",
    ],
    whyItMatters:
      "Allows cybersecurity teams to store massive petabyte-scale SIEM telemetry logs affordably and execute complex threat-hunting queries in seconds.",
  },
  {
    id: "origin-gate",
    traceNumber: 11,
    title: "Origin Gate Edge Shield",
    screen: "Screen 7",
    action: "Purged permissive CORS wildcards and secured CDN edge cache",
    learningId: "cdn",
    learningTitle: "CDN",
    puzzleId: "origin-gate",
    conceptMatches: ["origin-gate", "cdn"],
    icon: "🌍",
    technicalExplanation:
      "A globally distributed network of reverse proxy edge servers that cache static multimedia, scripts, and HTML pages in points-of-presence (PoPs) physically adjacent to users.",
    realWorldExample:
      "A pizza restaurant chain setting up express kitchens in Delhi, Mumbai, Bangalore, and Kolkata instead of trucking every order from one kitchen in Delhi.",
    keyConcepts: [
      "Edge Caching & PoPs",
      "Anycast DNS Routing",
      "DDoS Edge Mitigation",
      "SSL/TLS Edge Termination",
    ],
    whyItMatters:
      "Dramatically reduces origin server load, absorbs multi-gigabit DDoS attacks at the network perimeter, and accelerates global web delivery.",
  },
];

export default function InsightsDashboard({ onBack, stats }: Props) {
  const solvedPuzzles = useMemo(() => stats?.solvedPuzzleIds ?? [], [stats]);

  const tracesState = useMemo(() => {
    return TRACE_LEARNING_MAP.map((item) => {
      const isCompleted = item.conceptMatches.some((matchId) =>
        solvedPuzzles.includes(matchId),
      );
      return {
        ...item,
        isCompleted,
      };
    });
  }, [solvedPuzzles]);

  const totalTracesSolved = useMemo(() => {
    if (stats?.solvedCount !== undefined) return stats.solvedCount;
    return tracesState.filter((t) => t.isCompleted).length;
  }, [stats, tracesState]);

  const totalLearningsUnlocked = useMemo(() => {
    return tracesState.filter((t) => t.isCompleted).length;
  }, [tracesState]);

  const progressPercent = Math.round((totalTracesSolved / 11) * 100);

  const outcomeTitle =
    stats?.outcome === "escape"
      ? "ESCAPE OUTCOME ACHIEVED · BREACH NEUTRALIZED"
      : stats?.outcome === "death"
        ? "CONTAINMENT EXPIRED · TOTAL EXPOSURE FAILURE"
        : "POST-INVESTIGATION SECURITY DOSSIER";

  const outcomeClass =
    stats?.outcome === "escape"
      ? "is-escape"
      : stats?.outcome === "death"
        ? "is-death"
        : "is-neutral";

  return (
    <div
      className="vt-insights-dashboard"
      aria-label="Cybersecurity Insights Educational Dashboard"
    >
      {/* Top Header */}
      <header className="vt-insights-topbar">
        <div className="vt-insights-title-left">
          <span className="vt-insights-shield-logo" aria-hidden="true">
            🛡️
          </span>
          <div>
            <h1>VEILTRACE // INVESTIGATION INSIGHTS & DOSSIER</h1>
            <p>11 Core Security Concepts & Architectural Defense Principles</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="vt-insights-back-btn"
          aria-label="Return to Main Menu"
        >
          ← Return to Main Menu
        </button>
      </header>

      {/* Main Content Area */}
      <main className="vt-insights-content">
        {/* Outcome Banner Card */}
        <section
          className={`vt-insights-outcome-banner ${outcomeClass}`}
          role="status"
        >
          <div className="vt-outcome-left">
            <span className="vt-outcome-badge">
              {stats?.outcome === "escape"
                ? "MISSION COMPLETE"
                : stats?.outcome === "death"
                  ? "PROTOCOL FAILED"
                  : "SESSION SUMMARY"}
            </span>
            <h2 className="vt-outcome-heading">{outcomeTitle}</h2>
            <p className="vt-outcome-subtext">
              {stats?.outcome === "escape"
                ? "All critical telemetry leaks severed. Emergency destruct protocol aborted."
                : stats?.outcome === "death"
                  ? "Ten-minute containment timer elapsed before all eleven traces could be contained."
                  : "Review the player's authenticated trace resolution and unlocked learning modules."}
            </p>
          </div>

          <div className="vt-outcome-stats-row">
            <div className="vt-stat-box">
              <span className="vt-stat-kicker">TRACES SOLVED</span>
              <strong className="vt-stat-val">
                {totalTracesSolved} <span>/ 11</span>
              </strong>
            </div>
            <div className="vt-stat-box">
              <span className="vt-stat-kicker">LEARNINGS UNLOCKED</span>
              <strong className="vt-stat-val">
                {totalLearningsUnlocked} <span>/ 11</span>
              </strong>
            </div>
            <div className="vt-stat-box">
              <span className="vt-stat-kicker">CONTAINMENT PROGRESS</span>
              <strong className="vt-stat-val">{progressPercent}%</strong>
            </div>
          </div>
        </section>

        {/* Section 1: Completed Traces Telemetry Dossier */}
        <section
          className="vt-insights-section-block"
          aria-label="Investigation Traces Status"
        >
          <div className="vt-section-header">
            <span className="vt-section-tag">INVESTIGATION TELEMETRY</span>
            <h3>Critical Traces Status (11 Modules)</h3>
          </div>

          <div className="vt-traces-table-card">
            <table className="vt-traces-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>TRACE SERVICE</th>
                  <th>ORIGIN</th>
                  <th>REMEDIATION ACTION</th>
                  <th>SECURITY STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tracesState.map((trace) => (
                  <tr
                    key={trace.id}
                    className={trace.isCompleted ? "is-resolved" : "is-pending"}
                  >
                    <td className="vt-td-num">
                      0{trace.traceNumber}
                    </td>
                    <td className="vt-td-title">
                      <strong>{trace.title}</strong>
                    </td>
                    <td className="vt-td-screen">{trace.screen}</td>
                    <td className="vt-td-action">{trace.action}</td>
                    <td className="vt-td-status">
                      {trace.isCompleted ? (
                        <span className="vt-status-pill is-resolved">
                          ✓ RESOLVED
                        </span>
                      ) : (
                        <span className="vt-status-pill is-pending">
                          ⚠ PENDING
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Security Learnings Modules */}
        <section
          className="vt-insights-section-block"
          aria-label="Unlocked Security Learnings"
        >
          <div className="vt-section-header">
            <span className="vt-section-tag">CYBERSECURITY CURRICULUM</span>
            <h3>Security Learnings & Architectural Knowledge</h3>
            <p className="vt-section-desc">
              Only concepts uncovered during your containment session are
              unlocked below.
            </p>
          </div>

          <div className="vt-insights-grid">
            {tracesState.map((item) => {
              const conceptData = learningConcepts[item.learningId];
              return (
                <article
                  key={item.id}
                  className={`vt-insight-card ${item.isCompleted ? "is-unlocked" : "is-locked"}`}
                >
                  <div className="vt-insight-header">
                    <span className="vt-insight-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div className="vt-insight-title-group">
                      <span className="vt-insight-badge">
                        CONCEPT #0{item.traceNumber} //{" "}
                        {item.isCompleted ? "UNLOCKED" : "LOCKED"}
                      </span>
                      <h2 className="vt-insight-title">{item.learningTitle}</h2>
                    </div>
                  </div>

                  {item.isCompleted ? (
                    <>
                      {/* Concept Summary Callout */}
                      <div className="vt-insight-section vt-insight-summary">
                        <h4>SUMMARY</h4>
                        <p>{conceptData?.summary ?? item.technicalExplanation}</p>
                      </div>

                      {/* Technical Definition */}
                      <div className="vt-insight-section">
                        <h4>TECHNICAL ARCHITECTURE</h4>
                        <p>{item.technicalExplanation}</p>
                      </div>

                      {/* Real World Example */}
                      <div className="vt-insight-section vt-insight-analogy">
                        <h4>REAL-WORLD ANALOGY</h4>
                        <p>💡 {item.realWorldExample}</p>
                      </div>

                      {/* Key Concepts Tags */}
                      <div className="vt-insight-section">
                        <h4>CORE PRINCIPLES</h4>
                        <div className="vt-insight-tags">
                          {item.keyConcepts.map((tag) => (
                            <span key={tag} className="vt-concept-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Why It Matters */}
                      <div className="vt-insight-footer">
                        <strong>DEFENSE VALUE:</strong>
                        <p>{item.whyItMatters}</p>
                      </div>
                    </>
                  ) : (
                    <div className="vt-insight-locked-state">
                      <span className="vt-lock-icon" aria-hidden="true">
                        🔒
                      </span>
                      <h4>CONCEPT LOCKED</h4>
                      <p>
                        Resolve <strong>{item.title}</strong> during the
                        containment investigation to unlock this cybersecurity
                        learning module.
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="vt-insights-footer-bar">
        <span>
          VEILTRACE Cybersecurity Education Initiative · Official Personnel
          Debrief
        </span>
      </footer>
    </div>
  );
}
