import { getLearningConcept, learningConcepts } from "../../data/learningConcepts";
import type { LearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  solvedPuzzleIds: string[];
  onClose: () => void;
};

// Maps puzzle IDs to corresponding learning concept IDs
const PUZZLE_TO_CONCEPT: Record<string, string> = {
  "atlas-places": "rate-limiting",
  "location-exposure": "hashing",
  "bloom-filter": "bloom-filter",
  "route-trace": "bloom-filter", // Screen 3 py.py fallback
  "token-cabinet": "access-token",
  "access-token": "access-token",
  "persona-hub": "caching",
  "caching": "caching",
  "footprint-log": "ciphertext",
  "ciphertext": "ciphertext",
  "race-condition": "race-condition",
  "permission-garden": "latency",
  "latency": "latency",
  "nearfield-devices": "cryptography",
  "cryptography": "cryptography",
  "echo-logs": "snowflake",
  "snowflake": "snowflake",
  "origin-gate": "cdn",
  "cdn": "cdn",
};

export default function ControlCenterApp({ solvedPuzzleIds, onClose }: Props) {
  // Determine all unlocked unique concept IDs from the player's real solved puzzles
  const unlockedConceptIds = Array.from(
    new Set(
      solvedPuzzleIds
        .map((puzzleId) => PUZZLE_TO_CONCEPT[puzzleId])
        .filter((conceptId): conceptId is string => Boolean(conceptId))
    )
  );

  const unlockedConcepts: LearningConcept[] = unlockedConceptIds
    .map((id) => getLearningConcept(id) ?? learningConcepts[id])
    .filter((concept): concept is LearningConcept => Boolean(concept));

  return (
    <section className="vt-location-flow vt-second-desktop vt-learnings-app" aria-label="Unlocked Learnings Directory">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // LEARNINGS — UNLOCKED SECURITY CONCEPTS</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-learnings-workspace">
        <header className="vt-learnings-header">
          <span className="vt-kicker-badge">EDUCATIONAL DIRECTORY // UNLOCKED KNOWLEDGE</span>
          <h2>Security Learnings</h2>
          <p className="vt-muted-text">
            Official educational reference archive containing all security and privacy concepts unlocked during your investigation.
          </p>
        </header>

        {unlockedConcepts.length === 0 ? (
          <div className="vt-learnings-empty">
            <span className="vt-empty-icon">🔒</span>
            <h3>No Learnings Unlocked Yet</h3>
            <p className="vt-muted-text">
              Investigate and contain active desktop exposures across the system to unlock and archive security learnings.
            </p>
          </div>
        ) : (
          <div className="vt-learnings-deck" role="list" aria-label="Unlocked security concepts">
            {unlockedConcepts.map((concept) => (
              <article key={concept.id} className="vt-learning-card" role="listitem">
                <div className="vt-learning-card-header">
                  <div className="vt-learning-badge">
                    <span>SECURITY CONCEPT // 0{concept.conceptNumber} OF 11</span>
                  </div>
                  <h3 className="vt-learning-card-title">{concept.topic}</h3>
                </div>

                <div className="vt-learning-card-content">
                  <LearningConceptView concept={concept} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
