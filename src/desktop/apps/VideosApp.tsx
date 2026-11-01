import { useEffect, useRef, useState } from "react";

type Props = {
  onClose: () => void;
};

export default function VideosApp({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Flowing nature ambience audio plays while this app is active and playing
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
      if (isPlaying) {
        audio.play().catch(() => {
          // Autoplay may be restricted until user interaction
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, isLooping]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = isLooping;
      if (isPlaying) {
        video.play().catch(() => {
          // Browser autoplay restriction
        });
      } else {
        video.pause();
      }
    }
  }, [isPlaying, isLooping]);

  function handlePlay() {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }

  function handleStop() {
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function handleToggleLoop() {
    setIsLooping((prev) => !prev);
  }

  return (
    <div className="vt-video-screen-container" aria-label="Videos — Nature Stream">
      {/* Top Header Bar */}
      <div className="vt-video-topbar">
        <div className="vt-video-title-wrap">
          <span className="vt-video-pulse-dot" aria-hidden="true" />
          <span className="vt-video-title">VEILTRACE // MEDIA PLAYER — NATURE STREAM</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="vt-video-return-btn"
          aria-label="Return to desktop"
        >
          Return ✕
        </button>
      </div>

      {/* Main Centered Video Content Stage */}
      <div className="vt-video-main-stage">
        <div className="vt-video-viewport">
          {/* Nature Video */}
          {!hasError && (
            <video
              ref={videoRef}
              src="/videos/nature-stream.mp4"
              autoPlay
              loop={isLooping}
              muted
              playsInline
              className="vt-water-video"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setHasError(true)}
              onEnded={() => {
                if (!isLooping) {
                  setIsPlaying(false);
                }
              }}
            />
          )}

          {/* Fallback ambient nature visual if video file is pending or encounters error */}
          {(!videoLoaded || hasError) && (
            <div className="vt-water-fallback-canvas" aria-hidden="true">
              <div className="vt-water-stream vt-water-stream--1" />
              <div className="vt-water-stream vt-water-stream--2" />
              <div className="vt-water-stream vt-water-stream--3" />
              <div className="vt-video-fallback-notice">
                <span>🌿 Simulated Ambient Nature Stream</span>
              </div>
            </div>
          )}
        </div>

        {/* Functional Video Control Bar - Centered near bottom of video stage */}
        <nav className="vt-video-controls-bar" aria-label="Video playback controls">
          <div className="vt-video-controls-left">
            <button
              type="button"
              className={`vt-video-ctrl-btn ${isPlaying ? "is-active" : ""}`}
              onClick={handlePlay}
              title="Play nature video"
            >
              ▶ Play
            </button>
            <button
              type="button"
              className={`vt-video-ctrl-btn ${!isPlaying ? "is-active" : ""}`}
              onClick={handleStop}
              title="Stop playback"
            >
              ⏹ Stop
            </button>
            <button
              type="button"
              className={`vt-video-ctrl-btn ${isLooping ? "is-active is-looping" : ""}`}
              onClick={handleToggleLoop}
              title={isLooping ? "Loop is ON (Continuous)" : "Loop is OFF"}
            >
              🔁 Loop: {isLooping ? "ON" : "OFF"}
            </button>
          </div>

          <div className="vt-video-controls-right">
            <span className="vt-video-status-indicator">
              STATUS: <strong>{isPlaying ? "PLAYING" : "STOPPED"}</strong>
            </span>
            <span className="vt-video-mode-indicator">
              MODE: <strong>{isLooping ? "INFINITE LOOP" : "SINGLE RUN"}</strong>
            </span>
          </div>
        </nav>
      </div>

      {/* Ambient flowing water sound */}
      <audio
        ref={audioRef}
        src="/audio/water-ambience.mp3"
        preload="auto"
      />
    </div>
  );
}
