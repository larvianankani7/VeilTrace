import { describe, expect, it } from "vitest";
import { getRemainingSeconds, hasTimeExpired } from "../src/game/timer";
import { GAME_CONFIG } from "../src/game/gameConfig";

describe("VEILTRACE timer", () => {
  const start = 1_000_000;

  it("starts with 600 seconds remaining", () => {
    expect(getRemainingSeconds(start, start)).toBe(600);
  });

  it("subtracts elapsed time", () => {
    expect(getRemainingSeconds(start, start + 30_000)).toBe(570);
  });

  it("never returns negative time", () => {
    expect(getRemainingSeconds(start, start + 700_000)).toBe(0);
  });

  it("detects when the timer expires", () => {
    expect(hasTimeExpired(start, start + 600_000)).toBe(true);
  });

  it("uses the configured ten-minute duration", () => {
    expect(GAME_CONFIG.DURATION_SECONDS).toBe(600);
  });
});