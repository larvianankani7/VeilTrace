# VEILTRACE Screens 6, 7 & 8, Endings, Insights, and Final Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the VEILTRACE cybersecurity learning game with Screens 6, 7 & 8, all 11 traces, two conditional endings (Escape & Death), Scene 04 second-to-last trace trigger, post-game menu with educational Insights, and screen fixes.

**Architecture:** Single source of truth for 11 traces, game timer, and cutscenes. Screens 6, 7, 8 fit smoothly into existing `DesktopEnvironment.tsx` navigation and state. Reusable learning overlays and pause coordination prevent time/audio loss during educational sequences.

**Tech Stack:** React 19, TypeScript, Vite, CSS (glassmorphism/cyberpunk desktop styling), Vitest.

**Spec:** `docs/superpowers/specs/2026-11-01-screens-6-7-8-endings-insights-design.md`

## Global Constraints
- Preserve existing 11 traces, IDs, keys, puzzle definitions, and validation logic.
- Background and dark atmosphere of Screens 6, 7, 8 must match previous screens.
- Read-only simulation wherever specified (readme.txt, Antigravity IDE, Boundary Firewall, Env Cabinet, Figma, Timer, Whiteboard).
- Pause timer and siren simultaneously during all learning overlays, readme.txt, whiteboard, cutscenes, and death warning.
- Every resolved trace displays a green `✓ CONFIRMED` checkmark / badge on its desktop icon across all screens.
- Email `merdin.morov@example.com` replaced with `merdinmorov1@gmail.com` project-wide.

---

### Task 1: Email Replacement Project-Wide & Data / Model Updates

**Files:**
- Modify: `src/data/profileData.ts`
- Modify: `public/profile.txt`
- Modify: `tests/screen4-data.test.ts`
- Modify: `tests/screen4-integration.test.ts`
- Modify: `tests/screen5.test.ts`
- Modify: `src/data/learningConcepts.ts`
- Modify: `src/game/gameLogic.ts`

- [x] **Step 1: Update email in `profileData.ts` and `profile.txt`**
  Change `email: "merdin.morov@example.com"` to `"merdinmorov1@gmail.com"`.
  Update `public/profile.txt` line 17 to `merdinmorov1@gmail.com`.

- [x] **Step 2: Update email in test assertions**
  In `tests/screen4-data.test.ts`, `tests/screen4-integration.test.ts`, and `tests/screen5.test.ts`, replace expected email with `"merdinmorov1@gmail.com"`.

- [x] **Step 3: Update `src/data/learningConcepts.ts` with exact prompt content**
  Ensure entries for:
  - `cryptography`: Locked box and key analogy, encryption, keys, digital signatures.
  - `snowflake`: Cloud warehouse, 10M customers, 500M orders, data processing & analysis.
  - `cdn`: Pizza delivery kitchen analogy (Delhi/Mumbai), caching static assets close to user.

- [x] **Step 4: Update `src/game/gameLogic.ts` critical puzzle check**
  Include `nearfield-devices`, `echo-logs`, and `origin-gate` in `isCriticalPuzzle` so all 11 traces can be registered cleanly.

- [x] **Step 5: Run tests to verify Task 1**
  Run: `npm test`
  Expected: All 11 test suites pass.

---

### Task 2: Screen 1, 3, 4, 5 Fixes & Enhancements

**Files:**
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Modify: `src/desktop/apps/DashboardApp.tsx`
- Modify: `src/desktop/apps/PersonalHuApp.tsx`
- Modify: `src/desktop/apps/LoginPrjApp.tsx`
- Modify: `src/desktop/apps/VideosApp.tsx`

- [x] **Step 1: Add CONFIRMED indicator to Screen 1 Maps icon and Screen 3 py.py icon**
  In `DesktopEnvironment.tsx`, render the green `✓` badge and `CONFIRMED` tag when `isMapsSolved` is true (Screen 1 `maps`), and when `isPythonSolved` is true (Screen 3 `py`).

- [x] **Step 2: Polish `DashboardApp.tsx` and `PersonalHuApp.tsx` UI**
  Improve visual hierarchy, glassmorphism cards, status pills, metrics, and typography while retaining all existing data and location bindings.

- [x] **Step 3: Enhance `LoginPrjApp.tsx` with double-click learning button & CONFIRMED indicator**
  Add a dedicated button below the double-click instructions in `LoginPrjApp.tsx`: *"Open Security Concept: Access Token (Double-Click Required)"*. On double click, trigger learning modal.
  In `DesktopEnvironment.tsx`, render the green `✓` badge and `CONFIRMED` tag on Screen 4 `login_prj` icon when `isLoginSolved` is true.

