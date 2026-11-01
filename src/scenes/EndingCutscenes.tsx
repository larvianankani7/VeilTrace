import { useEffect, useRef, useState } from "react";
import { VIDEO_ASSETS } from "../game/videoAssets";
import { showGameSubtitle, clearGameSubtitle } from "../app/gameSettings";
import { escapeEndingDialogue, deathEndingDialogue } from "../data/dialogue";

type EndingType = "escape" | "death";

type Props = {
  type: EndingType;
  onComplete: () => void;
};

export default function EndingCutscenes({ type, onComplete }: Props) {
  const [stage, setStage] = useState<"warning" | "ending" | "credits">(() =>
    type === "death" ? "warning" : "ending"
  );
  const [flashActive, setFlashActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const warningTimerRef = useRef<number | null>(null);
  const currentSubtitleRef = useRef<string | null>(null);

  // Blood Warning Sequence for Death Ending (1.6s)
  useEffect(() => {
    if (stage !== "warning") return;

    showGameSubtitle("WARNING: Containment deadline expired. Protocol failed.", 1500);

    // Sudden red flash right before ending cutscene
    const flashTimer = window.setTimeout(() => {
      setFlashActive(true);
    }, 1250);

    warningTimerRef.current = window.setTimeout(() => {
      clearGameSubtitle();
      setFlashActive(false);
      setStage("ending");
    }, 1600);

    return () => {
      if (warningTimerRef.current !== null) {
        window.clearTimeout(warningTimerRef.current);
      }
      window.clearTimeout(flashTimer);
      clearGameSubtitle();
    };
  }, [stage]);

  function handleEndingTimeUpdate() {
    if (stage !== "ending") return;
    const video = videoRef.current;
    if (!video || video.ended || video.paused) return;

    const time = video.currentTime;
    const lines = type === "escape" ? escapeEndingDialogue : deathEndingDialogue;
    const activeCues = lines.filter(
      (cue) => cue.start !== undefined && cue.end !== undefined && time >= cue.start && time < cue.end
    );

    if (activeCues.length > 0) {
      const combinedText = activeCues.map((cue) => `${cue.speaker}: ${cue.text}`).join("\n");
      if (currentSubtitleRef.current !== combinedText) {
        currentSubtitleRef.current = combinedText;
        showGameSubtitle(combinedText, 4000);
      }
    } else {
      if (currentSubtitleRef.current !== null) {
        currentSubtitleRef.current = null;
        clearGameSubtitle();
      }
    }
  }

  function handleEndingVideoEnded() {
    currentSubtitleRef.current = null;
    clearGameSubtitle();
    setStage("credits");
  }

  function handleCreditsVideoEnded() {
    currentSubtitleRef.current = null;
    clearGameSubtitle();
    onComplete();
  }

  function handleSkip() {
    currentSubtitleRef.current = null;
    clearGameSubtitle();
    if (stage === "warning") {
      if (warningTimerRef.current !== null) {
        window.clearTimeout(warningTimerRef.current);
      }
      setStage("ending");
    } else if (stage === "ending") {
      setStage("credits");
    } else {
      onComplete();
    }
  }

  const currentVideoSrc =
    stage === "credits"
      ? VIDEO_ASSETS.END_CREDITS
      : type === "escape"
      ? VIDEO_ASSETS.ESCAPE_ENDING
      : VIDEO_ASSETS.DEATH_ENDING;

  return (
    <div className={`vt-ending-container ${flashActive ? "vt-red-flash-active" : ""}`}>
      {/* SCENARIO C: 1.5s Red Blood Warning Screen ("TIME'S UP") */}
      {stage === "warning" && (
        <section className="vt-blood-warning-screen" aria-label="Failure warning">
          <div className="vt-blood-vignette" />
          <div className="vt-blood-particles" aria-hidden="true">
            <span className="vt-blood-drop drop-1" />
            <span className="vt-blood-drop drop-2" />
            <span className="vt-blood-drop drop-3" />
          </div>

          <div className="vt-blood-content">
            <span className="vt-blood-siren-icon" aria-hidden="true">🚨</span>
            <h1 className="vt-blood-times-up">TIME&apos;S UP</h1>
            <p className="vt-blood-sub">CRITICAL EXPOSURE DETECTED · CONTAINMENT FAILED</p>
          </div>

          <audio
            src="/audio/red-alert-alarm.mp3"
            autoPlay
            loop
            aria-label="Escalating failure alarm"
          />
        </section>
      )}

      {/* VIDEO PLAYBACK FOR ENDING & CREDITS */}
      {(stage === "ending" || stage === "credits") && (
        <section className="vt-cinematic vt-ending-cinematic" aria-label="Ending sequence video">
          <video
            ref={videoRef}
            key={currentVideoSrc}
            src={currentVideoSrc}
            autoPlay
            playsInline
            preload="auto"
            className="vt-cinematic__video"
            onTimeUpdate={handleEndingTimeUpdate}
            onPause={() => {
              currentSubtitleRef.current = null;
              clearGameSubtitle();
            }}
            onEnded={stage === "ending" ? handleEndingVideoEnded : handleCreditsVideoEnded}
            onError={() => {
              // Graceful fallback if video fails to load or decode
              if (stage === "ending") {
                handleEndingVideoEnded();
              } else {
                handleCreditsVideoEnded();
              }
            }}
          />

          <div className="vt-cinematic-controls">
            <span className="vt-cinematic-stage-label">
              {stage === "ending"
                ? type === "escape"
                  ? "ESCAPE ENDING"
                  : "CONTAINMENT FAILURE"
                : "END CREDITS"}
            </span>

            <button
              type="button"
              className="vt-cinematic__skip"
              onClick={handleSkip}
              title="Skip to next scene"
            >
              SKIP CUTSCENE <span aria-hidden="true">»</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
