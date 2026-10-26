import { GAME_CONFIG } from "./gameConfig";

export function getRemainingSeconds(
  startedAt: number,
  now: number = Date.now(),
): number {
  const elapsedSeconds = Math.floor((now - startedAt) / 1000);

  return Math.max(
    0,
    GAME_CONFIG.DURATION_SECONDS - elapsedSeconds,
  );
}

export function hasTimeExpired(
  startedAt: number,
  now: number = Date.now(),
): boolean {
  return getRemainingSeconds(startedAt, now) === 0;
}