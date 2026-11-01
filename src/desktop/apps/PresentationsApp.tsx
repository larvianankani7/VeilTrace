import { useState } from "react";
import { PROFILE_DATA } from "../../data/profileData";

type Props = {
  onClose: () => void;
};

export default function PresentationsApp({ onClose }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Personnel Dossier // Merdin Morov",
      subtitle: "Security Infrastructure Briefing",
      badge: "SLIDE 01 // OVERVIEW",
      content: (
        <div className="vt-slide-cover-layout">
          <div className="vt-slide-avatar">
            <span>{PROFILE_DATA.nickname}</span>
          </div>
          <h2 className="vt-slide-hero-title">{PROFILE_DATA.fullName}</h2>
          <p className="vt-slide-hero-role">{PROFILE_DATA.occupation}</p>
          <div className="vt-slide-meta-pills">
            <span className="vt-slide-pill">{PROFILE_DATA.classification}</span>
            <span className="vt-slide-pill">{PROFILE_DATA.documentId}</span>
            <span className="vt-slide-pill is-warn">{PROFILE_DATA.restriction}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Identification & Contact Parameters",
      subtitle: "Subject Telemetry & Communications",
      badge: "SLIDE 02 // IDENTITY",
      content: (
        <div className="vt-slide-grid-layout">
          <div className="vt-slide-card">
            <span className="vt-slide-card-kicker">FULL LEGAL NAME</span>
            <h3>{PROFILE_DATA.fullName} ({PROFILE_DATA.nickname})</h3>
            <p>Age: {PROFILE_DATA.age} · Sex: {PROFILE_DATA.sex}</p>
            <p>Nationality: {PROFILE_DATA.nationality}</p>
          </div>
          <div className="vt-slide-card">
            <span className="vt-slide-card-kicker">COMMUNICATIONS</span>
            <p><strong>Email:</strong> {PROFILE_DATA.email}</p>
            <p><strong>Phone:</strong> {PROFILE_DATA.phoneNumber}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Family & Departmental Allocation",
      subtitle: "Lineage and Structural Stationing",
      badge: "SLIDE 03 // ALLOCATION",
      content: (
        <div className="vt-slide-grid-layout">
          <div className="vt-slide-card">
            <span className="vt-slide-card-kicker">FAMILY ARCHIVE</span>
            <p><strong>Father's Name:</strong> {PROFILE_DATA.fathersName}</p>
            <p><strong>Mother's Name:</strong> {PROFILE_DATA.mothersName}</p>
          </div>
          <div className="vt-slide-card">
            <span className="vt-slide-card-kicker">NODE ASSIGNMENT</span>
            <p><strong>Assigned Node:</strong> {PROFILE_DATA.assignedNode}</p>
            <p><strong>Occupation:</strong> {PROFILE_DATA.occupation}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Incident Code & Operational Status",
      subtitle: "Containment Review & Diagnostic Findings",
      badge: "SLIDE 04 // STATUS",
      content: (
        <div className="vt-slide-notes-layout">
          <div className="vt-slide-status-header">
            <div>
              <span className="vt-slide-card-kicker">INCIDENT CODE</span>
              <h3><code>{PROFILE_DATA.incidentCode}</code></h3>
            </div>
            <div>
              <span className="vt-slide-card-kicker">OPERATIONAL STATUS</span>
              <span className="vt-slide-status-alert">{PROFILE_DATA.status}</span>
            </div>
          </div>
          <div className="vt-slide-notes-card">
            <span className="vt-slide-card-kicker">INVESTIGATION NOTES</span>
            <p className="vt-slide-notes-text">{PROFILE_DATA.investigationNotes}</p>
          </div>
        </div>
      ),
    },
  ];

  function handleNext() {
    setCurrentSlide((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  }

  function handlePrev() {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }

  const active = slides[currentSlide];

  return (
    <section className="vt-location-flow vt-second-desktop vt-pres-app" aria-label="Presentations Viewer">
      <div className="vt-second-topbar">
        <strong>VEILTRACE // PRESENTATIONS — PERSONNEL BRIEFING.PPTX</strong>
        <button type="button" onClick={onClose} className="vt-btn-return">
          Return ✕
        </button>
      </div>

      <div className="vt-pres-workspace">
        {/* PowerPoint Ribbon / Toolbar */}
        <div className="vt-pres-ribbon">
          <div className="vt-ribbon-actions">
            <span className="vt-ribbon-tab active">Slide Show</span>
            <span className="vt-ribbon-tab">View</span>
          </div>
          <span className="vt-pres-title-bar">Merdin_Morov_Briefing.pptx [Read-Only]</span>
        </div>

        {/* Stage Area */}
        <div className="vt-pres-stage">
          {/* Slide Deck Canvas */}
          <article className="vt-slide-canvas" role="region" aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}>
            <header className="vt-slide-header">
              <span className="vt-slide-badge">{active.badge}</span>
              <h2 className="vt-slide-title">{active.title}</h2>
              <p className="vt-slide-subtitle">{active.subtitle}</p>
            </header>

            <div className="vt-slide-body">
              {active.content}
            </div>

            <footer className="vt-slide-footer">
              <span>VEILTRACE SECURED BRIEFING // TIER-2 RESTRICTED</span>
              <span>SLIDE {currentSlide + 1} OF {slides.length}</span>
            </footer>
          </article>
        </div>

        {/* Slide Navigation Bar */}
        <footer className="vt-pres-controls">
          <button
            type="button"
            className="vt-pres-btn"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
          >
            ← Previous
          </button>

          <div className="vt-slide-indicators">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`vt-slide-dot ${i === currentSlide ? "is-active" : ""}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="vt-pres-btn"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            aria-label="Next slide"
          >
            Next →
          </button>
        </footer>
      </div>
    </section>
  );
}
