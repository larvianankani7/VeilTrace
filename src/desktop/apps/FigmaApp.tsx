type Props = {
  onClose: () => void;
};

export default function FigmaApp({ onClose }: Props) {
  return (
    <div className="vt-figma-window" aria-label="Figma — VEILTRACE Design Canvas">
      {/* Top Figma App Bar */}
      <header className="vt-figma-topbar">
        <div className="vt-figma-topbar-left">
          <div className="vt-figma-logo-wrap">
            <span className="vt-figma-pill figma-red" />
            <span className="vt-figma-pill figma-orange" />
            <span className="vt-figma-pill figma-purple" />
            <span className="vt-figma-pill figma-blue" />
            <span className="vt-figma-pill figma-green" />
          </div>
          <span className="vt-figma-filename">Veiltrace-Brand-Identity // Cyber-Learning Shield</span>
          <span className="vt-figma-badge">Drafts / Design System</span>
        </div>

        {/* Toolbar Center */}
        <div className="vt-figma-tools">
          <button type="button" className="vt-figma-tool is-active" title="Move (V)">↖</button>
          <button type="button" className="vt-figma-tool" title="Frame (F)">#</button>
          <button type="button" className="vt-figma-tool" title="Rectangle (R)">□</button>
          <button type="button" className="vt-figma-tool" title="Pen (P)">🖋</button>
          <button type="button" className="vt-figma-tool" title="Text (T)">T</button>
          <button type="button" className="vt-figma-tool" title="Component (Option+Cmd+K)">◇</button>
        </div>

        <div className="vt-figma-topbar-right">
          <span className="vt-figma-zoom">100% ▾</span>
          <span className="vt-figma-readonly-tag">🔒 Read-Only Canvas</span>
          <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
            Return ✕
          </button>
        </div>
      </header>

      {/* Main Workspace Layout: Layers Sidebar + Canvas Area + Inspector */}
      <div className="vt-figma-workspace">
        {/* Left: Layers Sidebar */}
        <aside className="vt-figma-layers-sidebar" aria-label="Figma Layers">
          <div className="vt-layers-header">
            <span>LAYERS</span>
            <span>PAGES (1)</span>
          </div>

          <div className="vt-layers-tree">
            <div className="vt-layer-item is-selected">
              <span>❖</span>
              <span>Frame: Cyber_Learning_Hero</span>
            </div>
            <div className="vt-layer-item indent-1">
              <span>🛡️</span>
              <span>Vector: Hex_Security_Shield</span>
            </div>
            <div className="vt-layer-item indent-1">
              <span>⚡</span>
              <span>Vector: Cryptographic_Pulse</span>
            </div>
            <div className="vt-layer-item indent-1">
              <span>🌐</span>
              <span>Vector: Edge_CDN_Nodes</span>
            </div>
            <div className="vt-layer-item indent-1">
              <span>T</span>
              <span>Text: &quot;VEILTRACE DEFENSE&quot;</span>
            </div>
            <div className="vt-layer-item indent-1">
              <span>T</span>
              <span>Text: &quot;Cybersecurity Education&quot;</span>
            </div>
          </div>

          <div className="vt-layers-meta">
            <h4>CANVAS ASSETS</h4>
            <p>11 Trace Concept Icons</p>
            <p>Colors: Valen Dark & Electric Cyan</p>
          </div>
        </aside>

        {/* Center: Canvas Area */}
        <main className="vt-figma-canvas">
          <div className="vt-figma-artboard">
            <div className="vt-artboard-header">
              <span className="vt-artboard-title">Cyber_Learning_Hero (800 × 500)</span>
            </div>

            {/* Rendered SVG Cyber-Learning Logo Artwork */}
            <div className="vt-artboard-content">
              <svg
                viewBox="0 0 600 380"
                className="vt-figma-svg-artwork"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#080d1a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Frame */}
                <rect width="600" height="380" rx="16" fill="url(#bgGrad)" stroke="#1e293b" strokeWidth="2" />

                {/* Subtle Grid Pattern */}
                <g opacity="0.12" stroke="#38bdf8" strokeWidth="1">
                  <line x1="60" y1="0" x2="60" y2="380" />
                  <line x1="180" y1="0" x2="180" y2="380" />
                  <line x1="300" y1="0" x2="300" y2="380" />
                  <line x1="420" y1="0" x2="420" y2="380" />
                  <line x1="540" y1="0" x2="540" y2="380" />
                  <line x1="0" y1="76" x2="600" y2="76" />
                  <line x1="0" y1="152" x2="600" y2="152" />
                  <line x1="0" y1="228" x2="600" y2="228" />
                  <line x1="0" y1="304" x2="600" y2="304" />
                </g>

                {/* Central Security Shield Artwork */}
                <path
                  d="M300 45 L420 95 V200 C420 270 365 320 300 345 C235 320 180 270 180 200 V95 Z"
                  fill="#0b1329"
                  stroke="url(#shieldGrad)"
                  strokeWidth="6"
                  filter="url(#cyberGlow)"
                />

                {/* Inner Circuit Hexagon */}
                <polygon
                  points="300,90 370,130 370,210 300,250 230,210 230,130"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />

                {/* Keyhole / Token Core Symbol */}
                <circle cx="300" cy="160" r="18" fill="#38bdf8" />
                <polygon points="292,165 308,165 314,205 286,205" fill="#38bdf8" />
                <circle cx="300" cy="160" r="7" fill="#080d1a" />

                {/* Radial Cyber Node Rings */}
                <circle cx="140" cy="100" r="12" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                <text x="140" y="104" fill="#93c5fd" fontSize="10" textAnchor="middle" fontFamily="monospace">TLS</text>

                <circle cx="460" cy="100" r="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="104" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontFamily="monospace">CDN</text>

                <circle cx="120" cy="260" r="12" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
                <text x="120" y="264" fill="#c4b5fd" fontSize="10" textAnchor="middle" fontFamily="monospace">CORS</text>

                <circle cx="480" cy="260" r="12" fill="#0f172a" stroke="#f472b6" strokeWidth="2" />
                <text x="480" y="264" fill="#fbcfe8" fontSize="10" textAnchor="middle" fontFamily="monospace">HASH</text>

                {/* Connecting Bus Lines */}
                <path d="M152 100 L180 120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M448 100 L420 120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M132 260 L185 240" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M468 260 L415 240" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Brand Typography */}
                <text x="300" y="295" fill="#f8fafc" fontSize="20" fontWeight="bold" letterSpacing="4" textAnchor="middle" fontFamily="sans-serif">
                  VEILTRACE
                </text>
                <text x="300" y="318" fill="#38bdf8" fontSize="10" fontWeight="600" letterSpacing="3" textAnchor="middle" fontFamily="monospace">
                  CYBERSECURITY LEARNING INITIATIVE
                </text>
              </svg>
            </div>
          </div>
        </main>

        {/* Right: Inspector Sidebar */}
        <aside className="vt-figma-inspector" aria-label="Design Properties">
          <div className="vt-inspector-section">
            <h4>FRAME DIMENSIONS</h4>
            <div className="vt-inspector-row">
              <span>W: 800</span>
              <span>H: 500</span>
            </div>
            <div className="vt-inspector-row">
              <span>X: 0</span>
              <span>Y: 0</span>
            </div>
          </div>

          <div className="vt-inspector-section">
            <h4>FILL</h4>
            <div className="vt-color-swatch-row">
              <span className="vt-color-chip" style={{ background: "linear-gradient(45deg, #080d1a, #020617)" }} />
              <span>Valen Deep Cyber Space</span>
            </div>
          </div>

          <div className="vt-inspector-section">
            <h4>DESIGN SYSTEM TOKENS</h4>
            <p>Primary: Electric Cyan (#38bdf8)</p>
            <p>Secondary: Indigo Shield (#6366f1)</p>
            <p>Accent: Violet Cipher (#a855f7)</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
