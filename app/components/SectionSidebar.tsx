import { SECTION_HEADINGS, SECTION_LINKS, type SectionId } from "@/lib/nav";

export function SectionSidebar({
  active,
  hashPrefix = "",
}: {
  active: SectionId;
  hashPrefix?: string;
}) {
  return (
    <aside className="about-reference-sidebar">
      <a className="about-site-label" href={`${hashPrefix}#home`}>
        CONTENTS
      </a>
      <div className="about-sidebar-group">
        <span>{SECTION_HEADINGS[active]}</span>
        {SECTION_LINKS.map((link) => (
          <a
            key={link.id}
            className={active === link.id ? "is-active" : undefined}
            href={`${hashPrefix}${link.href}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
