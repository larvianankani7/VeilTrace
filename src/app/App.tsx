import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { GAME_PHASES } from "./routes";
import type { GamePhase } from "./routes";
import { showGameSubtitle } from "./gameSettings";
import OpeningExperience from "../scenes/OpeningExperience";
import OpeningScene from "../scenes/OpeningScene";
import BreachScene from "../scenes/BreachScene";
import DesktopEnvironment from "../desktop/DesktopEnvironment";
import GameSubtitle from "../components/GameSubtitle";
import "../styles/global.css";
import "../styles/scenes.css";

const OPENING_DIALOGUE = [
  { text: "M: Ugh… where am I?", duration: 2600 },
  {
    text: "UNKNOWN: Finally awake, huh? This is what you get for crossing me. You must atone for your sins… but I'm not quite that cruel, you know? You do have to do something for it. To get out of here, and perhaps earn a chance to escape. Just make certain no one can trace you. Oh—and you might hurry. You're running out of time. Good luck.",
    duration: 12500,
  },
  { text: "M: What the hell was that? Who… who was she?", duration: 3200 },
  { text: "M: Dammit, my whole body's aching.", duration: 2800 },
  {
    text: "M: Locked in a room with a computer and some cryptic threat… brilliant. What am I supposed to do now?",
    duration: 4800,
  },
] as const;

function App() {
  const [phase, setPhase] = useState<GamePhase>(GAME_PHASES.TITLE);

  const startRoom = useCallback(() => setPhase(GAME_PHASES.ROOM), []);
  const startBreach = useCallback(() => setPhase(GAME_PHASES.INTRO), []);
  const startDesktop = useCallback(() => setPhase(GAME_PHASES.DESKTOP), []);
  const escape = useCallback(() => setPhase(GAME_PHASES.ESCAPE), []);
  const die = useCallback(() => setPhase(GAME_PHASES.DEATH), []);
  const returnToTitle = useCallback(() => setPhase(GAME_PHASES.TITLE), []);

  useEffect(() => {
    if (phase !== GAME_PHASES.ROOM) return;

    const timers: number[] = [];
    let offset = 450;

    OPENING_DIALOGUE.forEach((cue) => {
      timers.push(
        window.setTimeout(() => showGameSubtitle(cue.text, cue.duration), offset),
      );
      offset += cue.duration + 500;
    });

    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== GAME_PHASES.DESKTOP) return;

    showGameSubtitle(
      "M: What does that even mean? Someone can find me through this thing? No, no… think, M. Ten minutes to do what, exactly?",
      6500,
    );

    const halfwayTimer = window.setTimeout(() => {
      showGameSubtitle(
        "M: No, no… I can't afford to keep opening things at random. Think. What would let someone trace this system back to me?",
        6500,
      );
    }, 5 * 60 * 1000);

    return () => window.clearTimeout(halfwayTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== GAME_PHASES.DESKTOP) return;

    const handleCriticalProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ remaining?: number }>;
      if (customEvent.detail?.remaining === 1) {
        showGameSubtitle(
          "M: Come on! Just one more… please, let this be enough.",
          4000,
        );
      }
    };

    window.addEventListener("veiltrace:critical-progress", handleCriticalProgress);
    return () =>
      window.removeEventListener("veiltrace:critical-progress", handleCriticalProgress);
  }, [phase]);

  useEffect(() => {
    if (phase === GAME_PHASES.ESCAPE) {
      showGameSubtitle("M: It's over…? I actually did it?", 4500);
    } else if (phase === GAME_PHASES.DEATH) {
      showGameSubtitle(
        "M: NO! Open the door! I did everything I could! I didn't know! Please… NOOO!",
        5500,
      );
    }
  }, [phase]);

  let scene: ReactNode = null;

  if (phase === GAME_PHASES.TITLE) {
    scene = <OpeningExperience onStartGame={startRoom} />;
  } else if (phase === GAME_PHASES.ROOM) {
    scene = <OpeningScene onComplete={startBreach} />;
  } else if (phase === GAME_PHASES.INTRO) {
    scene = <BreachScene onComplete={startDesktop} />;
  } else if (phase === GAME_PHASES.DESKTOP) {
    scene = <DesktopEnvironment onEscape={escape} onDeath={die} />;
  } else if (phase === GAME_PHASES.ESCAPE) {
    scene = (
      <main className="ending-screen ending-screen--escape">
        <p className="ending-screen__eyebrow">SESSION CONCLUDED</p>
        <h1>YOU ESCAPED</h1>
        <p>The exposed trail has been contained. For now.</p>
        <button type="button" onClick={returnToTitle}>Return to title</button>
      </main>
    );
  } else if (phase === GAME_PHASES.DEATH) {
    scene = (
      <main className="ending-screen ending-screen--death">
        <p className="ending-screen__eyebrow">TRACE COMPLETE</p>
        <h1>YOU WERE FOUND</h1>
        <p>The countdown reached zero before every critical exposure was contained.</p>
        <button type="button" onClick={returnToTitle}>Try again</button>
      </main>
    );
  }

  return (
    <>
      {scene}
      <GameSubtitle />
    </>
  );
}

export default App;
