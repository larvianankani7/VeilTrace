import type { DialogueSpeaker } from "../data/dialogue";

export type SceneDialogue = {
  speaker: DialogueSpeaker;
  text: string;
};

export type SceneProps = {
  onComplete: () => void;
};
