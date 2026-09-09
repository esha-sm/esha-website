"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "America/Los_Angeles";
const PLACE = "San Francisco, California";

function readClock(now: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(now)
    .toLowerCase()
    .replace(/\s/g, "");

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).format(now)
  );

  return {
    time,
    isDay: hour >= 6 && hour < 18,
  };
}

export function LocalTime() {
  const [clock, setClock] = useState<{ time: string; isDay: boolean } | null>(
    null
  );

  useEffect(() => {
    const tick = () => setClock(readClock(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!clock) {
    return (
      <span className="local-time" aria-hidden="true">
        San Francisco, California
      </span>
    );
  }

  return (
    <span className="local-time" aria-live="polite">
      {clock.time} in {PLACE} {clock.isDay ? "☀️" : "🌙"}
    </span>
  );
}
