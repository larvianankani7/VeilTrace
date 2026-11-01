import { describe, it, expect } from "vitest";
import { isCriticalPuzzle, markPuzzleSolved, canEscape, resolveEnding } from "../src/game/gameLogic";
import { GAME_CONFIG, GAME_ENDINGS } from "../src/game/gameConfig";
import type { GameState } from "../src/game/gameTypes";
import { learningConcepts } from "../src/data/learningConcepts";
import { PROFILE_DATA } from "../src/data/profileData";
import { VIDEO_ASSETS } from "../src/game/videoAssets";
import {
  SCREEN_1_ITEMS,
  SCREEN_2_ITEMS,
  SCREEN_3_ITEMS,
  SCREEN_4_ITEMS,
  SCREEN_5_ITEMS,
  SCREEN_6_ITEMS,
  SCREEN_7_ITEMS,
  SCREEN_8_ITEMS,
} from "../src/desktop/DesktopEnvironment";

describe("VEILTRACE Screens 6, 7 & 8 Architecture and Traces", () => {
  const ALL_11_TRACES = [
    "atlas-places",      // Screen 1 Maps
    "location-exposure", // Screen 2 Chrome
    "bloom-filter",      // Screen 3 py.py
    "token-cabinet",     // Screen 4 login_prj
    "persona-hub",       // Screen 4 personal_hu_prj
    "footprint-log",     // Screen 5 Footprint Log
    "race-condition",    // Screen 5 Route Trace
    "permission-garden", // Screen 5 Permits
    "nearfield-devices", // Screen 7 Nearby_Devices
    "echo-logs",         // Screen 7 Echo_Logs
    "origin-gate",       // Screen 7 Origin_Gate
  ];

  it("recognizes all 11 critical puzzle IDs", () => {
    expect(GAME_CONFIG.REQUIRED_FIXES).toBe(11);
    for (const traceId of ALL_11_TRACES) {
      expect(isCriticalPuzzle(traceId)).toBe(true);
    }
  });

  it("marks all 11 traces as solved and achieves escape status", () => {
    let state: GameState = {
      status: "running",
      startedAt: Date.now(),
      remainingSeconds: 400,
      solvedPuzzleIds: [],
    };

    expect(canEscape(state)).toBe(false);

    for (let i = 0; i < ALL_11_TRACES.length; i++) {
      state = markPuzzleSolved(state, ALL_11_TRACES[i]!);
      if (i < 10) {
        expect(state.status).toBe("running");
        expect(canEscape(state)).toBe(false);
      }
    }

    expect(state.solvedPuzzleIds.length).toBe(11);
    expect(state.status).toBe("escaped");
    expect(canEscape(state)).toBe(true);
    expect(resolveEnding(state)).toBe(GAME_ENDINGS.ESCAPE);
  });

  it("resolves to death ending when time expires with unresolved traces", () => {
    const failedState: GameState = {
      status: "running",
      startedAt: Date.now() - 700000,
      remainingSeconds: 0,
      solvedPuzzleIds: ["atlas-places", "location-exposure"],
    };

    expect(resolveEnding(failedState)).toBe(GAME_ENDINGS.DEATH);
  });

  it("contains all 11 educational concepts in learningConcepts", () => {
    const requiredConcepts = [
      "rate-limiting",
      "location-exposure",
      "bloom-filter",
      "access-token",
      "caching",
      "ciphertext",
      "race-condition",
      "latency",
      "cryptography",
      "snowflake",
      "cdn",
    ];

    for (const conceptId of requiredConcepts) {
      expect(learningConcepts[conceptId]).toBeDefined();
      expect(learningConcepts[conceptId]!.topic).toBeTruthy();
      expect(learningConcepts[conceptId]!.summary).toBeTruthy();
      expect(learningConcepts[conceptId]!.description).toBeTruthy();
    }
  });

  it("verifies email is updated project-wide to merdinmorov1@gmail.com", () => {
    expect(PROFILE_DATA.email).toBe("merdinmorov1@gmail.com");
  });

  it("verifies Screen 6 desktop icons (readme, antigravity, found_folder)", () => {
    expect(SCREEN_6_ITEMS).toHaveLength(3);
    const ids = SCREEN_6_ITEMS.map((item) => item.id);
    expect(ids).toContain("readme");
    expect(ids).toContain("antigravity");
    expect(ids).toContain("found_folder");
  });

  it("verifies Screen 7 desktop icons (Nearby_Devices, Boundary_Firewall, Env_Cabinet, Echo_Logs, Origin_Gate, data_folder)", () => {
    expect(SCREEN_7_ITEMS).toHaveLength(6);
    const ids = SCREEN_7_ITEMS.map((item) => item.id);
    expect(ids).toContain("nearby_devices");
    expect(ids).toContain("boundary_firewall");
    expect(ids).toContain("env_cabinet");
    expect(ids).toContain("echo_logs");
    expect(ids).toContain("origin_gate");
    expect(ids).toContain("data_folder");
  });

  it("verifies Screen 8 desktop icons (timer_app, figma, whiteboard)", () => {
    expect(SCREEN_8_ITEMS).toHaveLength(3);
    const ids = SCREEN_8_ITEMS.map((item) => item.id);
    expect(ids).toContain("timer_app");
    expect(ids).toContain("figma");
    expect(ids).toContain("whiteboard");
  });

  it("verifies video asset map includes all cutscenes and ending videos", () => {
    expect(VIDEO_ASSETS.ESCAPE_ENDING).toBe("/videos/Escape_ending.mp4");
    expect(VIDEO_ASSETS.DEATH_ENDING).toBe("/videos/Death_ending.mp4");
    expect(VIDEO_ASSETS.END_CREDITS).toBe("/videos/End_Credits.mp4");
    expect(VIDEO_ASSETS.SCENE_04).toBe("/videos/scene-04.mp4");
    expect(VIDEO_ASSETS.NATURE_STREAM).toBe("/videos/nature-stream.mp4");
  });
});
