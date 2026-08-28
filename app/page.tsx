"use client";

import { useState } from "react";

export default function Home() {
  // playProjects moved to /lib/playProjects.ts
  // keep a local fallback if import fails
  let playProjectsLocal = [] as any[];
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("../lib/playProjects");
    playProjectsLocal = mod.playProjects || [];
  } catch (e) {
    playProjectsLocal = [];
  }

  const substackUrl =
    "https://substack.com/home/post/p-206762963";

  const featuredProjects = playProjectsLocal.filter(
    (project) => !project.slug.includes("take-home")
  );

  const takeHomeProjects = playProjectsLocal.filter(
    (project) => project.slug.includes("take-home")
  );

  const [showArticleReader, setShowArticleReader] =
    useState(false);

  const scrollToHome = () => {
    scrollToSection("home");
  };

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <main id="home" className="home">
        <div className="plain-index">
          <header className="plain-index-header">
            <span>ESHA MITTAL</span>
            <span>PORTFOLIO / 2026</span>
          </header>

          <div className="plain-index-intro">
            <h1>Hi, I&apos;m Esha.</h1>
            <p>Strategy, data, research, and the work of figuring things out.</p>
          </div>

          <nav className="plain-index-grid" aria-label="Portfolio sections">
            <div className="plain-index-group">
              <h2>01. ABOUT</h2>
              <a href="#about">About me <span>→</span></a>
              <a href="#contact">Contact <span>→</span></a>
            </div>
            <div className="plain-index-group">
              <h2>02. WORK</h2>
              <a href="#play">Projects &amp; experiments <span>→</span></a>
            </div>
            <div className="plain-index-group">
              <h2>03. NOTES</h2>
              <a href="#writings">Writings <span>→</span></a>
            </div>
          </nav>

          <footer className="plain-index-footer">
            <span>San Francisco, CA</span>
            <span>UPDATED AUG 2026</span>
          </footer>
        </div>

      </main>


      {/* =========================
          ABOUT
      ========================= */}

      <section
        id="about"
        className="about-section"
      >
        <div className="about-reference-layout">
          <aside className="about-reference-sidebar">
            <a className="about-site-label" href="#home">ESHA MITTAL</a>
            <div className="about-sidebar-group">
              <span>01. ABOUT</span>
              <a className="is-active" href="#about">About me</a>
              <a href="#play">Work &amp; experiments</a>
              <a href="#writings">Writings</a>
              <a href="#contact">Contact</a>
            </div>
            <button
              type="button"
              className="section-home-button about-index-back"
              onClick={scrollToHome}
              aria-label="Return to the index"
            >
              &larr; back to index
            </button>
          </aside>

          <article className="about-reference-article">
            <div className="about-reference-breadcrumb">
              <span>ABOUT</span>
              <span>/</span>
              <strong>WHO IS ESHA?</strong>
            </div>

            <header className="about-reference-header">
              <span>FIELD NOTE 01 / 2026</span>
              <h2>About me</h2>
              <p>Strategy, data, research, and the work of figuring things out.</p>
              <span className="about-reference-rule">------</span>
            </header>

            <div className="about-copy">

            <p>
              I recently graduated from Arizona State University. Most recently, I worked on expansion strategy at <a href="https://www.wearewarp.com/" target="_blank" rel="noreferrer" className="about-highlight">Warp</a>.
            </p>

            <p>
              Before that, I worked on automating data workflows at <a href="https://spx.com/" target="_blank" rel="noreferrer" className="about-highlight">SPX</a> and evaluated early-stage companies and investment opportunities at a VC firm, contributing to a $1.5M funding round.
            </p>

            <p>
              I also spent time doing neuroscience research, studying whether variations in a bitter taste receptor gene could be connected to late-onset Alzheimer&apos;s disease and schizophrenia, and received an <a href="https://sols.asu.edu/research/solur/symposium" target="_blank" rel="noreferrer" className="about-highlight">Honorable Mention</a> for the work at ASU&apos;s Undergraduate Research Poster Symposium.
            </p>

            <p>
              I&apos;m insanely fascinated by the brain.. how something so complex can produce memory, emotion, movement, and everything in between. I also have a pretty bad habit of not leaving unsolved problems alone; if something doesn&apos;t make sense to me, I keep digging until I figure it out.
            </p>

            <p>
              I was also selected as an AI/ML Fellow through Cornell Tech&apos;s <a href="https://tech.cornell.edu/impact/break-through-tech/" target="_blank" rel="noreferrer" className="about-highlight">Break Through Tech AI Program</a>.
            </p>

            <h3>Outside of work</h3>

            <p>
              <span className="about-highlight">Music</span> has been a huge part of my life. I sing, play instruments, and have been around music for as long as I can remember.
            </p>

            <p>
              I&apos;m also trained in Indian classical singing. And when I&apos;m not doing either of those, there&apos;s a good chance I&apos;m <span className="about-highlight">coloring</span>.
            </p>

            <p>
              So, basically, I spend my time either overthinking something or coloring it in.
            </p>
            </div>

            <div className="about-reference-footer">
              <span>ESHA MITTAL / SAN FRANCISCO</span>
              <span>SCROLL TO READ</span>
            </div>
          </article>
        </div>

        <button
          type="button"
          className="section-next-button"
          onClick={() => scrollToSection("play")}
        >
          Play <span aria-hidden="true">&rarr;</span>
        </button>
      </section>


      {/* =========================
          PLAY
      ========================= */}

      <section
        id="play"
        className="play-section"
      >
        <div className="section-ipod-nav section-ipod-nav--inside" aria-label="Home navigation">
          <button
            type="button"
            className="section-home-button"
            onClick={scrollToHome}
            aria-label="Return to the iPod home"
          >
            <span aria-hidden="true">&larr;</span> back to index
          </button>
        </div>

        <div className="play-top">
          <span className="section-number">02 / PLAY</span>

          <h2>A collection of experiments, projects, work samples, and more.</h2>

          <p className="play-subtitle">
            
          </p>
      </div>

        <div className="play-project-list">
          {featuredProjects.map((project, index) => {
            const linkedProject = project.url && project.url !== "#";
            const projectContent = (
              <>
                <div className="play-project-heading">
                  <span className="play-project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{project.title}</h3>
                </div>

                <p>{project.summary}</p>
              </>
            );

            return linkedProject ? (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="play-project-item"
              >
                {projectContent}
              </a>
            ) : (
              <div key={project.slug} className="play-project-item">
                {projectContent}
              </div>
            );
          })}
        </div>

        <div className="recently-published">
          <span>
            WORK SAMPLES
          </span>

          <span>
            ↓
          </span>
        </div>

        {takeHomeProjects.map((project, idx) => (
          <a
            key={project.slug}
            href={`/play/${project.slug}`}
            className="mini-project-row"
          >
            <div className="mini-project-meta">
              <span className="mini-project-number">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="mini-project-copy">
                <span className="mini-project-title">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt=""
                      className="mini-project-logo"
                    />
                  )}

                  <span>
                    {project.companyLabel || project.title}
                  </span>

                  {project.yc && (
                    <span className="company-yc">
                      (YC {project.yc})
                    </span>
                  )}
                </span>
              </div>
            </div>

            <span
              className="mini-project-arrow"
              aria-label={`Open ${project.title}`}
            >
              ↗
            </span>
          </a>
        ))}

        <button
          type="button"
          className="section-next-button"
          onClick={() => scrollToSection("writings")}
        >
          Writings <span aria-hidden="true">&rarr;</span>
        </button>
      </section>


      {/* =========================
          WRITINGS
      ========================= */}

      <section
        id="writings"
        className="writings-section"
      >
        <div className="section-ipod-nav section-ipod-nav--inside" aria-label="Home navigation">
          <button
            type="button"
            className="section-home-button"
            onClick={scrollToHome}
            aria-label="Return to the iPod home"
          >
            <span aria-hidden="true">&larr;</span> back to index
          </button>
        </div>


        {/* WRITINGS INTRO */}

        <div className="writings-top">

          <span className="section-number">
            03 / WRITINGS
          </span>


          
          
          
        </div>


        {/* RECENTLY PUBLISHED */}

        <div className="recently-published">

          <span>
            RECENTLY PUBLISHED
          </span>

          <span>
            ↓
          </span>

        </div>


        {/* =========================
            ARTICLE 01
        ========================= */}

        <a
          href={substackUrl}
          rel="noopener noreferrer"
          className="article-card"
          onClick={(event) => {
            event.preventDefault();
            setShowArticleReader(true);
          }}
        >

          <div className="article-top">

            <span>
              01
            </span>

            <span>
              SUBSTACK
            </span>

          </div>


          <div className="article-content">

            <h3>
              Everyone Told Me My Twenties Would Bring Clarity.
            </h3>

            <p>
              A small reflection on not having it all figured out.
            </p>

          </div>


          <div className="article-bottom">

            <span>
              READ ARTICLE
            </span>

            <span className="article-arrow">
              ↗
            </span>

          </div>

        </a>

        {showArticleReader && (
          <div
            className="article-reader-backdrop"
            onClick={() => setShowArticleReader(false)}
          >
            <div
              className="article-reader"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="article-reader-header">
                <button
                  type="button"
                  onClick={() => setShowArticleReader(false)}
                >
                  Close
                </button>
              </div>

              <div className="article-reader-body">
                <span className="reader-kicker">
                  SUBSTACK
                </span>

                <h3>
                  Everyone Told Me My Twenties Would Bring Clarity.
                </h3>

                <p>
                   A small reflection on not having it all figured out.
                </p>

                <a
                  href={substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reader-link"
                >
                  Read on Substack
                </a>
              </div>
            </div>
          </div>
        )}


        {/* =========================
            COMING SOON
        ========================= */}

        <div className="article-card writing-coming-soon">
          <div className="article-top">
            <span>
              02
            </span>

            <span>
              &nbsp;
            </span>
          </div>

          <div className="article-content">
            <h3>
              more coming soon..
            </h3>
          </div>
        </div>

        <button
          type="button"
          className="section-next-button"
          onClick={() => scrollToSection("contact")}
        >
          Contact <span aria-hidden="true">&rarr;</span>
        </button>

      </section>


      {/* =========================
          CONTACT
      ========================= */}

      <section
        id="contact"
        className="portfolio-section"
      >
        <div className="section-ipod-nav section-ipod-nav--inside" aria-label="Home navigation">
          <button
            type="button"
            className="section-home-button"
            onClick={scrollToHome}
            aria-label="Return to the iPod home"
          >
            <span aria-hidden="true">&larr;</span> back to index
          </button>
        </div>

        <div className="contact-content">
          <span className="section-number">04 / CONTACT</span>

          <h2>Let&apos;s chat!</h2>

          <p>
            I&apos;m currently looking for what&apos;s next. If you&apos;d like to talk about the brain, data, tech, startups, or an interesting problem, I&apos;d love to hear from you.
          </p>

          <div className="contact-links" aria-label="Contact links">
            <a href="mailto:emittal@asu.edu" aria-label="Email Esha">
              <span className="contact-link-mark">
                <img src="https://cdn.simpleicons.org/gmail" alt="" />
              </span>
              <span>Email</span>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <span className="contact-link-mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45z" />
                </svg>
              </span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://substack.com/@eshamittall"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Substack"
            >
              <span className="contact-link-mark">
                <img src="https://cdn.simpleicons.org/substack" alt="" />
              </span>
              <span>Substack</span>
            </a>

            <a
              href="https://github.com/esha-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <span className="contact-link-mark">
                <img src="https://cdn.simpleicons.org/github" alt="" />
              </span>
              <span>GitHub</span>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <span className="contact-link-mark">
                <img src="https://cdn.simpleicons.org/x" alt="" />
              </span>
              <span>X</span>
            </a>
          </div>
        </div>

      </section>

    </>
  );
}