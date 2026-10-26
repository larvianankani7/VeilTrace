export type SceneDialogue = {
  speaker: "M" | "Unknown" | "SYSTEM";
  text: string;
};

export type SceneProps = {
  onComplete: () => void;
};