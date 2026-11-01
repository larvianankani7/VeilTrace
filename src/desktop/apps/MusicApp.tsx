import { useEffect, useRef, useState } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  src: string;
};

export const MUSIC_TRACKS: Track[] = [
  {
    id: "track1",
    title: "track1.mp3",
    artist: "Veiltrace Audio",
    duration: "03:25",
    durationSec: 205,
    src: "/media/audio/track1.mp3",
  },
  {
    id: "track2",
    title: "track2.mp3",
    artist: "Veiltrace Audio",
    duration: "02:58",
    durationSec: 178,
    src: "/media/audio/track2.mp3",
  },
  {
    id: "track3",
    title: "track3.mp3",
    artist: "Veiltrace Audio",
    duration: "03:33",
    durationSec: 213,
    src: "/media/audio/track3.mp3",
  },
  {
    id: "track4",
    title: "track4.mp3",
    artist: "Veiltrace Audio",
    duration: "01:10",
    durationSec: 70,
    src: "/media/audio/track4.mp3",
  },
  {
    id: "track5",
    title: "track5.mp3",
    artist: "Veiltrace Audio",
    duration: "03:42",
    durationSec: 222,
    src: "/media/audio/track5.mp3",
  },
  {
    id: "track6",
    title: "track6.mp3",
    artist: "Veiltrace Audio",
    duration: "03:01",
    durationSec: 181,
    src: "/media/audio/track6.mp3",
  },
  {
    id: "track7",
    title: "track7.mp3",
    artist: "Veiltrace Audio",
    duration: "03:32",
    durationSec: 212,
    src: "/media/audio/track7.mp3",
  },
];

type Props = {
  onPlayStateChange?: (isPlaying: boolean) => void;
  onClose: () => void;
};

