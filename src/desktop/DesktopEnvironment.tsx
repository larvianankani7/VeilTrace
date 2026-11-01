import { useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "../game/gameConfig";
import { markPuzzleSolved, getSolvedCount } from "../game/gameLogic";
import type { GameState } from "../game/gameTypes";
import { getRemainingSeconds } from "../game/timer";
import { scene02Dialogue, scene03Dialogue, scene04Dialogue } from "../data/dialogue";
import type { DialogueLine } from "../data/dialogue";
import { clearGameSubtitle, showGameSubtitle } from "../app/gameSettings";
import DesktopWindow from "./components/DesktopWindow";
import MapsApp from "./apps/MapsApp";
import ProfileApp from "./apps/ProfileApp";
import LocationExplorerApp from "./apps/LocationExplorerApp";
import ChromeApp from "./apps/ChromeApp";
import PythonWorkspaceApp from "./apps/PythonWorkspaceApp";
import AtlasApp from "./apps/AtlasApp";
import BraveApp from "./apps/BraveApp";
import ProjectsApp from "./apps/ProjectsApp";
import DeviceRegistryApp from "./apps/DeviceRegistryApp";
import DashboardApp from "./apps/DashboardApp";
import LoginPrjApp from "./apps/LoginPrjApp";
import EcomApp from "./apps/EcomApp";
import PersonalHuApp from "./apps/PersonalHuApp";
import PassGeneratorApp from "./apps/PassGeneratorApp";
import KeyVaultApp from "./apps/KeyVaultApp";
import SentinelAlertsApp from "./apps/SentinelAlertsApp";
import ControlCenterApp from "./apps/ControlCenterApp";
import GalleryApp from "./apps/GalleryApp";
import MusicApp from "./apps/MusicApp";
import TaskManagerApp from "./apps/TaskManagerApp";
import VsCodeReadmeApp from "./apps/VsCodeReadmeApp";
import VideosApp from "./apps/VideosApp";
import DocsApp from "./apps/DocsApp";
import PresentationsApp from "./apps/PresentationsApp";
import ExcelsApp from "./apps/ExcelsApp";
import FootprintLogApp from "./apps/FootprintLogApp";
import LedgerApp from "./apps/LedgerApp";
import CalendarApp from "./apps/CalendarApp";
import CalcApp from "./apps/CalcApp";
import RouteTraceApp from "./apps/RouteTraceApp";
import PermitsApp from "./apps/PermitsApp";
import SignalMemoryApp from "./apps/SignalMemoryApp";
import ReadmeTxtApp from "./apps/ReadmeTxtApp";
import AntigravityApp from "./apps/AntigravityApp";
import NearbyDevicesApp from "./apps/NearbyDevicesApp";
import BoundaryFirewallApp from "./apps/BoundaryFirewallApp";
import EnvCabinetApp from "./apps/EnvCabinetApp";
import EchoLogsApp from "./apps/EchoLogsApp";
import OriginGateApp from "./apps/OriginGateApp";
import TimerApp from "./apps/TimerApp";
import FigmaApp from "./apps/FigmaApp";
import WhiteboardApp from "./apps/WhiteboardApp";
import LearningModal from "./components/LearningModal";
import { getLearningConcept } from "../data/learningConcepts";
import { SCREEN4_ICONS } from "./icons/screen4Icons";
import { SCREEN5_ICONS } from "./icons/screen5Icons";
import { SCREEN6_ICONS } from "./icons/screen6Icons";
import { SCREEN7_ICONS } from "./icons/screen7Icons";
import { SCREEN8_ICONS } from "./icons/screen8Icons";
import { PROFILE_DATA } from "../data/profileData";
import "../styles/desktop.css";

type DesktopEnvironmentProps = {
  onEscape: (finalState?: GameState) => void;
  onDeath: (finalState?: GameState) => void;
};

type WindowId =
  | "maps"
  | "location"
  | "profile"
  | "chrome"
  | "py"
  | "vscode_readme"
  | "atlas"
  | "brave"
  | "projects"
  | "device"
  | "dashboard_prj"
  | "login_prj"
  | "ecom_prj"
  | "personal_hu_prj"
  | "pass-generator_prj"
  | "key-vault_prj"
  | "Sentinel-Alerts_prj"
  | "control-center_prj"
  | "gallery_prj"
  | "music_prj"
  | "task-manager_prj"
  | "videos"
  | "docs"
  | "presentations"
  | "excels"
  | "footprint_log"
  | "ledger"
  | "calendar"
  | "calc"
  | "route_trace"
  | "permits"
  | "signal_memory"
  | "readme"
  | "antigravity"
  | "nearby_devices"
  | "boundary_firewall"
  | "env_cabinet"
  | "echo_logs"
  | "origin_gate"
  | "timer_app"
  | "figma"
  | "whiteboard"
  | null;

export type DesktopItem = {
  id: string;
  name: string;
  iconSrc: string;
  alt: string;
};

export const SCREEN_1_ITEMS: DesktopItem[] = [
  {
    id: "maps",
    name: "Maps",
    iconSrc: "/media/images/maps-icon.png",
    alt: "Maps",
  },
  {
    id: "location",
    name: "Location",
    iconSrc: "/media/images/location-icon.png",
    alt: "Location",
  },
  {
    id: "profile",
    name: "profile.txt",
    iconSrc: "/media/images/profile-icon.png",
    alt: "profile.txt",
  },
];

export const SCREEN_2_ITEMS: DesktopItem[] = [
  {
    id: "device-registry",
    name: "Device Registry",
    iconSrc: "/media/images/device-icon.png",
    alt: "Device Registry",
  },
  {
    id: "chrome",
    name: "Chrome",
    iconSrc: "/media/images/chrome-icon.png",
    alt: "Chrome",
  },
  {
    id: "imps",
    name: "IMPS",
    iconSrc: "/media/images/imps-icon.png",
    alt: "IMPS",
  },
  {
    id: "vscode",
    name: "VS Code",
    iconSrc: "/media/images/vscode-icon.png",
    alt: "VS Code",
  },
];

export const SCREEN_3_ITEMS: DesktopItem[] = [
  {
    id: "py",
    name: "py.py",
    iconSrc: "/media/images/py-icon.png",
    alt: "py.py",
  },
  {
    id: "atlas",
    name: "MongoDB Atlas",
    iconSrc: "/media/images/atlas-icon.png",
    alt: "MongoDB Atlas",
  },
  {
    id: "brave",
    name: "Brave",
    iconSrc: "/media/images/brave-icon.png",
    alt: "Brave",
  },
  {
    id: "projects",
    name: "projects",
    iconSrc: "/media/images/prjs-icon.png",
    alt: "projects",
  },
];

export const SCREEN_4_ITEMS: DesktopItem[] = [
  {
    id: "dashboard_prj",
    name: "dashboard_prj",
    iconSrc: SCREEN4_ICONS.dashboard,
    alt: "dashboard_prj",
  },
  {
    id: "login_prj",
    name: "login_prj",
    iconSrc: SCREEN4_ICONS.login,
    alt: "login_prj",
  },
  {
    id: "ecom_prj",
    name: "ecom_prj",
    iconSrc: SCREEN4_ICONS.ecom,
    alt: "ecom_prj",
  },
  {
    id: "personal_hu_prj",
    name: "personal hu_prj",
    iconSrc: SCREEN4_ICONS.personalHu,
    alt: "personal hu_prj",
  },
  {
    id: "pass-generator_prj",
    name: "pass-generator_prj",
    iconSrc: SCREEN4_ICONS.passGenerator,
    alt: "pass-generator_prj",
  },
  {
    id: "key-vault_prj",
    name: "key-vault_prj",
    iconSrc: SCREEN4_ICONS.keyVault,
    alt: "key-vault_prj",
  },
  {
    id: "Sentinel-Alerts_prj",
    name: "Sentinel-Alerts_prj",
    iconSrc: SCREEN4_ICONS.sentinelAlerts,
    alt: "Sentinel-Alerts_prj",
  },
  {
    id: "control-center_prj",
    name: "learnings",
    iconSrc: SCREEN4_ICONS.controlCenter,
    alt: "learnings",
  },
  {
    id: "gallery_prj",
    name: "gallery_prj",
    iconSrc: SCREEN4_ICONS.gallery,
    alt: "gallery_prj",
  },
  {
    id: "music_prj",
    name: "music_prj",
    iconSrc: SCREEN4_ICONS.music,
    alt: "music_prj",
  },
  {
    id: "task-manager_prj",
    name: "task-manager_prj",
    iconSrc: SCREEN4_ICONS.taskManager,
    alt: "task-manager_prj",
  },
  {
    id: "mine_folder",
    name: "mine folder",
    iconSrc: SCREEN4_ICONS.mineFolder,
    alt: "mine folder",
  },
];

export const SCREEN_5_ITEMS: DesktopItem[] = [
  {
    id: "videos",
    name: "videos",
    iconSrc: SCREEN5_ICONS.videos,
    alt: "videos",
  },
  {
    id: "docs",
    name: "docs",
    iconSrc: SCREEN5_ICONS.docs,
    alt: "docs",
  },
  {
    id: "presentations",
    name: "presentations",
    iconSrc: SCREEN5_ICONS.presentations,
    alt: "presentations",
  },
  {
    id: "excels",
    name: "excels",
    iconSrc: SCREEN5_ICONS.excels,
    alt: "excels",
  },
  {
    id: "footprint_log",
    name: "Footprint Log",
    iconSrc: SCREEN5_ICONS.footprintLog,
    alt: "Footprint Log",
  },
  {
    id: "ledger",
    name: "Ledger",
    iconSrc: SCREEN5_ICONS.ledger,
    alt: "Ledger",
  },
  {
    id: "calendar",
    name: "Calendar",
    iconSrc: SCREEN5_ICONS.calendar,
    alt: "Calendar",
  },
  {
    id: "calc",
    name: "calc",
    iconSrc: SCREEN5_ICONS.calc,
    alt: "calc",
  },
  {
    id: "route_trace",
    name: "Route Trace",
    iconSrc: SCREEN5_ICONS.routeTrace,
    alt: "Route Trace",
  },
  {
    id: "permits",
    name: "permits",
    iconSrc: SCREEN5_ICONS.permits,
    alt: "permits",
  },
  {
    id: "signal_memory",
    name: "Signal Memory",
    iconSrc: SCREEN5_ICONS.signalMemory,
    alt: "Signal Memory",
  },
  {
    id: "memo_folder",
    name: "memo folder",
    iconSrc: SCREEN5_ICONS.memoFolder,
    alt: "memo folder",
  },
];

export const SCREEN_6_ITEMS: DesktopItem[] = [
  {
    id: "readme",
    name: "readme.txt",
    iconSrc: SCREEN6_ICONS.readme,
    alt: "readme.txt",
  },
  {
    id: "antigravity",
    name: "antigravity.exe",
    iconSrc: SCREEN6_ICONS.antigravity,
    alt: "antigravity.exe",
  },
  {
    id: "found_folder",
    name: "found",
    iconSrc: SCREEN6_ICONS.foundFolder,
    alt: "found folder",
  },
];

export const SCREEN_7_ITEMS: DesktopItem[] = [
  {
    id: "nearby_devices",
    name: "Nearby_Devices",
    iconSrc: SCREEN7_ICONS.nearbyDevices,
    alt: "Nearby_Devices",
  },
  {
    id: "boundary_firewall",
    name: "Boundary_Firewall",
    iconSrc: SCREEN7_ICONS.boundaryFirewall,
    alt: "Boundary_Firewall",
  },
  {
    id: "env_cabinet",
    name: "Env_Cabinet",
    iconSrc: SCREEN7_ICONS.envCabinet,
    alt: "Env_Cabinet",
  },
  {
    id: "echo_logs",
    name: "Echo_Logs",
    iconSrc: SCREEN7_ICONS.echoLogs,
    alt: "Echo_Logs",
  },
  {
    id: "origin_gate",
    name: "Origin_Gate",
    iconSrc: SCREEN7_ICONS.originGate,
    alt: "Origin_Gate",
  },
  {
    id: "data_folder",
    name: "data",
    iconSrc: SCREEN7_ICONS.dataFolder,
    alt: "data folder",
  },
];

export const SCREEN_8_ITEMS: DesktopItem[] = [
  {
    id: "timer_app",
    name: "Timer",
    iconSrc: SCREEN8_ICONS.timer,
    alt: "Timer",
  },
  {
    id: "figma",
    name: "Figma",
    iconSrc: SCREEN8_ICONS.figma,
    alt: "Figma",
  },
  {
    id: "whiteboard",
    name: "whiteboard",
    iconSrc: SCREEN8_ICONS.whiteboard,
    alt: "whiteboard",
  },
];

function createInitialGameState(): GameState {
  return {
    status: "running",
    startedAt: Date.now(),
    remainingSeconds: GAME_CONFIG.DURATION_SECONDS,
    solvedPuzzleIds: [],
  };
}

function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getTimerColorClass(seconds: number): string {
  if (seconds > 300) return "is-green";
  if (seconds > 60) return "is-yellow";
  return "is-red";
}

function DesktopEnvironment({ onEscape, onDeath }: DesktopEnvironmentProps) {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const [activeWindow, setActiveWindow] = useState<WindowId>(null);
  const [mapScrollbarEnabled, setMapScrollbarEnabled] = useState(true);
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timerPaused, setTimerPaused] = useState(false);
  const [activeCutscene, setActiveCutscene] = useState<"scene02" | "scene03" | "scene04" | null>(null);
  const [scene02Seen, setScene02Seen] = useState(false);
  const [scene03Seen, setScene03Seen] = useState(false);
  const [scene04Seen, setScene04Seen] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "screen1" | "screen2" | "screen3" | "screen4" | "screen5" | "screen6" | "screen7" | "screen8"
  >("screen1");

  const [screen2Unlocked, setScreen2Unlocked] = useState(false);
  const [screen3Unlocked, setScreen3Unlocked] = useState(false);
  const [screen4Unlocked, setScreen4Unlocked] = useState(false);
  const [screen5Unlocked, setScreen5Unlocked] = useState(false);
  const [screen6Unlocked, setScreen6Unlocked] = useState(false);
  const [screen7Unlocked, setScreen7Unlocked] = useState(false);
  const [screen8Unlocked, setScreen8Unlocked] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<string>(PROFILE_DATA.initialLocation);
  const [vaultPassword, setVaultPassword] = useState<string | null>(null);
  const [isLocationBroadcastDisabled, setIsLocationBroadcastDisabled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [alarmActive, setAlarmActive] = useState(true);

  const deathHandled = useRef(false);
  const escapeHandled = useRef(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const cutsceneDialogueTimerRef = useRef<number | null>(null);
  const cutsceneVideoRef = useRef<HTMLVideoElement | null>(null);
  const cutsceneSubtitleRef = useRef<string | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);

  const solvedCount = getSolvedCount(gameState);

  // 11 Trace state flags
  const isMapsSolved = gameState.solvedPuzzleIds.includes("atlas-places");
  const isChromeSolved = gameState.solvedPuzzleIds.includes("location-exposure");
  const isPythonSolved =
    gameState.solvedPuzzleIds.includes("bloom-filter") ||
    gameState.solvedPuzzleIds.includes("route-trace");
  const isLoginSolved =
    gameState.solvedPuzzleIds.includes("token-cabinet") ||
    gameState.solvedPuzzleIds.includes("access-token");
  const isPersonalHuSolved =
    gameState.solvedPuzzleIds.includes("persona-hub") ||
    gameState.solvedPuzzleIds.includes("caching");
  const isFootprintSolved =
    gameState.solvedPuzzleIds.includes("footprint-log") ||
    gameState.solvedPuzzleIds.includes("ciphertext");
  const isRouteTraceSolved =
    gameState.solvedPuzzleIds.includes("race-condition");
  const isPermitsSolved =
    gameState.solvedPuzzleIds.includes("permission-garden") ||
    gameState.solvedPuzzleIds.includes("latency");
  const isNearbyDevicesSolved =
    gameState.solvedPuzzleIds.includes("nearfield-devices") ||
    gameState.solvedPuzzleIds.includes("cryptography");
  const isEchoLogsSolved =
    gameState.solvedPuzzleIds.includes("echo-logs") ||
    gameState.solvedPuzzleIds.includes("snowflake");
  const isOriginGateSolved =
    gameState.solvedPuzzleIds.includes("origin-gate") ||
    gameState.solvedPuzzleIds.includes("cdn");

  // Learning open checks
  const isLearningOpen =
    activeConceptId !== null ||
    (activeWindow === "maps" && isMapsSolved) ||
    (activeWindow === "py" && isPythonSolved) ||
    (activeWindow === "chrome" && isChromeSolved);

  const isScreen4LearningOpen =
    (activeWindow === "login_prj" && isLoginSolved) ||
    (activeWindow === "personal_hu_prj" && isPersonalHuSolved);

  const isScreen5LearningOpen =
    (activeWindow === "footprint_log" && isFootprintSolved) ||
    (activeWindow === "route_trace" && isRouteTraceSolved) ||
    (activeWindow === "permits" && isPermitsSolved);

  const isScreen7LearningOpen =
    (activeWindow === "nearby_devices" && isNearbyDevicesSolved) ||
    (activeWindow === "echo_logs" && isEchoLogsSolved) ||
    (activeWindow === "origin_gate" && isOriginGateSolved);

  const isReadmeOpen = activeWindow === "readme";
  const isWhiteboardOpen = activeWindow === "whiteboard";
  const isControlCenterOpen = activeWindow === "control-center_prj";

  const shouldPauseTimer =
    timerPaused ||
    isLearningOpen ||
    isScreen4LearningOpen ||
    isScreen5LearningOpen ||
    isScreen7LearningOpen ||
    isReadmeOpen ||
    isWhiteboardOpen ||
    isControlCenterOpen ||
    isMusicPlaying ||
    activeCutscene !== null;

  useEffect(() => {
    if (gameState.status !== "running") {
      setAlarmActive(false);
      return;
    }
    setAlarmActive(true);
  }, [gameState.status]);

  // One authoritative countdown. It pauses during cutscenes, modals, readme, and whiteboard
  useEffect(() => {
    if (gameState.status !== "running" || gameState.startedAt === null) return;

    if (shouldPauseTimer) {
      if (pausedAtRef.current === null) {
        const remaining = getRemainingSeconds(gameState.startedAt);
        pausedAtRef.current = Date.now();
        setGameState((current) => ({ ...current, remainingSeconds: Math.max(0, remaining) }));
      }
      return;
    }

    if (pausedAtRef.current !== null) {
      const pauseDuration = Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;
      setGameState((current) => ({
        ...current,
        startedAt: current.startedAt === null ? null : current.startedAt + pauseDuration,
      }));
      return;
    }

    const startedAt = gameState.startedAt;
    const updateTimer = () => {
      const remainingSeconds = Math.max(0, getRemainingSeconds(startedAt));
      if (remainingSeconds <= 0) {
        setGameState((current) => {
          if (!deathHandled.current) {
            deathHandled.current = true;
            onDeath(current);
          }
          return { ...current, status: "failed", remainingSeconds: 0 };
        });
        return;
      }
      setGameState((current) =>
        current.status !== "running" ? current : { ...current, remainingSeconds },
      );
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 250);
    return () => window.clearInterval(intervalId);
  }, [gameState.status, gameState.startedAt, onDeath, shouldPauseTimer]);

  // Handle escape phase transition when all 11 traces are resolved
  useEffect(() => {
    if (gameState.status === "escaped" && !escapeHandled.current) {
      // Escape cutscene will be triggered when final learning modal is closed
    }
  }, [gameState.status]);

  // Dynamically measure navbar height to position all screens and apps below it without arbitrary fixed offsets
  useEffect(() => {
    const el = navbarRef.current;
    if (!el) return;

    function measureNavbar() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const bottom = Math.max(80, Math.ceil(rect.bottom));
      document.documentElement.style.setProperty("--vt-navbar-height", `${bottom}px`);
    }

    measureNavbar();
    const observer = new ResizeObserver(measureNavbar);
    observer.observe(el);
    window.addEventListener("resize", measureNavbar);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureNavbar);
    };
  }, [currentPage, activeCutscene]);

  function handleCutsceneTimeUpdate(dialogueLines: DialogueLine[]) {
    const video = cutsceneVideoRef.current;
    if (!video || video.ended || video.paused) return;

    const time = video.currentTime;
    const activeCues = dialogueLines.filter(
      (cue) => cue.start !== undefined && cue.end !== undefined && time >= cue.start && time < cue.end,
    );

    if (activeCues.length > 0) {
      const combinedText = activeCues.map((cue) => `${cue.speaker}: ${cue.text}`).join("\n");
      if (cutsceneSubtitleRef.current !== combinedText) {
        cutsceneSubtitleRef.current = combinedText;
        showGameSubtitle(combinedText, 4000);
      }
    } else {
      if (cutsceneSubtitleRef.current !== null) {
        cutsceneSubtitleRef.current = null;
        clearGameSubtitle();
      }
    }
  }

  // Check if an item has confirmed trace status
  function isItemConfirmed(screen: string, itemId: string): boolean {
    if (screen === "screen1" && itemId === "maps") return isMapsSolved;
    if (screen === "screen2" && itemId === "chrome") return isChromeSolved;
    if (screen === "screen3" && itemId === "py") return isPythonSolved;
    if (screen === "screen4" && itemId === "login_prj") return isLoginSolved;
    if (screen === "screen4" && itemId === "personal_hu_prj") return isPersonalHuSolved;
    if (screen === "screen5" && itemId === "footprint_log") return isFootprintSolved;
    if (screen === "screen5" && itemId === "route_trace") return isRouteTraceSolved;
    if (screen === "screen5" && itemId === "permits") return isPermitsSolved;
    if (screen === "screen7" && itemId === "nearby_devices") return isNearbyDevicesSolved;
    if (screen === "screen7" && itemId === "echo_logs") return isEchoLogsSolved;
    if (screen === "screen7" && itemId === "origin_gate") return isOriginGateSolved;
    return false;
  }

  function handleToast(message: string) {
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 4500);
  }

  // Handle closing learning modal and triggering cutscenes
  function handleCloseLearningModal() {
    setActiveConceptId(null);

    // Scenario B: Exactly 1 trace remains (10/11 resolved), trigger scene-04 once
    if (solvedCount === 10 && !scene04Seen) {
      startScene04();
      return;
    }

    // Scenario A: All 11 resolved, trigger escape ending sequence
    if (solvedCount === 11 && !escapeHandled.current) {
      escapeHandled.current = true;
      onEscape(gameState);
    }
  }

  // Trace 1: Maps scrollbar
  function handleMapScrollbarToggle(enabled: boolean) {
    if (isMapsSolved) {
      setActiveConceptId("rate-limiting");
      return;
    }
    setMapScrollbarEnabled(enabled);
    if (!enabled) {
      setGameState((current) => markPuzzleSolved(current, "atlas-places"));
      handleToast("Trace 01 resolved: Location tracking scrollbar severed.");
      setActiveConceptId("rate-limiting");
      setActiveWindow(null);
    }
  }

  // Trace 2: Chrome DevTools
  function handleChromeSolve() {
    if (isChromeSolved) return;
    setGameState((current) => markPuzzleSolved(current, "location-exposure"));
    handleToast("Trace 02 resolved: Browser location exposure contained.");
    setScreen3Unlocked(true);
    setActiveConceptId("location-exposure");
    setActiveWindow("chrome");
  }

  // Trace 3: Python py.py
  function handlePythonSolve() {
    if (isPythonSolved) return;
    setGameState((current) => markPuzzleSolved(current, "bloom-filter"));
    handleToast("Trace 03 resolved: Bloom filter mask deployed.");
    setActiveConceptId("bloom-filter");
    setActiveWindow(null);
  }

  // Trace 6, 7, 8: Screen 5
  function handleFootprintSolve() {
    if (isFootprintSolved) return;
    setGameState((current) => markPuzzleSolved(current, "footprint-log"));
    handleToast("Trace 06 resolved: Digital footprint telemetry encrypted.");
    setActiveConceptId("ciphertext");
    setActiveWindow("footprint_log");
  }

  function handleRouteTraceSolve() {
    if (isRouteTraceSolved) return;
    setGameState((current) => markPuzzleSolved(current, "race-condition"));
    handleToast("Trace 07 resolved: Route trace race condition eliminated.");
    setActiveConceptId("race-condition");
    setActiveWindow("route_trace");
  }

  function handlePermitsSolve() {
    if (isPermitsSolved) return;
    setGameState((current) => markPuzzleSolved(current, "permission-garden"));
    handleToast("Trace 08 resolved: Latency exposure permissions revoked.");
    setActiveConceptId("latency");
    setActiveWindow("permits");
  }

  // Trace 9: Nearby Devices
  function handleNearbyDevicesSolve() {
    if (isNearbyDevicesSolved) return;
    setGameState((current) => markPuzzleSolved(current, "nearfield-devices"));
    handleToast("Trace 09 resolved: RF transceivers offline. Cryptographic channel secure.");
    setActiveConceptId("cryptography");
    setActiveWindow("nearby_devices");
  }

  // Trace 10: Echo Logs
  function handleEchoLogsSolve() {
    if (isEchoLogsSolved) return;
    setGameState((current) => markPuzzleSolved(current, "echo-logs"));
    handleToast("Trace 10 resolved: Cloud administrative permits denied.");
    setActiveConceptId("snowflake");
    setActiveWindow("echo_logs");
  }

  // Trace 11: Origin Gate
  function handleOriginGateSolve() {
    if (isOriginGateSolved) return;
    setGameState((current) => markPuzzleSolved(current, "origin-gate"));
    handleToast("Trace 11 resolved: CORS origins purged. CDN edge secured.");
    setActiveConceptId("cdn");
    setActiveWindow("origin_gate");
  }

  // Cutscene 2: Scene 02
  function startScene02() {
    setActiveWindow(null);
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene("scene02");
    setTimerPaused(true);
  }

  function finishScene02() {
    if (cutsceneDialogueTimerRef.current !== null) {
      window.clearTimeout(cutsceneDialogueTimerRef.current);
      cutsceneDialogueTimerRef.current = null;
    }
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene(null);
    setTimerPaused(false);
    setScene02Seen(true);
    setScreen2Unlocked(true);
    setCurrentPage("screen2");
    setActiveWindow(null);
  }

  // Cutscene 3: Scene 03
  function startScene03() {
    setActiveWindow(null);
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene("scene03");
    setTimerPaused(true);
  }

  function finishScene03() {
    if (cutsceneDialogueTimerRef.current !== null) {
      window.clearTimeout(cutsceneDialogueTimerRef.current);
      cutsceneDialogueTimerRef.current = null;
    }
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene(null);
    setTimerPaused(false);
    setScene03Seen(true);
    setScreen3Unlocked(true);
    setCurrentPage("screen3");
    setActiveWindow(null);
  }

  // Cutscene 4: Scene 04 (Scenario B: 1 trace remains)
  function startScene04() {
    setActiveWindow(null);
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene("scene04");
    setTimerPaused(true);
  }

  function finishScene04() {
    cutsceneSubtitleRef.current = null;
    clearGameSubtitle();
    setActiveCutscene(null);
    setTimerPaused(false);
    setScene04Seen(true);
    setActiveWindow(null);
  }

  // Desktop Icon Click Handlers
  function handleItemClick(itemId: string) {
    if (currentPage === "screen1") {
      if (itemId === "maps") setActiveWindow("maps");
      else if (itemId === "location") {
        if (!scene02Seen) startScene02();
        else {
          setCurrentPage("screen2");
          setActiveWindow(null);
        }
      } else if (itemId === "profile") setActiveWindow("profile");
      return;
    }

    if (currentPage === "screen2") {
      if (itemId === "device-registry" || itemId === "device") setActiveWindow("device");
      else if (itemId === "chrome") setActiveWindow("chrome");
      else if (itemId === "imps") {
        if (!scene03Seen) startScene03();
        else {
          setCurrentPage("screen3");
          setActiveWindow(null);
        }
      } else if (itemId === "vscode") setActiveWindow("vscode_readme");
      return;
    }

    if (currentPage === "screen3") {
      if (itemId === "py") setActiveWindow("py");
      else if (itemId === "atlas") setActiveWindow("atlas");
      else if (itemId === "brave") setActiveWindow("brave");
      else if (itemId === "projects") {
        setScreen4Unlocked(true);
        setCurrentPage("screen4");
        setActiveWindow(null);
      }
      return;
    }

    if (currentPage === "screen4") {
      if (itemId === "dashboard_prj") setActiveWindow("dashboard_prj");
      else if (itemId === "login_prj") setActiveWindow("login_prj");
      else if (itemId === "ecom_prj") setActiveWindow("ecom_prj");
      else if (itemId === "personal_hu_prj") setActiveWindow("personal_hu_prj");
      else if (itemId === "pass-generator_prj") setActiveWindow("pass-generator_prj");
      else if (itemId === "key-vault_prj") setActiveWindow("key-vault_prj");
      else if (itemId === "Sentinel-Alerts_prj") setActiveWindow("Sentinel-Alerts_prj");
      else if (itemId === "control-center_prj") setActiveWindow("control-center_prj");
      else if (itemId === "gallery_prj") setActiveWindow("gallery_prj");
      else if (itemId === "music_prj") setActiveWindow("music_prj");
      else if (itemId === "task-manager_prj") setActiveWindow("task-manager_prj");
      else if (itemId === "mine_folder") {
        setScreen5Unlocked(true);
        setCurrentPage("screen5");
        setActiveWindow(null);
      }
      return;
    }

    if (currentPage === "screen5") {
      if (itemId === "videos") setActiveWindow("videos");
      else if (itemId === "docs") setActiveWindow("docs");
      else if (itemId === "presentations") setActiveWindow("presentations");
      else if (itemId === "excels") setActiveWindow("excels");
      else if (itemId === "footprint_log") setActiveWindow("footprint_log");
      else if (itemId === "ledger") setActiveWindow("ledger");
      else if (itemId === "calendar") setActiveWindow("calendar");
      else if (itemId === "calc") setActiveWindow("calc");
      else if (itemId === "route_trace") setActiveWindow("route_trace");
      else if (itemId === "permits") setActiveWindow("permits");
      else if (itemId === "signal_memory") setActiveWindow("signal_memory");
      else if (itemId === "memo_folder") {
        setScreen6Unlocked(true);
        setCurrentPage("screen6");
        setActiveWindow(null);
      }
      return;
    }

    if (currentPage === "screen6") {
      if (itemId === "readme") setActiveWindow("readme");
      else if (itemId === "antigravity") setActiveWindow("antigravity");
      else if (itemId === "found_folder") {
        setScreen7Unlocked(true);
        setCurrentPage("screen7");
        setActiveWindow(null);
      }
      return;
    }

    if (currentPage === "screen7") {
      if (itemId === "nearby_devices") setActiveWindow("nearby_devices");
      else if (itemId === "boundary_firewall") setActiveWindow("boundary_firewall");
      else if (itemId === "env_cabinet") setActiveWindow("env_cabinet");
      else if (itemId === "echo_logs") setActiveWindow("echo_logs");
      else if (itemId === "origin_gate") setActiveWindow("origin_gate");
      else if (itemId === "data_folder") {
        setScreen8Unlocked(true);
        setCurrentPage("screen8");
        setActiveWindow(null);
      }
      return;
    }

    if (currentPage === "screen8") {
      if (itemId === "timer_app") setActiveWindow("timer_app");
      else if (itemId === "figma") setActiveWindow("figma");
      else if (itemId === "whiteboard") setActiveWindow("whiteboard");
      return;
    }
  }

  const activeConcept = activeConceptId ? getLearningConcept(activeConceptId) : undefined;

  const currentItems =
    currentPage === "screen1"
      ? SCREEN_1_ITEMS
      : currentPage === "screen2"
      ? SCREEN_2_ITEMS
      : currentPage === "screen3"
      ? SCREEN_3_ITEMS
      : currentPage === "screen4"
      ? SCREEN_4_ITEMS
      : currentPage === "screen5"
      ? SCREEN_5_ITEMS
      : currentPage === "screen6"
      ? SCREEN_6_ITEMS
      : currentPage === "screen7"
      ? SCREEN_7_ITEMS
      : currentPage === "screen8"
      ? SCREEN_8_ITEMS
      : [];

  return (
    <main className="desktop-environment">
      {/* Red alert emergency siren audio */}
      {alarmActive && gameState.status === "running" && !shouldPauseTimer && !activeCutscene && (
        <audio
          className="desktop-siren"
          src="/audio/red-alert-alarm.mp3"
          autoPlay
          loop
          aria-label="Emergency siren"
        />
      )}

      {/* Fullscreen Cutscene 2 Overlay */}
      {activeCutscene === "scene02" && (
        <section className="vt-cinematic" aria-label="Scene 02 cutscene">
          <video
            ref={cutsceneVideoRef}
            className="vt-cinematic__video"
            src="/videos/scene-02.mp4"
            autoPlay
            playsInline
            preload="auto"
            onTimeUpdate={() => handleCutsceneTimeUpdate(scene02Dialogue)}
            onPause={() => {
              cutsceneSubtitleRef.current = null;
              clearGameSubtitle();
            }}
            onEnded={finishScene02}
          />
          <button type="button" className="vt-cinematic__skip" onClick={finishScene02}>
            SKIP CUTSCENE <span aria-hidden="true">»</span>
          </button>
        </section>
      )}

      {/* Fullscreen Cutscene 3 Overlay */}
      {activeCutscene === "scene03" && (
        <section className="vt-cinematic" aria-label="Scene 03 cutscene">
          <video
            ref={cutsceneVideoRef}
            className="vt-cinematic__video"
            src="/videos/scene-03.mp4"
            autoPlay
            playsInline
            preload="auto"
            onTimeUpdate={() => handleCutsceneTimeUpdate(scene03Dialogue)}
            onPause={() => {
              cutsceneSubtitleRef.current = null;
              clearGameSubtitle();
            }}
            onEnded={finishScene03}
          />
          <button type="button" className="vt-cinematic__skip" onClick={finishScene03}>
            SKIP CUTSCENE <span aria-hidden="true">»</span>
          </button>
        </section>
      )}

      {/* Fullscreen Cutscene 4 Overlay (Scenario B: 1 trace left) */}
      {activeCutscene === "scene04" && (
        <section className="vt-cinematic" aria-label="Scene 04 cutscene">
          <video
            ref={cutsceneVideoRef}
            className="vt-cinematic__video"
            src="/videos/scene-04.mp4"
            autoPlay
            playsInline
            preload="auto"
            onTimeUpdate={() => handleCutsceneTimeUpdate(scene04Dialogue)}
            onPause={() => {
              cutsceneSubtitleRef.current = null;
              clearGameSubtitle();
            }}
            onEnded={finishScene04}
          />
          <button type="button" className="vt-cinematic__skip" onClick={finishScene04}>
            SKIP CUTSCENE <span aria-hidden="true">»</span>
          </button>
        </section>
      )}

      {/* Main Desktop Canvas */}
      <div className={`desktop-canvas desktop-canvas--${currentPage}`}>
        {/* Top Information HUD */}
        {!activeCutscene && (
          <header ref={navbarRef} className="desktop-top-bar" aria-label="Desktop Information Bar">
            <div className="info-card trace-status-card" role="status">
              <span className="trace-status-label">TRACES FOUND:</span>
              <span className="trace-status-count">
                {solvedCount} / {GAME_CONFIG.REQUIRED_FIXES}
              </span>
            </div>

            <div className="info-card objective-card">
              <span className="objective-heading">OBJECTIVE</span>
              <p className="objective-text">
                {currentPage === "screen1" && "Screen 1 // System Root — Deactivate location beaconing."}
                {currentPage === "screen2" && "Screen 2 // File Explorer — Sever exposed browser headers."}
                {currentPage === "screen3" && "Screen 3 // Python Workspace — Deploy probabilistic Bloom mask."}
                {currentPage === "screen4" && "Screen 4 // Project Directory — Revoke session token & cache coordinates."}
                {currentPage === "screen5" && "Screen 5 // Diagnostics — Encrypt footprints and revoke permits."}
                {currentPage === "screen6" && "Screen 6 // Memo Folder — Review trace manifest in readme.txt."}
                {currentPage === "screen7" && "Screen 7 // Found Folder — Isolate RF devices, revoke permits, purge CORS."}
                {currentPage === "screen8" && "Screen 8 // Data Vault — Inspect synchronized countdown and whiteboard."}
              </p>
            </div>

            <div
              className={`info-card countdown-timer-card ${getTimerColorClass(
                gameState.remainingSeconds,
              )}`}
              role="timer"
              aria-label={`${formatCountdown(gameState.remainingSeconds)} remaining`}
            >
              <span className="timer-indicator-dot" aria-hidden="true" />
              <span className="timer-digits">
                {formatCountdown(gameState.remainingSeconds)}
              </span>
            </div>
          </header>
        )}

        {/* Global Bottom-Left Screen Navigation */}
        {!activeCutscene && (
          <nav className="vt-page-navigation" aria-label="Screen navigation">
            <button
              type="button"
              disabled={
                currentPage === "screen1" ||
                (currentPage === "screen2" && !screen2Unlocked) ||
                (currentPage === "screen3" && !screen3Unlocked) ||
                (currentPage === "screen4" && !screen4Unlocked) ||
                (currentPage === "screen5" && !screen5Unlocked) ||
                (currentPage === "screen6" && !screen6Unlocked) ||
                (currentPage === "screen7" && !screen7Unlocked) ||
                (currentPage === "screen8" && !screen8Unlocked)
              }
              onClick={() => {
                if (currentPage === "screen8") {
                  setCurrentPage("screen7");
                  setActiveWindow(null);
                } else if (currentPage === "screen7") {
                  setCurrentPage("screen6");
                  setActiveWindow(null);
                } else if (currentPage === "screen6") {
                  setCurrentPage("screen5");
                  setActiveWindow(null);
                } else if (currentPage === "screen5") {
                  setCurrentPage("screen4");
                  setActiveWindow(null);
                } else if (currentPage === "screen4") {
                  setCurrentPage("screen3");
                  setActiveWindow(null);
                } else if (currentPage === "screen3") {
                  setCurrentPage("screen2");
                  setActiveWindow(null);
                } else if (currentPage === "screen2" && screen2Unlocked) {
                  setCurrentPage("screen1");
                  setActiveWindow(null);
                }
              }}
            >
              ← Previous
            </button>
            <button
              type="button"
              disabled={
                (currentPage === "screen1" && !screen2Unlocked) ||
                (currentPage === "screen2" && !screen3Unlocked) ||
                (currentPage === "screen3" && !screen4Unlocked) ||
                (currentPage === "screen4" && !screen5Unlocked) ||
                (currentPage === "screen5" && !screen6Unlocked) ||
                (currentPage === "screen6" && !screen7Unlocked) ||
                (currentPage === "screen7" && !screen8Unlocked) ||
                currentPage === "screen8"
              }
              onClick={() => {
                if (currentPage === "screen1" && screen2Unlocked) {
                  setCurrentPage("screen2");
                  setActiveWindow(null);
                } else if (currentPage === "screen2" && screen3Unlocked) {
                  if (!scene03Seen) startScene03();
                  else {
                    setCurrentPage("screen3");
                    setActiveWindow(null);
                  }
                } else if (currentPage === "screen3" && screen4Unlocked) {
                  setCurrentPage("screen4");
                  setActiveWindow(null);
                } else if (currentPage === "screen4" && screen5Unlocked) {
                  setCurrentPage("screen5");
                  setActiveWindow(null);
                } else if (currentPage === "screen5" && screen6Unlocked) {
                  setCurrentPage("screen6");
                  setActiveWindow(null);
                } else if (currentPage === "screen6" && screen7Unlocked) {
                  setCurrentPage("screen7");
                  setActiveWindow(null);
                } else if (currentPage === "screen7" && screen8Unlocked) {
                  setCurrentPage("screen8");
                  setActiveWindow(null);
                }
              }}
            >
              Next →
            </button>
          </nav>
        )}

        {/* Screen 2 Interactive Hotspots over file-Explorer.png */}
        {currentPage === "screen2" && !activeCutscene && !activeWindow && (
          <div className="vt-explorer-reference-hotspots" aria-label="Screen 2 files">
            <button
              type="button"
              className={`vt-explorer-hotspot vt-explorer-hotspot--2 ${isChromeSolved ? "is-resolved" : ""}`}
              onClick={() => setActiveWindow("chrome")}
              aria-label={isChromeSolved ? "Chrome simulation (Contained)" : "Open Chrome simulation"}
              title={isChromeSolved ? "Chrome (Trace Contained)" : "Chrome"}
            />
            <button
              type="button"
              className="vt-explorer-hotspot vt-explorer-hotspot--4"
              onClick={() => {
                if (!scene03Seen) startScene03();
                else {
                  setCurrentPage("screen3");
                  setActiveWindow(null);
                }
              }}
              aria-label="Open imps folder and continue to Scene 03"
              title="imps"
            />
          </div>
        )}

        {/* Desktop Icons Area */}
        {!activeCutscene && (
          <section className="desktop-icons-area" aria-label="Interactive desktop items">
            {currentItems.map((item) => {
              const confirmed = isItemConfirmed(currentPage, item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`desktop-icon-btn desktop-icon-btn--${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  aria-label={`Open ${item.name}`}
                  title={`Open ${item.name}`}
                >
                  <div className="desktop-icon-img-wrap">
                    <img
                      src={item.iconSrc}
                      alt={item.alt}
                      className="desktop-icon-img"
                      draggable={false}
                    />
                    {confirmed && (
                      <span className="desktop-icon-badge is-resolved" title="Confirmed / Trace Contained">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="desktop-icon-label">{item.name}</span>
                  {confirmed && (
                    <span className="desktop-icon-status-tag">CONFIRMED</span>
                  )}
                </button>
              );
            })}
          </section>
        )}

        {/* Active Windows Layer: Screen 1 */}
        {activeWindow === "maps" && (
          <div className="desktop-window-layer">
            <DesktopWindow
              title={isMapsSolved ? "Maps — Security Concept // Rate Limiting" : "Maps"}
              category="Facility Location Service"
              onClose={() => setActiveWindow(null)}
              windowClass="desktop-window--maps"
            >
              <MapsApp
                scrollbarEnabled={mapScrollbarEnabled}
                onToggleScrollbar={handleMapScrollbarToggle}
                isSolved={isMapsSolved}
                onClose={() => setActiveWindow(null)}
              />
            </DesktopWindow>
          </div>
        )}

        {activeWindow === "device" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <DeviceRegistryApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "location" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <LocationExplorerApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "profile" && (
          <div className="desktop-window-layer">
            <DesktopWindow
              title="profile.txt - Notepad"
              category="Text Editor"
              onClose={() => setActiveWindow(null)}
              windowClass="desktop-window--profile"
            >
              <ProfileApp />
            </DesktopWindow>
          </div>
        )}

        {/* Active Windows Layer: Screen 2 & 3 */}
        {activeWindow === "chrome" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <ChromeApp
              isSolved={isChromeSolved}
              onSolve={handleChromeSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "py" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <PythonWorkspaceApp
              isSolved={isPythonSolved}
              onSolve={handlePythonSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "vscode_readme" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <VsCodeReadmeApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "atlas" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <AtlasApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "brave" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <BraveApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "projects" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <ProjectsApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {/* Active Windows Layer: Screen 4 */}
        {activeWindow === "dashboard_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <DashboardApp location={currentLocation} onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "login_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <LoginPrjApp
              isSolved={isLoginSolved}
              savedVaultPassword={vaultPassword}
              location={currentLocation}
              isLocationBroadcastDisabled={isLocationBroadcastDisabled}
              onDisableLocationBroadcast={() => setIsLocationBroadcastDisabled(true)}
              onSolve={() => {
                setGameState((curr) => markPuzzleSolved(curr, "token-cabinet"));
                handleToast("Trace 04 resolved: Access token acquired. Broadcast severed.");
                setActiveConceptId("access-token");
              }}
              onOpenLearning={() => setActiveConceptId("access-token")}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "ecom_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <EcomApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "personal_hu_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <PersonalHuApp
              isSolved={isPersonalHuSolved}
              currentLocation={currentLocation}
              onUpdateLocation={(newLoc: string) => setCurrentLocation(newLoc)}
              onSolve={() => {
                setGameState((curr) => markPuzzleSolved(curr, "persona-hub"));
                handleToast("Trace 05 resolved: Location coordinates cached.");
                setActiveConceptId("caching");
              }}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "pass-generator_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <PassGeneratorApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "key-vault_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <KeyVaultApp
              savedPassword={vaultPassword}
              onSavePassword={(pwd) => {
                setVaultPassword(pwd);
                handleToast("Credentials saved to Vault.");
              }}
              onOpenLearning={() => setActiveConceptId("access-token")}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "Sentinel-Alerts_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <SentinelAlertsApp
              remainingSeconds={gameState.remainingSeconds}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "control-center_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <ControlCenterApp
              solvedPuzzleIds={gameState.solvedPuzzleIds}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "gallery_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <GalleryApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "music_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <MusicApp
              onPlayStateChange={setIsMusicPlaying}
              onClose={() => {
                setIsMusicPlaying(false);
                setActiveWindow(null);
              }}
            />
          </div>
        )}

        {activeWindow === "task-manager_prj" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <TaskManagerApp
              solvedPuzzleIds={gameState.solvedPuzzleIds}
              totalRequired={GAME_CONFIG.REQUIRED_FIXES}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {/* Active Windows Layer: Screen 5 */}
        {activeWindow === "videos" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <VideosApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "docs" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <DocsApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "presentations" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <PresentationsApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "excels" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <ExcelsApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "footprint_log" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <FootprintLogApp
              isSolved={isFootprintSolved}
              onSolve={handleFootprintSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "ledger" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <LedgerApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "calendar" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <CalendarApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "calc" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <CalcApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "route_trace" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <RouteTraceApp
              isSolved={isRouteTraceSolved}
              onSolve={handleRouteTraceSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "permits" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <PermitsApp
              isSolved={isPermitsSolved}
              onSolve={handlePermitsSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "signal_memory" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <SignalMemoryApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {/* Active Windows Layer: Screen 6 */}
        {activeWindow === "readme" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <ReadmeTxtApp
              solvedPuzzleIds={gameState.solvedPuzzleIds}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "antigravity" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <AntigravityApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {/* Active Windows Layer: Screen 7 */}
        {activeWindow === "nearby_devices" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <NearbyDevicesApp
              isSolved={isNearbyDevicesSolved}
              onSolve={handleNearbyDevicesSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "boundary_firewall" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <BoundaryFirewallApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "env_cabinet" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <EnvCabinetApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "echo_logs" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <EchoLogsApp
              isSolved={isEchoLogsSolved}
              onSolve={handleEchoLogsSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "origin_gate" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <OriginGateApp
              isSolved={isOriginGateSolved}
              totalSolvedBeforeThis={solvedCount}
              onSolve={handleOriginGateSolve}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {/* Active Windows Layer: Screen 8 */}
        {activeWindow === "timer_app" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <TimerApp
              remainingSeconds={gameState.remainingSeconds}
              totalDurationSeconds={GAME_CONFIG.DURATION_SECONDS}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {activeWindow === "figma" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <FigmaApp onClose={() => setActiveWindow(null)} />
          </div>
        )}

        {activeWindow === "whiteboard" && (
          <div className="desktop-window-layer desktop-window-layer--location-flow">
            <WhiteboardApp
              solvedPuzzleIds={gameState.solvedPuzzleIds}
              onClose={() => setActiveWindow(null)}
            />
          </div>
        )}

        {/* Educational Concept Modal */}
        {activeConcept && (
          <LearningModal
            concept={activeConcept}
            onClose={handleCloseLearningModal}
          />
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <aside className="desktop-toast-notification" role="alert" aria-live="polite">
            <div className="desktop-toast-content">
              <span className="desktop-toast-icon">✓</span>
              <span className="desktop-toast-text">{toastMessage}</span>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

export default DesktopEnvironment;
