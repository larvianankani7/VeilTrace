import { useState } from "react";
import type { SceneProps, SceneDialogue } from "./SceneTypes";
import DialogueBox from "../components/DialogueBox";

const openingLines: SceneDialogue[] = [
  {
    speaker: "Unknown",
    text: "So, this is what you get for crossing me. You must atone for your sins… but I'm not quite that cruel, you know? Find your way out of here, and perhaps you'll earn a chance to escape. Just make certain no one can trace you. Oh—and you might want to hurry. Your time is limited. Good luck.",
  },
  {
    speaker: "M",
    text: "What the hell was that? Who… who was she? Damn it… my whole body's aching.",
  },
  {
    speaker: "M",
    text: "Locked in a room with a computer and some cryptic threat… brilliant. What am I supposed to do now?",
  },
];

function OpeningScene({ onComplete }: SceneProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const currentLine = openingLines[lineIndex];

  function continueScene() {
    if (lineIndex < openingLines.length - 1) {
      setLineIndex((index) => index + 1);
      return;
    }

    onComplete();
  }

  return (
    <main className="scene scene--opening">
      <div className="scene-atmosphere" aria-hidden="true" />

      <header className="scene-heading">
        <span>VEILTRACE</span>
        <span>SCENE 01 · THE AWAKENING</span>
      </header>

      <div className="scene-description">
        <p>CONCRETE ROOM · UNKNOWN LOCATION</p>
        <h1>Something is wrong.</h1>
        <p>
          A flickering light. A locked door. A computer waiting in the dark.
        </p>
      </div>

      <DialogueBox
        speaker={currentLine.speaker}
        text={currentLine.text}
        showContinue
        onContinue={continueScene}
      />
    </main>
  );
}

export default OpeningScene;