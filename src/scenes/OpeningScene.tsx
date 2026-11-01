import type { SceneProps } from "./SceneTypes";

function OpeningScene({ onComplete }: SceneProps) {
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
        <button
          type="button"
          className="scene-continue"
          onClick={onComplete}
        >
          CONTINUE <span aria-hidden="true">→</span>
        </button>
      </div>
    </main>
  );
}

export default OpeningScene;
