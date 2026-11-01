import { GAME_CONFIG } from "../../game/gameConfig";

type Props = {
  solvedPuzzleIds: string[];
  totalRequired?: number;
  onClose: () => void;
};

export type LearningTaskItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  isCompleted: boolean;
};

// Preserved for integration tests
export type TaskItem = LearningTaskItem;

export function computeTaskStats(solvedPuzzleIds: string[], totalRequired: number = GAME_CONFIG.REQUIRED_FIXES) {
  const completed = solvedPuzzleIds.length;
  const remaining = Math.max(0, totalRequired - completed);
  return { completed, remaining, totalRequired };
}

// Exactly 11 security learnings (10 requested + 11th Rate Limiting from registry)
const LEARNING_CATALOG = [
  {
    id: "rate-limiting",
    name: "Rate Limiting",
    description: "Controls request rate to prevent abuse, overload, and brute-force attacks.",
    category: "Traffic Control / Maps",
    matches: ["atlas-places", "rate-limiting"],
  },
  {
    id: "hashing",
    name: "Hashing",
    description: "Turns sensitive data into fixed-length irreversible cryptographic fingerprints.",
    category: "Cryptography / Browser",
    matches: ["location-exposure", "hashing"],
  },
  {
    id: "bloom-filter",
    name: "Bloom Filter",
    description: "Fast, space-efficient probabilistic data structure for set membership testing.",
    category: "Data Structures / Python",
    matches: ["bloom-filter", "route-trace"],
  },
  {
    id: "access-token",
    name: "Access Token",
    description: "Temporary authorization ticket proving access rights without re-authenticating.",
    category: "Identity / Auth",
    matches: ["token-cabinet", "access-token"],
  },
  {
    id: "caching",
    name: "Caching",
    description: "Stores frequently needed records nearby for accelerated response latency.",
    category: "Performance / Storage",
    matches: ["persona-hub", "caching"],
  },
  {
    id: "latency",
    name: "Latency",
    description: "Measures the duration required for a network request to travel and receive a response.",
    category: "Network / Telemetry",
    matches: ["permission-garden", "latency", "permits"],
  },
  {
    id: "race-condition",
    name: "Race Condition",
    description: "Concurrency vulnerability when unsynchronized simultaneous actions alter shared state.",
    category: "Concurrency / Settings",
    matches: ["race-condition"],
  },
  {
    id: "ciphertext",
    name: "Ciphertext",
    description: "Unreadable encrypted output transformed from original plaintext using an encryption key.",
    category: "Cryptography / Logs",
    matches: ["footprint-log", "ciphertext"],
  },
  {
    id: "cryptography",
    name: "Cryptography",
    description: "Mathematical principles protecting message confidentiality, integrity, and non-repudiation.",
    category: "Defense / Ciphers",
    matches: ["nearfield-devices", "cryptography"],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    description: "Cloud-based data warehouse decoupling compute from storage for elastic big-data analysis.",
    category: "Cloud / Telemetry",
    matches: ["echo-logs", "snowflake"],
  },
  {
    id: "cdn",
    name: "CDN",
    description: "Geographically distributed edge server networks accelerating asset delivery.",
    category: "Infrastructure / Edge",
    matches: ["origin-gate", "cdn"],
  },
];

export default function TaskManagerApp({ solvedPuzzleIds, totalRequired = 11, onClose }: Props) {
  const learningItems: LearningTaskItem[] = LEARNING_CATALOG.map((item) => {
    const isCompleted = item.matches.some((matchId) => solvedPuzzleIds.includes(matchId));
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      isCompleted,
    };
  });

  const completedCount = learningItems.filter((i) => i.isCompleted).length;
  const totalCount = totalRequired;
  const pendingCount = Math.max(0, totalCount - completedCount);

  return (
    <section className="vt-location-flow vt-second-desktop vt-task-manager-app" aria-label="Task Manager Learning Progress">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // TASK-MANAGER_PRJ — LEARNING PROGRESS</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-task-panel">
        <header className="vt-task-header">
          <div className="vt-task-stats-row">
            <div className="vt-stat-badge is-completed">
              <span className="vt-stat-number">{completedCount}</span>
              <span className="vt-stat-label">COMPLETED LEARNINGS</span>
            </div>
            <div className="vt-stat-badge is-remaining">
              <span className="vt-stat-number">{pendingCount}</span>
              <span className="vt-stat-label">PENDING LEARNINGS</span>
            </div>
            <div className="vt-stat-badge is-total">
              <span className="vt-stat-number">{totalCount}</span>
              <span className="vt-stat-label">TOTAL LEARNINGS</span>
            </div>
          </div>
          <p className="vt-muted-text">
            Authoritative learning progress registry. Tracks real-time status of all 11 cybersecurity education modules.
          </p>
        </header>

        {/* Learning Items List */}
        <div className="vt-task-list" role="list" aria-label="Security learnings status list">
          {learningItems.map((item) => (
            <article
              key={item.id}
              role="listitem"
              className={`vt-task-row ${item.isCompleted ? "is-resolved" : "is-pending"}`}
            >
              <div className="vt-task-indicator" aria-hidden="true">
                {item.isCompleted ? "✓" : "○"}
              </div>

              <div className="vt-task-details">
                <div className="vt-task-eyebrow">
                  <span className="vt-task-category">{item.category}</span>
                  <span className={`vt-task-status-pill ${item.isCompleted ? "is-done" : "is-active"}`}>
                    {item.isCompleted ? "✓ COMPLETED" : "○ PENDING"}
                  </span>
                </div>
                <h3 className="vt-task-name">{item.name}</h3>
                <p className="vt-task-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
