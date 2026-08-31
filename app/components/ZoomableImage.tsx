"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setScale(1);
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setScale((current) => Math.min(4, Math.max(1, Number((current + delta).toFixed(2)))));
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "+" || event.key === "=") zoomBy(0.25);
      if (event.key === "-" || event.key === "_") zoomBy(-0.25);
    };

    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("is-zooming");

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("is-zooming");
    };
  }, [open, close, zoomBy]);

  useEffect(() => {
    if (!open) return;
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 0.15 : -0.15);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, zoomBy]);

  return (
    <>
      <figure className="play-article-figure">
        <button
          type="button"
          className="play-article-zoom-trigger"
          onClick={() => {
            setScale(1);
            setOpen(true);
          }}
          aria-label={`Zoom ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            priority={priority}
          />
        </button>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>

      {open ? (
        <div className="play-article-zoom" role="dialog" aria-modal="true" aria-label={alt}>
          <div className="play-article-zoom-bar">
            <button type="button" onClick={() => zoomBy(-0.25)} aria-label="Zoom out">
              −
            </button>
            <button type="button" onClick={() => zoomBy(0.25)} aria-label="Zoom in">
              +
            </button>
            <span>{Math.round(scale * 100)}%</span>
            <button type="button" onClick={close}>
              Close
            </button>
          </div>
          <div ref={stageRef} className="play-article-zoom-stage">
            <img
              src={src}
              alt={alt}
              style={{ width: `${scale * 100}%` }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
