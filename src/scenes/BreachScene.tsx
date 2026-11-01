import { useState } from "react";
import type { SceneProps } from "./SceneTypes";
import DialogueBox from "../components/DialogueBox";
import { scene01BreachLines } from "../data/dialogue";

function BreachScene({ onComplete }: SceneProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [warningAcknowledged, setWarningAcknowledged] = useState(false);
  const currentLine = scene01BreachLines[lineIndex];

  function continueBreach() {
    if (lineIndex < scene01BreachLines.length - 1) {
      setLineIndex((index) => index + 1);
      return;
    }

    setWarningAcknowledged(true);
  }

  return (
    <main className="scene scene--breach">
      <header className="scene-heading">
        <span>VEILTRACE // TERMINAL</span>
        <span>MANUAL INTERVENTION REQUIRED</span>
      </header>

      <section className="breach-terminal">
        <p className="terminal-alert">SECURITY BREACH DETECTED</p>
        <p className="terminal-warning">UNAUTHORISED EXPOSURE: ACTIVE</p>

        <p>
          Multiple services may be exposing identifying information. Your
          location and account activity may be traceable.
        </p>

        <div className="terminal-countdown">
          <span>TIME TO CONTAINMENT FAILURE</span>
          <strong>10:00</strong>
        </div>

        <p>
          Disconnect or restrict exposed services before the countdown expires.
          Failure to contain the breach will trigger the facility's emergency
          destruction sequence.
        </p>

        <p className="terminal-status">
          SYSTEM STATUS: COMPROMISED · MANUAL INTERVENTION REQUIRED
        </p>

        <p className="terminal-objective">
          OBJECTIVE: FIND AND CONTAIN THE ELEVEN CRITICAL EXPOSURES.
        </p>
      </section>

      {!warningAcknowledged ? (
        <DialogueBox
          speaker={currentLine.speaker}
          text={currentLine.text}
          showContinue
          onContinue={continueBreach}
        />
      ) : (
        <button
          className="scene-start-button"
          type="button"
          onClick={onComplete}
        >
          TAKE CONTROL OF THE COMPUTER →
        </button>
      )}
    </main>
  );
}

export default BreachScene;
