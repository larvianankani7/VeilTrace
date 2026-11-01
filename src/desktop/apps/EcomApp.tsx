import { useState } from "react";

export type WatchSpecs = {
  movement: string;
  materials: string;
  waterResistance: string;
  strap: string;
  display: string;
  powerReserve: string;
};

export type WatchProduct = {
  id: string;
  name: string;
  series: string;
  price: string;
  tagline: string;
  description: string;
  accentColor: string;
  dialType: "obsidian" | "aero" | "chronos";
  specs: WatchSpecs;
};

export const WATCH_PRODUCTS: WatchProduct[] = [
  {
    id: "chronos-obsidian",
    name: "Aethelgard Chronos Obsidian",
    series: "Series X · Tactical Horology",
    price: "$3,850.00",
    tagline: "Ultra-hard carbon composite chronometer engineered for deep-space telemetry.",
    description:
      "Crafted with forged carbon and bead-blasted black titanium, the Chronos Obsidian features a skeletonized dial exposing the high-beat Calibre VT-992. Treated with diamond-like carbon (DLC) coating for ultimate scratch resistance.",
    accentColor: "#38bdf8",
    dialType: "obsidian",
    specs: {
      movement: "Calibre VT-992 Automatic (28,800 vph / 4Hz)",
      materials: "Forged Carbon & Grade 5 DLC Titanium",
      waterResistance: "300 meters / 1,000 feet (Screw-down crown)",
      strap: "Vulcanized FKM High-Density Fluoropolymer Strap",
      display: "Double-Domed Sapphire Crystal with Anti-Reflective Inner Coating",
      powerReserve: "72 Hours Power Reserve",
    },
  },
  {
    id: "aero-titanium",
    name: "Vanguard Aero-Naval Diver",
    series: "Deep Sector Collection",
    price: "$4,200.00",
    tagline: "Monolithic titanium diving instrument calibrated for extreme thermal rifts.",
    description:
      "Engineered to withstand immense barometric pressures, the Aero-Naval features a unidirectional ceramic bezel, tritium gas tube hour markers, and an integrated helium escape valve. Built for silent maritime reconnaissance.",
    accentColor: "#34d399",
    dialType: "aero",
    specs: {
      movement: "In-House VT-Chronos 880 Flyback Chronograph",
      materials: "Aerospace Grade 5 Brushed Titanium",
      waterResistance: "500 meters / 1,640 feet (Helium Escape Valve)",
      strap: "Titanium Quick-Release Micro-Adjust Link Bracelet",
      display: "Box-Shaped Synthetic Corundum Sapphire Crystal",
      powerReserve: "65 Hours Power Reserve",
    },
  },
  {
    id: "tourbillon-stellar",
    name: "Nebula Celestial Tourbillon",
    series: "Haute Horlogerie Specimen",
    price: "$9,400.00",
    tagline: "Gravity-compensating tourbillon carriage rotating within a sapphire glass monocoque.",
    description:
      "A masterpiece of mechanical micro-engineering. The celestial tourbillon rotates once every 60 seconds within a lightweight anodized cage, accompanied by a retrograde dual-timezone indicator and aventurine glass dial mimicking deep star clusters.",
    accentColor: "#a855f7",
    dialType: "chronos",
    specs: {
      movement: "Manual Wind Celestial Tourbillon 3-Axis Calibre VT-01",
      materials: "Polished Tantalum & Aventurine Star Dial",
      waterResistance: "100 meters / 330 feet",
      strap: "Hand-Stitched Matte Alligator Leather with Deployant Clasp",
      display: "High-Purity Exhibition Sapphire Crystal Caseback",
      powerReserve: "96 Hours Dual-Barrel Reserve",
    },
  },
];

type Props = {
  onClose: () => void;
};

