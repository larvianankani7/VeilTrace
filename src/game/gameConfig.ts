export const GAME_CONFIG = {
  DURATION_SECONDS: 10 * 60,
  REQUIRED_FIXES: 11,
  TOTAL_DESKTOP_OBJECTS: 50,
  HIDDEN_FILE_COUNT: 1,
} as const;

export const GAME_ENDINGS = {
  ESCAPE: "escape",
  DEATH: "death",
} as const;

export type GameEnding =
  (typeof GAME_ENDINGS)[keyof typeof GAME_ENDINGS];