export default function MusicApp({ onPlayStateChange, onClose }: Props) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const activeTrack = MUSIC_TRACKS[currentTrackIndex] ?? MUSIC_TRACKS[0];

  // Notify parent of play state changes so main game timer and siren are paused
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Clean up on unmount: stop audio and resume game timer/siren
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
      }
      onPlayStateChange?.(false);
    };
  }, [onPlayStateChange]);

  // Handle simulated elapsed timer when playing
  useEffect(() => {
    if (!isPlaying) {
      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev >= activeTrack.durationSec) {
          // Loop or advance to next
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
  }, [isPlaying, activeTrack.durationSec]);

  function handlePlayTrack(index: number) {
    if (currentTrackIndex === index && isPlaying) {
      // Pause current
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    // Switch or start
    setCurrentTrackIndex(index);
    setElapsedSec(0);
    setIsPlaying(true);
    setAudioError(null);

    const targetTrack = MUSIC_TRACKS[index];
    if (audioRef.current && targetTrack) {
      audioRef.current.src = targetTrack.src;
      audioRef.current.play().catch(() => {
        // Handle missing audio gracefully with simulated playback
        setAudioError(
          `Audio file '${targetTrack.src}' queued. Running simulated audio synthesizer stream.`,
        );
      });
    }
  }

  function handleTogglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      handlePlayTrack(currentTrackIndex);
    }
  }

  function handleNextTrack() {
    const nextIdx = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    handlePlayTrack(nextIdx);
  }

  function handlePrevTrack() {
    const prevIdx = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    handlePlayTrack(prevIdx);
  }

  function formatTime(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return (
    <section className="vt-location-flow vt-second-desktop vt-music-app" aria-label="Music Player">
      {/* Hidden audio element with graceful error handling */}
      <audio
        ref={audioRef}
        onError={() => {
          setAudioError(
            `Audio file '${activeTrack.src}' queued. Running simulated synthesizer stream.`,
          );
        }}
        onEnded={handleNextTrack}
      />

      <div className="vt-second-topbar">
        <strong>VEILTRACE // MUSIC_PRJ — SYNTHESIS PLAYER</strong>
        <button
          type="button"
          onClick={() => {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            onPlayStateChange?.(false);
            onClose();
          }}
          className="vt-btn-return"
        >
          Return ✕
        </button>
      </div>

      <div className="vt-music-container">
        {/* Notice Banner */}
        <div className="vt-music-status-banner">
          <span className="vt-music-badge">{isPlaying ? "NOW PLAYING" : "STANDBY"}</span>
          <span>
            {isPlaying
              ? "Playback active: Main game timer & emergency siren paused."
              : "Select a track to commence audio playback."}
          </span>
        </div>

        {audioError && (
          <div className="vt-music-graceful-notice" role="status">
            <span className="vt-notice-icon">ℹ️</span>
            <span>{audioError}</span>
          </div>
        )}

        <div className="vt-music-player-grid">
          {/* Left: Player Disc & Visualizer */}
          <div className="vt-music-now-playing-card">
            <div className={`vt-vinyl-disc ${isPlaying ? "is-spinning" : ""}`}>
              <div className="vt-vinyl-ring">
                <div className="vt-vinyl-label">
                  <span className="vt-vinyl-logo">VT</span>
                </div>
              </div>
            </div>

            <div className="vt-music-track-meta">
              <h2 className="vt-music-current-title">{activeTrack.title}</h2>
              <p className="vt-music-current-artist">{activeTrack.artist}</p>
            </div>

            {/* Visualizer bars */}
            <div className="vt-visualizer-bars" aria-hidden="true">
              {[40, 70, 30, 90, 60, 80, 50, 95, 45, 75, 35, 85].map((h, i) => (
                <span
                  key={i}
                  className={`vt-viz-bar ${isPlaying ? "is-animating" : ""}`}
                  style={{
                    height: isPlaying ? `${h}%` : "15%",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            {/* Timeline & Controls */}
            <div className="vt-music-controls">
              <div className="vt-music-timeline">
                <span className="vt-time-val">{formatTime(elapsedSec)}</span>
                <div className="vt-timeline-bar">
                  <div
                    className="vt-timeline-fill"
                    style={{
                      width: `${Math.min(100, (elapsedSec / activeTrack.durationSec) * 100)}%`,
                    }}
                  />
                </div>
                <span className="vt-time-val">{activeTrack.duration}</span>
              </div>

              <div className="vt-control-buttons">
                <button
                  type="button"
                  className="vt-ctrl-btn"
                  onClick={handlePrevTrack}
                  aria-label="Previous Track"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  className="vt-ctrl-btn vt-ctrl-btn--play"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? "Pause Track" : "Play Track"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                  type="button"
                  className="vt-ctrl-btn"
                  onClick={handleNextTrack}
                  aria-label="Next Track"
                >
                  ⏭
                </button>
              </div>
            </div>
          </div>

          {/* Right: Tracklist */}
          <div className="vt-music-tracklist-card">
            <h3 className="vt-tracklist-title">Audio Repertoire</h3>
            <div className="vt-track-list" role="list">
              {MUSIC_TRACKS.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                const isTrackPlaying = isSelected && isPlaying;
                return (
                  <article
                    key={track.id}
                    role="listitem"
                    className={`vt-track-item ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handlePlayTrack(idx)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handlePlayTrack(idx);
                      }
                    }}
                  >
                    <button
                      type="button"
                      className={`vt-track-play-btn ${isTrackPlaying ? "is-playing" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayTrack(idx);
                      }}
                      aria-label={isTrackPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                      title={isTrackPlaying ? "Pause" : "Play"}
                    >
                      {isTrackPlaying ? "⏸" : "▶"}
                    </button>
                    <div className="vt-track-info">
                      <strong className="vt-track-name">{track.title}</strong>
                      <span className="vt-track-artist">{track.artist}</span>
                    </div>
                    <span className="vt-track-duration">{track.duration}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
