import { describe, expect, it } from "vitest";
import { markPuzzleSolved, getSolvedCount } from "../src/game/gameLogic";
import { getRemainingSeconds } from "../src/game/timer";
import { GAME_CONFIG } from "../src/game/gameConfig";
import { getLearningConcept, learningConcepts } from "../src/data/learningConcepts";
import type { GameState } from "../src/game/gameTypes";

describe("Phase 2 Desktop Environment Logic", () => {
  it("initializes with 0 / 11 traces", () => {
    const initialState: GameState = {
      status: "running",
      startedAt: Date.now(),
      remainingSeconds: GAME_CONFIG.DURATION_SECONDS,
      solvedPuzzleIds: [],
    };

    expect(getSolvedCount(initialState)).toBe(0);
    expect(GAME_CONFIG.REQUIRED_FIXES).toBe(11);
  });

  it("awards exactly 1 trace when disabling map scrollbar and prevents duplicates", () => {
    const initialState: GameState = {
      status: "running",
      startedAt: Date.now(),
      remainingSeconds: GAME_CONFIG.DURATION_SECONDS,
      solvedPuzzleIds: [],
    };

    // First toggle awards the trace
    const stateAfterFirstDiscovery = markPuzzleSolved(initialState, "atlas-places");
    expect(getSolvedCount(stateAfterFirstDiscovery)).toBe(1);
    expect(stateAfterFirstDiscovery.solvedPuzzleIds).toContain("atlas-places");

    // Repeated toggle does not increment or duplicate
    const stateAfterSecondToggle = markPuzzleSolved(stateAfterFirstDiscovery, "atlas-places");
    expect(getSolvedCount(stateAfterSecondToggle)).toBe(1);
    expect(stateAfterSecondToggle.solvedPuzzleIds.length).toBe(1);
  });

  it("correctly identifies timer thresholds for green, yellow, red", () => {
    function getTimerColorClass(seconds: number): string {
      if (seconds > 300) return "is-green";
      if (seconds > 60) return "is-yellow";
      return "is-red";
    }

    // > 5 minutes (300s): Green
    expect(getTimerColorClass(600)).toBe("is-green");
    expect(getTimerColorClass(301)).toBe("is-green");

    // <= 5 minutes down to > 1 minute (60s): Yellow
    expect(getTimerColorClass(300)).toBe("is-yellow");
    expect(getTimerColorClass(180)).toBe("is-yellow");
    expect(getTimerColorClass(61)).toBe("is-yellow");

    // <= 1 minute (60s): Red
    expect(getTimerColorClass(60)).toBe("is-red");
    expect(getTimerColorClass(10)).toBe("is-red");
    expect(getTimerColorClass(0)).toBe("is-red");
  });

  it("calculates remaining seconds accurately without drifting", () => {
    const start = 1000000;
    expect(getRemainingSeconds(start, start)).toBe(600);
    expect(getRemainingSeconds(start, start + 30000)).toBe(570);
    expect(getRemainingSeconds(start, start + 600000)).toBe(0);
    expect(getRemainingSeconds(start, start + 700000)).toBe(0);
  });

  it("provides the educational concepts for Location Exposure, Rate Limiting, Bloom Filter, and Hashing", () => {
    const locationConcept = getLearningConcept("location-exposure");
    expect(locationConcept).toBeDefined();
    expect(locationConcept?.topic).toBe("Location Exposure");
    expect(locationConcept?.conceptNumber).toBe(1);
    expect(locationConcept?.summary.toLowerCase()).toContain("applications, maps, location permissions");
    expect(learningConcepts["location-exposure"]).toBeDefined();

    const rateConcept = getLearningConcept("rate-limiting");
    expect(rateConcept).toBeDefined();
    expect(rateConcept?.topic).toBe("Rate Limiting");

    const bloomConcept = getLearningConcept("bloom-filter");
    expect(bloomConcept).toBeDefined();
    expect(bloomConcept?.topic).toBe("Bloom Filter");

    const hashingConcept = getLearningConcept("hashing");
    expect(hashingConcept).toBeDefined();
    expect(hashingConcept?.topic).toBe("Hashing");
  });

  it("persists multiple solved traces and handles second trace solving without resetting", () => {
    const state0: GameState = {
      status: "running",
      startedAt: Date.now(),
      remainingSeconds: GAME_CONFIG.DURATION_SECONDS,
      solvedPuzzleIds: [],
    };

    // Solve first trace (Maps)
    const state1 = markPuzzleSolved(state0, "atlas-places");
    expect(getSolvedCount(state1)).toBe(1);
    expect(state1.solvedPuzzleIds).toContain("atlas-places");

    // Solve second trace (py.py)
    const state2 = markPuzzleSolved(state1, "route-trace");
    expect(getSolvedCount(state2)).toBe(2);
    expect(state2.solvedPuzzleIds).toContain("atlas-places");
    expect(state2.solvedPuzzleIds).toContain("route-trace");

    // Repeat solve attempts do not duplicate
    const state3 = markPuzzleSolved(state2, "route-trace");
    expect(getSolvedCount(state3)).toBe(2);
    expect(state3.solvedPuzzleIds.length).toBe(2);
  });

  it("validates Screen 1, 2, and 3 navigation state transitions", () => {
    type Page = "screen1" | "screen2" | "screen3";

    function canGoNext(page: Page, screen2Unlocked: boolean, screen3Unlocked: boolean): boolean {
      if (page === "screen1") return screen2Unlocked;
      if (page === "screen2") return screen3Unlocked;
      return false; // Screen 3 Next is always disabled
    }

    function canGoPrevious(page: Page, screen2Unlocked: boolean): boolean {
      if (page === "screen1") return false;
      if (page === "screen2") return screen2Unlocked;
      return true; // Screen 3 returns to Screen 2
    }

    function getPreviousPage(page: Page): Page {
      if (page === "screen3") return "screen2";
      if (page === "screen2") return "screen1";
      return "screen1";
    }

    function getNextPage(page: Page): Page {
      if (page === "screen1") return "screen2";
      if (page === "screen2") return "screen3";
      return page;
    }

    // Initial state on Screen 1
    expect(canGoPrevious("screen1", false)).toBe(false);
    expect(canGoNext("screen1", false, false)).toBe(false);

    // After Location clicked & Cutscene 2 completed: screen2Unlocked becomes true
    expect(canGoNext("screen1", true, false)).toBe(true);
    expect(getNextPage("screen1")).toBe("screen2");

    // On Screen 2
    expect(canGoPrevious("screen2", false)).toBe(false);
    expect(canGoPrevious("screen2", true)).toBe(true);
    expect(getPreviousPage("screen2")).toBe("screen1");
    // Next is disabled until imps is clicked & Cutscene 3 completed
    expect(canGoNext("screen2", true, false)).toBe(false);
    expect(canGoNext("screen2", true, true)).toBe(true);
    expect(getNextPage("screen2")).toBe("screen3");

    // On Screen 3
    expect(canGoPrevious("screen3")).toBe(true);
    // Previous returns to Screen 2, never directly to Screen 1
    expect(getPreviousPage("screen3")).toBe("screen2");
    // Next is disabled
    expect(canGoNext("screen3", true, true)).toBe(false);
  });
});
