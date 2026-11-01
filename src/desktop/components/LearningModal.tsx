import type { LearningConcept } from "../../data/learningConcepts";

type LearningModalProps = {
  concept: LearningConcept;
  onClose: () => void;
};

export function LearningConceptView({
  concept,
  onClose,
}: {
  concept: LearningConcept;
  onClose?: () => void;
}) {
  return (
    <div className="learning-modal__body" style={{ maxHeight: "none" }}>
      <div className="learning-modal__badge" style={{ marginBottom: "8px", width: "fit-content" }}>
        <span>SECURITY CONCEPT // 0{concept.conceptNumber} OF 11</span>
      </div>
      <h2 id="learning-concept-title" className="learning-modal__topic">
        {concept.topic}
      </h2>
      <div className="learning-modal__callout">
        <p className="learning-modal__summary">{concept.summary}</p>
      </div>
      <div className="learning-modal__details">
        <h4>Concept Overview</h4>
        {concept.id === "bloom-filter" ? (
          <div className="learning-explanation">
            <h3>🌸 Bloom Filter</h3>
            <p>Imagine a <strong>security guard with a super-fast checklist</strong>.</p>
            <div className="learning-example"><p>👤 “Is Rahul on the guest list?”</p><p>✅ Definitely not</p><p>🤔 Maybe</p></div>
            <p>A Bloom Filter works similarly. A website can quickly check whether a username might already exist:</p>
            <div className="learning-example"><p>👤 <code>Rahul</code> → 🤔 Maybe exists</p><p>👤 <code>Batman</code> → ❌ Definitely doesn't exist</p></div>
            <p><strong>“Maybe” can be wrong, but “Definitely not” is always reliable.</strong></p>
            <p>💻 This makes Bloom Filters extremely fast and memory-efficient.</p>
            <blockquote><strong>📌 Bloom Filter = A super-fast “maybe / definitely not” checker.</strong></blockquote>
          </div>
        ) : concept.id === "hashing" ? (
          <div className="learning-explanation">
            <h3>🔐 What is Hashing?</h3>
            <p><strong>Hashing turns data into a fixed-length fingerprint that is designed to be difficult to reverse.</strong></p>
            <h3>🧩 Imagine a special machine</h3>
            <div className="learning-example">
              <p>🍎 Apple → <code>A7F92K</code></p>
              <p>🍌 Banana → <code>B83X21</code></p>
            </div>
            <p>You can create a label from the original item, but you can't simply use the label to recover the original item.</p>
            <h3>💻 In the digital world</h3>
            <p>Before a password is stored, a secure system stores a password hash rather than the original password.</p>
            <div className="learning-example">
              <p>🔑 <code>MyPassword123</code></p>
              <p>↓ password-hashing algorithm + unique salt</p>
              <p>🔐 <code>8f4a...x92</code></p>
            </div>
            <p>🛡️ If a database is stolen, the attacker does not immediately see the original passwords.</p>
            <blockquote><strong>📌 Hashing = turning data into a fixed fingerprint that is difficult to reverse.</strong></blockquote>
            <p><strong>Remember:</strong> hashing is not encryption. Passwords should be stored using a password-hashing algorithm such as Argon2id, scrypt, or bcrypt—not a fast general-purpose hash alone.</p>
          </div>
        ) : concept.id === "rate-limiting" ? (
          <div className="learning-explanation">
            <h3>🛡️ What is Rate Limiting?</h3>
            <p>
              <strong>
                Rate limiting = putting a limit on how many requests
                someone can make within a certain amount of time.
              </strong>
            </p>
            <h3>🍕 Simple Example</h3>
            <p>Imagine a pizza shop:</p>
            <div className="learning-example">
              <p>👤 You → 🍕 Order</p>
              <p>👤 You → 🍕 Order</p>
              <p>👤 You → 🍕 Order</p>
              <p>👤 You → 🍕 Order</p>
              <p>👤 You → 🍕 Order</p>
            </div>
            <blockquote>
              <strong>
                “Maximum 5 orders per minute per person.” ⏱️
              </strong>
            </blockquote>
            <p>After 5 orders:</p>
            <p>
              🚫 <strong>
                “Too many requests. Please wait 1 minute.”
              </strong>
            </p>
            <p>That's <strong>rate limiting</strong>.</p>
            <h3>💻 In the digital world</h3>
            <p>Imagine someone trying to log into your account:</p>
            <div className="learning-example">
              <p>🔑 Login → ❌</p>
              <p>🔑 Login → ❌</p>
              <p>🔑 Login → ❌</p>
              <p>🔑 Login → ❌</p>
              <p>🔑 Login → ❌</p>
            </div>
            <p><strong>Without rate limiting:</strong></p>
            <p>🤖💨 <code>10,000 attempts/second</code> → 💥 Account under attack</p>
            <p><strong>With rate limiting:</strong></p>
            <p>🛡️ <strong>5 attempts/minute</strong> → 🚫 Slow them down</p>
            <p>So, in one line:</p>
            <blockquote>
              🚦 Rate limiting controls how often someone can ask a
              system to do something, preventing abuse, overload, and attacks.
            </blockquote>
            <p>
              <strong>Real-life analogy:</strong> 🚪 Security guard +
              queue + speed limit = Rate Limiting.
            </p>
          </div>
        ) : concept.id === "access-token" ? (
          <div className="learning-explanation">
            <h3>🎟️ Access Token</h3>
            <p>Imagine entering a concert. 🎤</p>
            <p>At the entrance:</p>
            <div className="learning-example">
              <p>👮 → “Show me your ticket.”</p>
              <p>🎟️ → “Here.”</p>
              <p>👮 → ✅ “You're allowed in.”</p>
            </div>
            <p>You don't have to prove your identity again every time you buy something.</p>
            <p>An <strong>access token</strong> works like that ticket.</p>
            <div className="learning-example">
              <p>🔑 Login → 🎟️ Get access token → 🚪 Access protected resources</p>
            </div>
            <p>For example:</p>
            <div className="learning-example">
              <p><code>Login → Token → Profile → Dashboard → Settings</code></p>
            </div>
            <p>When the ticket expires:</p>
            <div className="learning-example">
              <p>⏰ → 🎟️❌ → Login again</p>
            </div>
            <blockquote>
              <strong>📌 Access Token = A temporary digital ticket proving you’re allowed to access something.</strong>
            </blockquote>
          </div>
        ) : concept.id === "caching" ? (
          <div className="learning-explanation">
            <h3>⚡ Caching</h3>
            <p>Imagine your favorite restaurant. 🍔</p>
            <p>You order the same burger every day.</p>
            <p>Instead of the chef making it from scratch every time:</p>
            <div className="learning-example">
              <p>👨‍🍳 → 🍔 → 🏃 → You</p>
            </div>
            <p>The restaurant keeps some ready:</p>
            <div className="learning-example">
              <p>📦🍔 <strong>Already prepared</strong> → 🏃 → You</p>
            </div>
            <p>That's basically <strong>caching</strong>.</p>
            <h3>💻 Example:</h3>
            <p>You open YouTube:</p>
            <div className="learning-example">
              <p>📱 Request → 🗄️ Database → 🐌 → Video information</p>
            </div>
            <p>Next time:</p>
            <div className="learning-example">
              <p>📱 Request → ⚡ Cache → 🚀 → Video information</p>
            </div>
            <p>The system keeps <strong>frequently used information nearby</strong> so it doesn't have to fetch it from the slower source every time.</p>
            <blockquote>
              <strong>📌 Caching = Keeping commonly needed data nearby so it can be delivered faster.</strong>
            </blockquote>
          </div>
        ) : concept.id === "ciphertext" ? (
          <div className="learning-explanation">
            <h3>🔒 Ciphertext</h3>
            <p>Imagine writing a secret message:</p>
            <div className="learning-example">
              <p>📝 <strong>“MEET AT 5”</strong></p>
            </div>
            <p>Then you put it through a secret-code machine:</p>
            <div className="learning-example">
              <p>🔐 → <code>X7#K92@P</code></p>
            </div>
            <p>Now someone looking at it can't understand it.</p>
            <p>That scrambled message is <strong>ciphertext</strong>.</p>
            <div className="learning-example">
              <p>👤 Original message → 🔐 Encryption → 🔀 Ciphertext</p>
            </div>
            <p>And with the right key:</p>
            <div className="learning-example">
              <p>🔑 → 🔀 → 📝 Original message</p>
            </div>
            <blockquote>
              <strong>📌 Ciphertext = Encrypted, unreadable data created from the original message.</strong>
            </blockquote>
          </div>
        ) : concept.id === "race-condition" ? (
          <div className="learning-explanation">
            <h3>🏁 Race Condition</h3>
            <p>Imagine <strong>two people trying to grab the last pizza at exactly the same time.</strong> 🍕</p>
            <div className="learning-example">
              <p>👤 A → grabs pizza</p>
              <p>👤 B → grabs pizza</p>
            </div>
            <p>If the system doesn't properly control who gets it first, <strong>both might think they got it!</strong> 😵</p>
            <p>In computers, this happens when <strong>two actions access/change the same information at nearly the same time</strong>, causing an unexpected result.</p>
            <h3>💻 Example:</h3>
            <div className="learning-example">
              <p>🏦 Balance = ₹100</p>
              <p>👤 A withdraws ₹100</p>
              <p>👤 B withdraws ₹100</p>
              <p>💥 Both succeed → ₹200 withdrawn from ₹100!</p>
            </div>
            <blockquote>
              <strong>📌 Race Condition = When timing between simultaneous actions causes the system to behave incorrectly.</strong>
            </blockquote>
          </div>
        ) : concept.id === "latency" ? (
          <div className="learning-explanation">
            <h3>⏱️ Latency</h3>
            <p>Imagine ordering food. 🍕📱</p>
            <p>You click:</p>
            <div className="learning-example">
              <p><strong>“Order Pizza”</strong></p>
            </div>
            <p>Then...</p>
            <div className="learning-example">
              <p>⌛ 1 sec</p>
              <p>⌛ 2 sec</p>
              <p>⌛ 3 sec</p>
              <p>🍕 <strong>Arrives!</strong></p>
            </div>
            <p>Those <strong>3 seconds of waiting</strong> are like latency.</p>
            <p>In computers:</p>
            <div className="learning-example">
              <p>💻 You → 📡 → Server → 📡 → 💻 You</p>
            </div>
            <p>The time taken for the request to travel and get a response is <strong>latency</strong>.</p>
            <div className="learning-example">
              <p>⚡ <strong>10 ms</strong> → Very fast</p>
              <p>🐢 <strong>500 ms</strong> → Noticeable delay</p>
              <p>😴 <strong>5 seconds</strong> → Very slow</p>
            </div>
            <blockquote>
              <strong>📌 Latency = How long you have to wait for a response.</strong>
            </blockquote>
          </div>
        ) : (
          <p>{concept.description}</p>
        )}
      </div>

      {concept.recommendations && concept.recommendations.length > 0 && (
        <div className="learning-modal__recommendations">
          <h4>Defensive Best Practices</h4>
          <ul>
            {concept.recommendations.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {onClose && (
        <footer className="learning-modal__footer" style={{ background: "transparent", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "16px", padding: "12px 0 0" }}>
          <button
            type="button"
            className="learning-modal__acknowledge-btn"
            onClick={onClose}
          >
            UNDERSTOOD →
          </button>
        </footer>
      )}
    </div>
  );
}

export default function LearningModal({
  concept,
  onClose,
}: LearningModalProps) {
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
            <span>SECURITY CONCEPT // 0{concept.conceptNumber} OF 11</span>
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
        <LearningConceptView concept={concept} onClose={onClose} />
      </div>
    </div>
  );
}
