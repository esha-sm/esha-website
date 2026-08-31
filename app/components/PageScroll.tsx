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

    const onWheel = (event: WheelEvent) => {
      const id = activeId();
      if (!id) return;
      if ((event.target as HTMLElement | null)?.closest(".sticky-note")) {
        return;
      }

      const section = document.getElementById(id);
      if (!section) return;

      const max = section.scrollHeight - section.clientHeight;
      if (max <= 0) return;

      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      if (event.deltaMode === 2) delta *= section.clientHeight;

      event.preventDefault();
      section.scrollTop = Math.min(max, Math.max(0, section.scrollTop + delta));
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("wheel", onWheel, { capture: true });
      root.classList.remove("is-page-scroll");
    };
  }, []);

  return null;
}
