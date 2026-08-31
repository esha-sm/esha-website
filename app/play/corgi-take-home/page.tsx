import Link from "next/link";
import { PlayArticleHeader } from "@/app/components/PlayArticleHeader";
import { adjacentTakeHomes, getPlayProject } from "@/lib/playProjects";

export default function CorgiTakeHome() {
  const project = getPlayProject("corgi-take-home");
  if (!project) return null;

  const { prev, next } = adjacentTakeHomes(project.slug);

  return (
    <>
      <PlayArticleHeader
        slug={project.slug}
        title="Corgi Work Sample"
        crumb="CORGI"
        logo="/corgi/corgi-logo.jpeg?v=2"
        kicker=""
        deck="Corgi is an AI insurance platform for technology companies."
        compact
      />

      <section className="play-article-block">
        <span className="play-article-kicker">The problem</span>
        <p>
          For their Strategy & Research take-home, I was asked to design a
          cyber insurance policy for a small-to-mid-sized business. The
          challenge was to create something that felt like a real policy
          while making practical decisions about coverage, limits, exclusions,
          and risk. They were looking for:
        </p>
        <ul className="play-article-list">
          <li>Clarity, is the policy easy to understand?</li>
          <li>Judgment, does the policy include the right details?</li>
          <li>Practicality, could a real company use this policy?</li>
          <li>
            Resourcefulness, does the policy use outside material intelligently?
          </li>
        </ul>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">What I did</span>
        <p>
          I researched existing cyber insurance policies and regulatory
          frameworks, then drafted a complete policy from the ground up. I
          defined the coverage, limits, exclusions, and conditions, and created
          a declarations page and sample insurance application. I also wrote a
          decision rationale explaining the reasoning and trade-offs behind the
          key choices I made.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">The work sample</span>
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>01</span>
          <strong>Cyber insurance policy</strong>
        </div>
        <p>
          You can view the cyber insurance policy{" "}
          <a href="/corgi/Insurance-policy.pdf" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </p>
        <div className="play-article-figure play-article-figure--frame">
          <iframe
            src="/corgi/Insurance-policy.pdf#page=1&view=FitH"
            title="Cyber insurance policy"
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
