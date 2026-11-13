"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const neuronBranches = [
  "M150 150 C136 144, 122 130, 108 116 C92 102, 80 90, 68 74",
  "M150 150 C134 152, 120 160, 102 172 C88 182, 72 190, 58 202",
  "M150 150 C130 146, 116 152, 96 168 C80 180, 64 190, 42 198",
  "M150 150 C144 128, 136 112, 122 96 C110 82, 102 66, 94 48",
  "M150 150 C164 134, 176 124, 194 116 C214 106, 234 92, 256 76",
  "M150 150 C170 144, 184 134, 208 122 C234 108, 260 100, 292 92",
  "M150 150 C168 158, 186 170, 206 184 C228 198, 246 212, 272 220",
  "M150 150 C172 150, 192 146, 218 138 C244 130, 268 126, 310 124",
  "M150 150 C160 122, 174 102, 194 88 C220 70, 244 56, 266 32",
  "M150 150 C164 166, 182 182, 202 198 C222 214, 240 224, 258 238",
] as const;

const neuronTips = [
  { x: 68, y: 74, r: 2.2 },
  { x: 58, y: 202, r: 2.2 },
  { x: 42, y: 198, r: 2.1 },
  { x: 94, y: 48, r: 2.2 },
  { x: 256, y: 76, r: 2.2 },
  { x: 292, y: 92, r: 2.2 },
  { x: 272, y: 220, r: 2.2 },
  { x: 310, y: 124, r: 2.2 },
  { x: 266, y: 32, r: 2.2 },
  { x: 258, y: 238, r: 2.2 },
] as const;

export function LabNeuronPulse() {
  const [isFiring, setIsFiring] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playFireSound = useCallback(() => {
    const AudioCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtor) return;

    const ctx = audioCtxRef.current ?? new AudioCtor();
    audioCtxRef.current = ctx;

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(190, now);
    oscillator.frequency.exponentialRampToValueAtTime(46, now + 0.18);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.18);
  }, []);

  useEffect(() => {
    if (!isFiring) return;

    const timer = window.setTimeout(() => setIsFiring(false), 900);
    return () => window.clearTimeout(timer);
  }, [isFiring]);

  useEffect(
    () => () => {
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
      }
    },
    []
  );

  return (
    <button
      type="button"
      className={`lab-neuron-panel${isFiring ? " is-firing" : ""}`}
      onClick={() => {
        playFireSound();
        setIsFiring(true);
      }}
      aria-label="Fire the neuron network"
    >
      <svg viewBox="0 0 300 220" role="img" aria-hidden="true">
        <g className="lab-neuron-branches">
          {neuronBranches.map((branch, index) => (
            <path
              key={branch}
              d={branch}
              className="lab-neuron-path"
              style={{ animationDelay: `${index * 35}ms` }}
            />
          ))}
        </g>

        <g className="lab-neuron-tip-group">
          {neuronTips.map((tip, index) => (
            <circle
              key={`${tip.x}-${tip.y}-${index}`}
              cx={tip.x}
              cy={tip.y}
              r={tip.r}
              className="lab-neuron-tip"
            />
          ))}
        </g>

        <g className="lab-neuron-core-group">
          <ellipse
            cx="150"
            cy="156"
            rx="33"
            ry="24"
            className="lab-neuron-soma"
          />
          <circle cx="150" cy="156" r="17" className="lab-neuron-soma-inner" />
          <circle cx="150" cy="156" r="5.2" className="lab-neuron-soma-glow" />
        </g>
      </svg>
    </button>
  );
}
