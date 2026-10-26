export const GAME_PHASES = {
  TITLE: "title",
  INTRO: "intro",
  ROOM: "room",
  DESKTOP: "desktop",
  ESCAPE: "escape",
  DEATH: "death",
} as const;

export type GamePhase =
  (typeof GAME_PHASES)[keyof typeof GAME_PHASES];
export const ENDING_PHASES: readonly GamePhase[] = [
  GAME_PHASES.ESCAPE,
  GAME_PHASES.DEATH,
];
export function isEndingPhase(
  phase: GamePhase,
): boolean {
  return ENDING_PHASES.includes(phase);
}
