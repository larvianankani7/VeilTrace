type Props = {
  onClose: () => void;
};

export default function DeviceRegistryApp({ onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Device Registry">
      <div className="vt-second-topbar">
        <strong>DEVICE REGISTRY // SYSTEM HARDWARE NODE</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <div className="vt-sim-app">
        <p className="vt-explorer-kicker">HARDWARE NODE REGISTRY</p>
        <h2>Connected Devices</h2>
        <dl className="vt-device-grid">
          <dt>Workstation ID</dt>
          <dd>VT-NODE-08 (Containment Wing)</dd>
          <dt>Assigned Analyst</dt>
          <dd>Merdin Morov (M)</dd>
          <dt>Terminal Status</dt>
          <dd className="vt-safe-text">OPERATIONAL · ISOLATED</dd>
          <dt>Peripheral Bus</dt>
          <dd>Internal Keyboard / Display Emulation</dd>
          <dt>Network Interface</dt>
          <dd className="vt-risk-text">RESTRICTED LOCAL LINK (PORT 8000)</dd>
          <dt>Hardware Address</dt>
          <dd>02:42:0A:00:08:FE</dd>
        </dl>
        <p className="vt-safe-note">
          All peripheral bus registrations are monitored under protocol SEC-BREACH-0x4B.
        </p>
      </div>
    </section>
  );
}
