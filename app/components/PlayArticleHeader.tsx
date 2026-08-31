import Link from "next/link";
import { adjacentTakeHomes } from "@/lib/playProjects";

export function PlayArticleHeader({
  slug,
  title,
  meta,
  deck,
  logo,
  crumb,
  kicker = "WORK SAMPLE",
  compact = false,
}: {
  slug: string;
  title: string;
  meta?: string;
  deck?: string;
  logo?: string;
  crumb?: string;
  kicker?: string;
  compact?: boolean;
}) {
  const { prev, next } = adjacentTakeHomes(slug);
  const crumbLabel = crumb ?? title;

  return (
    <>
      <div className="about-reference-breadcrumb play-article-crumb">
        <span className="play-article-crumb-nav">
          {prev ? (
            <Link href={`/play/${prev.slug}`} aria-label="Previous">
              ‹
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/play/${next.slug}`} aria-label="Next">
              ›
            </Link>
          ) : (
            <span />
          )}
        </span>
        <a href="/#home">CONTENTS</a>
        <span>/</span>
        <a href="/#play">PLAY</a>
        <span>/</span>
        <strong>{crumbLabel}</strong>
      </div>

      {logo ? (
        <img src={logo} alt="" className="play-article-logo" />
      ) : null}

      {kicker || meta ? (
        <div className="play-article-banner">
          {kicker ? <span>{kicker}</span> : <span />}
          {meta ? <span>{meta}</span> : null}
        </div>
      ) : null}

      <h1 className={`play-article-title${compact ? " play-article-title--small" : ""}`}>
        {title}
      </h1>
      {deck ? <p className="play-article-deck">{deck}</p> : null}
    </>
  );
}
