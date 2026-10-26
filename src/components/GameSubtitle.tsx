
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

    window.addEventListener("veiltrace:subtitle", handleSubtitle);

    return () => {
      window.removeEventListener("veiltrace:subtitle", handleSubtitle);

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

  return (
    <div className="vt-subtitle-layer" aria-live="polite" aria-atomic="true">
      <div className={`vt-subtitle${visible && enabled ? " is-visible" : ""}`}>
        {text}
      </div>
    </div>
  );
}

export default GameSubtitle;
