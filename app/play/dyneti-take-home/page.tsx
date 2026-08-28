"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { playProjects } from "@/lib/playProjects";

export default function DynetiTakeHome() {
  const [expanded, setExpanded] = useState(false);
  const project = playProjects.find((item) => item.slug === "dyneti-take-home");

  const handleBackHome = () => {
    window.location.href = "/#play";
  };

  if (!project) return null;

  const detailCard = project.detailCard;
  const meta = detailCard?.meta ?? {
    type: "Take-home Assignment",
    domain: "Product",
    task: "Strategy",
    date: project.timeline,
    tools: "Research",
  };

  return (
    <div className="case-backdrop">
      <div className={`case-modal ${expanded ? "case-modal-expanded" : ""}`}>
        <div className="case-topbar">
          <button type="button" className="case-icon-btn" aria-label="Back home" onClick={handleBackHome}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="case-icon-btn"
            aria-label="Expand"
            onClick={() => setExpanded((value) => !value)}
          >
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
                  <img src={project.logo} alt="" width={32} height={32} />
                ) : (
                  <Image src="/dyneti/dyneti-logo.png" alt="" width={32} height={32} />
                )}
              </div>

              <h1 className="case-title">{project.companyLabel ?? project.title}</h1>
            </div>

            <p className="case-summary">
              <em>{project.summary}</em>
            </p>

            <p className="case-desc">{project.description}</p>

            <div className="case-meta-grid">
              <div className="case-meta-item">
                <span>Timeline</span>
                <p>{project.timeline}</p>
              </div>
              <div className="case-meta-item">
                <span>Task</span>
                <p>{meta.task}</p>
              </div>
              <div className="case-meta-item">
                <span>Type</span>
                <p>{meta.type}</p>
              </div>
              <div className="case-meta-item">
                <span>Domain</span>
                <p>{meta.domain}</p>
              </div>
            </div>
          </div>

          <div className="case-hero-right">
            <Image
              src="/dyneti/dyneti-dataset-preview.png?v=2"
              alt="Project overview"
              fill
              unoptimized
              className="case-hero-img"
            />
          </div>
        </div>

        <div className="case-divider" />

        {project.detailSections?.map((section, index) => (
          <div key={section.heading} className="case-section">
            <span className="case-kicker">{index === 0 ? "Context" : section.heading}</span>
            <h2 className="case-statement">{section.body[0]}</h2>
            {section.body.slice(1).map((paragraph) => (
              <p key={paragraph} className="case-body">
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        {detailCard && (
          <div className="case-section case-example-section">
            <span className="case-kicker">Project files</span>
            <h2 className="case-statement">{meta.task}</h2>
            <div className="case-image-pair">
              <div className="case-panel-img">
                <div className="case-panel-img-label">Included files</div>
                <ul className="case-filelist">
                  {(detailCard.files ?? []).map((file) => (
                    <li key={file}>{file}</li>
                  ))}
                </ul>
              </div>

              <div className="case-panel-img">
                <div className="case-panel-img-label">Labeled output</div>
                <ul className="case-tree-list">
                  {(detailCard.labeledFiles ?? []).map((file) => (
                    <li key={file}>{file}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="case-footer">
          <Link href="/play/edge-case-detection" className="case-footer-link">
            ← Previous — Edge Case Detection
          </Link>
          <Link href="/play/corgi-take-home" className="case-footer-link">
            Next — Corgi →
          </Link>
        </div>
      </div>
    </div>
  );
}
