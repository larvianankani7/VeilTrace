type Props = {
  onClose: () => void;
};

export default function ProjectsApp({ onClose }: Props) {
  return (
    <section className="vt-location-flow vt-second-desktop" aria-label="Projects folder">
      <div className="vt-second-topbar">
        <strong>DEVOPS // PROJECTS</strong>
        <button type="button" onClick={onClose}>← Back to desktop</button>
      </div>

      <article className="vt-sim-app">
        <p className="vt-explorer-kicker">FOLDER</p>
        <h2>projects</h2>
        <p>Project files will be configured next.</p>
      </article>
    </section>
  );
}
