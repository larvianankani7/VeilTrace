import type { LearningConcept } from "../data/learningConcepts";

type LearningModalProps = {
  concept: LearningConcept;
  onClose: () => void;
};

export default function LearningModal({
  concept,
  onClose,
}: LearningModalProps) {
  const isRateLimiting = concept.id === "rate-limiting";

  return (
    <div
      className="learning-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="learning-concept-title"
    >
      <div className="learning-modal">
        <header className="learning-modal__header">
          <div className="learning-modal__badge">
            <span>ACHIEVEMENT UNLOCKED · SECURITY CONCEPT // 01 OF 11</span>
          </div>

          <button
            type="button"
            className="learning-modal__close"
            onClick={onClose}
            aria-label="Close concept details"
          >
            ×
          </button>
        </header>

        <div className="learning-modal__body">
          <div className="learning-success-banner">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>TRACE UNLOCKED</strong>
              <p>You found a security weakness and learned how to recognize it.</p>
            </div>
          </div>

          <h2 id="learning-concept-title" className="learning-modal__topic">
            {concept.topic}
          </h2>

          <div className="learning-modal__callout">
            <p className="learning-modal__summary">{concept.summary}</p>
          </div>

          {isRateLimiting && (
            <section className="learning-friendly-example">
              <h3>💡 Imagine this</h3>

              <div className="learning-example-flow">
                <div className="learning-example-step">
                  <span aria-hidden="true">👤</span>
                  <strong>You try to log in</strong>
                  <p>You enter your password a few times.</p>
                </div>

                <span className="learning-example-arrow" aria-hidden="true">
                  →
                </span>

                <div className="learning-example-step">
                  <span aria-hidden="true">🛡️</span>
                  <strong>The service sets a limit</strong>
                  <p>Too many attempts? It asks you to wait.</p>
                </div>

                <span className="learning-example-arrow" aria-hidden="true">
                  →
                </span>

                <div className="learning-example-step">
                  <span aria-hidden="true">🔒</span>
                  <strong>Abuse is slowed down</strong>
                  <p>Automated guessing becomes harder.</p>
                </div>
              </div>

              <p className="learning-example-takeaway">
                <strong>In simple words:</strong> Rate limiting is like a queue
                with a speed limit. It stops one person or program from
                repeatedly demanding attention too quickly.
              </p>
            </section>
          )}

          <div className="learning-modal__details">
            <h4>What this means</h4>
            <p>{concept.description}</p>
          </div>

          {concept.recommendations.length > 0 && (
            <div className="learning-modal__recommendations">
              <h4>How to stay safer</h4>
              <ul>
                {concept.recommendations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="learning-modal__footer">
          <button
            type="button"
            className="learning-modal__acknowledge-btn"
            onClick={onClose}
          >
            GOT IT · CONTINUE →
          </button>
        </footer>
      </div>
    </div>
  );
}
