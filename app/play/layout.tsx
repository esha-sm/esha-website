import { SectionLayout } from "../components/SectionLayout";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="play-article-page">
      <SectionLayout active="play" hashPrefix="/">
        <article className="about-reference-article play-article">
          {children}
        </article>
      </SectionLayout>
    </div>
  );
}
