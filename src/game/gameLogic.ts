
import { criticalObjects } from "../data/objects";
import { GAME_CONFIG, GAME_ENDINGS } from "./gameConfig";
import type { GameEnding } from "./gameConfig";
import type { GameState } from "./gameTypes";

const criticalPuzzleIds = new Set(
  criticalObjects.map((object) => object.id),
);

export function isCriticalPuzzle(puzzleId: string): boolean {
  return criticalPuzzleIds.has(puzzleId);
}

export function getSolvedCount(state: GameState): number {
  return new Set(state.solvedPuzzleIds).size;
}

export function canEscape(state: GameState): boolean {
  return (
    (state.status === "running" || state.status === "escaped") &&
    getSolvedCount(state) === GAME_CONFIG.REQUIRED_FIXES &&
    state.remainingSeconds > 0
  );
}

export function resolveEnding(state: GameState): GameEnding | null {
  if (canEscape(state)) {
    return GAME_ENDINGS.ESCAPE;
  }

  if (state.status === "failed" || state.remainingSeconds <= 0) {
    return GAME_ENDINGS.DEATH;
  }

  return null;
}

export function markPuzzleSolved(
  state: GameState,
  puzzleId: string,
): GameState {
  if (state.status !== "running" || !isCriticalPuzzle(puzzleId)) {
    return state;
  }

  if (state.solvedPuzzleIds.includes(puzzleId)) {
    return state;
  }

  const solvedPuzzleIds = [...state.solvedPuzzleIds, puzzleId];

  return {
    ...state,
    solvedPuzzleIds,
    status:
      solvedPuzzleIds.length === GAME_CONFIG.REQUIRED_FIXES &&
      state.remainingSeconds > 0
        ? "escaped"
        : "running",
  };
}
