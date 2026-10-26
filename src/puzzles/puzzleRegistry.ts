import type { PuzzleDefinition } from "./puzzleTypes";

export const puzzleRegistry: PuzzleDefinition[] = [
  {
    id: "persona-hub",
    title: "Persona Hub",
    description: "Your public profile reveals identifying information.",
    action: "set-private",
    successMessage: "Profile visibility restricted.",
    learningPoint: "Review profile visibility and limit public personal information.",
  },
  {
    id: "atlas-places",
    title: "Atlas Places",
    description: "An active sharing link exposes your live location.",
    action: "revoke-sharing",
    successMessage: "Location-sharing link revoked.",
    learningPoint: "Remove sharing links that no longer need access to your location.",
  },
  {
    id: "geoframe-gallery",
    title: "GeoFrame Gallery",
    description: "Shared photos contain geographic metadata.",
    action: "remove-geotags",
    successMessage: "Location metadata removed from the simulated shared copy.",
    learningPoint: "Check photo metadata before sharing images publicly.",
  },
  {
    id: "footprint-log",
    title: "Footprint Log",
    description: "Detailed location and login history is visible to unnecessary viewers.",
    action: "restrict-history",
    successMessage: "History access restricted.",
    learningPoint: "Limit access and retention for sensitive activity records.",
  },
  {
    id: "roam-backup",
    title: "Roam Backup",
    description: "Location history is included in future backups.",
    action: "exclude-backup",
    successMessage: "Location history excluded from future backups.",
    learningPoint: "Review backup contents and retention settings.",
  },
  {
    id: "daymark-calendar",
    title: "Daymark Calendar",
    description: "A public event reveals a private address and routine.",
    action: "privatise-event",
    successMessage: "Event made private and unnecessary address details removed.",
    learningPoint: "Check event visibility before sharing calendars.",
  },
  {
    id: "route-trace",
    title: "Route Trace",
    description: "A detailed connection report is shared too broadly.",
    action: "restrict-diagnostics",
    successMessage: "Diagnostic report access restricted.",
    learningPoint: "Share connection diagnostics only with trusted recipients when necessary.",
  },
  {
    id: "permission-garden",
    title: "Permission Garden",
    description: "An app can access location in the background without a clear need.",
    action: "restrict-permission",
    successMessage: "Background location permission restricted.",
    learningPoint: "Grant apps only the permissions they need.",
  },
  {
    id: "session-mirror",
    title: "Session Mirror",
    description: "An unfamiliar device has an active account session.",
    action: "revoke-session",
    successMessage: "Unrecognised session revoked.",
    learningPoint: "Review active sessions and sign out unfamiliar devices.",
  },
  {
    id: "token-cabinet",
    title: "Token Cabinet",
    description: "An authentication token is exposed in a diagnostic view.",
    action: "revoke-token",
    successMessage: "Exposed token revoked.",
    learningPoint: "Treat exposed tokens as compromised and replace them safely.",
  },
  {
    id: "environment-cabinet",
    title: "Environment Cabinet",
    description: "A service credential is exposed in a configuration preview.",
    action: "rotate-secret",
    successMessage: "Simulated secret protected and rotated.",
    learningPoint: "Keep credentials out of logs and rotate exposed secrets.",
  },
];

export function getPuzzle(
  puzzleId: string,
): PuzzleDefinition | undefined {
  return puzzleRegistry.find((puzzle) => puzzle.id === puzzleId);
}