import { useState } from "react";
import { getLearningConcept } from "../../data/learningConcepts";
import { LearningConceptView } from "../components/LearningModal";

type Device = {
  id: string;
  name: string;
  type: "laptop" | "mobile" | "beacon" | "peripheral";
  icon: string;
  protocol: string;
  signalStrength: string;
  connected: boolean;
};

const INITIAL_DEVICES: Device[] = [
  {
    id: "dev-1",
    name: "Rogue-Terminal-Ext",
    type: "laptop",
    icon: "💻",
    protocol: "802.11ax / Direct Ad-Hoc",
    signalStrength: "-48 dBm (Strong)",
    connected: true,
  },
  {
    id: "dev-2",
    name: "Mobile-Relay-Beacon",
    type: "beacon",
    icon: "📡",
    protocol: "BLE 5.2 / Proximity Telemetry",
    signalStrength: "-56 dBm (High)",
    connected: true,
  },
  {
    id: "dev-3",
    name: "Unpaired-Smart-Tablet",
    type: "mobile",
    icon: "📱",
    protocol: "Wi-Fi Direct / Local Broadcast",
    signalStrength: "-62 dBm (Moderate)",
    connected: true,
  },
  {
    id: "dev-4",
    name: "Wireless-Peripheral-Dongle",
    type: "peripheral",
    icon: "🖱️",
    protocol: "2.4GHz Proprietary RF",
    signalStrength: "-42 dBm (Very Strong)",
    connected: true,
  },
];

type Props = {
  isSolved: boolean;
  onSolve: () => void;
  onClose: () => void;
};

export default function NearbyDevicesApp({ isSolved, onSolve, onClose }: Props) {
  const [devices, setDevices] = useState<Device[]>(() =>
    INITIAL_DEVICES.map((d) => ({ ...d, connected: !isSolved }))
  );
  const [traceAwarded, setTraceAwarded] = useState(isSolved);

  // If already solved, show the Cryptography learning view
  if (isSolved || traceAwarded) {
    const concept = getLearningConcept("cryptography");
    return (
      <section className="vt-location-flow vt-second-desktop" style={{ padding: "16px 20px" }}>
        <div className="vt-second-topbar">
          <strong>NEARBY DEVICES // SECURITY CONCEPT: CRYPTOGRAPHY</strong>
          <button type="button" onClick={onClose} className="vt-btn-return">
            Return ✕
          </button>
        </div>
        {concept && <LearningConceptView concept={concept} onClose={onClose} />}
      </section>
    );
  }

  function handleToggleDevice(id: string) {
    setDevices((prev) => {
      const next = prev.map((dev) =>
        dev.id === id ? { ...dev, connected: !dev.connected } : dev
      );

      const allOff = next.every((d) => !d.connected);
      if (allOff && !traceAwarded) {
        setTraceAwarded(true);
        onSolve();
      }

      return next;
    });
  }

  const activeConnectedCount = devices.filter((d) => d.connected).length;

  return (
    <div className="vt-nearby-devices-window" aria-label="Nearby Devices Manager">
      {/* Top Header Bar */}
      <div className="vt-second-topbar">
        <div className="vt-nearby-header-left">
          <span className="vt-nearby-pulse-icon" aria-hidden="true">📶</span>
          <strong>VEILTRACE // NEARBY DEVICES MATRIX — RF & PERIPHERAL RADAR</strong>
        </div>
        <button type="button" onClick={onClose} className="vt-btn-return" aria-label="Return to desktop">
          Return ✕
        </button>
      </div>

      <div className="vt-nearby-body">
        {/* Status Callout Banner */}
        <div className={`vt-nearby-status-banner ${activeConnectedCount > 0 ? "is-warning" : "is-secure"}`}>
          <div className="vt-nearby-banner-left">
            <span className="vt-nearby-banner-icon">{activeConnectedCount > 0 ? "⚠️" : "🔒"}</span>
            <div>
              <h3>{activeConnectedCount > 0 ? "Active Peripheral Transmitters Detected" : "All Transmitters Disconnected"}</h3>
              <p>
                {activeConnectedCount > 0
                  ? "Adjacent wireless and Bluetooth relays are actively monitoring local signals. Switch ALL connected devices OFF to protect channel cryptography."
                  : "All nearby transceivers have been severed. Cryptographic channel is secure."}
              </p>
            </div>
          </div>
          <div className="vt-nearby-banner-count">
            <span className="vt-nearby-count-num">{activeConnectedCount}</span>
            <span className="vt-nearby-count-lbl">CONNECTED</span>
          </div>
        </div>

        {/* Devices Grid / List */}
        <div className="vt-nearby-grid">
          {devices.map((device) => (
            <article
              key={device.id}
              className={`vt-device-card ${device.connected ? "is-connected" : "is-disconnected"}`}
            >
              <div className="vt-device-card-left">
                <span className="vt-device-type-icon">{device.icon}</span>
                <div className="vt-device-meta">
                  <div className="vt-device-title-row">
                    <strong className="vt-device-name">{device.name}</strong>
                    <span className={`vt-device-status-pill ${device.connected ? "is-active" : "is-off"}`}>
                      {device.connected ? "CONNECTED" : "OFF / DISCONNECTED"}
                    </span>
                  </div>
                  <div className="vt-device-details">
                    <span>Protocol: {device.protocol}</span>
                    <span className="vt-device-divider">·</span>
                    <span>RSSI: {device.signalStrength}</span>
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="vt-device-toggle-wrap">
                <label className="vt-toggle-switch">
                  <input
                    type="checkbox"
                    checked={device.connected}
                    onChange={() => handleToggleDevice(device.id)}
                    aria-label={`Toggle power for ${device.name}`}
                  />
                  <span className="vt-toggle-slider" />
                </label>
                <span className="vt-toggle-state-text">
                  {device.connected ? "ON" : "OFF"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
