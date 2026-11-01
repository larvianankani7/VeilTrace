# VEILTRACE — Screen 4 Implementation & Screen 2 Targeted Fixes Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Screen 4 with 12 desktop items and corresponding interactive applications, provide the Screen 5 navigation hook, and apply targeted fixes to Screen 2 desktop icons and Chrome learning persistence.

**Architecture:** Extend `DesktopEnvironment.tsx` state and window rendering system to manage Screen 4 apps and navigation. Add dedicated modular React components for each Screen 4 app (`dashboard_prj`, `login_prj`, `ecom_prj`, `personal_hu_prj`, `pass_generator_prj`, `key_vault_prj`, `sentinel_alerts_prj`, `control_center_prj`, `gallery_prj`, `music_prj`, `task_manager_prj`, `device_registry`). Keep all profile data grounded in `profile.txt`, integrate simulated location updates, and coordinate multi-condition timer/siren pauses.

**Tech Stack:** React 19, TypeScript, Vite, CSS Modules / desktop.css, Vitest.

**Spec:** USER_REQUEST

## Global Constraints
- Preserve all existing Screen 1 and Screen 3 visuals, interactions, dialogue, puzzles, navigation, cutscenes, timer, siren, and learning behavior.
- Screen 2 must display ONLY 4 icons: Device Registry, Chrome, IMPS, VS Code.
- All 12 Screen 4 desktop items must use their exact specified visible names.
- Single source of truth for M's profile is `profile.txt`.
- Frontend educational simulation only — no real network auth, geolocation, or telemetry.
- `npm run build` must succeed without TypeScript or build errors.

---

### Task 1: Shared Profile Data & Learning Concepts

**Files:**
- Create: `src/data/profileData.ts`
- Modify: `src/data/learningConcepts.ts`
- Modify: `src/desktop/components/LearningModal.tsx`
- Test: `tests/screen4-data.test.ts`

**Interfaces:**
- `PROFILE_DATA`: Structured dossier read from `profile.txt` (`fullName: "Merdin Morov"`, `email: "merdin.morov@example.com"`, etc.).
- `access-token` concept: 🎟️ Access Token lesson with verbatim concert ticket explanation.
- `caching` concept: ⚡ Caching lesson with verbatim restaurant burger explanation.

- [ ] **Step 1: Write test for profile data and learning concepts**

```ts
import { describe, expect, it } from "vitest";
import { PROFILE_DATA } from "../src/data/profileData";
import { getLearningConcept } from "../src/data/learningConcepts";

describe("Profile Data and Learning Concepts", () => {
  it("contains M's exact profile details from profile.txt", () => {
    expect(PROFILE_DATA.fullName).toBe("Merdin Morov");
    expect(PROFILE_DATA.email).toBe("merdin.morov@example.com");
    expect(PROFILE_DATA.nickname).toBe("M");
    expect(PROFILE_DATA.age).toBe(28);
    expect(PROFILE_DATA.initialLocation).toBe("North District · Building 08");
  });

  it("provides Access Token and Caching learning concepts", () => {
    const token = getLearningConcept("access-token");
    expect(token).toBeDefined();
    expect(token?.topic).toBe("Access Token");

    const caching = getLearningConcept("caching");
    expect(caching).toBeDefined();
    expect(caching?.topic).toBe("Caching");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- tests/screen4-data.test.ts`
Expected: FAIL due to missing `profileData.ts` and concepts.

- [ ] **Step 3: Implement `src/data/profileData.ts` and update `learningConcepts.ts` and `LearningModal.tsx`**
Define `PROFILE_DATA` matching `ProfileApp.tsx` dossier and add `access-token` & `caching` entries to `learningConcepts.ts` and `LearningModal.tsx`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- tests/screen4-data.test.ts`
Expected: PASS.

---

### Task 2: Screen 2 Targeted Fixes (Icons & Chrome Learning Persistence)

**Files:**
- Create: `src/desktop/apps/DeviceRegistryApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Modify: `src/desktop/apps/ChromeApp.tsx`
- Modify: `src/styles/desktop.css`
- Test: `tests/desktop.test.ts`

**Interfaces:**
- Screen 2 items: exactly 4 items (`Device Registry`, `Chrome`, `IMPS`, `VS Code`).
- Chrome learning persistence: after solve, shows hashing learning view, timer & siren paused; reopening Chrome shows ONLY the learning view.
- Device Registry opens `DeviceRegistryApp` displaying node hardware details using existing `.vt-sim-app` and `.vt-device-grid` styles.
- VS Code opens `PythonWorkspaceApp`.

