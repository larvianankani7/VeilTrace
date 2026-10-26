import { useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import {
  getGameSettings,
  saveGameSettings,
  type GameSettings,
} from "../app/gameSettings";
import "../styles/opening-experience.css";
import "../styles/experience-pages.css";

type Stage = "opening" | "tagline" | "disclaimer" | "menu" | "scene-01";
type Page = "settings" | "about" | null;
type SettingsTab = "controls" | "language" | "subtitles" | "audio";

type Props = {
  onStartGame: () => void;
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

const CONTROLS = [
  [
    "WASD",
    "Not implemented. These keys do not move the character or trigger puzzle actions.",
  ],
  [
    "Left Click",
    "Open desktop objects and activate on-screen controls to inspect records or apply a puzzle action.",
  ],
  ["Right Click", "Not implemented; there is no right-click puzzle interaction."],
  ["Shift", "Not implemented as a game or puzzle control."],
  ["Ctrl", "Not implemented as a game or puzzle control."],
  [
    "Enter",
    "Uses standard keyboard activation for the focused button, such as menu options, dialogue continuation, or puzzle actions. There is no separate Enter puzzle action.",
  ],
] as const;

function OpeningExperience({ onStartGame }: Props) {
  const [stage, setStage] = useState<Stage>("opening");
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

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
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
          video.muted = true;
          void video.play().catch((mutedError: unknown) => {
            if (isCurrentStage) {
              if (
                mutedError instanceof DOMException &&
                mutedError.name === "NotAllowedError"
              ) {
                if (import.meta.env.DEV) setPlaybackBlocked(true);
              } else {
                console.error(
                  `[VEILTRACE] Failed to play ${stage} video muted:`,
                  mutedError,
                );
              }
            }
          });
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
      transitionTo(null, onStartGame);
    }
  }

  function resumeCinematic() {
    const video = cinematicRef.current;
    if (!video) return;

    video.muted = false;
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
      >
        <video
          key={stage}
          ref={cinematicRef}
          className="vt-cinematic__video vt-cinematic__video--raised"
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
        {stage === "tagline" && (
          <div
            className={`vt-transition-cover${isTransitioning ? " is-active" : ""}`}
            aria-hidden="true"
          />
        )}
        {import.meta.env.DEV && playbackBlocked && (
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
          className="vt-cinematic__video vt-cinematic__video--raised"
          src={path}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onError={() => {
            const message = `Failed to load ${stage} video: ${path}`;
            console.error(`[VEILTRACE] ${message}`);
            setPlaybackError(
              "This video could not be loaded. Check the video file and reload to try again.",
            );
          }}
        />
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
              onClick={() => transitionTo("scene-01")}
            >
              <span>START GAME</span>
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
          </nav>

          <footer className="vt-menu__footer">
            <span>VEILTRACE</span>
            <span>EDITION 01</span>
            <span>FICTIONAL ENVIRONMENT</span>
          </footer>
        </div>
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
                        <strong>TIP:</strong> Try combining multiple controls at
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

            <button
              type="button"
              className="vt-page__back"
              onPointerEnter={playHoverSound}
              onFocus={handleButtonFocus}
              onClick={() => setPage(null)}
            >
              ← RETURN TO MENU
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default OpeningExperience;