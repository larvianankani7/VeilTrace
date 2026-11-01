import type { DialogueSpeaker } from "../data/dialogue";

type DialogueBoxProps = {
  speaker: DialogueSpeaker | string;
  text: string;
  onContinue?: () => void;
  showContinue?: boolean;
};

function getSpeakerColorClass(speaker: string): string {
  const normalized = speaker.toLowerCase();
  if (normalized === "unknown") return "dialogue-speaker--unknown";
  if (normalized === "m") return "dialogue-speaker--m";
  return "dialogue-speaker--warning";
}

function DialogueBox({
  speaker,
  text,
  onContinue,
  showContinue = false,
}: DialogueBoxProps) {
  const speakerClass = getSpeakerColorClass(speaker);

  return (
    <section className="dialogue-box" aria-live="polite">
      <p className={`dialogue-speaker ${speakerClass}`}>{speaker}</p>

      <p className="dialogue-text">{text}</p>

      {showContinue && onContinue && (
        <button
          className="dialogue-continue"
          onClick={onContinue}
          type="button"
        >
          CONTINUE <span aria-hidden="true">→</span>
        </button>
      )}
    </section>
  );
}

export default DialogueBox;
