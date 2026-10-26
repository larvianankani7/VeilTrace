import { puzzleRegistry } from "./puzzleRegistry";
import type { PuzzleAction, PuzzleResult } from "./puzzleTypes";

export type PuzzleSettings = Partial<
  Record<PuzzleAction, boolean>
>;

export function validatePuzzle(
  puzzleId: string,
  settings: PuzzleSettings,
): PuzzleResult {
  const puzzle = puzzleRegistry.find(
    (item) => item.id === puzzleId,
  );

  if (!puzzle) {
    return {
      puzzleId,
      solved: false,
      message: "Unknown puzzle.",
    };
  }

  const solved = settings[puzzle.action] === true;

  return {
    puzzleId,
    solved,
    message: solved
      ? puzzle.successMessage
      : "Exposure remains active. Review the settings and try again.",
  };
}