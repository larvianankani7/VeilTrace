export type PuzzleClue = {
  puzzleId: string;
  hint: string;
  learningPoint: string;
};

export const criticalClues: PuzzleClue[] = [
  {
    puzzleId: "persona-hub",
    hint: "If everyone can see your life, start by closing the curtains.",
    learningPoint: "Public profile visibility can expose personal information.",
  },
  {
    puzzleId: "atlas-places",
    hint: "A map shared once may keep revealing where you go.",
    learningPoint: "Revoke live location-sharing links you no longer need.",
  },
  {
    puzzleId: "geoframe-gallery",
    hint: "A picture can remember where it was born.",
    learningPoint: "Photo metadata may contain geographic coordinates.",
  },
  {
    puzzleId: "footprint-log",
    hint: "The trail behind you can reveal more than the path ahead.",
    learningPoint: "Restrict access to detailed location and login histories.",
  },
  {
    puzzleId: "roam-backup",
    hint: "Even when the original disappears, its shadow may remain.",
    learningPoint: "Backups can retain sensitive location history.",
  },
  {
    puzzleId: "daymark-calendar",
    hint: "An invitation can reveal more than the hour.",
    learningPoint: "Public events may expose addresses and routines.",
  },
  {
    puzzleId: "route-trace",
    hint: "Every connection leaves a mark; not every observer needs to read it.",
    learningPoint: "Limit unnecessary sharing of connection diagnostics.",
  },
  {
    puzzleId: "permission-garden",
    hint: "Why should an app watch the road when it is not being used?",
    learningPoint: "Grant location permissions only when necessary.",
  },
  {
    puzzleId: "session-mirror",
    hint: "If another window is still open, someone may still be inside.",
    learningPoint: "Review and revoke unfamiliar active sessions.",
  },
  {
    puzzleId: "token-cabinet",
    hint: "A key left in the light is no longer yours alone.",
    learningPoint: "Revoke exposed authentication tokens and prevent disclosure.",
  },
  {
    puzzleId: "environment-cabinet",
    hint: "The secret that powers the machine should never be on display.",
    learningPoint: "Protect exposed credentials and rotate compromised secrets.",
  },
];

export function getClue(puzzleId: string): PuzzleClue | undefined {
  return criticalClues.find((clue) => clue.puzzleId === puzzleId);
}
