import { useState } from "react";

export type NaturePhoto = {
  id: string;
  title: string;
  category: "Forest" | "Mountain" | "Ocean" | "Flora" | "Highlands";
  locationNote: string;
  cameraInfo: string;
  description: string;
  svgContent: React.ReactNode;
};

export const NATURE_PHOTOS: NaturePhoto[] = [
  {
    id: "misty-forest",
    title: "Misty Pine Basin",
    category: "Forest",
    locationNote: "North Conifer Ridge · 1,420m Elevation",
    cameraInfo: "50mm · f/2.8 · 1/250s · ISO 100",
    description: "Morning vapor rising through primordial evergreen canopy under soft diffused dawn light.",
    svgContent: (
      <svg viewBox="0 0 400 260" className="vt-gallery-art" role="img" aria-label="Misty pine forest landscape">
        <defs>
          <linearGradient id="forestSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="fogGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#forestSky)" />
        {/* Distant Hills */}
        <path d="M0,180 Q100,130 200,160 T400,140 L400,260 L0,260 Z" fill="#1e293b" opacity="0.6" />
        <path d="M0,195 Q140,150 280,180 T400,165 L400,260 L0,260 Z" fill="#0f172a" opacity="0.8" />
        {/* Pine Silhouettes */}
        {[30, 80, 140, 190, 250, 310, 360].map((x, i) => (
          <polygon
            key={i}
            points={`${x},130 ${x - 18},200 ${x - 8},200 ${x - 22},240 ${x + 22},240 ${x + 8},200 ${x + 18},200`}
            fill="#09101d"
          />
        ))}
        {/* Soft fog bands */}
        <rect x="0" y="150" width="400" height="70" fill="url(#fogGrad)" />
      </svg>
    ),
  },
  {
    id: "obsidian-ridge",
    title: "Obsidian Ridge Summit",
    category: "Mountain",
    locationNote: "Glacial Divide · 4,200m Elevation",
    cameraInfo: "24mm · f/8.0 · 1/500s · ISO 64",
    description: "Sharp basalt pinnacles cutting into freezing cloud inversions during golden twilight.",
    svgContent: (
      <svg viewBox="0 0 400 260" className="vt-gallery-art" role="img" aria-label="Jagged mountain summit">
        <defs>
          <linearGradient id="mountainSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#mountainSky)" />
        {/* Mountains */}
        <polygon points="120,60 190,190 50,190" fill="#1e293b" />
        <polygon points="260,80 340,210 180,210" fill="#0f172a" />
        <polygon points="200,40 280,200 120,200" fill="#09101d" />
        {/* Snow accents */}
        <polygon points="200,40 215,70 185,70" fill="#f8fafc" opacity="0.8" />
        <polygon points="120,60 132,85 108,85" fill="#f8fafc" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "abyssal-rift",
    title: "Abyssal Mariana Trench",
    category: "Ocean",
    locationNote: "Subsurface Trench · -3,800m Depth",
    cameraInfo: "Hydro-Lens · f/1.4 · 1/60s · ISO 3200",
    description: "Deep oceanic thermals illuminating geothermal mineral chimneys and pelagic currents.",
    svgContent: (
      <svg viewBox="0 0 400 260" className="vt-gallery-art" role="img" aria-label="Deep oceanic abyss">
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="60%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <radialGradient id="bioGlow" cx="60%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill="url(#oceanGrad)" />
        <circle cx="240" cy="130" r="100" fill="url(#bioGlow)" />
        {/* Water particles */}
        {[50, 110, 180, 270, 340].map((cx, i) => (
          <circle key={i} cx={cx} cy={80 + (i % 3) * 40} r={2 + (i % 3)} fill="#7dd3fc" opacity="0.4" />
        ))}
      </svg>
    ),
  },
  {
    id: "bioluminescent-flora",
    title: "Nocturne Flora Bloom",
    category: "Flora",
    locationNote: "Valley of the Whispering Boughs",
    cameraInfo: "90mm Macro · f/2.8 · 1/125s · ISO 400",
    description: "Delicate nocturnal petals emitting cold phosphorescent glow during spore pollination.",
    svgContent: (
      <svg viewBox="0 0 400 260" className="vt-gallery-art" role="img" aria-label="Glowing nocturnal flora">
        <defs>
          <radialGradient id="floraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill="#030712" />
        <circle cx="200" cy="130" r="110" fill="url(#floraGlow)" />
        {/* Glowing Petals */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="200"
            cy="130"
            rx="14"
            ry="45"
            fill="#c084fc"
            opacity="0.8"
            transform={`rotate(${deg} 200 130)`}
          />
        ))}
        <circle cx="200" cy="130" r="10" fill="#facc15" />
      </svg>
    ),
  },
];

type Props = {
  onClose: () => void;
};

export default function GalleryApp({ onClose }: Props) {
  const [activePhoto, setActivePhoto] = useState<NaturePhoto | null>(null);

  return (
    <section className="vt-location-flow vt-second-desktop vt-gallery-app" aria-label="Nature Photography Gallery">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // GALLERY_PRJ — NATURE ARCHIVES</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-gallery-container">
        <header className="vt-gallery-header">
          <div>
            <span className="vt-gallery-badge">READ-ONLY ARCHIVE</span>
            <h2>Wilderness Telemetry & Landscape Studies</h2>
          </div>
          <p className="vt-muted-text">
            High-definition photographic exposures from pristine biological reserves. Click any specimen to enlarge in
            lightbox.
          </p>
        </header>

        {/* Gallery Grid */}
        <div className="vt-gallery-grid" role="list">
          {NATURE_PHOTOS.map((photo) => (
            <article
              key={photo.id}
              role="listitem"
              className="vt-gallery-card"
              onClick={() => setActivePhoto(photo)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActivePhoto(photo);
                }
              }}
            >
              <div className="vt-gallery-thumbnail-wrap">{photo.svgContent}</div>
              <div className="vt-gallery-card-body">
                <div className="vt-gallery-eyebrow">
                  <span className="vt-category-tag">{photo.category}</span>
                  <span className="vt-view-action">Click to inspect 🔍</span>
                </div>
                <h3 className="vt-gallery-photo-title">{photo.title}</h3>
                <p className="vt-gallery-photo-meta">{photo.locationNote}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="vt-lightbox-backdrop" role="dialog" aria-modal="true" aria-label={activePhoto.title}>
            <div className="vt-lightbox-modal">
              <header className="vt-lightbox-header">
                <div>
                  <span className="vt-lightbox-cat">{activePhoto.category} Study</span>
                  <h3 className="vt-lightbox-title">{activePhoto.title}</h3>
                </div>
                <button
                  type="button"
                  className="vt-lightbox-close"
                  onClick={() => setActivePhoto(null)}
                  aria-label="Close Lightbox"
                >
                  ✕
                </button>
              </header>

              <div className="vt-lightbox-stage">{activePhoto.svgContent}</div>

              <footer className="vt-lightbox-footer">
                <div className="vt-lightbox-desc">
                  <p>{activePhoto.description}</p>
                </div>
                <div className="vt-lightbox-tech">
                  <div>
                    <span className="vt-tech-label">LOCATION:</span>
                    <span>{activePhoto.locationNote}</span>
                  </div>
                  <div>
                    <span className="vt-tech-label">EXPOSURE:</span>
                    <span>{activePhoto.cameraInfo}</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
