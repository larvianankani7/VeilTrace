export type GameStatus =
  | "not-started"
  | "running"
  | "escaped"
  | "failed";

export type PuzzleProgress = {
  puzzleId: string;
  solved: boolean;
  solvedAt?: number;
};

export type GameState = {
  status: GameStatus;
  startedAt: number | null;
  remainingSeconds: number;
  solvedPuzzleIds: string[];
};