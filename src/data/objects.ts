export type DesktopObject = {
  id: string;
  name: string;
  category: string;
  critical: boolean;
  hidden?: boolean;
};

const criticalObjectIds = new Set([
  "persona-hub",
  "atlas-places",
  "geoframe-gallery",
  "footprint-log",
  "roam-backup",
  "daymark-calendar",
  "route-trace",
  "permission-garden",
  "session-mirror",
  "token-cabinet",
  "environment-cabinet",
]);

const objectDefinitions: Array<
  Omit<DesktopObject, "critical">
> = [
  { id: "persona-hub", name: "Persona Hub", category: "Root" },
  { id: "atlas-places", name: "Atlas Places", category: "Root" },
  { id: "relay-mail", name: "Relay Mail", category: "Root" },
  { id: "gatekeeper-access", name: "Gatekeeper Access", category: "Root" },
  { id: "keyhaven-vault", name: "Keyhaven Vault", category: "Root" },
  { id: "wayfarer-browser", name: "Wayfarer Browser", category: "Root" },
  { id: "device-registry", name: "Device Registry", category: "Root" },
  { id: "sentinel-alerts", name: "Sentinel Alerts", category: "Root" },
  { id: "cloud-shelf", name: "Cloud Shelf", category: "Root" },
  { id: "control-centre", name: "Control Centre", category: "Root" },

  { id: "geoframe-gallery", name: "GeoFrame Gallery", category: "Recent Activity" },
  { id: "footprint-log", name: "Footprint Log", category: "Recent Activity" },
  { id: "roam-backup", name: "Roam Backup", category: "Recent Activity" },
  { id: "download-ledger", name: "Download Ledger", category: "Recent Activity" },
  { id: "daymark-calendar", name: "Daymark Calendar", category: "Recent Activity" },
  { id: "open-documents", name: "Open Documents", category: "Recent Activity" },

  { id: "route-trace", name: "Route Trace", category: "Connections" },
  { id: "permission-garden", name: "Permission Garden", category: "Connections" },
  { id: "signal-memory", name: "Signal Memory", category: "Connections" },
  { id: "nearfield-devices", name: "Nearfield Devices", category: "Connections" },
  { id: "bridge-connect", name: "Bridge Connect", category: "Connections" },
  { id: "boundary-firewall", name: "Boundary Firewall", category: "Connections" },

  { id: "second-signal", name: "Second Signal", category: "Identity & Access" },
  { id: "session-mirror", name: "Session Mirror", category: "Identity & Access" },
  { id: "token-cabinet", name: "Token Cabinet", category: "Identity & Access" },
  { id: "role-register", name: "Role Register", category: "Identity & Access" },
  { id: "attempt-ledger", name: "Attempt Ledger", category: "Identity & Access" },
  { id: "recovery-desk", name: "Recovery Desk", category: "Identity & Access" },
  { id: "audit-lantern", name: "Audit Lantern", category: "Identity & Access" },

  { id: "environment-cabinet", name: "Environment Cabinet", category: "System & Secrets" },
  { id: "echo-logs", name: "Echo Logs", category: "System & Secrets" },
  { id: "record-vault", name: "Record Vault", category: "System & Secrets" },
  { id: "origin-gate", name: "Origin Gate", category: "System & Secrets" },
  { id: "header-ward", name: "Header Ward", category: "System & Secrets" },
  { id: "patchwork", name: "Patchwork", category: "System & Secrets" },
  { id: "postmark-relay", name: "Postmark Relay", category: "System & Secrets" },

  { id: "status-beacon", name: "Status Beacon", category: "Hidden & Utilities" },
  { id: "meeting-lens", name: "Meeting Lens", category: "Hidden & Utilities" },
  { id: "request-observatory", name: "Request Observatory", category: "Hidden & Utilities" },
  { id: "exposure-meter", name: "Exposure Meter", category: "Hidden & Utilities" },
  { id: "clipboard-echo", name: "Clipboard Echo", category: "Hidden & Utilities" },
  { id: "export-chamber", name: "Export Chamber", category: "Hidden & Utilities" },
  { id: "journey-archive", name: "Journey Archive", category: "Hidden & Utilities" },
  { id: "quiet-runner", name: "Quiet Runner", category: "Hidden & Utilities" },
  { id: "form-memory", name: "Form Memory", category: "Hidden & Utilities" },
  { id: "orphan-index", name: "Orphan Index", category: "Hidden & Utilities" },
  { id: "property-mirror", name: "Property Mirror", category: "Hidden & Utilities" },
  { id: "recycle-vault", name: "Recycle Vault", category: "Hidden & Utilities" },
  { id: "tray-of-whispers", name: "Tray of Whispers", category: "Hidden & Utilities" },
  { id: "cache-index-07", name: ".cache_index_07", category: "Hidden & Utilities", hidden: true },
];

export const desktopObjects: DesktopObject[] = [
  ...objectDefinitions.map((object) => ({
    ...object,
    critical: criticalObjectIds.has(object.id),
  })),
  {
    id: "readme-final-final2",
    name: "readme.final.final2.txt",
    category: "Hidden File",
    critical: false,
    hidden: true,
  },
];

export const criticalObjects = desktopObjects.filter(
  (object) => object.critical,
);
