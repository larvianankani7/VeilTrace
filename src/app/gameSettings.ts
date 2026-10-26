export type GameSettings = {
  musicVolume: number;
  dialogueVolume: number;
  interfaceSoundsEnabled: boolean;
  subtitlesEnabled: boolean;
  language: "en";
};

const STORAGE_KEY = "veiltrace-game-settings";
const SETTINGS_EVENT = "veiltrace:settings-changed";

const DEFAULT_SETTINGS: GameSettings = {
  musicVolume: 60,
  dialogueVolume: 70,
  interfaceSoundsEnabled: true,
  subtitlesEnabled: true,
  language: "en",
};

export function getGameSettings(): GameSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return { ...DEFAULT_SETTINGS };

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
      language: "en",
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function applyAudioVolumes(settings: GameSettings) {
  document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
    const type = media.dataset.vtAudioType ??
    (media.tagName === "VIDEO" ? "music" : "dialogue");

    media.volume =
    type === "music"
        ? settings.musicVolume / 100
        : settings.dialogueVolume / 100;
    if (typeof document !== "undefined") {
    const observer = new MutationObserver(() => {
        applyAudioVolumes(getGameSettings());
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-vt-audio-type"],
    });
    }
  });
}

export function saveGameSettings(
  updates: Partial<GameSettings>,
): GameSettings {
  const settings = {
    ...getGameSettings(),
    ...updates,
    language: "en" as const,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  applyAudioVolumes(settings);

  window.dispatchEvent(
    new CustomEvent<GameSettings>(SETTINGS_EVENT, {
      detail: settings,
    }),
  );

  return settings;
}

export function subscribeToGameSettings(
  callback: (settings: GameSettings) => void,
) {
  const handler = (event: Event) => {
    callback((event as CustomEvent<GameSettings>).detail);
  };

  window.addEventListener(SETTINGS_EVENT, handler);

  return () => window.removeEventListener(SETTINGS_EVENT, handler);
}

/** Call this when a scene mounts, so newly created media uses saved volumes. */
export function applySavedAudioSettings() {
  applyAudioVolumes(getGameSettings());
}

/** Call this when a dialogue line should appear as a subtitle. */
export function showGameSubtitle(text: string, duration = 3500) {
  window.dispatchEvent(
    new CustomEvent("veiltrace:subtitle", {
      detail: { text, duration },
    }),
  );
}