- [x] **Step 4: Upgrade `VideosApp.tsx` with Nature Video & 3 Controls**
  Update `VideosApp.tsx` to use `/videos/nature-stream.mp4`.
  Add three functional controls:
  - `Play`: starts or resumes playback.
  - `Loop`: toggles infinite loop ON/OFF (with visual indicator).
  - `Stop`: pauses video and resets to beginning.
  Provide fallback canvas if video cannot load.

- [x] **Step 5: Run tests and build to verify Task 2**
  Run: `npm test`

---

### Task 3: Screen 6 Applications & Integration (ReadmeTxt & AntigravityApp)

**Files:**
- Create: `src/desktop/icons/screen6Icons.ts`
- Create: `src/desktop/apps/ReadmeTxtApp.tsx`
- Create: `src/desktop/apps/AntigravityApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`

- [x] **Step 1: Create `screen6Icons.ts`**
  Export SVG data URIs for `readme`, `antigravity`, and `foundFolder`.

- [x] **Step 2: Implement `ReadmeTxtApp.tsx`**
  Build dark Notepad UI (`readme.txt - Notepad`).
  Display all 11 traces:
  - Icon / name
  - Required key / interaction
  - Concise description of investigation
  - Emoji
  - Status: `Pending` or `Confirmed` based on current `solvedPuzzleIds`.
  Read-only. Pauses timer and siren while open.

- [x] **Step 3: Implement `AntigravityApp.tsx`**
  Build Antigravity IDE UI with sidebar (project tree), workspace tabs, project information panel explaining cybersecurity learning mission, trace mechanics, and educational awareness. Read-only.

- [x] **Step 4: Integrate Screen 6 into `DesktopEnvironment.tsx`**
  Define `SCREEN_6_ITEMS` (`readme`, `antigravity`, `found_folder`).
  Clicking `found_folder` unlocks and navigates to Screen 7.
  Ensure timer and siren pause when `readme.txt` is opened.

---

### Task 4: Screen 7 Applications & Interactions

**Files:**
- Create: `src/desktop/icons/screen7Icons.ts`
- Create: `src/desktop/apps/NearbyDevicesApp.tsx`
- Create: `src/desktop/apps/BoundaryFirewallApp.tsx`
- Create: `src/desktop/apps/EnvCabinetApp.tsx`
- Create: `src/desktop/apps/EchoLogsApp.tsx`
- Create: `src/desktop/apps/OriginGateApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`

- [x] **Step 1: Create `screen7Icons.ts`**
  Export SVG data URIs for `nearbyDevices`, `boundaryFirewall`, `envCabinet`, `echoLogs`, `originGate`, and `dataFolder`.

