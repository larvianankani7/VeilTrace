import readmeText from "../../../README.md?raw";

type Props = {
  onClose: () => void;
};

export default function VsCodeReadmeApp({ onClose }: Props) {
  const lines = readmeText.split("\n");

  return (
    <section className="vt-location-flow vt-second-desktop vt-python-workspace" aria-label="Visual Studio Code - README.md">
      <div className="vt-second-topbar">
        <strong>VISUAL STUDIO CODE // README.md — PROJECT ARCHITECTURE</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-code-window vt-python-code-window">
        {/* Left Explorer Sidebar */}
        <aside className="vt-vscode-explorer" aria-label="Project Explorer">
          <b>EXPLORER</b>
          <p>⌄ VEILTRACE</p>
          <p className="vt-python-file-active">📄 README.md</p>
          <p>　📁 src</p>
          <p>　📁 public</p>
          <p>　📁 docs</p>
          <p>　📄 package.json</p>
          <div className="vt-vscode-note">
            <strong>DOCUMENTATION</strong>
            <p>
              Project specification and technical constraints for the VEILTRACE security escape simulation.
            </p>
            <code>READ-ONLY MODE</code>
          </div>
        </aside>

        {/* Main Editor Surface */}
        <div className="vt-code-main">
          <div className="vt-code-tab">
            <span>📄 README.md</span>
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>Markdown Preview</span>
          </div>

          <div className="vt-readme-editor-body" tabIndex={0} role="region" aria-label="README.md content">
            <pre className="vt-readme-source">
              {lines.map((line, index) => (
                <div key={index} className="vt-code-row">
                  <span className="code-line-no">{index + 1}</span>
                  <span className="vt-code-line-text">{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
