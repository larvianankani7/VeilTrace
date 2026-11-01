
import { useEffect, useRef, useState } from "react";
import {
  getGameSettings,
  subscribeToGameSettings,
} from "../app/gameSettings";
import "../styles/game-subtitles.css";

type SubtitleCue = {
  text: string;
  duration?: number;
};

function parseSubtitleText(raw: string) {
  const colonIndex = raw.indexOf(":");
  if (colonIndex > 0 && colonIndex < 25) {
    const candidate = raw.slice(0, colonIndex).trim();
    const normalized = candidate.toLowerCase();
    if (
      normalized === "m" ||
      normalized === "unknown" ||
      normalized === "warning" ||
      normalized === "system"
    ) {
      return {
        speaker: candidate,
        dialogue: raw.slice(colonIndex + 1).trimStart(),
        colorClass:
          normalized === "m"
            ? "vt-subtitle__speaker--m"
            : normalized === "unknown"
              ? "vt-subtitle__speaker--unknown"
              : "vt-subtitle__speaker--warning",
      };
    }
  }

  return {
    speaker: null,
    dialogue: raw,
    colorClass: "",
  };
}

function GameSubtitle() {
  const [enabled, setEnabled] = useState(
    () => getGameSettings().subtitlesEnabled,
  );
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);

  const hideTimer = useRef<number | null>(null);
  const clearTimer = useRef<number | null>(null);
  const animationFrameOne = useRef<number | null>(null);
  const animationFrameTwo = useRef<number | null>(null);

  useEffect(() => {
    return subscribeToGameSettings((settings) => {
      setEnabled(settings.subtitlesEnabled);

      if (!settings.subtitlesEnabled) {
        setVisible(false);

        if (hideTimer.current !== null) {
          window.clearTimeout(hideTimer.current);
        }

        if (clearTimer.current !== null) {
          window.clearTimeout(clearTimer.current);
        }

        clearTimer.current = window.setTimeout(() => {
          setText("");
        }, 450);
      }
    });
  }, []);

  useEffect(() => {
    function handleSubtitle(event: Event) {
      const cue = (event as CustomEvent<SubtitleCue>).detail;

      if (!cue?.text || !getGameSettings().subtitlesEnabled) return;

      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
      }

      if (clearTimer.current !== null) {
        window.clearTimeout(clearTimer.current);
      }

      if (animationFrameOne.current !== null) {
        window.cancelAnimationFrame(animationFrameOne.current);
      }

      if (animationFrameTwo.current !== null) {
        window.cancelAnimationFrame(animationFrameTwo.current);
      }

      setVisible(false);
      setText(cue.text);

      animationFrameOne.current = window.requestAnimationFrame(() => {
        animationFrameTwo.current = window.requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      hideTimer.current = window.setTimeout(() => {
        setVisible(false);

        clearTimer.current = window.setTimeout(() => {
          setText("");
        }, 450);
      }, Math.max(700, cue.duration ?? 3500));
    }

    function handleClear() {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      if (clearTimer.current !== null) {
        window.clearTimeout(clearTimer.current);
        clearTimer.current = null;
      }
      if (animationFrameOne.current !== null) {
        window.cancelAnimationFrame(animationFrameOne.current);
        animationFrameOne.current = null;
      }
      if (animationFrameTwo.current !== null) {
        window.cancelAnimationFrame(animationFrameTwo.current);
        animationFrameTwo.current = null;
      }

      setVisible(false);
      clearTimer.current = window.setTimeout(() => {
        setText("");
      }, 450);
    }

    window.addEventListener("veiltrace:subtitle", handleSubtitle);
    window.addEventListener("veiltrace:clear-subtitle", handleClear);

    return () => {
      window.removeEventListener("veiltrace:subtitle", handleSubtitle);
      window.removeEventListener("veiltrace:clear-subtitle", handleClear);

      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
      }

      if (clearTimer.current !== null) {
        window.clearTimeout(clearTimer.current);
      }

      if (animationFrameOne.current !== null) {
        window.cancelAnimationFrame(animationFrameOne.current);
      }

      if (animationFrameTwo.current !== null) {
        window.cancelAnimationFrame(animationFrameTwo.current);
      }
    };
  }, []);

  if (!text) return null;

  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const parsedLines = lines.map(parseSubtitleText);

  return (
    <div className="vt-subtitle-layer" aria-live="polite" aria-atomic="true">
      <div className={`vt-subtitle${visible && enabled ? " is-visible" : ""}`}>
        {parsedLines.map((parsed, idx) => (
          <div key={idx} className="vt-subtitle__line">
            {parsed.speaker ? (
              <>
                <span className={`vt-subtitle__speaker ${parsed.colorClass}`}>
                  {parsed.speaker}:{" "}
                </span>
                <span className="vt-subtitle__text">{parsed.dialogue}</span>
              </>
            ) : (
              <span className="vt-subtitle__text">{parsed.dialogue}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameSubtitle;
