"use client";

import { useEffect } from "react";

const SECTION_IDS = ["about", "play", "writings"] as const;

export function PageScroll() {
  useEffect(() => {
    const root = document.documentElement;

    const activeId = () => {
      const hash = window.location.hash.slice(1);
      return SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])
        ? hash
        : null;
    };

    const sync = () => {
      const id = activeId();
      root.classList.toggle("is-page-scroll", Boolean(id));
      for (const sectionId of SECTION_IDS) {
        if (sectionId === id) continue;
        const section = document.getElementById(sectionId);
        if (section) section.scrollTop = 0;
      }
    };

    sync();
    window.addEventListener("hashchange", sync);

    return () => {
      window.removeEventListener("hashchange", sync);
      root.classList.remove("is-page-scroll");
    };
  }, []);

  return null;
}
