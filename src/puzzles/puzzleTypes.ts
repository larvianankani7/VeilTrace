export type PuzzleAction =
  | "set-private"
  | "revoke-sharing"
  | "remove-geotags"
  | "restrict-history"
  | "exclude-backup"
  | "privatise-event"
  | "restrict-diagnostics"
  | "restrict-permission"
  | "revoke-session"
  | "revoke-token"
  | "rotate-secret";

export type PuzzleDefinition = {
  id: string;
  title: string;
  description: string;
  action: PuzzleAction;
  successMessage: string;
  learningPoint: string;
};

export type PuzzleResult = {
  puzzleId: string;
  solved: boolean;
  message: string;
};