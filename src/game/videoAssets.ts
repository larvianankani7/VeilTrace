export const VIDEO_ASSETS = {
  ESCAPE_ENDING: "/videos/Escape_ending.mp4",
  DEATH_ENDING: "/videos/Death_ending.mp4",
  END_CREDITS: "/videos/End_Credits.mp4",
  SCENE_01: "/videos/scene-01.mp4",
  SCENE_02: "/videos/scene-02.mp4",
  SCENE_03: "/videos/scene-03.mp4",
  SCENE_04: "/videos/scene-04.mp4",
  OPENING: "/videos/opening.mp4",
  MENU_BG: "/videos/menu-bg.mp4",
  NATURE_STREAM: "/videos/nature-stream.mp4",
} as const;

export type VideoAssetKey = keyof typeof VIDEO_ASSETS;