- [ ] **Step 1: Write test for Screen 2 items**
Add unit assertions verifying Screen 2 items list has length 4 and contains exact IDs/names.

- [ ] **Step 2: Implement `DeviceRegistryApp.tsx`**
Render hardware node registry using `vt-sim-app` and `vt-device-grid`.

- [ ] **Step 3: Update `SCREEN_2_ITEMS` and handlers in `DesktopEnvironment.tsx`**
Set `SCREEN_2_ITEMS` to exactly:
1. `Device Registry` (`/media/images/device-icon.png`)
2. `Chrome` (`/media/images/chrome-icon.png`)
3. `IMPS` (`/media/images/imps-icon.png`)
4. `VS Code` (`/media/images/vscode-icon.png`)
Wire click handlers so `device` opens `DeviceRegistryApp`, `vscode` opens `PythonWorkspaceApp`, `chrome` opens `ChromeApp`, and `imps` triggers Scene 03 / Screen 3.

- [ ] **Step 4: Update Chrome persistence**
Ensure `ChromeApp` displays hashing concept when `isSolved`, keep `isLearningOpen` active while Chrome is open, and pause timer & siren.

- [ ] **Step 5: Run tests and verify**
Run: `npm test`
Expected: PASS.

---

### Task 3: Screen 4 Desktop Layout & Screen 5 Navigation Hook

**Files:**
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Modify: `src/styles/desktop.css`
- Test: `tests/screen4-desktop.test.ts`

**Interfaces:**
- `currentPage`: `"screen1" | "screen2" | "screen3" | "screen4" | "screen5"`
- `SCREEN_4_ITEMS`: 12 items with exact visible names:
  1. `dashboard_prj`
  2. `login_prj`
  3. `ecom_prj`
  4. `personal hu_prj`
  5. `pass-generator_prj`
  6. `key-vault_prj`
  7. `Sentinel-Alerts_prj`
  8. `control-center_prj`
  9. `gallery_prj`
  10. `music_prj`
  11. `task-manager_prj`
  12. `mine folder`
- Navigation:
  - Screen 3 `projects` icon opens Screen 4 (`setCurrentPage("screen4")`).
  - Screen 4 `mine folder` navigates to Screen 5 (`setCurrentPage("screen5")`).
  - `vt-page-navigation` handles Previous/Next across Screens 1, 2, 3, 4, 5.

- [ ] **Step 1: Write test for Screen 4 desktop items and navigation**
Verify all 12 exact visible names and navigation hooks.

- [ ] **Step 2: Add SVG icon data URIs for Screen 4 items**
Create sharp, responsive dark-themed SVG icon representations for each item.

- [ ] **Step 3: Configure Screen 4 desktop styling in `desktop.css`**
Set up `.desktop-canvas--screen4::before` with dark background and `.desktop-canvas--screen4 .desktop-icons-area` with grid / multi-column layout so all 12 items fit neatly.

- [ ] **Step 4: Update `DesktopEnvironment.tsx` navigation**
Wire Previous/Next and `mine folder` navigation hook.

- [ ] **Step 5: Run tests**
Run: `npm test`
Expected: PASS.

---

### Task 4: Screen 4 Apps — Auth, Profile & Learning Flow

**Files:**
- Create: `src/desktop/apps/DashboardApp.tsx`
- Create: `src/desktop/apps/PassGeneratorApp.tsx`
- Create: `src/desktop/apps/KeyVaultApp.tsx`
- Create: `src/desktop/apps/LoginPrjApp.tsx`
- Create: `src/desktop/apps/PersonalHuApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Test: `tests/screen4-auth-profile.test.ts`

**Interfaces:**
- `DashboardApp`: Read-only layout displaying M's details from `PROFILE_DATA` + `currentLocation`. Top-right Return button.
- `PassGeneratorApp`: "Generate Pass" button yielding `@1234M_#9` and copy action.
- `KeyVaultApp`: M's email, password entry, "Save" button, persists `vaultPassword`.
- `LoginPrjApp`: Email + password inputs. Checks against `merdin.morov@example.com` and `vaultPassword`. On success, reveals location, double-click button disables broadcast (cannot be undone), displays Access Token learning, pauses timer/siren, completes trace, persists learning view on reopen.
- `PersonalHuApp`: Displays M's fields. Editable location with `Ctrl+U` shortcut. Validates non-blank, updates `currentLocation`, displays Caching learning, pauses timer/siren, completes trace, persists learning view on reopen.

- [ ] **Step 1: Write unit tests for auth and profile logic**
Test email/password validation, double-click requirements, and `Ctrl+U` location saving.

- [ ] **Step 2: Implement `DashboardApp.tsx`**
Build polished read-only dashboard.

