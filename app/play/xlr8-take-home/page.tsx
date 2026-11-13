import Link from "next/link";
import { PlayArticleHeader } from "@/app/components/PlayArticleHeader";
import { adjacentTakeHomes, getPlayProject } from "@/lib/playProjects";

export default function Xlr8TakeHome() {
  const project = getPlayProject("xlr8-take-home");
  if (!project) return null;

  const { prev, next } = adjacentTakeHomes(project.slug);

  return (
    <>
      <PlayArticleHeader
        slug={project.slug}
        title="XLR8 AI Work Sample"
        crumb="XLR8 AI"
        logo="/xlr8/xlr8-logo.png"
        kicker=""
        deck="XLR8 AI is a generative engine optimization platform. It tracks how brands show up in AI search answers and exposes the citation sources sitting behind them."
        compact
      />

      <section className="play-article-block">
        <span className="play-article-kicker">The problem</span>
        <p>
          For their AI Search Strategist take-home, I was asked to take a real
          client from onboarding through a structured three-month GEO
          engagement, using the same platform and data the role uses day to day.
          I picked Fulton &amp; Roark. The rule was that every action had to
          trace back to something in the citation data. They were looking for:
        </p>
        <ul className="play-article-list">
          <li>
            Presentation, would the kickoff hold up in front of a real account?
          </li>
          <li>
            Client management, does the communication structure actually keep a
            client informed and confident?
          </li>
          <li>
            Strategy and data, is the sequencing defensible and tied to what the
            data shows?
          </li>
          <li>
            Execution management, does the plan route work realistically between
            automation, engineering, and specialists?
          </li>
        </ul>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">What I did</span>
        <p>
          I connected to the XLR8 AI platform over MCP and worked through the
          experiment data from the chat interface, reading which queries Fulton
          &amp; Roark were invisible on, who was being cited in their place, and
          which domains and content formats the models kept pulling from in that
          category. That diagnosis decided which gaps were worth closing, and
          everything downstream points back to it.
        </p>
        <p>
          From there I built the engagement itself: measurable goals for the end
          of each month, a twelve-week sprint structure where every task names
          the visibility gap it addresses and who executes it, a weekly meeting
          cadence, and the attribution model I would report against.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">The work sample</span>
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>01</span>
          <strong>Three-month execution plan</strong>
        </div>
        <p>
          The central deliverable, built across four tabs: monthly goals, the
          full twelve-week timeline with task-level detail down to owner and
          scheduled week, the client communication cadence, and attribution and
          tracking. You can download it{" "}
          <a href="/xlr8/XLR8-GEO-plan.xlsx" download>
            here
          </a>
          .
        </p>
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>02</span>
          <strong>Write-up</strong>
        </div>
        <p>
          A short, plain-language walk through how I read the data, why the plan
          is ordered the way it is, how I would run the account week to week,
          and what I would flag to the client and when. You can read it{" "}
          <a href="/xlr8/XLR8-write-up.pdf" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
        <div className="play-article-figure play-article-figure--frame">
          <iframe
            src="/xlr8/XLR8-write-up.pdf#page=1&view=FitH"
            title="XLR8 AI write-up"
          />
        </div>
      </section>

      <nav className="play-article-pager">
        {prev ? (
          <Link href={`/play/${prev.slug}`}>
            ← {prev.companyLabel || prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/play/${next.slug}`}>
            {next.companyLabel || next.title} →
          </Link>
        ) : null}
      </nav>
    </>
  );
}
