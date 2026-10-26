type DialogueBoxProps = {
  speaker: "M" | "Unknown" | "SYSTEM";
  text: string;
  onContinue?: () => void;
  showContinue?: boolean;
};

function DialogueBox({
  speaker,
  text,
  onContinue,
  showContinue = false,
}: DialogueBoxProps) {
  return (
    <section className="dialogue-box" aria-live="polite">
      <p className="dialogue-speaker">{speaker}</p>

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
