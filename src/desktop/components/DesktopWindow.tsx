import type { ReactNode } from "react";

type DesktopWindowProps = {
  title: string;
  category: string;
  onClose: () => void;
  children: ReactNode;
};

function DesktopWindow({
  title,
  category,
  onClose,
  children,
}: DesktopWindowProps) {
  return (
    <section
      className="desktop-window"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} window`}
    >
      <header className="desktop-window__titlebar">
        <div className="desktop-window__heading">
          <span className="desktop-window__indicator" aria-hidden="true" />
          <div>
            <p className="desktop-window__category">{category}</p>
            <h2>{title}</h2>
          </div>
        </div>

        <button
          type="button"
          className="desktop-window__close"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          ×
        </button>
      </header>

      <div className="desktop-window__content">{children}</div>
    </section>
  );
}

export default DesktopWindow;