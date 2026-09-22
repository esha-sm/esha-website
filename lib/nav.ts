export const SECTION_LINKS = [
  { id: "about", href: "#about", label: "About me" },
  { id: "play", href: "#play", label: "Play" },
  { id: "writings", href: "#writings", label: "Writings" },
  { id: "lab", href: "#lab", label: "Lab" },
] as const;

export const SECTION_HEADINGS = {
  about: "01. ABOUT",
  play: "02. PLAY",
  writings: "03. WRITINGS",
  lab: "04. LAB",
} as const;

export type SectionId = keyof typeof SECTION_HEADINGS;
