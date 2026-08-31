"use client";

import { useEffect, useState, type ReactNode } from "react";

const TITLE = "ABOUT ME";

export function AboutIntro({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setShown(TITLE);
      setDone(true);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;
    let started = false;
    let index = 0;

    const typeNext = () => {
      if (cancelled) return;
      index += 1;
      setShown(TITLE.slice(0, index));
      if (index < TITLE.length) {
        timeoutId = window.setTimeout(typeNext, 72);
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setDone(true);
        }, 320);
      }
    };

    const start = () => {
      if (started || cancelled) return;
      if (window.location.hash !== "#about") return;
      started = true;
      timeoutId = window.setTimeout(typeNext, 180);
    };

    start();
    window.addEventListener("hashchange", start);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("hashchange", start);
    };
  }, []);

  return (
    <>
      <h2 className="about-me-title" aria-label={TITLE}>
        {shown}
        <span
          className={`about-me-cursor${done ? " is-done" : ""}`}
          aria-hidden="true"
        />
      </h2>
      <div
        className={`about-intro-body${done ? " is-in" : ""}`}
        aria-hidden={!done}
      >
        {children}
      </div>
    </>
  );
}