- [x] **Step 2: Implement `NearbyDevicesApp.tsx` (Trace #9)**
  Display connected devices with ON/OFF switches.
  When all devices are turned OFF:
  - Trigger `onSolve()` for `nearfield-devices`.
  - Pause timer/siren.
  - Display Cryptography learning overlay.
  - Display green CONFIRMED badge on desktop icon.

- [x] **Step 3: Implement `BoundaryFirewallApp.tsx` & `EnvCabinetApp.tsx`**
  - `BoundaryFirewallApp`: Read-only firewall & antivirus dashboard showing active protection shields, rule tables, and network monitoring.
  - `EnvCabinetApp`: Read-only environment variables and system configuration viewer.

- [x] **Step 4: Implement `EchoLogsApp.tsx` (Trace #10)**
  Snowflake-inspired blue/cyan dark UI with 4 sections (Home, Echo Queries, Settings from `PROFILE_DATA`, Admin Panel).
  In Admin Panel, display instruction: *"To deny ALL permits, press the UP ARROW KEY + SPACEBAR."*
  On `ArrowUp + Space`:
  - Revoke all permits.
  - Trigger `onSolve()` for `echo-logs`.
  - Pause timer/siren.
  - Display Snowflake learning overlay.
  - Display green CONFIRMED badge on desktop icon.

- [x] **Step 5: Implement `OriginGateApp.tsx` (Trace #11)**
  CORS Origin management.
  - Normal click on delete shows warning: *"You cannot delete this origin because you don't have the required permissions. If you want to force delete, use: CTRL + LEFT CLICK."*
  - `Ctrl + Left Click` opens confirmation card with red DELETE button.
  - Clicking DELETE clears origins, updates CORS status, triggers `onSolve()` for `origin-gate`.
  - If 11/11 traces are resolved, show **Achievement Card** (*"🏆 ACHIEVEMENT UNLOCKED: VEILTRACE — ALL TRACES RESOLVED"*), then show CDN learning overlay.

- [x] **Step 6: Integrate Screen 7 in `DesktopEnvironment.tsx`**
  Add items and windows for Screen 7.
  Clicking `data_folder` unlocks and navigates to Screen 8.

---

### Task 5: Screen 8 Applications & Integration

**Files:**
- Create: `src/desktop/icons/screen8Icons.ts`
- Create: `src/desktop/apps/TimerApp.tsx`
- Create: `src/desktop/apps/FigmaApp.tsx`
- Create: `src/desktop/apps/WhiteboardApp.tsx`
- Modify: `src/desktop/DesktopEnvironment.tsx`

- [x] **Step 1: Create `screen8Icons.ts`**
  Export SVG data URIs for `timer`, `figma`, and `whiteboard`.

- [x] **Step 2: Implement `TimerApp.tsx`**
  Read-only warning-style live countdown card synchronized with central timer state.

- [x] **Step 3: Implement `FigmaApp.tsx`**
  Read-only Figma-inspired canvas with VEILTRACE cybersecurity learning identity logo, toolbar, layers panel, and cyber-learning symbols.

- [x] **Step 4: Implement `WhiteboardApp.tsx`**
  Read-only digital whiteboard displaying interactive cards, diagrams, arrows, and key takeaways for only the learnings *actually unlocked* by the player so far. Pauses timer and siren while open.

- [x] **Step 5: Integrate Screen 8 in `DesktopEnvironment.tsx`**
  Define `SCREEN_8_ITEMS`. Wire windows and navigation controls.

---

### Task 6: Cutscene Orchestrator, Endings (Escape, Death, Scene 04), and Blood Tension Screen

**Files:**
- Create: `src/game/videoAssets.ts`
- Modify: `src/desktop/DesktopEnvironment.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/scenes.css`

- [x] **Step 1: Create `videoAssets.ts`**
  Export asset mapping for `/videos/Escape_ending.mp4`, `/videos/Death_ending.mp4`, `/videos/End_Credits.mp4`, and `/videos/scene-04.mp4`.

- [x] **Step 2: Implement Scenario B (Scene 04 when 1 trace remains)**
  When `solvedCount === 10` and the user closes the 10th learning modal for the first time, trigger `scene-04.mp4`. When finished, resume gameplay.

- [x] **Step 3: Implement Scenario A (Escape Ending when 11/11 resolved)**
  When all 11 traces are solved and the user closes the final CDN learning modal, play `Escape_ending.mp4` → then play `End_Credits.mp4` → then return to Main Menu.

- [x] **Step 4: Implement Scenario C (Death Ending when timer reaches 0:00)**
  When countdown reaches zero with <11 solved:
  - Stop gameplay.
  - Display 1.5s red blood tension warning (*"TIME'S UP"*, accelerating siren, red flash).
  - Play `Death_ending.mp4` → then play `End_Credits.mp4` → then return to Main Menu.

---

### Task 7: Post-Game Main Menu & Insights Dashboard

**Files:**
- Create: `src/scenes/InsightsDashboard.tsx`
- Modify: `src/scenes/OpeningExperience.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/styles/opening-experience.css`

- [x] **Step 1: Implement `InsightsDashboard.tsx`**
  Full-screen educational dashboard displaying dedicated cards for all 11 cybersecurity topics with explanations, analogies, diagrams, and cybersecurity significance. Includes back button to return to menu.

- [x] **Step 2: Update `OpeningExperience.tsx` Menu Options**
  - Replace "Start Game" with "New Game" when played or as primary start button.
  - Add "Insights" button that opens `InsightsDashboard`.
  - Preserve "Settings" and "About".

- [x] **Step 3: Implement complete game restart in `App.tsx`**
  Ensure "New Game" resets timer, siren, traces, unlocked learnings, achievements, cutscene flags, and starting screen with no stale state.

---

### Task 8: Styling, Verification & Test Suite

**Files:**
- Modify: `src/styles/desktop.css`
- Modify: `src/styles/scenes.css`
- Create: `tests/screens6-7-8.test.ts`

- [x] **Step 1: Add styling for new applications and screens in `desktop.css`**
  Add styles for Notepad, Antigravity IDE, Snowflake UI, CORS Origin manager, Nearby Devices toggles, Firewall, Figma canvas, Whiteboard, and Achievement Card.

- [x] **Step 2: Write automated test suite `tests/screens6-7-8.test.ts`**
  Test 11 critical puzzle IDs, trace solve triggers, timer pause states, cutscene triggers, and reset logic.

- [x] **Step 3: Run full verification suite**
  Run: `npm test`
  Run: `npm run build`
  Verify all tests pass and TypeScript build succeeds without errors.
