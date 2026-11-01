import { useState } from "react";

type FileTab = "overview.md" | "traces.ts" | "architecture.json" | "pedagogy.md";

type Props = {
  onClose: () => void;
};

export default function AntigravityApp({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<FileTab>("overview.md");

  return (
    <div className="vt-antigravity-ide" aria-label="Antigravity IDE — VEILTRACE Project Workspace">
      {/* Top Window Titlebar */}
      <div className="vt-ide-titlebar">
        <div className="vt-ide-titlebar-left">
          <span className="vt-ide-logo">⚡</span>
          <span className="vt-ide-title">Antigravity IDE 2.0 — veiltrace-workspace [READ-ONLY]</span>
        </div>
        <div className="vt-ide-titlebar-right">
          <span className="vt-ide-branch">🌿 main (containment-v2)</span>
          <button type="button" onClick={onClose} className="vt-ide-close-btn" aria-label="Close Antigravity IDE">
            ✕
          </button>
        </div>
      </div>

      {/* Main IDE Layout: Sidebar + Main Workspace */}
      <div className="vt-ide-layout">
        {/* Sidebar: Project Explorer */}
        <aside className="vt-ide-sidebar" aria-label="File Explorer">
          <div className="vt-ide-sidebar-header">
            <span className="vt-ide-sidebar-title">EXPLORER</span>
            <span className="vt-ide-sidebar-project">VEILTRACE</span>
          </div>

          <div className="vt-ide-tree">
            <div className="vt-ide-tree-folder open">
              <span className="vt-ide-tree-icon">📂</span>
              <strong>src/cyber-intel</strong>
            </div>

            <button
              type="button"
              className={`vt-ide-tree-file ${activeTab === "overview.md" ? "is-active" : ""}`}
              onClick={() => setActiveTab("overview.md")}
            >
              <span className="vt-ide-tree-file-icon">📝</span>
              overview.md
            </button>

            <button
              type="button"
              className={`vt-ide-tree-file ${activeTab === "traces.ts" ? "is-active" : ""}`}
              onClick={() => setActiveTab("traces.ts")}
            >
              <span className="vt-ide-tree-file-icon">⚡</span>
              traces.ts
            </button>

            <button
              type="button"
              className={`vt-ide-tree-file ${activeTab === "architecture.json" ? "is-active" : ""}`}
              onClick={() => setActiveTab("architecture.json")}
            >
              <span className="vt-ide-tree-file-icon">🔧</span>
              architecture.json
            </button>

            <button
              type="button"
              className={`vt-ide-tree-file ${activeTab === "pedagogy.md" ? "is-active" : ""}`}
              onClick={() => setActiveTab("pedagogy.md")}
            >
              <span className="vt-ide-tree-file-icon">🎓</span>
              pedagogy.md
            </button>
          </div>

          <div className="vt-ide-sidebar-info">
            <h4>ENVIRONMENT</h4>
            <p>Node: v22.11.0</p>
            <p>Target: Web / Edge</p>
            <p>Policy: Strict Containment</p>
            <p className="vt-ide-readonly-badge">🔒 Read-Only Workspace</p>
          </div>
        </aside>

        {/* Center: Code / Document Editor */}
        <main className="vt-ide-workspace">
          {/* Tab Bar */}
          <div className="vt-ide-tabs">
            <button
              type="button"
              className={`vt-ide-tab ${activeTab === "overview.md" ? "is-active" : ""}`}
              onClick={() => setActiveTab("overview.md")}
            >
              <span>📝 overview.md</span>
            </button>
            <button
              type="button"
              className={`vt-ide-tab ${activeTab === "traces.ts" ? "is-active" : ""}`}
              onClick={() => setActiveTab("traces.ts")}
            >
              <span>⚡ traces.ts</span>
            </button>
            <button
              type="button"
              className={`vt-ide-tab ${activeTab === "architecture.json" ? "is-active" : ""}`}
              onClick={() => setActiveTab("architecture.json")}
            >
              <span>🔧 architecture.json</span>
            </button>
            <button
              type="button"
              className={`vt-ide-tab ${activeTab === "pedagogy.md" ? "is-active" : ""}`}
              onClick={() => setActiveTab("pedagogy.md")}
            >
              <span>🎓 pedagogy.md</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="vt-ide-code-viewer">
            {activeTab === "overview.md" && (
              <div className="vt-ide-markdown">
                <h1># VEILTRACE // Cybersecurity Learning Experience</h1>
                <blockquote>
                  <strong>MISSION DIRECTIVE:</strong> Uncover and contain digital traces left across applications,
                  operating system configurations, background services, and networks before automated containment triggers.
                </blockquote>

                <h2>🎯 Game Overview & Objective</h2>
                <p>
                  VEILTRACE is an immersive, interactive cybersecurity awareness game simulating a breached operating
                  system. Players step into the role of analyst <strong>Merdin Morov (&quot;M&quot;)</strong>, whose workstation
                  is subject to anomalous telemetry exposure.
                </p>
                <p>
                  The core objective is to identify, investigate, and disable <strong>11 critical exposure traces</strong>
                  hidden within realistic everyday applications — including web browsers, mapping utilities, terminal environments,
                  authentication portals, network device managers, and cloud warehouses.
                </p>

                <h2>🛡️ Cybersecurity Learning Purpose</h2>
                <p>
                  Security awareness training is often passive and easily forgotten. VEILTRACE replaces static lectures with
                  <strong> tactile, puzzle-based discovery</strong>. By directly interacting with simulated vulnerabilities,
                  players develop authentic intuition for defense-in-depth, token security, rate limiting, and exposure mitigation.
                </p>
              </div>
            )}

            {activeTab === "traces.ts" && (
              <div className="vt-ide-code-block">
                <pre>
{`/**
 * VEILTRACE Security Trace Manifest
 * 11 Core Defensive Puzzles & Educational Concepts
 */
export const SECURITY_TRACES = [
  { id: 1,  name: "Maps",             concept: "Rate Limiting",    mechanism: "Scroll Tracking Decoupling" },
  { id: 2,  name: "Chrome",           concept: "Location Exposure",mechanism: "DevTools Header Interception" },
  { id: 3,  name: "py.py",            concept: "Bloom Filter",     mechanism: "Probabilistic Space Masking" },
  { id: 4,  name: "login_prj",        concept: "Access Token",     mechanism: "Vault Pass & Double-Click" },
  { id: 5,  name: "personal hu_prj",  concept: "Caching",          mechanism: "Buffer Hot-Update (Ctrl+U)" },
  { id: 6,  name: "Footprint Log",    concept: "Ciphertext",       mechanism: "Telemetry Encryption (Ctrl+Space)" },
  { id: 7,  name: "Route Trace",      concept: "Race Condition",   mechanism: "Location Service Mutex Revocation" },
  { id: 8,  name: "permits",          concept: "Latency",          mechanism: "Background Permit Revocation (Ctrl+Shift+E)" },
  { id: 9,  name: "Nearby_Devices",   concept: "Cryptography",     mechanism: "RF/Bluetooth Isolation Matrix" },
  { id: 10, name: "Echo_Logs",        concept: "Snowflake",        mechanism: "Warehouse Permit Revocation (Up+Space)" },
  { id: 11, name: "Origin_Gate",      concept: "CDN Edge",         mechanism: "Strict CORS Origin Purge (Ctrl+Click)" },
] as const;`}
                </pre>
              </div>
            )}

            {activeTab === "architecture.json" && (
              <div className="vt-ide-code-block">
                <pre>
{`{
  "system": "VEILTRACE Defensive Terminal",
  "version": "2.4.0",
  "screens": {
    "screen_1": "Root OS Desktop (Maps, Location Explorer, profile.txt)",
    "screen_2": "DevOps File Explorer (Chrome, Device Registry, IMPS, VS Code)",
    "screen_3": "Python Development Workspace (py.py, MongoDB Atlas, Brave)",
    "screen_4": "Software Projects Directory (Dashboard, Login, Personal Hu, Vault)",
    "screen_5": "System Diagnostics & Telemetry (Footprint Log, Route Trace, Permits)",
    "screen_6": "Memo Folder (readme.txt Trace Index, Antigravity IDE)",
    "screen_7": "Found Folder (Nearby Devices, Firewall, Env Cabinet, Echo Logs, Origin Gate)",
    "screen_8": "Data Vault (Synchronized Timer, Figma Identity Canvas, Whiteboard)"
  },
  "containment_countdown_seconds": 600,
  "telemetry_state": "LIVE_MONITORING"
}`}
                </pre>
              </div>
            )}

            {activeTab === "pedagogy.md" && (
              <div className="vt-ide-markdown">
                <h1># Educational Methodology: Interactive Awareness</h1>
                <p>
                  Traditional security training presents abstract guidelines: &quot;Never share tokens,&quot; &quot;Restrict CORS,&quot;
                  or &quot;Enforce rate limiting.&quot; Without hands-on context, students fail to recognize these flaws in production.
                </p>

                <h2>Key Principles Taught Through Play:</h2>
                <ul>
                  <li><strong>Principle of Least Privilege:</strong> Demonstrated through permission gardening and CORS purging.</li>
                  <li><strong>Defense in Depth:</strong> Layers of authentication, token rotation, and local caching.</li>
                  <li><strong>Cryptographic Isolation:</strong> Disconnecting rogue peripheral relays to protect transit channels.</li>
                  <li><strong>Scale & Elasticity:</strong> How cloud warehouses like Snowflake and edge CDNs distribute load securely.</li>
                </ul>

                <p>
                  Every resolved trace unlocks a focused, memorable concept card paired with actionable real-world security practices.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="vt-ide-statusbar">
        <div className="vt-ide-statusbar-left">
          <span>⚡ Antigravity 2.0</span>
          <span>📁 Workspace: veiltrace</span>
          <span>🔒 Read-Only Simulation</span>
        </div>
        <div className="vt-ide-statusbar-right">
          <span>UTF-8</span>
          <span>TypeScript / React</span>
          <span>✓ Security Protocol Active</span>
        </div>
      </footer>
    </div>
  );
}
