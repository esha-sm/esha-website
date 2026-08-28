"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { playProjects } from "@/lib/playProjects";

export default function CorgiTakeHome() {
  const [expanded, setExpanded] = useState(false);
  const project = playProjects.find((item) => item.slug === "corgi-take-home");

  const handleBackHome = () => {
    window.location.href = "/#play";
  };

  if (!project) return null;

  return (
    <div className="case-backdrop">
      <div className={`case-modal ${expanded ? "case-modal-expanded" : ""}`}>
        <div className="case-topbar">
          <button type="button" className="case-icon-btn" aria-label="Back home" onClick={handleBackHome}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="case-icon-btn" aria-label="Expand" onClick={() => setExpanded((value) => !value)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="case-hero">
          <div className="case-hero-left">
            <div className="case-brand">
              <div className="case-logo">
                {project.logo ? (
                  <img src={project.logo} alt="" width={40} height={40} />
                ) : (
                  <Image src="/corgi/corgi-logo.jpeg" alt="" width={40} height={40} />
                )}
              </div>
              <h1 className="case-title">{project.companyLabel ?? project.title}</h1>
            </div>

            <p className="case-desc">{project.description}</p>

            <div className="case-meta-grid">
              <div className="case-meta-item"><span>Timeline</span><p>{project.timeline}</p></div>
              <div className="case-meta-item"><span>Role</span><p>{project.role}</p></div>
              <div className="case-meta-item"><span>Type</span><p>{project.type ?? "Take-home Assignment"}</p></div>
              <div className="case-meta-item"><span>Summary</span><p>{project.summary}</p></div>
            </div>
          </div>

          <div className="case-hero-right corgi-policy-preview">
            <iframe src="/corgi/Insurance-policy.pdf#page=1&view=FitH" title="Cyber insurance policy preview" />
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
          <Link href="/play/dyneti-take-home" className="case-footer-link">
            ← Previous — Dyneti
          </Link>
          <Link href="/play/dataoric-take-home" className="case-footer-link">
            Next — Datoric →
          </Link>
        </div>
      </div>
    </div>
  );
}
