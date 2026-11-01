import { useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import {
  clearGameSubtitle,
  getGameSettings,
  saveGameSettings,
  showGameSubtitle,
  type GameSettings,
} from "../app/gameSettings";
import "../styles/opening-experience.css";
import "../styles/experience-pages.css";
import InsightsDashboard from "./InsightsDashboard";

type Stage = "opening" | "tagline" | "disclaimer" | "menu" | "scene-01";
import type { CompletedGameStats } from "./InsightsDashboard";

type Page = "settings" | "about" | "insights" | null;
type SettingsTab = "controls" | "language" | "subtitles" | "audio";

type Props = {
  onStartGame: () => void;
  hasPlayed?: boolean;
  completedStats?: CompletedGameStats | null;
};

const VIDEO = {
  opening: "/videos/opening.mp4",
  tagline: "/videos/tagline.mp4",
  menu: "/videos/menu-bg.mp4",
  disclaimer: "/videos/disclaimer.mp4",
  scene01: "/videos/scene-01.mp4",
};

const MUSIC_PATH = "/audio/menu-ambience.mp3";
const CINEMATIC_TRANSITION_DURATION = 260;


const CUTSCENE_SUBTITLES = [
  { text: "M: Ugh.. my whole body's aching", start: 0.45, end: 3.0 },
  { text: "M: where am I?", start: 3.45, end: 4.35 },
  { text: "UNKNOWN: Finally awake, huh?.", start: 5.35, end: 7.0 },
  { text: "UNKNOWN: This is what you get for crossing me.", start: 7.05, end: 8.50 },
  { text: "UNKNOWN: But, I'm not quite that cruel, you know?", start: 8.55, end: 12.0 },
  {
    text: "UNKNOWN: But you gotta do something for it, and perhaps you'll earn a chance to escape.",
    start: 12.05,
    end: 16.0,
  },
  {
    text: "UNKNOWN: Just make certain no one can trace you. oh, and you might hurry, you're running out of time.",
    start: 16.05,
    end: 22.50,
  },
  { text: "M: who.. who was she?", start: 22.55, end: 25.0 },
  { text: "M: Dammit!", start: 25.05, end: 27.2 },
  {
    text: "M: locked in a room with a computer and some cryptic threat.. Brilliant",
    start: 29.25,
    end: 34.0,
  },
  { text: "M: what the hell was that?", start: 34.05, end: 36.8 },
  {
    text: "WARNING: Emergency protocol initiated!",
    start: 37.0,
    end: 39.2,
  },
  {
    text: "WARNING: You have exactly 10 minutes to complete the required objective!",
    start: 39.25,
    end: 43.0,
  },
  {
    text: "WARNING: Failure to complete the objective within the allotted time will result in total system destruction!",
    start: 43.05,
    end: 49.0,
  },
    {
    text: "M: What is that even mean!",
    start: 49.05,
    end: 50.0,
  },
  {
    text: "M: Someone can find me through this thing?",
    start: 50.05,
    end: 53.0,
  },
  {
    text: "M: What am I suppose to do now?",
    start: 55.05,
    end: 57.0,
  },
] as const;


const CONTROLS = [
  [
    "UEI↑",
    "Used to Combine with different keys to perform different actions in the game. For example, Ctrl + Shift + I to stop the location exposure.",
  ],
  [
    "Left Click",
    "Selects menu options, and opens desktop items.",
  ],
  [
    "Right Click",
    "Activates on-screen controls to inspect records or resolve exposures.",
  ],
  [
    "Shift",
    "Can change the behavior of other keys when pressed in combination.",
  ],
  [
    "Enter",
    "Activates the currently focused button or control, such as confirming a selected action.",
  ],
  [
    "Ctrl",
    "Performs combined operations.",
  ],
] as const;

function OpeningExperience({ onStartGame, hasPlayed = false, completedStats }: Props) {
  const [stage, setStage] = useState<Stage>(hasPlayed ? "menu" : "opening");
  const [page, setPage] = useState<Page>(null);
  const [tab, setTab] = useState<SettingsTab>("controls");
  const [settings, setSettings] = useState<GameSettings>(getGameSettings);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cinematicRef = useRef<HTMLVideoElement>(null);
  const menuBackgroundRef = useRef<HTMLVideoElement>(null);
  const ambienceRef = useRef<HTMLAudioElement>(null);
  const hoverAudioContextRef = useRef<AudioContext | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const currentSubtitleRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      currentSubtitleRef.current = null;
      clearGameSubtitle();
      cinematicRef.current?.pause();
      menuBackgroundRef.current?.pause();
      ambienceRef.current?.pause();
      if (hoverAudioContextRef.current) {
        void hoverAudioContextRef.current.close();
        hoverAudioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (stage !== "opening" && stage !== "tagline") return;

    const video = cinematicRef.current;
    if (!video) return;

    let isCurrentStage = true;
    setPlaybackBlocked(false);
    video.volume = settings.musicVolume / 100;
    video.muted = false;

    const playTimer = window.setTimeout(() => {
      void video.play().catch((error: unknown) => {
        if (!isCurrentStage) return;

        if (error instanceof DOMException && error.name === "NotAllowedError") {
          if (stage === "opening") {
            // Browsers often block autoplay with sound. Keep playback alive,
            // but show an explicit user gesture so the opening audio is enabled.
            video.muted = true;
            setPlaybackBlocked(true);
            void video.play().catch((mutedError: unknown) => {
              if (
                isCurrentStage &&
                mutedError instanceof DOMException &&
                mutedError.name === "NotAllowedError"
              ) {
                setPlaybackBlocked(true);
              }
            });
          } else {
            // Tagline video requires audible sound; prompt user to continue.
            video.pause();
            setPlaybackBlocked(true);
          }
          return;
        }

        console.error(`[VEILTRACE] Failed to play ${stage} video:`, error);
      });
    }, 0);

    return () => {
      isCurrentStage = false;
      window.clearTimeout(playTimer);
    };
  }, [stage, settings.musicVolume]);

  useEffect(() => {
    if (stage !== "disclaimer" && stage !== "scene-01") return;

    const video = cinematicRef.current;
    if (!video) return;

    let isCurrentStage = true;
    setPlaybackError(null);
    video.volume = 1;
    video.muted = false;

    void video.play().catch((error: unknown) => {
      if (!isCurrentStage) return;

      console.error(`[VEILTRACE] Failed to play ${stage} video:`, error);
      setPlaybackError(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Your browser prevented this video from playing with sound. Check its media permissions and reload to try again."
          : "This video could not be played. Check the video file and reload to try again.",
      );
    });

    return () => {
      isCurrentStage = false;
      video.pause();
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "menu") return;

    const video = menuBackgroundRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch((error: unknown) => {
      console.error("[VEILTRACE] Failed to play menu background video:", error);
    });
  }, [stage]);

  useEffect(() => {
    const audio = ambienceRef.current;
    if (!audio) return;

    audio.volume = settings.musicVolume / 100;

    if (stage === "menu" || page !== null) {
      void audio.play().catch(() => {
        // A browser may wait for a user interaction before allowing audio.
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [stage, page, settings.musicVolume]);

  useEffect(() => {
    function handleSettings(event: Event) {
      setSettings((event as CustomEvent<GameSettings>).detail);
    }

    window.addEventListener("veiltrace:settings-changed", handleSettings);

    return () => {
      window.removeEventListener(
        "veiltrace:settings-changed",
        handleSettings,
      );
    };
  }, []);

  function updateSettings(updates: Partial<GameSettings>) {
    setSettings(saveGameSettings(updates));
  }

  function playHoverSound() {
    if (!settings.interfaceSoundsEnabled || settings.dialogueVolume === 0) return;

    try {
      if (!hoverAudioContextRef.current) {
        hoverAudioContextRef.current = new window.AudioContext();
      }

      const context = hoverAudioContextRef.current;
      if (context.state === "suspended") {
        void context.resume().catch((error: unknown) => {
          console.error("[VEILTRACE] Could not resume interface audio:", error);
        });
      }

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const subTone = context.createOscillator();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(155, now);
      oscillator.frequency.exponentialRampToValueAtTime(68, now + 0.19);

      subTone.type = "sine";
      subTone.frequency.setValueAtTime(58, now);
      subTone.frequency.exponentialRampToValueAtTime(43, now + 0.19);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, now);
      filter.frequency.exponentialRampToValueAtTime(190, now + 0.19);
      filter.Q.value = 1.4;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        0.045 * (settings.dialogueVolume / 100),
        now + 0.025,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      oscillator.connect(filter);
      subTone.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);

      oscillator.start(now);
      subTone.start(now);
      oscillator.stop(now + 0.23);
      subTone.stop(now + 0.23);
    } catch (error) {
      console.error("[VEILTRACE] Could not play interface sound:", error);
    }
  }

  function handleButtonFocus(event: FocusEvent<HTMLButtonElement>) {
    if (event.currentTarget.matches(":focus-visible")) {
      playHoverSound();
    }
  }

  function startMenuAmbience() {
    const audio = ambienceRef.current;
    if (!audio || stage !== "menu") return;

    void audio.play().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
        console.error("[VEILTRACE] Could not play menu ambience:", error);
      }
    });
  }

  function transitionTo(nextStage: Stage | null, afterTransition?: () => void) {
    if (transitioningRef.current) return;

    currentSubtitleRef.current = null;
    clearGameSubtitle();
    transitioningRef.current = true;
    setIsTransitioning(true);
    cinematicRef.current?.pause();
    menuBackgroundRef.current?.pause();
    ambienceRef.current?.pause();

    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      transitioningRef.current = false;

      if (nextStage !== null) {
        setStage(nextStage);
        window.requestAnimationFrame(() => setIsTransitioning(false));
      }

      afterTransition?.();
    }, CINEMATIC_TRANSITION_DURATION);
  }

  function handleVideoEnded() {
    if (stage === "opening") {
      setStage("tagline");
    } else if (stage === "tagline") {
      transitionTo("disclaimer");
    } else if (stage === "disclaimer") {
      transitionTo("menu");
    } else if (stage === "scene-01") {
      currentSubtitleRef.current = null;
      clearGameSubtitle();
      transitionTo(null, onStartGame);
    }
  }

  function handleSkipCutscene() {
    if (transitioningRef.current) return;
    const video = cinematicRef.current;
    if (video) video.pause();
    handleVideoEnded();
  }

  function startGameFromMenu() {
    // Fullscreen must be requested directly from the player's click gesture with vendor fallbacks.
    const root = document.documentElement as HTMLElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };
    const req =
      root.requestFullscreen ||
      root.webkitRequestFullscreen ||
      root.mozRequestFullScreen ||
      root.msRequestFullscreen;
    if (req) {
      void req.call(root).catch(() => {
        // Fullscreen can be unavailable in embedded previews or restricted browsers.
      });
    }
    transitionTo("scene-01");
  }
  function handleCutsceneTimeUpdate() {
    if (stage !== "scene-01") return;
    const video = cinematicRef.current;
    if (!video || video.ended) return;

    const time = video.currentTime;
    const activeCue = CUTSCENE_SUBTITLES.find(
      (cue) => time >= cue.start && time < cue.end,
    );

    if (activeCue) {
      if (currentSubtitleRef.current !== activeCue.text) {
        currentSubtitleRef.current = activeCue.text;
        showGameSubtitle(activeCue.text, (activeCue.end - time) * 1000);
      }
    } else {
      if (currentSubtitleRef.current !== null) {
        currentSubtitleRef.current = null;
        clearGameSubtitle();
      }
    }
  }

  function handleCutscenePause() {
    if (stage === "scene-01") {
      currentSubtitleRef.current = null;
      clearGameSubtitle();
    }
  }

  function resumeCinematic() {
    const root = document.documentElement as HTMLElement & {
      requestFullscreen?: () => Promise<void>;
    };
    if (root.requestFullscreen && !document.fullscreenElement) {
      void root.requestFullscreen().catch(() => {});
    }

    const video = cinematicRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = settings.musicVolume / 100;
    void video.play().then(
      () => setPlaybackBlocked(false),
      (error: unknown) => {
        console.error(`[VEILTRACE] Failed to resume ${stage} video:`, error);
      },
    );
  }

  if (stage === "opening" || stage === "tagline") {
    const path = stage === "opening" ? VIDEO.opening : VIDEO.tagline;

    return (
      <main
        className={`vt-cinematic${stage === "tagline" ? " vt-cinematic--transition" : ""}`}
        aria-label="VEILTRACE cinematic"
        onPointerDown={() => {
          const root = document.documentElement as HTMLElement & {
            requestFullscreen?: () => Promise<void>;
          };
          if (root.requestFullscreen && !document.fullscreenElement) {
            void root.requestFullscreen().catch(() => {});
          }
          const video = cinematicRef.current;
          if (video && video.muted) {
            video.muted = false;
            video.volume = settings.musicVolume / 100;
            void video.play().catch((error: unknown) => {
              console.error("[VEILTRACE] Could not resume cinematic audio:", error);
              setPlaybackBlocked(true);
            });
          }
        }}
      >
        <video
          key={stage}
          ref={cinematicRef}
          className={`vt-cinematic__video${stage === "opening" ? " vt-cinematic__video--raised" : ""}`}
          src={path}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onError={() => {
            console.error(
              `[VEILTRACE] Failed to load ${stage} video:`,
              path,
            );
          }}
          data-vt-audio-type="music"
        />
        <button
          type="button"
          className="vt-cinematic__skip"
          onClick={handleSkipCutscene}
        >
          SKIP CUTSCENE <span aria-hidden="true">»</span>
        </button>
        {stage === "tagline" && (
          <div
            className={`vt-transition-cover${isTransitioning ? " is-active" : ""}`}
            aria-hidden="true"
          />
        )}
        {playbackBlocked && (
          <div className="vt-playback-gate">
            <p className="vt-playback-gate__eyebrow">
              PLAYBACK REQUIRES INTERACTION
            </p>
            <button
              type="button"
              className="vt-playback-gate__button"
              onClick={resumeCinematic}
            >
              CONTINUE EXPERIENCE
            </button>
            <p className="vt-playback-gate__hint">
              Select to allow the cinematic to play.
            </p>
          </div>
        )}
      </main>
    );
  }

  if (stage === "disclaimer" || stage === "scene-01") {
    const isFirstCutscene = stage === "scene-01";
    const path = isFirstCutscene ? VIDEO.scene01 : VIDEO.disclaimer;

    return (
      <main
        className="vt-cinematic vt-cinematic--transition"
        aria-label={isFirstCutscene ? "VEILTRACE first cutscene" : "VEILTRACE disclaimer"}
      >
        <video
          ref={cinematicRef}
          className="vt-cinematic__video"
          src={path}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onTimeUpdate={isFirstCutscene ? handleCutsceneTimeUpdate : undefined}
          onPause={isFirstCutscene ? handleCutscenePause : undefined}
          onSeeked={isFirstCutscene ? handleCutsceneTimeUpdate : undefined}
          onError={() => {
            const message = `Failed to load ${stage} video: ${path}`;
            console.error(`[VEILTRACE] ${message}`);
            setPlaybackError(
              "This video could not be loaded. Check the video file and reload to try again.",
            );
          }}
        />
        <button
          type="button"
          className="vt-cinematic__skip"
          onClick={handleSkipCutscene}
        >
          SKIP CUTSCENE <span aria-hidden="true">»</span>
        </button>
        {playbackError && (
          <p className="vt-video-error" role="alert">
            {playbackError}
          </p>
        )}
        <div
          className={`vt-transition-cover${isTransitioning ? " is-active" : ""}`}
          aria-hidden="true"
        />
      </main>
    );
  }

  return (
    <main
      className={`vt-menu vt-menu--refined${isTransitioning ? " is-transitioning" : ""}`}
      onPointerDown={startMenuAmbience}
    >
      <video
        ref={menuBackgroundRef}
        className="vt-menu__background"
        src={VIDEO.menu}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <audio
        ref={ambienceRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
        data-vt-audio-type="music"
      />

      <div className="vt-menu__shade" aria-hidden="true" />
      <div className="vt-menu__grain" aria-hidden="true" />
      <div
        className={`vt-transition-cover${isTransitioning ? " is-active" : ""}`}
        aria-hidden="true"
      />

      {!page ? (
        <div className="vt-menu__layout">
          <header className="vt-menu__branding">
            <p className="vt-menu__eyebrow">
              AN INTERACTIVE CYBERSECURITY THRILLER
            </p>

            <h1 className="vt-menu__title">VEILTRACE</h1>
            <div className="vt-menu__title-rule" />

            <p className="vt-menu__tagline">
              Leave no trail.
              <br />
              <span>Live to leave.</span>
            </p>

            <p className="vt-menu__description">
              Every trace tells a story.
              <br />
              Make certain yours ends here.
            </p>
          </header>

          <nav className="vt-menu__navigation vt-menu__navigation--centered">
            <button
              type="button"
              className="vt-menu__option vt-menu__option--primary"
              onPointerEnter={playHoverSound}
              onFocus={handleButtonFocus}
              onClick={startGameFromMenu}
            >
              <span>{hasPlayed ? "NEW GAME" : "START GAME"}</span>
              <span className="vt-menu__option-arrow" aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="vt-menu__option"
              onPointerEnter={playHoverSound}
              onFocus={handleButtonFocus}
              onClick={() => {
                setTab("controls");
                setPage("settings");
              }}
            >
              <span>SETTINGS</span>
              <span className="vt-menu__option-arrow" aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="vt-menu__option"
              onPointerEnter={playHoverSound}
              onFocus={handleButtonFocus}
              onClick={() => setPage("about")}
            >
              <span>ABOUT</span>
              <span className="vt-menu__option-arrow" aria-hidden="true">↗</span>
            </button>

            {hasPlayed && (
              <button
                type="button"
                className="vt-menu__option vt-menu__option--insights"
                onPointerEnter={playHoverSound}
                onFocus={handleButtonFocus}
                onClick={() => setPage("insights")}
              >
                <span>INSIGHTS</span>
                <span className="vt-menu__option-arrow" aria-hidden="true">↗</span>
              </button>
            )}
          </nav>

          <footer className="vt-menu__footer">
            <span>VEILTRACE</span>
            <span>EDITION 01</span>
            <span>FICTIONAL ENVIRONMENT</span>
          </footer>
        </div>
      ) : page === "insights" ? (
        <InsightsDashboard onBack={() => setPage(null)} stats={completedStats} />
      ) : (
        <section className="vt-page-wrap">
          <div className="vt-page">
            <header className="vt-page__header">
              <div>
                <p className="vt-page__eyebrow">VEILTRACE // SYSTEM</p>
                <h1>{page === "settings" ? "SETTINGS" : "ABOUT THE GAME"}</h1>
              </div>

              <button
                type="button"
                className="vt-page__close"
                onPointerEnter={playHoverSound}
                onFocus={handleButtonFocus}
                onClick={() => setPage(null)}
                aria-label="Return to main menu"
              >
                ×
              </button>
            </header>

            {page === "about" ? (
              <div className="vt-page__content vt-about">
                <p className="vt-about__tagline">
                  Leave no trail. Live to leave.
                </p>

                <h2>THE GAME</h2>
                <p>
                  VEILTRACE is a cybersecurity escape thriller where every
                  digital trace can reveal something you were never meant to
                  find. Explore a compromised environment, uncover hidden
                  information, solve security-focused puzzles, and find a way
                  out before time runs out.
                </p>

                <h2>WHAT YOU'LL LEARN</h2>
                <p>
                  Digital footprints, location exposure, permissions,
                  session security, access tokens, metadata, and the risks
                  created by overlooked digital evidence.
                </p>

                <h2>HOW TO PLAY</h2>
                <p>
                  Explore the environment, inspect objects, read discovered
                  files, connect clues, solve puzzles, and use what you learn
                  to progress. Watch the timer and think before interacting:
                  not every trace tells the whole story.
                </p>

                <p className="vt-about__note">
                  Fictional scenarios. Educational purpose.
                </p>
              </div>
            ) : (
              <div className="vt-settings">
                <nav className="vt-settings__nav" aria-label="Settings sections">
                  {(
                    [
                      ["controls", "CONTROLS"],
                      ["language", "LANGUAGE"],
                      ["subtitles", "SUBTITLES"],
                      ["audio", "AUDIO"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      className={tab === id ? "is-active" : ""}
                      onPointerEnter={playHoverSound}
                      onFocus={handleButtonFocus}
                      onClick={() => setTab(id)}
                    >
                      {label}
                    </button>
                  ))}
                </nav>

                <div className="vt-settings__content">
                  {tab === "controls" && (
                    <div className="vt-controls">
                      {CONTROLS.map(([key, action]) => (
                        <div className="vt-controls__row" key={key}>
                          <span className="vt-controls__key">{key}</span>
                          <span className="vt-controls__action">{action}</span>
                        </div>
                      ))}
                      <p className="vt-controls__tip">
                        <strong>NOTE:</strong> Try combining multiple controls at
                        the same time to discover different interactions and
                        uncover possible solutions to tricky locks.
                      </p>
                    </div>
                  )}

                  {tab === "language" && (
                    <div className="vt-settings__section">
                      <label htmlFor="vt-language">Interface language</label>
                      <select id="vt-language" value="en" disabled>
                        <option value="en">English</option>
                      </select>
                      <p>More languages may be added in a future update.</p>
                    </div>
                  )}

                  {tab === "subtitles" && (
                    <div className="vt-settings__section">
                      <div className="vt-settings__toggle-row">
                        <div>
                          <h2>Subtitles</h2>
                          <p>Show or hide supported in-game dialogue captions.</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.subtitlesEnabled}
                          aria-label="Subtitles"
                          className={`vt-switch${settings.subtitlesEnabled ? " is-on" : ""}`}
                          onPointerEnter={playHoverSound}
                          onFocus={handleButtonFocus}
                          onClick={() =>
                            updateSettings({
                              subtitlesEnabled: !settings.subtitlesEnabled,
                            })
                          }
                        >
                          <span />
                        </button>
                      </div>
                    </div>
                  )}

                  {tab === "audio" && (
                    <div className="vt-settings__section">
                      <div className="vt-slider-row">
                        <label htmlFor="vt-music-volume">Music volume</label>
                        <output>{settings.musicVolume}%</output>
                        <input
                          id="vt-music-volume"
                          type="range"
                          min="0"
                          max="100"
                          value={settings.musicVolume}
                          onChange={(event) =>
                            updateSettings({
                              musicVolume: Number(event.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="vt-settings__toggle-row">
                        <div>
                          <h2>Interface hover sound</h2>
                          <p>Play the original synthesized menu feedback.</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.interfaceSoundsEnabled}
                          aria-label="Interface hover sound"
                          className={`vt-switch${settings.interfaceSoundsEnabled ? " is-on" : ""}`}
                          onPointerEnter={playHoverSound}
                          onFocus={handleButtonFocus}
                          onClick={() =>
                            updateSettings({
                              interfaceSoundsEnabled: !settings.interfaceSoundsEnabled,
                            })
                          }
                        >
                          <span />
                        </button>
                      </div>

                      <div className="vt-slider-row">
                        <label htmlFor="vt-dialogue-volume">Dialogue volume</label>
                        <output>{settings.dialogueVolume}%</output>
                        <input
                          id="vt-dialogue-volume"
                          type="range"
                          min="0"
                          max="100"
                          value={settings.dialogueVolume}
                          onChange={(event) =>
                            updateSettings({
                              dialogueVolume: Number(event.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default OpeningExperience;