export default function EcomApp({ onClose }: Props) {
  // Deterministic local selection for the current session
  const [selectedProduct] = useState<WatchProduct>(() => {
    const idx = Math.floor(Math.random() * WATCH_PRODUCTS.length);
    return WATCH_PRODUCTS[idx] ?? WATCH_PRODUCTS[0];
  });

  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "materials">("overview");
  const [selectedStrapColor, setSelectedStrapColor] = useState<string>("Tactical Carbon");

  return (
    <section className="vt-location-flow vt-second-desktop vt-ecom-app" aria-label="E-Commerce Watch Showcase">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // ECOM_PRJ — LUXURY HOROLOGY PREVIEW</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-ecom-container">
        {/* Top Notification / View-Only Badge */}
        <div className="vt-ecom-viewonly-banner">
          <span className="vt-ecom-badge">VIEW-ONLY SHOWCASE</span>
          <span>E-Commerce prototype for luxury horological engineering. Cart & purchasing disabled.</span>
        </div>

        <div className="vt-ecom-layout">
          {/* Left: Product Visual Representation */}
          <div className="vt-ecom-gallery-col">
            <div className="vt-watch-visual-stage" style={{ borderColor: `${selectedProduct.accentColor}44` }}>
              <svg
                viewBox="0 0 300 300"
                className="vt-watch-svg"
                role="img"
                aria-label={`Detailed rendering of ${selectedProduct.name}`}
              >
                <defs>
                  <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#181e29" />
                    <stop offset="80%" stopColor="#0a0e17" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>
                </defs>

                {/* Strap Upper */}
                <rect x="110" y="10" width="80" height="60" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <line x1="120" y1="25" x2="180" y2="25" stroke="#475569" strokeWidth="2" />
                <line x1="120" y1="40" x2="180" y2="40" stroke="#475569" strokeWidth="2" />

                {/* Strap Lower */}
                <rect x="110" y="230" width="80" height="60" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <line x1="120" y1="250" x2="180" y2="250" stroke="#475569" strokeWidth="2" />
                <line x1="120" y1="265" x2="180" y2="265" stroke="#475569" strokeWidth="2" />

                {/* Watch Outer Case */}
                <circle cx="150" cy="150" r="88" fill="url(#caseGrad)" stroke="#64748b" strokeWidth="3" />

                {/* Bezel Ring */}
                <circle cx="150" cy="150" r="76" fill="url(#bezelGrad)" stroke={selectedProduct.accentColor} strokeWidth="1.5" />

                {/* Dial Base */}
                <circle cx="150" cy="150" r="66" fill="url(#dialGrad)" stroke="#334155" strokeWidth="1" />

                {/* Hour Markers */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="150"
                    y1="88"
                    x2="150"
                    y2={deg % 90 === 0 ? "96" : "93"}
                    stroke={deg % 90 === 0 ? selectedProduct.accentColor : "#94a3b8"}
                    strokeWidth={deg % 90 === 0 ? "3" : "1.5"}
                    transform={`rotate(${deg} 150 150)`}
                  />
                ))}

                {/* Sub-dials */}
                <circle cx="150" cy="120" r="16" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="125" cy="160" r="14" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="175" cy="160" r="14" fill="#0f172a" stroke="#334155" strokeWidth="1" />

                {/* Watch Hands */}
                <line x1="150" y1="150" x2="150" y2="105" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="150" y1="150" x2="185" y2="150" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="150" y1="160" x2="150" y2="92" stroke={selectedProduct.accentColor} strokeWidth="1.5" strokeLinecap="round" />

                {/* Center Cap */}
                <circle cx="150" cy="150" r="4" fill={selectedProduct.accentColor} stroke="#0f172a" strokeWidth="1" />

                {/* Crown */}
                <rect x="238" y="142" width="10" height="16" rx="2" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
              </svg>
            </div>

            {/* Customization Selector */}
            <div className="vt-ecom-strap-picker">
              <span className="vt-picker-label">Strap Variant:</span>
              <div className="vt-picker-buttons">
                {["Tactical Carbon", "Stealth Obsidian", "Titanium Mesh"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`vt-picker-btn ${selectedStrapColor === color ? "is-selected" : ""}`}
                    onClick={() => setSelectedStrapColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Details & Specifications */}
          <div className="vt-ecom-info-col">
            <div className="vt-ecom-header">
              <span className="vt-ecom-series">{selectedProduct.series}</span>
              <h2 className="vt-ecom-title">{selectedProduct.name}</h2>
              <div className="vt-ecom-price-row">
                <span className="vt-ecom-price">{selectedProduct.price}</span>
                <span className="vt-ecom-availability">In Stock // Limited Archive Edition</span>
              </div>
              <p className="vt-ecom-tagline">{selectedProduct.tagline}</p>
            </div>

            {/* Tabs */}
            <div className="vt-ecom-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "overview"}
                className={`vt-ecom-tab-btn ${activeTab === "overview" ? "is-active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "specs"}
                className={`vt-ecom-tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Technical Specs
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "materials"}
                className={`vt-ecom-tab-btn ${activeTab === "materials" ? "is-active" : ""}`}
                onClick={() => setActiveTab("materials")}
              >
                Craftsmanship
              </button>
            </div>

            <div className="vt-ecom-tab-content">
              {activeTab === "overview" && (
                <div className="vt-tab-pane">
                  <p className="vt-ecom-desc">{selectedProduct.description}</p>
                  <div className="vt-ecom-highlights">
                    <div className="vt-highlight-pill">⚡ Super-LumiNova BGW9</div>
                    <div className="vt-highlight-pill">🛡️ DLC Anti-Scratch Matrix</div>
                    <div className="vt-highlight-pill">🎯 Chronometer Precision</div>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="vt-tab-pane vt-specs-grid">
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">MOVEMENT</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.movement}</strong>
                  </div>
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">MATERIALS</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.materials}</strong>
                  </div>
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">WATER RESISTANCE</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.waterResistance}</strong>
                  </div>
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">STRAP / BAND</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.strap}</strong>
                  </div>
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">CRYSTAL & DISPLAY</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.display}</strong>
                  </div>
                  <div className="vt-spec-card">
                    <span className="vt-spec-label">POWER RESERVE</span>
                    <strong className="vt-spec-val">{selectedProduct.specs.powerReserve}</strong>
                  </div>
                </div>
              )}

              {activeTab === "materials" && (
                <div className="vt-tab-pane">
                  <p className="vt-ecom-desc">
                    Forged with vacuum-sintered aeronautical alloys, each case undergoes CNC multi-axis milling for
                    micron-level tolerances. Dial indices are hand-applied under 20x magnification to ensure zero
                    microscopic blemishes.
                  </p>
                  <ul className="vt-craft-list">
                    <li>✓ Hand-finished chamfered lugs with polished anglage</li>
                    <li>✓ High-purity synthetic corundum scratch-proof crystal</li>
                    <li>✓ Individual chronometer test certification enclosed</li>
                  </ul>
                </div>
              )}
            </div>

            {/* View-Only Action Notice */}
            <div className="vt-ecom-actions">
              <button type="button" disabled className="vt-ecom-btn-order">
                Ordering Disabled (System Isolation Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
