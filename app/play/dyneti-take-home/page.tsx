import Link from "next/link";
import { PlayArticleHeader } from "@/app/components/PlayArticleHeader";
import { ZoomableImage } from "@/app/components/ZoomableImage";
import { adjacentTakeHomes, getPlayProject } from "@/lib/playProjects";

const classFiles = [
  {
    file: "good_original.txt",
    purpose: "Genuine original card photos",
  },
  { file: "bad_paper.txt", purpose: "Paper copies of a card" },
  { file: "bad_other.txt", purpose: "Other invalid or spoofed cards" },
  {
    file: "bad_paper_handwritten.txt",
    purpose: "Handwritten paper copies",
  },
  { file: "bad_paper_printed.txt", purpose: "Printed paper copies" },
  { file: "bad_recaptured.txt", purpose: "Photos of a photo or screen" },
  { file: "bad_physical.txt", purpose: "Physically altered cards" },
  { file: "bad_tape.txt", purpose: "Cards with tape or coverings" },
  { file: "unclear.txt", purpose: "Too unclear to classify" },
  {
    file: "unclear_recaptured.txt",
    purpose: "Unclear recaptured images",
  },
];

const sampleIds = [
  "00001916-5fd1-4802-8db5-1fc5b9b7e9f5-0",
  "00027b57-9f61-44fd-b6cb-3ab1e9d1a7b9-0",
  "000379c0-4938-469e-bd7a-df003c0fe059-0",
];

export default function DynetiTakeHome() {
  const project = getPlayProject("dyneti-take-home");
  if (!project) return null;

  const { prev, next } = adjacentTakeHomes(project.slug);

  return (
    <>
      <PlayArticleHeader
        slug={project.slug}
        title="Dyneti Work Sample"
        crumb="DYNETI"
        logo="/dyneti/dyneti-logo.png"
        kicker=""
        deck="Dyneti is an AI card scanning company for checkout and fraud prevention."
        compact
      />

      <section className="play-article-block">
        <span className="play-article-kicker">The problem</span>
        <p>
          Dyneti is an AI card scanning company for checkout and fraud
          prevention. Its models needed reliable card image data they could
          train on.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">What I did</span>
        <p>
          I worked with a batch of raw card images in <code>.jpg</code> and
          organized their IDs into the expected file structure. The labeled
          output I submitted was a set of <code>.txt</code> files, one file
          per class, each listing the raw <code>.jpg</code> image IDs that
          belonged in it.
        </p>
      </section>

      <section className="play-article-block">
        <span className="play-article-kicker">The work sample</span>
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>01</span>
          <strong>Raw input</strong>
        </div>
        <p>The unlabeled batch as it was given: raw card image files.</p>
        <ZoomableImage
          src="/dyneti/dyneti-dataset-preview.png?v=2"
          alt="Unlabeled batch of card images as provided"
          width={1200}
          height={740}
          priority
        />
        <ZoomableImage
          src="/dyneti/dyneti-example.png"
          alt="Unprocessed card image"
          width={1200}
          height={740}
          caption="Raw card images as they were given"
        />
      </section>

      <section className="play-article-sample">
        <div className="play-article-sample-heading">
          <span>02</span>
          <strong>Labeled output</strong>
        </div>
        <p>
          What I submitted: text files matching Dyneti&apos;s expected file
          structure. Each <code>.txt</code> file is a class. I sorted the
          raw image IDs into <code>good_original.txt</code> for genuine cards,
          the <code>bad_</code> files for paper copies, recaptures, and tape,
          and the <code>unclear</code> files for images classified as unclear.
        </p>
        <div className="play-article-transform">
          <div>
            <p className="play-article-caption">Raw input - card images</p>
            <div className="play-article-transform-from">
              <pre className="play-article-txt">
                {`${sampleIds.join("\n")}\n…`}
              </pre>
              <span className="play-article-transform-arrow" aria-hidden>
                →
              </span>
            </div>
          </div>
          <div>
            <p className="play-article-caption">
              Finished product - labeled files
            </p>
            <ul className="play-article-class-list">
              {classFiles.map((item) => (
                <li key={item.file}>
                  <code>{item.file}</code>
                  <span>{item.purpose}</span>
                </li>
              ))}
            </ul>
          </div>
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
