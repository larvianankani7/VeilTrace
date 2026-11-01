import { useState } from "react";
import { PROFILE_DATA } from "../../data/profileData";

type Props = {
  savedPassword: string | null;
  onSavePassword: (password: string) => void;
  onOpenLearning?: () => void;
  onClose: () => void;
};

export default function KeyVaultApp({
  savedPassword,
  onSavePassword,
  onOpenLearning,
  onClose,
}: Props) {
  const [passwordInput, setPasswordInput] = useState(savedPassword || "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = passwordInput.trim();
    if (!trimmed) {
      setIsSuccess(false);
      setFeedback("Password cannot be empty. Please enter your generated passphrase.");
      return;
    }

    onSavePassword(trimmed);
    setIsSuccess(true);
    setFeedback("Authentication key secured in Key Vault. Login validation active.");
  }

  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Key Vault">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // KEY-VAULT_PRJ</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-sim-app vt-vault-container">
        <p className="vt-explorer-kicker">LOCAL CREDENTIAL STORAGE</p>
        <h2>Key Vault</h2>
        <p className="vt-muted-text">
          Store authorized credentials in local memory. Authenticate using these vault credentials inside <code>login_prj</code>.
        </p>

        <form onSubmit={handleSave} className="vt-vault-form">
          <div className="vt-form-group">
            <label htmlFor="vault-email">Account Identifier (Read-Only):</label>
            <input
              id="vault-email"
              type="text"
              readOnly
              value={PROFILE_DATA.email}
              className="vt-input-readonly"
            />
          </div>

          <div className="vt-form-group">
            <label htmlFor="vault-password-input">Vault Security Passphrase:</label>
            <input
              id="vault-password-input"
              type="password"
              placeholder="Paste or enter generated pass..."
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setFeedback(null);
              }}
              className="vt-input-text"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="vt-btn-primary">
            Save Passphrase
          </button>
        </form>

        {feedback && (
          <p
            className={`vt-status-feedback ${isSuccess ? "is-success" : "is-error"}`}
            role="status"
          >
            {feedback}
          </p>
        )}

        {savedPassword && !feedback && (
          <p className="vt-safe-note">
            🔐 A passphrase is currently saved in this vault. You may overwrite it at any time.
          </p>
        )}

        {(savedPassword || isSuccess) && onOpenLearning && (
          <div style={{ marginTop: "16px" }}>
            <button
              type="button"
              onClick={onOpenLearning}
              className="vt-btn-secondary vt-btn-continue-learning"
              aria-label="Continue to Learning"
            >
              Continue to Learning →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
