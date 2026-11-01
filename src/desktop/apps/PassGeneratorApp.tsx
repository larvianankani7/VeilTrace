import { useState } from "react";

type Props = {
  onClose: () => void;
};

export const DEMO_PASS = "@1234M_#9";

export default function PassGeneratorApp({ onClose }: Props) {
  const [generatedPass, setGeneratedPass] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  function handleGenerate() {
    setGeneratedPass(DEMO_PASS);
    setCopied(false);
  }

  function handleCopy() {
    if (!generatedPass) return;
    navigator.clipboard?.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Password Generator">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // PASS-GENERATOR_PRJ</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-sim-app vt-pass-gen-container">
        <p className="vt-explorer-kicker">SECURE CREDENTIAL GENERATION</p>
        <h2>Generate Pass</h2>
        <p className="vt-muted-text">
          Generate an encrypted temporary credential token for identity verification. Save the generated pass in <code>key-vault_prj</code> before authenticating in <code>login_prj</code>.
        </p>

        <div className="vt-pass-gen-actions">
          <button type="button" onClick={handleGenerate} className="vt-btn-primary">
            Generate Pass
          </button>
        </div>

        {generatedPass && (
          <div className="vt-pass-display-box">
            <label htmlFor="generated-pass-input">Generated Passphrase:</label>
            <div className="vt-pass-field-wrap">
              <input
                id="generated-pass-input"
                type="text"
                readOnly
                value={generatedPass}
                className="vt-input-readonly"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="vt-btn-secondary"
                aria-label="Copy generated pass"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <p className="vt-safe-note">
              ⚠️ Credential ready. Now open <strong>key-vault_prj</strong> to store this pass into your security vault.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
