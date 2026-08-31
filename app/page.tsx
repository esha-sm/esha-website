"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLayout } from "./components/SectionLayout";
import { AboutIntro } from "./components/AboutIntro";
import { AboutStickyNote } from "./components/AboutStickyNote";
import { PageScroll } from "./components/PageScroll";
import { playProjects } from "../lib/playProjects";

export default function Home() {
  const substackUrl = "https://substack.com/home/post/p-206762963";
  const featuredProjects = playProjects.filter(
    (project) => !project.slug.includes("take-home")
  );
  const takeHomeProjects = playProjects.filter((project) =>
    project.slug.includes("take-home")
  );

  const [showArticleReader, setShowArticleReader] =
    useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const bookAudioCtxRef = useRef<AudioContext | null>(null);
  const bookSoundBufferRef = useRef<AudioBuffer | null>(null);
  const bookFallbackRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    bookAudioCtxRef.current = ctx;

    fetch("/sounds/mixkit-pen-click-and-release-1115.wav")
      .then((response) => response.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        bookSoundBufferRef.current = buffer;
      })
      .catch(() => {});

    return () => {
      void ctx.close();
    };
  }, []);

  const playBookSound = () => {
    const ctx = bookAudioCtxRef.current;
    const buffer = bookSoundBufferRef.current;

    if (ctx && buffer) {
      const start = () => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      };

      if (ctx.state === "suspended") {
        void ctx.resume().then(start);
      } else {
        start();
      }
      return;
    }

    const fallback = bookFallbackRef.current;
    if (!fallback) return;
    fallback.currentTime = 0;
    void fallback.play();
  };

  return (
    <>
      <PageScroll />
      <main id="home" className="home">
        <audio
          ref={bookFallbackRef}
          src="/sounds/mixkit-pen-click-and-release-1115.wav"
          preload="auto"
          hidden
        />
        <div className="book-stage">
          <div className={`open-book ${isBookOpen ? "is-open" : "is-closed"}`} aria-label="Portfolio index">
          <section className="book-page book-page--title">
            <div className="book-page-topline">
          
            </div>

            <div className="book-title-content">
              <h2>Hi, I&apos;m Esha.</h2>
              <p>Welcome to my little space. Have fun</p>
            </div>

            <div className="book-page-footer">
              <span>San Francisco, CA</span>
              <span>ESHA MITTAL</span>
            </div>
          </section>

          <section className="book-page book-page--index">
            <div className="book-page-topline">
            
            </div>

            <div className="book-page-heading">
              <span>CONTENTS</span>
            </div>

            <nav className="book-index-list" aria-label="Portfolio sections">
              <a href="#about"><span>01</span><strong>About</strong><i>→</i></a>
              <a href="#play"><span>02</span><strong>Play</strong><i>→</i></a>
              <a href="#writings"><span>03</span><strong>Writings</strong><i>→</i></a>
            </nav>

            <div className="book-page-footer">
              
              <span>UPDATED AUG 2026</span>
            </div>
          </section>
        </div>
          <button
            type="button"
            className="book-toggle"
            onClick={() => {
              playBookSound();
              setIsBookOpen((open) => !open);
            }}
            aria-expanded={isBookOpen}
            aria-label={isBookOpen ? "Flip book closed" : "Flip book open"}
          >
            <span>FLIP</span>
            <strong aria-hidden="true">{isBookOpen ? "‹" : "›"}</strong>
          </button>
        </div>

      </main>


      {/* =========================
          ABOUT
      ========================= */}

      <section
        id="about"
        className="about-section"
      >
        <SectionLayout active="about">

          <article className="about-reference-article">
            <div className="about-reference-breadcrumb">
              <span>CONTENTS</span>
              <span>/</span>
              <strong>ABOUT ME</strong>
            </div>

            <AboutIntro>
            <div className="about-copy">

            <p>
              I recently graduated from Arizona State University. Most recently, I worked on expansion strategy at <a href="https://www.wearewarp.com/" target="_blank" rel="noreferrer" className="about-highlight">Warp</a>.
            </p>

            <p>
              Before that, I worked on automating data workflows at <a href="https://spx.com/" target="_blank" rel="noreferrer" className="about-highlight">SPX</a> and evaluated early-stage companies and investment opportunities at a VC firm, contributing to a $1.5M funding round for a biotech startup.
            </p>

            <p>
              I also spent time doing <a href="https://sols.asu.edu/" target="_blank" rel="noreferrer" className="about-highlight">neuroscience research</a> at Arizona State University, studying whether TAS2R38 gene variations were associated with late-onset Alzheimer&apos;s disease and schizophrenia. I received an <a href="https://sols.asu.edu/research/solur/symposium" target="_blank" rel="noreferrer" className="about-highlight">Honorable Mention Award</a> in Neuroscience at the 30th Annual Undergraduate Research Poster Symposium.
            </p>

            <p>
              I&apos;m insanely fascinated by the brain. I also have a pretty bad habit of not leaving unsolved problems alone; if something doesn&apos;t make sense to me, I keep digging until I figure it out.
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
            </div>

            <div className="contact-content">
              <p>
                I&apos;m looking for what&apos;s next. If you want to talk about the brain, tech, or an interesting problem, write to me.
              </p>
              <div className="contact-links" aria-label="Contact links">
                <a href="mailto:emittal@asu.edu">Email</a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://substack.com/@eshamittall"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Substack
                </a>
                <a
                  href="https://github.com/esha-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>
            </div>
            </AboutIntro>
          </article>
        </SectionLayout>
        <AboutStickyNote />
      </section>


      {/* =========================
          PLAY
      ========================= */}

      <section
        id="play"
        className="play-section"
      >
        <SectionLayout active="play">

          <article className="about-reference-article">
            <div className="about-reference-breadcrumb">
              <span>CONTENTS</span>
              <span>/</span>
              <strong>PLAY</strong>
            </div>

            <div className="recently-published">
              <span>PROJECTS</span>
              <span>↓</span>
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
              <span>WORK SAMPLES</span>
              <span>↓</span>
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
                  <span className="mini-project-title">
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt=""
                        className="mini-project-logo"
                      />
                    )}
                    <span>{project.companyLabel || project.title}</span>
                    {project.yc && (
                      <span className="company-yc">(YC {project.yc})</span>
                    )}
                  </span>
                </div>
                <span
                  className="mini-project-arrow"
                  aria-label={`Open ${project.companyLabel || project.title}`}
                >
                  ↗
                </span>
              </a>
            ))}
          </article>
        </SectionLayout>
      </section>


      {/* =========================
          WRITINGS
      ========================= */}

      <section
        id="writings"
        className="writings-section"
      >
        <SectionLayout active="writings">

          <article className="about-reference-article">
            <div className="about-reference-breadcrumb">
              <span>CONTENTS</span>
              <span>/</span>
              <strong>WRITINGS</strong>
            </div>

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
              more soon.
            </h3>
          </div>
        </div>
          </article>
        </SectionLayout>
      </section>


    </>
  );
}