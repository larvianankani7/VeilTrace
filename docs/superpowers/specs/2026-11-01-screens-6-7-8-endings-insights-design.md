# VEILTRACE — Screens 6, 7 & 8, Endings, Insights, and Final Fixes Design

## 1. Overview & Objective
This design document defines the final expansion of the VEILTRACE cybersecurity learning game. It introduces Screens 6, 7, and 8, implements all 11 cybersecurity traces, configures video cutscenes for two endings (Escape and Death) plus Scene 04, adds an educational Insights dashboard to the post-game menu, and applies polish and fixes across Screens 1–5.

## 2. Core Architecture & Trace Matrix
The game has exactly 11 traces. Each trace corresponds to an educational concept, an interaction, and a persistent green `✓ CONFIRMED` indicator on its desktop icon.

| # | Screen | Icon / Application | Puzzle ID | Interaction / Trigger | Learning Concept |
|---|---|---|---|---|---|
| 1 | Screen 1 | Maps | `atlas-places` | Toggle horizontal tracking scrollbar OFF | Rate Limiting |
| 2 | Screen 2 | Chrome | `location-exposure` | `Ctrl + Shift + I` or context menu disable | Location Exposure |
| 3 | Screen 3 | py.py | `bloom-filter` | Run terminal command `py --hide_loc` | Bloom Filter |
| 4 | Screen 4 | Login_prj | `token-cabinet` | Enter vault credentials, double-click button | Access Token |
| 5 | Screen 4 | PersonalHu_prj | `persona-hub` | Press `Ctrl + U` to cache location | Caching |
| 6 | Screen 5 | Footprint Log | `footprint-log` | Press `Ctrl + Space` | Ciphertext |
| 7 | Screen 5 | Route Trace | `route-trace` (`race-condition`) | Toggle location switch OFF | Race Condition |
| 8 | Screen 5 | Permits | `permission-garden` (`latency`) | Press `Ctrl + Shift + E` | Latency |
| 9 | Screen 7 | Nearby_Devices | `nearfield-devices` | Toggle all connected devices OFF | Cryptography |
| 10 | Screen 7 | Echo_Logs | `echo-logs` | Press `Up Arrow + Spacebar` in Admin Panel | Snowflake |
| 11 | Screen 7 | Origin_Gate | `origin-gate` | `Ctrl + Click` delete icon -> Confirm RED DELETE | CDN |

## 3. Global Timer & Siren Coordination
- Countdown starts at 10 minutes (`GAME_CONFIG.DURATION_SECONDS = 600`).
- Emergency siren audio (`/audio/red-alert-alarm.mp3`) plays while game status is `running`.
- Timer and siren pause simultaneously when:
  - `readme.txt` is opened.
  - Any LearningModal is displayed (Rate Limiting, Bloom Filter, Access Token, Caching, Ciphertext, Race Condition, Latency, Cryptography, Snowflake, CDN).
  - `whiteboard` is opened.
  - Any video cutscene is active (`scene02`, `scene03`, `scene04`, `escape`, `death`, `credits`).
  - The Death tension sequence is warning the user.
- Resumes with zero lost time only when gameplay is active and all pause reasons are cleared.

## 4. Screen 6 — Memo Folder
- Triggered by clicking `memo_folder` on Screen 5.
- Background and dark atmosphere matches previous screens.
- **`readme.txt`**: Read-only Notepad interface. Lists all 11 traces with application name, required key/interaction, description, icon/emoji, and real-time status (`Pending` vs `Confirmed`). Pauses timer and siren.
- **`antigravity.exe`**: Read-only Antigravity IDE with dark theme, sidebar file tree, code/markdown workspace, and project panel explaining VEILTRACE's cybersecurity awareness mechanics and security principles.
- **`found` folder**: Navigates to Screen 7.

