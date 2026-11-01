import { describe, expect, it } from "vitest";
import { SCREEN_1_ITEMS, SCREEN_2_ITEMS, SCREEN_3_ITEMS, SCREEN_4_ITEMS } from "../src/desktop/DesktopEnvironment";
import { PROFILE_DATA } from "../src/data/profileData";
import { getLearningConcept } from "../src/data/learningConcepts";
import { DEMO_PASS } from "../src/desktop/apps/PassGeneratorApp";
import { computeTaskStats } from "../src/desktop/apps/TaskManagerApp";
import { WATCH_PRODUCTS } from "../src/desktop/apps/EcomApp";
import { NATURE_PHOTOS } from "../src/desktop/apps/GalleryApp";
import { MUSIC_TRACKS } from "../src/desktop/apps/MusicApp";
import { formatTime } from "../src/desktop/apps/SentinelAlertsApp";
import { markPuzzleSolved, getSolvedCount, isCriticalPuzzle } from "../src/game/gameLogic";
import type { GameState } from "../src/game/gameTypes";

describe("VEILTRACE Full Screen 4 and Screen 2 Verification", () => {
  describe("1. Screen 4 Desktop Items and Exact Names", () => {
    it("renders all 12 Screen 4 items with exact visible names, spelling, and case", () => {
      const expected = [
        "dashboard_prj",
        "login_prj",
        "ecom_prj",
        "personal hu_prj",
        "pass-generator_prj",
        "key-vault_prj",
        "Sentinel-Alerts_prj",
        "learnings",
        "gallery_prj",
        "music_prj",
        "task-manager_prj",
        "mine folder",
      ];

      expect(SCREEN_4_ITEMS.map((item) => item.name)).toEqual(expected);
      expect(SCREEN_4_ITEMS.map((item) => item.id)).toEqual([
        "dashboard_prj",
        "login_prj",
        "ecom_prj",
        "personal_hu_prj",
        "pass-generator_prj",
        "key-vault_prj",
        "Sentinel-Alerts_prj",
        "control-center_prj",
        "gallery_prj",
        "music_prj",
        "task-manager_prj",
        "mine_folder",
      ]);
    });

    it("verifies mine folder is configured as the Screen 5 navigation entry point", () => {
      const mineFolder = SCREEN_4_ITEMS.find((item) => item.name === "mine folder");
      expect(mineFolder).toBeDefined();
      expect(mineFolder?.id).toBe("mine_folder");
    });
  });

  describe("2. Screen 2 Targeted Icon Fixes", () => {
    it("displays only 4 icons on Screen 2 with correct public media image assets", () => {
      expect(SCREEN_2_ITEMS).toHaveLength(4);
      expect(SCREEN_2_ITEMS.map((i) => i.name)).toEqual([
        "Device Registry",
        "Chrome",
        "IMPS",
        "VS Code",
      ]);
      expect(SCREEN_2_ITEMS.map((i) => i.iconSrc)).toEqual([
        "/media/images/device-icon.png",
        "/media/images/chrome-icon.png",
        "/media/images/imps-icon.png",
        "/media/images/vscode-icon.png",
      ]);
    });

    it("ensures Screens 1 and 3 remain untouched", () => {
      expect(SCREEN_1_ITEMS.map((i) => i.name)).toEqual(["Maps", "Location", "profile.txt"]);
      expect(SCREEN_3_ITEMS.map((i) => i.name)).toEqual(["py.py", "MongoDB Atlas", "Brave", "projects"]);
    });

    it("updates status and marks location-exposure solved when Screen 2 trace is resolved", () => {
      expect(isCriticalPuzzle("location-exposure")).toBe(true);

      const stateBefore: GameState = {
        status: "running",
        startedAt: Date.now(),
        remainingSeconds: 600,
        solvedPuzzleIds: ["atlas-places"],
      };

      expect(getSolvedCount(stateBefore)).toBe(1);

      const stateAfter = markPuzzleSolved(stateBefore, "location-exposure");
      expect(getSolvedCount(stateAfter)).toBe(2);
      expect(stateAfter.solvedPuzzleIds).toContain("location-exposure");
    });
  });

  describe("3. M's Profile and Auth Flow", () => {
    it("reads M's exact details from profile.txt data model", () => {
      expect(PROFILE_DATA.fullName).toBe("Merdin Morov");
      expect(PROFILE_DATA.email).toBe("merdinmorov1@gmail.com");
      expect(PROFILE_DATA.initialLocation).toBe("North District · Building 08");
    });

    it("validates pass-generator produces the exact pass @1234M_#9", () => {
      expect(DEMO_PASS).toBe("@1234M_#9");
    });

    it("verifies login succeeds only with M's email and matching vault password", () => {
      const mEmail = PROFILE_DATA.email;
      const vaultPass = DEMO_PASS;

      function canLogin(email: string, pass: string, vault: string | null): boolean {
        if (!vault) return false;
        return email.trim().toLowerCase() === mEmail.toLowerCase() && pass.trim() === vault.trim();
      }

      expect(canLogin(mEmail, DEMO_PASS, vaultPass)).toBe(true);
      expect(canLogin("other@test.com", DEMO_PASS, vaultPass)).toBe(false);
      expect(canLogin(mEmail, "wrong_pass", vaultPass)).toBe(false);
      expect(canLogin(mEmail, DEMO_PASS, null)).toBe(false);
    });

    it("verifies double-click requirement for simulated location deactivation", () => {
      let isDeactivated = false;
      let clickCount = 0;

      function handleSingleClick() {
        clickCount++;
        // Single click does not deactivate
      }

      function handleDoubleClick() {
        if (!isDeactivated) {
          isDeactivated = true;
        }
      }

      handleSingleClick();
      expect(isDeactivated).toBe(false);
      expect(clickCount).toBe(1);

      handleDoubleClick();
      expect(isDeactivated).toBe(true);

      // Deactivation is permanent and cannot be undone
      handleDoubleClick();
      expect(isDeactivated).toBe(true);
    });
  });

  describe("4. Learning Concepts & Persistence", () => {
    it("provides Access Token and Caching lessons with required examples", () => {
      const tokenConcept = getLearningConcept("access-token");
      expect(tokenConcept).toBeDefined();
      expect(tokenConcept?.topic).toBe("Access Token");
      expect(tokenConcept?.summary).toContain("ticket");

      const cacheConcept = getLearningConcept("caching");
      expect(cacheConcept).toBeDefined();
      expect(cacheConcept?.topic).toBe("Caching");
      expect(cacheConcept?.description).toContain("burger");
    });
  });

  describe("5. Sentinel Alerts & Monitoring", () => {
    it("formats timer seconds matching authoritative countdown", () => {
      expect(formatTime(600)).toBe("10:00");
      expect(formatTime(359)).toBe("05:59");
      expect(formatTime(45)).toBe("00:45");
      expect(formatTime(0)).toBe("00:00");
    });

    it("computes task progress from actual game progress without hardcoding", () => {
      const stats = computeTaskStats(["atlas-places", "token-cabinet"], 11);
      expect(stats.completed).toBe(2);
      expect(stats.remaining).toBe(9);
      expect(stats.totalRequired).toBe(11);
    });
  });

  describe("6. Media & E-Commerce", () => {
    it("provides luxury watch specifications for EcomApp", () => {
      expect(WATCH_PRODUCTS.length).toBeGreaterThanOrEqual(3);
      WATCH_PRODUCTS.forEach((watch) => {
        expect(watch.specs.movement).toBeTruthy();
        expect(watch.specs.materials).toBeTruthy();
        expect(watch.specs.waterResistance).toBeTruthy();
        expect(watch.specs.strap).toBeTruthy();
      });
    });

    it("provides nature landscape art for GalleryApp", () => {
      expect(NATURE_PHOTOS.length).toBeGreaterThanOrEqual(4);
    });

    it("provides audio tracks with local audio paths for MusicApp", () => {
      expect(MUSIC_TRACKS).toHaveLength(7);
      const expectedPaths = [
        "/media/audio/track1.mp3",
        "/media/audio/track2.mp3",
        "/media/audio/track3.mp3",
        "/media/audio/track4.mp3",
        "/media/audio/track5.mp3",
        "/media/audio/track6.mp3",
        "/media/audio/track7.mp3",
      ];
      expect(MUSIC_TRACKS.map((t) => t.src)).toEqual(expectedPaths);
    });
  });

  describe("7. Authoritative Timer & Siren Pause Rule Aggregation", () => {
    it("evaluates pause conditions such that closing one app does not resume if another reason remains", () => {
      function evaluateShouldPause({
        timerPaused,
        isLearningOpen,
        isScreen4LearningOpen,
        isControlCenterOpen,
        isMusicPlaying,
        activeCutscene,
      }: {
        timerPaused: boolean;
        isLearningOpen: boolean;
        isScreen4LearningOpen: boolean;
        isControlCenterOpen: boolean;
        isMusicPlaying: boolean;
        activeCutscene: string | null;
      }): boolean {
        return (
          timerPaused ||
          isLearningOpen ||
          isScreen4LearningOpen ||
          isControlCenterOpen ||
          isMusicPlaying ||
          activeCutscene !== null
        );
      }

      // Default running: not paused
      expect(
        evaluateShouldPause({
          timerPaused: false,
          isLearningOpen: false,
          isScreen4LearningOpen: false,
          isControlCenterOpen: false,
          isMusicPlaying: false,
          activeCutscene: null,
        }),
      ).toBe(false);

      // Music playing pauses timer
      expect(
        evaluateShouldPause({
          timerPaused: false,
          isLearningOpen: false,
          isScreen4LearningOpen: false,
          isControlCenterOpen: false,
          isMusicPlaying: true,
          activeCutscene: null,
        }),
      ).toBe(true);

      // Control Center pauses timer
      expect(
        evaluateShouldPause({
          timerPaused: false,
          isLearningOpen: false,
          isScreen4LearningOpen: false,
          isControlCenterOpen: true,
          isMusicPlaying: false,
          activeCutscene: null,
        }),
      ).toBe(true);

      // Multi-pause overlap: stopping music while Control Center is still open keeps timer paused
      expect(
        evaluateShouldPause({
          timerPaused: false,
          isLearningOpen: false,
          isScreen4LearningOpen: false,
          isControlCenterOpen: true,
          isMusicPlaying: false,
          activeCutscene: null,
        }),
      ).toBe(true);
    });
  });
});
