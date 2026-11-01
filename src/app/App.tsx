import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { GAME_PHASES } from "./routes";
import type { GamePhase } from "./routes";
import { clearGameSubtitle } from "./gameSettings";
import OpeningExperience from "../scenes/OpeningExperience";
import OpeningScene from "../scenes/OpeningScene";
import BreachScene from "../scenes/BreachScene";
import DesktopEnvironment from "../desktop/DesktopEnvironment";
import EndingCutscenes from "../scenes/EndingCutscenes";
import GameSubtitle from "../components/GameSubtitle";
import type { CompletedGameStats } from "../scenes/InsightsDashboard";
import type { GameState } from "../game/gameTypes";
import { getSolvedCount } from "../game/gameLogic";
import "../styles/global.css";
import "../styles/scenes.css";

function App() {
  const [phase, setPhase] = useState<GamePhase>(GAME_PHASES.TITLE);
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [hasPlayedOnce, setHasPlayedOnce] = useState<boolean>(false);
  const [completedStats, setCompletedStats] = useState<CompletedGameStats | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Synchronize fullscreen indicator with document state
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };
    const isFs = Boolean(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
    if (!isFs) {
      const el = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      const req =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
      if (req) {
        void req.call(el).catch(() => {});
      }
    } else {
      const exit =
        doc.exitFullscreen ||
        doc.webkitExitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.msExitFullscreen;
      if (exit) {
        void exit.call(doc).catch(() => {});
      }
    }
  }, []);

  // Global F11 shortcut to re-enter fullscreen without interfering with typing
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "F11") {
        const target = e.target as HTMLElement | null;
        const isInput =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable ||
            target.getAttribute("contenteditable") === "true");

        if (isInput) return;

        e.preventDefault();
        toggleFullscreen();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen]);

  const startNewGame = useCallback(() => {
    // Reset all session state cleanly
    clearGameSubtitle();
    setSessionKey((prev) => prev + 1);
    setHasPlayedOnce(true);
    setPhase(GAME_PHASES.DESKTOP);
  }, []);

  const startBreach = useCallback(() => setPhase(GAME_PHASES.INTRO), []);
  const startDesktop = useCallback(() => setPhase(GAME_PHASES.DESKTOP), []);

  const escape = useCallback((finalState?: GameState) => {
    clearGameSubtitle();
    const solved = finalState
      ? finalState.solvedPuzzleIds
      : [
          "atlas-places",
          "location-exposure",
          "bloom-filter",
          "token-cabinet",
          "persona-hub",
          "footprint-log",
          "race-condition",
          "permission-garden",
          "nearfield-devices",
          "echo-logs",
          "origin-gate",
        ];
    setCompletedStats({
      outcome: "escape",
      solvedCount: finalState ? getSolvedCount(finalState) : 11,
      solvedPuzzleIds: [...solved],
      remainingSeconds: finalState?.remainingSeconds ?? 60,
    });
    setHasPlayedOnce(true);
    setPhase(GAME_PHASES.ESCAPE);
  }, []);

  const die = useCallback((finalState?: GameState) => {
    clearGameSubtitle();
    setCompletedStats({
      outcome: "death",
      solvedCount: finalState ? getSolvedCount(finalState) : 0,
      solvedPuzzleIds: finalState ? [...finalState.solvedPuzzleIds] : [],
      remainingSeconds: 0,
    });
    setHasPlayedOnce(true);
    setPhase(GAME_PHASES.DEATH);
  }, []);

  const returnToTitle = useCallback(() => {
    clearGameSubtitle();
    setPhase(GAME_PHASES.TITLE);
  }, []);

  useEffect(() => {
    return () => {
      clearGameSubtitle();
    };
  }, []);

  let scene: ReactNode = null;

  if (phase === GAME_PHASES.TITLE) {
    scene = (
      <OpeningExperience
        onStartGame={startNewGame}
        hasPlayed={hasPlayedOnce}
        completedStats={completedStats}
      />
    );
  } else if (phase === GAME_PHASES.ROOM) {
    scene = <OpeningScene onComplete={startBreach} />;
  } else if (phase === GAME_PHASES.INTRO) {
    scene = <BreachScene onComplete={startDesktop} />;
  } else if (phase === GAME_PHASES.DESKTOP) {
    scene = (
      <DesktopEnvironment
        key={sessionKey}
        onEscape={escape}
        onDeath={die}
      />
    );
  } else if (phase === GAME_PHASES.ESCAPE) {
    scene = (
      <EndingCutscenes
        type="escape"
        onComplete={returnToTitle}
      />
    );
  } else if (phase === GAME_PHASES.DEATH) {
    scene = (
      <EndingCutscenes
        type="death"
        onComplete={returnToTitle}
      />
    );
  }

  return (
    <>
      {scene}
      <GameSubtitle />
      <button
        type="button"
        onClick={toggleFullscreen}
        className="vt-fullscreen-toggle-btn"
        title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F11)"}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        <span aria-hidden="true">{isFullscreen ? "🗗" : "⛶"}</span>
      </button>
    </>
  );
}

export default App;
