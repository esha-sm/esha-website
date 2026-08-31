import Link from "next/link";
import { PlayArticleHeader } from "@/app/components/PlayArticleHeader";
import { adjacentTakeHomes, getPlayProject } from "@/lib/playProjects";

const introductions = [
  {
    name: "Dyneti",
    logo: "/dyneti/dyneti-logo.png",
    line: "AI card scanning",
  },
  {
    name: "Supermemory",
    logo: "/corgi/datoric/supermemory-logo.png",
    line: "Memory for AI agents",
  },
];

export default function DataoricTakeHome() {
  const project = getPlayProject("dataoric-take-home");
  if (!project) return null;

  const { prev, next } = adjacentTakeHomes(project.slug);

  return (
    <>
      <PlayArticleHeader
        slug={project.slug}
        title="Datoric Work Sample"
        crumb="DATORIC"
        logo="/corgi/datoric/datoric-logo.png"
        kicker=""
        deck="Datoric, previously Arzule (YC S26). Arzule is a B2B partnership intelligence platform that provides ongoing research and reports for companies. They have since pivoted to custom training data for AI models."
        compact
      />

      <section className="play-article-block">
        <span className="play-article-kicker">The problem</span>
        <p>
          Arzule wanted to grow its customer base through warm introductions
          to B2B SaaS companies. The challenge was finding companies that were
          a strong fit and had a real reason to explore Arzule.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">What I did</span>
        <p>
          I started with people and companies already in my network, then
          researched their products, partnerships, and growth teams to see
          where Arzule could actually be useful. From there, I narrowed it
          down to the strongest opportunities and reached out to gauge
          interest before making an introduction.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">The work sample</span>
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>01</span>
          <strong>Warm introductions</strong>
        </div>
        <p>
          I ultimately introduced Arzule to Dyneti and Supermemory. For each
          company, I documented why I thought they were a good fit, who I
          approached, the context behind the relationship, and how I
          introduced Arzule into the conversation.
        </p>
        <div className="play-article-pair">
          {introductions.map((company) => (
            <div key={company.name} className="play-article-intro">
              <img src={company.logo} alt="" />
              <strong>{company.name}</strong>
              <span>{company.line}</span>
            </div>
          ))}
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
