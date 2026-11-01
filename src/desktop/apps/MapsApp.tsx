import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type MapsAppProps = {
  scrollbarEnabled: boolean;
  onToggleScrollbar: (enabled: boolean) => void;
  isSolved?: boolean;
  onClose?: () => void;
};

export default function MapsApp({
  scrollbarEnabled,
  onToggleScrollbar,
  isSolved = false,
  onClose,
}: MapsAppProps) {
  if (isSolved) {
    const concept = getLearningConcept("rate-limiting") || getLearningConcept("location-exposure");
    return (
      <div className="maps-app maps-app--solved" style={{ padding: "16px 20px" }}>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </div>
    );
  }

  return (
    <div className="maps-app">
      <header className="maps-app__header">
        <div className="maps-app__meta">
          <span className="maps-app__badge">FACILITY SCHEMATIC</span>
          <span className="maps-app__id">SECTOR-04 // LEVEL 01</span>
        </div>
        <div className="maps-app__tracking-status">
          <span className="maps-app__tracking-label">
            LOCATION STREAM:
          </span>
          <span
            className={`maps-app__tracking-indicator ${
              scrollbarEnabled ? "is-active" : "is-disabled"
            }`}
          >
            {scrollbarEnabled ? "BROADCASTING" : "RESTRICTED"}
          </span>
        </div>
      </header>

      {/* Main Floor Plan Viewport */}
      <div
        className={`maps-app__viewport ${
          scrollbarEnabled ? "has-scrollbar" : "no-scrollbar"
        }`}
        tabIndex={0}
        aria-label="Facility Floor Plan Viewport"
      >
        <div className="maps-app__canvas">
          <svg
            className="maps-app__svg"
            viewBox="0 0 1000 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid Pattern */}
            <defs>
              <pattern
                id="maps-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.07)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="1000" height="380" fill="url(#maps-grid)" />

            {/* Room 1: Reception / North Lobby */}
            <rect
              x="20"
              y="30"
              width="200"
              height="140"
              className="map-room"
            />
            <text x="35" y="60" className="map-room-title">
              NORTH LOBBY
            </text>
            <text x="35" y="80" className="map-room-sub">
              Access Gate 01
            </text>

            {/* Room 2: Server Room */}
            <rect
              x="240"
              y="30"
              width="220"
              height="140"
              className="map-room"
            />
            <text x="255" y="60" className="map-room-title">
              SERVER CORE // VT-9
            </text>
            <text x="255" y="80" className="map-room-sub">
              Air-gapped Racks
            </text>

            {/* Room 3: Security Dispatch */}
            <rect
              x="480"
              y="30"
              width="240"
              height="140"
              className="map-room"
            />
            <text x="495" y="60" className="map-room-title">
              SECURITY DISPATCH
            </text>
            <text x="495" y="80" className="map-room-sub">
              CCTV Feeds [OFFLINE]
            </text>

            {/* Room 4: Emergency Auxiliary */}
            <rect
              x="740"
              y="30"
              width="240"
              height="140"
              className="map-room"
            />
            <text x="755" y="60" className="map-room-title">
              AUXILIARY POWER
            </text>
            <text x="755" y="80" className="map-room-sub">
              Backup Generator
            </text>

            {/* Central Corridor */}
            <rect
              x="20"
              y="180"
              width="960"
              height="50"
              className="map-corridor"
            />
            <text x="400" y="210" className="map-corridor-text">
              CENTRAL ACCESS CORRIDOR // SECTOR 04
            </text>

            {/* Room 5: Archive Storage */}
            <rect
              x="20"
              y="240"
              width="220"
              height="110"
              className="map-room"
            />
            <text x="35" y="270" className="map-room-title">
              ARCHIVE STORAGE
            </text>
            <text x="35" y="290" className="map-room-sub">
              Physical Media Vault
            </text>

            {/* Room 6: Terminal Room (CURRENT LOCATION) */}
            <rect
              x="260"
              y="240"
              width="260"
              height="110"
              className="map-room map-room--current"
            />
            <text x="275" y="270" className="map-room-title">
              ISOLATION TERMINAL
            </text>
            <text x="275" y="290" className="map-room-sub">
              Host Workstation 01
            </text>

            {/* Protagonist Location Marker: Red Pin with 'You' label */}
            <g className="map-player-marker" transform="translate(390, 305)">
              <circle
                r="18"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.4"
                className="map-pulse-ring"
              />
              <circle r="7" fill="#ef4444" />
              <circle r="3" fill="#ffffff" />
              {/* Exact label required: You */}
              <rect
                x="-22"
                y="-38"
                width="44"
                height="22"
                rx="4"
                fill="#b91c1c"
                stroke="#fca5a5"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-23"
                textAnchor="middle"
                className="map-player-label"
              >
                You
              </text>
            </g>

            {/* Room 7: Hardware Lab */}
            <rect
              x="540"
              y="240"
              width="220"
              height="110"
              className="map-room"
            />
            <text x="555" y="270" className="map-room-title">
              HARDWARE LAB
            </text>
            <text x="555" y="290" className="map-room-sub">
              Diagnostic Benches
            </text>

            {/* Room 8: Emergency Exit Bay */}
            <rect
              x="780"
              y="240"
              width="200"
              height="110"
              className="map-room"
            />
            <text x="795" y="270" className="map-room-title">
              CONTAINMENT EXIT
            </text>
            <text x="795" y="290" className="map-room-sub">
              Heavy Pressure Door
            </text>

            {/* Door Connectors */}
            <line
              x1="110"
              y1="170"
              x2="110"
              y2="180"
              className="map-doorway"
            />
            <line
              x1="350"
              y1="170"
              x2="350"
              y2="180"
              className="map-doorway"
            />
            <line
              x1="600"
              y1="170"
              x2="600"
              y2="180"
              className="map-doorway"
            />
            <line
              x1="860"
              y1="170"
              x2="860"
              y2="180"
              className="map-doorway"
            />
            <line
              x1="130"
              y1="230"
              x2="130"
              y2="240"
              className="map-doorway"
            />
            <line
              x1="390"
              y1="230"
              x2="390"
              y2="240"
              className="map-doorway"
            />
            <line
              x1="650"
              y1="230"
              x2="650"
              y2="240"
              className="map-doorway"
            />
            <line
              x1="880"
              y1="230"
              x2="880"
              y2="240"
              className="map-doorway"
            />
          </svg>
        </div>
      </div>

      {/* Horizontal Scroll Control Panel directly below map */}
      <footer className="maps-app__controls">
        <div className="maps-app__controls-info">
          <span className="maps-app__controls-title">
            Horizontal Scroll Tracking:
          </span>
          <span
            className={`maps-app__controls-state ${
              scrollbarEnabled ? "state-enabled" : "state-disabled"
            }`}
          >
            {scrollbarEnabled
              ? "Enabled (Continuous Location Tracking)"
              : "Disabled (Position Locked & Hidden)"}
          </span>
        </div>

        <button
          type="button"
          className={`maps-app__toggle-button ${
            scrollbarEnabled ? "button-disable" : "button-enable"
          }`}
          onClick={() => onToggleScrollbar(!scrollbarEnabled)}
        >
          {scrollbarEnabled ? "Disable Scrollbar" : "Enable Scrollbar"}
        </button>
      </footer>
    </div>
  );
}