- [ ] **Step 3: Implement `PassGeneratorApp.tsx` and `KeyVaultApp.tsx`**
Build password generator and secure key vault.

- [ ] **Step 4: Implement `LoginPrjApp.tsx` with Access Token lesson**
Build login simulation with double-click location deactivation and learning persistence.

- [ ] **Step 5: Implement `PersonalHuApp.tsx` with Caching lesson**
Build profile editor with `Ctrl+U` shortcut, live location update, and learning persistence.

- [ ] **Step 6: Integrate apps into `DesktopEnvironment.tsx`**
Connect window rendering, shared `currentLocation` state, and `vaultPassword` state.

- [ ] **Step 7: Run tests**
Run: `npm test`
Expected: PASS.

---

### Task 5: Screen 4 Apps — Monitoring, E-Commerce & Media

**Files:**
- Create: `src/desktop/apps/SentinelAlertsApp.tsx`
- Create: `src/desktop/apps/ControlCenterApp.tsx`
- Create: `src/desktop/apps/TaskManagerApp.tsx`
- Create: `src/desktop/apps/EcomApp.tsx`
- Create: `src/desktop/apps/GalleryApp.tsx`
- Create: `src/desktop/apps/MusicApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Test: `tests/screen4-utilities.test.ts`

**Interfaces:**
- `SentinelAlertsApp`: Displays live `remainingSeconds` from main game timer with warning-red accents and status levels.
- `ControlCenterApp`: Reads `puzzleRegistry` and `gameState.solvedPuzzleIds`. Displays trace names, shortcuts, headings, learning descriptions, and statuses. Pauses timer & siren while open.
- `TaskManagerApp`: Displays real completed and remaining traces and task list.
- `EcomApp`: View-only luxury watch showcase with deterministic selection, feature cards, and specifications.
- `GalleryApp`: Nature image cards with lightbox viewing.
- `MusicApp`: Multi-track player. Pauses timer & siren while audio plays. Stops audio on app close. Handles missing files gracefully.

- [ ] **Step 1: Write tests for utilities**
Verify Sentinel Alerts timer display formatting, Control Center trace count, and music pause state.

- [ ] **Step 2: Implement `SentinelAlertsApp.tsx`**
Create high-priority alert panel wired to main timer.

- [ ] **Step 3: Implement `ControlCenterApp.tsx` and `TaskManagerApp.tsx`**
Create trace control dashboard and task manager using real trace progress.

- [ ] **Step 4: Implement `EcomApp.tsx` and `GalleryApp.tsx`**
Create luxury watch e-commerce preview and nature gallery with lightbox.

- [ ] **Step 5: Implement `MusicApp.tsx`**
Create audio player with playback state callbacks (`onPlayStateChange`) to manage timer/siren pause.

- [ ] **Step 6: Integrate all remaining apps into `DesktopEnvironment.tsx`**
Connect window rendering and pause state aggregation.

- [ ] **Step 7: Run tests**
Run: `npm test`
Expected: PASS.

---

### Task 6: Complete Styling, Audio Coordination & Full Verification

**Files:**
- Modify: `src/styles/desktop.css`
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Run: `npm test`
- Run: `npm run build`

**Interfaces:**
- Complete responsive CSS for Screen 4 desktop and all 11 new apps.
- Verified timer & siren pause conditions:
  `shouldPauseTimer = timerPaused || isLearningOpen || isControlCenterOpen || isMusicPlaying || isScreen4LearningOpen || activeCutscene !== null`.

- [ ] **Step 1: Polish styles in `desktop.css`**
Add styles for Screen 4 desktop icons, dashboard cards, login form, watch product view, alert panel, trace status list, audio player, and lightbox.

- [ ] **Step 2: Verify all 14 testing checklist items**
1. `npm run build` succeeds.
2. All 12 Screen 4 items render with exact names.
3. Each item opens correct app.
4. `mine folder` navigates to Screen 5 hook.
5. Login succeeds only with M's email and vault password.
6. Location disable requires double-click and is permanent.
7. Access Token and Caching pause timer/siren and persist on reopen.
8. Location edit saves with Ctrl+U and updates profile across apps.
9. Sentinel Alerts shows live remaining game time.
10. Control Center and Task Manager show real trace data.
11. Music pauses timer/siren while playing and stops on close.
12. Screen 2 has only Device Registry, Chrome, IMPS, VS Code.
13. Screen 2 Chrome shows only hashing learning when reopened after solve.
14. Screens 1 & 3 work unchanged.

- [ ] **Step 3: Run full test suite and production build**
Run: `npm test -- --run`
Run: `npm run build`
Confirm exit code 0 and zero errors.
