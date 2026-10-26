import { useEffect, useRef, useState } from "react";
import { desktopObjects } from "../data/objects";
import type { DesktopObject } from "../data/objects";
import { GAME_CONFIG } from "../game/gameConfig";
import { markPuzzleSolved, getSolvedCount } from "../game/gameLogic";
import type { GameState } from "../game/gameTypes";
import { getRemainingSeconds } from "../game/timer";
import { getPuzzle, puzzleRegistry } from "../puzzles/puzzleRegistry";
import { validatePuzzle } from "../puzzles/puzzleValidator";
import type { PuzzleAction } from "../puzzles/puzzleTypes";
import Countdown from "../components/Countdown";
import DesktopWindow from "./components/DesktopWindow";
import "../styles/desktop.css";

type DesktopEnvironmentProps = {
  onEscape: () => void;
  onDeath: () => void;
};

function createInitialGameState(): GameState {
  return {
    status: "running",
    startedAt: Date.now(),
    remainingSeconds: GAME_CONFIG.DURATION_SECONDS,
    solvedPuzzleIds: [],
  };
}

function DesktopEnvironment({
  onEscape,
  onDeath,
}: DesktopEnvironmentProps) {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState,
  );
  const [activeObjectId, setActiveObjectId] = useState<string | null>(null);
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  const [readmeDiscovered, setReadmeDiscovered] = useState(false);
  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const deathHandled = useRef(false);
  const escapeHandled = useRef(false);

  const solvedCount = getSolvedCount(gameState);

  // Trigger the final critical-fix subtitle when exactly one exposure remains.
  useEffect(() => {
    const remaining = GAME_CONFIG.REQUIRED_FIXES - solvedCount;

    if (remaining === 1) {
      window.dispatchEvent(
        new CustomEvent("veiltrace:critical-progress", {
          detail: { remaining },
        }),
      );
    }
  }, [solvedCount]);

  const activeObject = desktopObjects.find(
    (object) => object.id === activeObjectId,
  );

  const visibleObjects = desktopObjects.filter((object) => {
    if (!object.hidden) return true;

    if (object.id === "cache-index-07") {
      return showHiddenFiles;
    }

    if (object.id === "readme-final-final2") {
      return readmeDiscovered;
    }

    return false;
  });

  useEffect(() => {
    if (gameState.status !== "running" || gameState.startedAt === null) {
      return;
    }

    const startedAt = gameState.startedAt;

    const updateTimer = () => {
      const remainingSeconds = getRemainingSeconds(startedAt);

      if (remainingSeconds <= 0) {
        setGameState((current) => ({
          ...current,
          status: "failed",
          remainingSeconds: 0,
        }));

        if (!deathHandled.current) {
          deathHandled.current = true;
          onDeath();
        }

        return;
      }

      setGameState((current) => {
        if (current.status !== "running") return current;

        return {
          ...current,
          remainingSeconds,
        };
      });
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 250);

    return () => window.clearInterval(intervalId);
  }, [gameState.status, gameState.startedAt, onDeath]);

  useEffect(() => {
    if (gameState.status === "escaped" && !escapeHandled.current) {
      escapeHandled.current = true;
      onEscape();
    }
  }, [gameState.status, onEscape]);

  function openObject(object: DesktopObject) {
    setActiveObjectId(object.id);

    if (object.id === "cache-index-07") {
      setReadmeDiscovered(true);
    }
  }

  function closeWindow() {
    setActiveObjectId(null);
  }

  function inspectObject(object: DesktopObject) {
    setInspectedIds((current) =>
      current.includes(object.id) ? current : [...current, object.id],
    );

    setFeedback((current) => ({
      ...current,
      [object.id]:
        "Inspection complete. This item does not count toward the 11 critical fixes.",
    }));
  }

  function applyPuzzleAction(object: DesktopObject, action: PuzzleAction) {
    const puzzle = getPuzzle(object.id);

    if (!puzzle || puzzle.action !== action) {
      setFeedback((current) => ({
        ...current,
        [object.id]: "That action does not resolve this exposure.",
      }));
      return;
    }

    const result = validatePuzzle(object.id, {
      [action]: true,
    });

    setFeedback((current) => ({
      ...current,
      [object.id]: result.message,
    }));

    if (result.solved) {
      setGameState((current) => markPuzzleSolved(current, object.id));
    }
  }

  function renderWindowContent(object: DesktopObject) {
    if (object.id === "readme-final-final2") {
      return (
        <div className="desktop-record">
          <p className="desktop-eyebrow">RECOVERED TEXT FILE</p>
          <h3>readme.final.final2.txt</h3>
          <p>
            If this file is visible, you found what the system tried to hide.
          </p>
          <p>
            The desktop is a simulation. Review the exposed services, limit
            unnecessary access, and revoke anything you do not recognise.
          </p>
          <p className="desktop-muted">
            Hidden-file discovery recorded. No critical fix awarded.
          </p>
        </div>
      );
    }

    if (object.id === "cache-index-07") {
      return (
        <div className="desktop-record">
          <p className="desktop-eyebrow">HIDDEN CONTAINER</p>
          <h3>Cache index recovered</h3>
          <p>
            An unfamiliar text file has been discovered inside this container.
          </p>
          <button
            type="button"
            className="desktop-action"
            onClick={() => {
              setReadmeDiscovered(true);
              setActiveObjectId("readme-final-final2");
            }}
          >
            Open readme.final.final2.txt
          </button>
        </div>
      );
    }

    const puzzle = puzzleRegistry.find((item) => item.id === object.id);
    const isSolved = gameState.solvedPuzzleIds.includes(object.id);

    if (puzzle) {
      return (
        <div className="desktop-record">
          <p className="desktop-eyebrow">CRITICAL EXPOSURE</p>
          <h3>{puzzle.title}</h3>
          <p>{puzzle.description}</p>

          <div className={`desktop-status ${isSolved ? "is-safe" : "is-risk"}`}>
            {isSolved ? "EXPOSURE CONTAINED" : "EXPOSURE ACTIVE"}
          </div>

          {isSolved ? (
            <>
              <p className="desktop-success">{puzzle.successMessage}</p>
              <div className="desktop-learning">
                <strong>Security takeaway</strong>
                <p>{puzzle.learningPoint}</p>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="desktop-action"
              onClick={() => applyPuzzleAction(object, puzzle.action)}
              disabled={gameState.status !== "running"}
            >
              {getActionLabel(puzzle.action)}
            </button>
          )}

          {feedback[object.id] && (
            <p className="desktop-feedback" role="status">
              {feedback[object.id]}
            </p>
          )}
        </div>
      );
    }

    const isInspected = inspectedIds.includes(object.id);

    return (
      <div className="desktop-record">
        <p className="desktop-eyebrow">SIMULATED SYSTEM OBJECT</p>
        <h3>{object.name}</h3>
        <p>
          This item belongs to <strong>{object.category}</strong>. Inspect it
          to review its fictional records and determine whether it contains
          useful clues.
        </p>

        <div className="desktop-status">
          {isInspected ? "INSPECTED" : "NOT INSPECTED"}
        </div>

        <button
          type="button"
          className="desktop-action"
          onClick={() => inspectObject(object)}
        >
          {isInspected ? "Inspect again" : "Inspect records"}
        </button>

        {feedback[object.id] && (
          <p className="desktop-feedback" role="status">
            {feedback[object.id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <main className="desktop-environment">
      <header className="desktop-topbar">
        <div className="desktop-brand">
          <span className="desktop-brand__mark">V</span>
          <div>
            <strong>VEILTRACE</strong>
            <span>SIMULATED OPERATING ENVIRONMENT</span>
          </div>
        </div>

        <div className="desktop-topbar__right">
          <span className="desktop-live-status">
            {gameState.status === "running" ? "SYSTEM COMPROMISED" : "SESSION ENDED"}
          </span>
          <Countdown seconds={gameState.remainingSeconds} />
        </div>
      </header>

      <section className="desktop-toolbar">
        <div>
          <p className="desktop-eyebrow">MORGAN VALE // LOCAL SESSION</p>
          <h1>System Desktop</h1>
          <p className="desktop-muted">
            Inspect the simulated environment. Contain all 11 critical exposures.
          </p>
        </div>

        <button
          type="button"
          className={`desktop-toggle${showHiddenFiles ? " is-active" : ""}`}
          onClick={() => setShowHiddenFiles((current) => !current)}
          aria-pressed={showHiddenFiles}
        >
          {showHiddenFiles ? "Hide hidden files" : "Show hidden files"}
        </button>
      </section>

      <section className="desktop-progress" aria-label="Puzzle progress">
        <div className="desktop-progress__labels">
          <span>CRITICAL FIXES</span>
          <strong>{solvedCount} / {GAME_CONFIG.REQUIRED_FIXES}</strong>
        </div>
        <div
          className="desktop-progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={GAME_CONFIG.REQUIRED_FIXES}
          aria-valuenow={solvedCount}
          aria-label="Critical exposures contained"
        >
          <span
            style={{
              width: `${(solvedCount / GAME_CONFIG.REQUIRED_FIXES) * 100}%`,
            }}
          />
        </div>
      </section>

      <section className="desktop-grid" aria-label="Desktop objects">
        {visibleObjects.map((object) => {
          const isSolved = gameState.solvedPuzzleIds.includes(object.id);
          const isCritical = object.critical;

          return (
            <button
              type="button"
              key={object.id}
              className={`desktop-icon${isCritical ? " is-critical" : ""}${isSolved ? " is-solved" : ""}${object.hidden ? " is-hidden-file" : ""}`}
              onClick={() => openObject(object)}
              title={`Open ${object.name}`}
            >
              <span className="desktop-icon__symbol" aria-hidden="true">
                {object.id === "cache-index-07"
                  ? "⌁"
                  : object.id === "readme-final-final2"
                    ? "▤"
                    : object.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="desktop-icon__name">{object.name}</span>
              {isSolved && <span className="desktop-icon__status">FIXED</span>}
            </button>
          );
        })}
      </section>

      <footer className="desktop-footer">
        <span>{visibleObjects.length} ITEMS VISIBLE</span>
        <span>{inspectedIds.length} NON-CRITICAL ITEMS INSPECTED</span>
        <span>ALL DATA IS FICTIONAL</span>
      </footer>

      {activeObject && (
        <div className="desktop-window-layer">
          <DesktopWindow
            title={activeObject.name}
            category={activeObject.category}
            onClose={closeWindow}
          >
            {renderWindowContent(activeObject)}
          </DesktopWindow>
        </div>
      )}
    </main>
  );
}

function getActionLabel(action: PuzzleAction): string {
  const labels: Record<PuzzleAction, string> = {
    "set-private": "Set profile to private",
    "revoke-sharing": "Revoke location-sharing link",
    "remove-geotags": "Remove photo geotags",
    "restrict-history": "Restrict history access",
    "exclude-backup": "Exclude location history from backups",
    "privatise-event": "Make event private and remove address",
    "restrict-diagnostics": "Restrict diagnostic sharing",
    "restrict-permission": "Restrict background location permission",
    "revoke-session": "Revoke unrecognised session",
    "revoke-token": "Revoke exposed token",
    "rotate-secret": "Protect and rotate exposed secret",
  };

  return labels[action];
}

export default DesktopEnvironment;