## 5. Screen 7 — Found Folder
- **`Nearby_Devices`**: Lists connected wireless/Bluetooth/RF devices with status indicators and individual ON/OFF toggles. When all devices are toggled OFF -> solves `nearfield-devices`, opens Cryptography learning modal, shows CONFIRMED badge.
- **`Boundary_Firewall`**: Read-only firewall & antivirus dashboard showing active protection shields, rule tables, and network traffic.
- **`Env_Cabinet`**: Read-only environment variables viewer displaying system configs, paths, and variables.
- **`Echo_Logs`**: Snowflake-inspired app with navigation:
  - *Home*: Snowflake metrics, query stats, storage overview.
  - *Echo Queries*: Read-only log query history.
  - *Settings*: Dossier from `PROFILE_DATA` (using updated email `merdinmorov1@gmail.com`).
  - *Admin Panel*: Lists administrative permits. Instructions: *"To deny ALL permits, press the UP ARROW KEY + SPACEBAR."* Key combination revokes permits, resolves `echo-logs`, shows CONFIRMED badge, opens Snowflake learning overlay.
- **`Origin_Gate`**: CORS configuration app. Normal click on delete shows permission warning with hint: *"If you want to force delete, use: CTRL + LEFT CLICK."* `Ctrl + Left Click` opens confirmation card with red DELETE button. Clicking DELETE removes origins, updates status, resolves `origin-gate`, and displays CONFIRMED badge.
  - If 11/11 traces solved: displays Achievement Unlocked card (*"VEILTRACE — ALL TRACES RESOLVED"*), followed by CDN learning overlay.
- **`data` folder**: Navigates to Screen 8.

## 6. Screen 8 — Data Folder (Final Screen)
- **`Timer`**: Warning-style live countdown card synchronized with central game timer (read-only).
- **`Figma`**: Figma-inspired design canvas featuring VEILTRACE's cybersecurity learning identity, toolbar, layers, and cyber symbols (read-only).
- **`whiteboard`**: Digital whiteboard displaying cards, flowcharts, and diagrams for only the cybersecurity concepts unlocked by the player so far. Pauses timer and siren (read-only).

## 7. Cutscene Sequences & Endings
Centralized video asset paths in `src/game/videoAssets.ts`:
- `ESCAPE_ENDING`: `/videos/Escape_ending.mp4`
- `DEATH_ENDING`: `/videos/Death_ending.mp4`
- `END_CREDITS`: `/videos/End_Credits.mp4`
- `SCENE_04`: `/videos/scene-04.mp4`

### Scenario A — Escape Ending (11/11 Solved Before 0:00)
1. User resolves 11th trace.
2. Achievement card is shown.
3. Final CDN learning overlay is shown.
4. When user closes CDN learning overlay for the first time:
   - Triggers Escape Ending cutscene.
   - When Escape Ending finishes, plays End Credits cutscene.
   - When End Credits finish, navigates to Main Menu.

### Scenario B — Second-Last Trace Trigger (10/11 Solved)
1. Exactly 1 trace remains unresolved.
2. When user closes the learning overlay for the 10th trace for the first time:
   - Triggers `scene-04.mp4` once.
   - Upon finish, resumes gameplay to allow player to find the 11th trace.

### Scenario C — Death Ending (Timer Reaches 0:00 With <11 Solved)
1. Countdown reaches zero while >=1 trace remains unsolved.
2. Gameplay stops immediately; no further traces can be resolved.
3. 1.5-second blood-red tension warning appears with text **"TIME'S UP"**, accelerating siren, and sudden red flash.
4. Plays Death Ending cutscene.
5. Plays End Credits cutscene.
6. Returns to Main Menu.

## 8. Post-Game Menu & Insights
- Main menu options:
  - **New Game**: Clean restart. Resets timer, siren, traces, unlocked learnings, achievement flags, and scene progression without stale state.
  - **Settings** & **About**: Preserved.
  - **Insights**: Opens full-screen educational dashboard with cards for all 11 learnings, technical explanations, real-world analogies, and diagrams.

## 9. Screen Polish & Fixes
- **Screen 1 Maps**: Display green `✓ CONFIRMED` checkmark when `atlas-places` is resolved.
- **Screen 3 py.py**: Display green `✓ CONFIRMED` checkmark when `bloom-filter` is resolved.
- **Screen 4 Dashboard & Personal Hub**: Elevate styling, hierarchy, spacing, cards.
- **Screen 4 Login_prj**: Add button below double-click instructions; double-clicking opens Access Token learning; add green `✓ CONFIRMED` checkmark when resolved.
- **Screen 5 Videos**: Provide continuous looping nature video with Play, Loop (toggle), and Stop controls, and graceful fallback.
- **Email Replacement**: Replace `merdin.morov@example.com` with `merdinmorov1@gmail.com` across all data, UI, and test files.
