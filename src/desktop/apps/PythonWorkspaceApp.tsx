import { useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function PythonWorkspaceApp({ isSolved, onSolve, onClose }: Props) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalTabOpen, setTerminalTabOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalMessage, setTerminalMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  // If already solved, show ONLY the Bloom Filter learning explanation!
  if (isSolved) {
    const concept = getLearningConcept("bloom-filter");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>VISUAL STUDIO CODE // py.py — SECURITY CONCEPT</strong>
          <button type="button" onClick={onClose}>← Back to desktop</button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  function handleCommandSubmit() {
    if (terminalCommand.trim() !== "py --hide_loc") {
      setHasError(true);
      setTerminalMessage("Command not recognized. Check the note above and try again.");
      return;
    }

    setHasError(false);
    setTerminalMessage("Location trace disabled. Trace secured.");
    onSolve();
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-python-workspace">
      <div className="vt-second-topbar">
        <strong>VISUAL STUDIO CODE // py.py</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <div className="vt-code-window vt-python-code-window">
        <aside className="vt-vscode-explorer">
          <b>EXPLORER</b>
          <p>⌄ DEVOPS</p>
          <p className="vt-python-file-active">🐍 py.py</p>
          <p>　📁 projects</p>
          <div className="vt-vscode-note">
            <strong>SECURITY NOTE</strong>
            <p>
              This script exposes a location hint associated with M. Open Terminal, select New Terminal yourself, then run:
            </p>
            <code>py --hide_loc</code>
          </div>
        </aside>

        <div className="vt-code-main">
          <div className="vt-code-tab">
            <span>🐍 py.py</span>
            <span>●</span>
          </div>

          <pre className="vt-python-source">
            <span className="code-line-no">1</span> <span className="code-purple">import</span> <span className="code-cyan">json</span>{"\n"}
            <span className="code-line-no">2</span> <span className="code-purple">from</span> <span className="code-cyan">pathlib</span> <span className="code-purple">import</span> <span className="code-yellow">Path</span>{"\n\n"}
            <span className="code-line-no">4</span> <span className="code-comment"># M's location trace (simulated training data)</span>{"\n"}
            <span className="code-line-no">5</span> <span className="code-variable">profile</span> = {"{"}{"\n"}
            <span className="code-line-no">6</span>     <span className="code-green">"user"</span>: <span className="code-green">"M"</span>,{"\n"}
            <span className="code-line-no">7</span>     <span className="code-red">"last_known_area"</span>: <span className="code-red">"North District · Building 08"</span>,{"\n"}
            <span className="code-line-no">8</span>     <span className="code-red">"location_sharing"</span>: <span className="code-orange">True</span>,{"\n"}
            <span className="code-line-no">9</span> {"}"}{"\n\n"}
            <span className="code-line-no">11</span> <span className="code-purple">def</span> <span className="code-yellow">publish_profile</span>():{"\n"}
            <span className="code-line-no">12</span>     <span className="code-purple">return</span> <span className="code-cyan">json</span>.dumps(profile) <span className="code-comment"># location leaks</span>{"\n\n"}
            <span className="code-line-no">14</span> <span className="code-comment"># Run `py --hide_loc` to disable this trace.</span>
          </pre>

          <div className="vt-terminal-panel">
            <div className="vt-terminal-heading">
              <strong>TERMINAL</strong>
              <button type="button" onClick={() => setTerminalOpen(!terminalOpen)}>
                {terminalOpen ? "Hide terminal" : "Terminal"}
              </button>
            </div>

            {!terminalOpen ? (
              <p className="vt-terminal-help">
                Click Terminal, then choose <b>New Terminal</b>.
              </p>
            ) : !terminalTabOpen ? (
              <div className="vt-terminal-menu">
                <span>TERMINAL MENU</span>
                <button type="button" onClick={() => setTerminalTabOpen(true)}>
                  ＋ New Terminal
                </button>
              </div>
            ) : (
              <div className="vt-terminal-shell">
                <p>
                  PS C:\Users\M\DevOps&gt;{" "}
                  <input
                    aria-label="Terminal command"
                    value={terminalCommand}
                    onChange={(e) => setTerminalCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCommandSubmit();
                    }}
                    placeholder="type command here"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                  />
                </p>
                <button type="button" onClick={handleCommandSubmit}>
                  Run command ↵
                </button>
                {terminalMessage && (
                  <p className={hasError ? "vt-terminal-error" : "vt-terminal-success"}>
                    {terminalMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
