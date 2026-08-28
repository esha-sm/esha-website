"use client";

import Image from "next/image";
import Link from "next/link";
import { playProjects } from "@/lib/playProjects";

export default function DataoricTakeHome() {
  const project = playProjects.find((item) => item.slug === "dataoric-take-home");

  const handleBackHome = () => {
    window.location.href = "/#play";
  };

  if (!project) return null;

  return (
    <div className="case-backdrop">
      <div className="case-modal">
        <div className="case-topbar">
          <button type="button" className="case-icon-btn" aria-label="Back home" onClick={handleBackHome}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="case-kicker">Take-home project</span>
        </div>

        <div className="case-hero">
          <div className="case-hero-left">
            <div className="case-brand">
              <div className="case-logo">
                {project.logo ? (
                  <img src={project.logo} alt="" width={40} height={40} />
                ) : (
                  <Image src="/corgi/datoric/datoric-logo.png" alt="" width={40} height={40} />
                )}
              </div>
              <h1 className="case-title">{project.companyLabel ?? project.title}</h1>
            </div>

            <p className="case-desc">{project.description}</p>

            <div className="case-meta-grid">
              <div className="case-meta-item"><span>Timeline</span><p>{project.timeline}</p></div>
              <div className="case-meta-item"><span>Role</span><p>{project.role}</p></div>
              <div className="case-meta-item"><span>Type</span><p>{project.type ?? "Take-home Assignment"}</p></div>
              <div className="case-meta-item"><span>Focus</span><p>{project.summary}</p></div>
            </div>
          </div>

          <div className="case-hero-right dataoric-brief-preview">
            <div className="dataoric-brief-sheet">
              <span>{project.companyLabel ?? "Project"}</span>
              <strong>{project.summary}</strong>
              <small>{project.timeline}</small>
              <div className="dataoric-brief-rule" />
              <p>{project.role}</p>
            </div>
          </div>
        </div>

        <div className="case-divider" />

        {project.detailSections?.map((section) => (
          <div key={section.heading} className="case-section">
            <span className="case-kicker">{section.heading}</span>
            <h2 className="case-statement">{section.body[0]}</h2>
            {section.body.slice(1).map((paragraph) => (
              <p key={paragraph} className="case-body">
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        <div className="case-footer">
          <Link href="/play/corgi-take-home" className="case-footer-link">
            ← Previous — Corgi
          </Link>
          <Link href="/play/dyneti-take-home" className="case-footer-link">
            Next — Dyneti →
          </Link>
        </div>
      </div>
    </div>
  );
}
