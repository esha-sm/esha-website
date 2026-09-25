import type { CSSProperties } from "react";

const flowers = [
  { left: 4, top: "-12vh", size: 34, delay: "0s", duration: "2.8s", drift: "42px", spin: "360deg", color: "#f3c5b2" },
  { left: 14, top: "18vh", size: 46, delay: "0.08s", duration: "3.1s", drift: "-54px", spin: "-320deg", color: "#f2c4c4" },
  { left: 25, top: "-3vh", size: 29, delay: "0.16s", duration: "2.7s", drift: "36px", spin: "280deg", color: "#f4d0b3" },
  { left: 36, top: "32vh", size: 52, delay: "0.24s", duration: "3.2s", drift: "-40px", spin: "-400deg", color: "#f1c2b2" },
  { left: 47, top: "7vh", size: 38, delay: "0.32s", duration: "2.9s", drift: "50px", spin: "340deg", color: "#f4c8ba" },
  { left: 58, top: "-16vh", size: 28, delay: "0.4s", duration: "2.8s", drift: "-46px", spin: "-300deg", color: "#f0c1c4" },
  { left: 69, top: "24vh", size: 48, delay: "0.48s", duration: "3.1s", drift: "34px", spin: "380deg", color: "#f5d2b6" },
  { left: 80, top: "-6vh", size: 36, delay: "0.56s", duration: "2.8s", drift: "-58px", spin: "-360deg", color: "#f3c5b6" },
  { left: 91, top: "12vh", size: 54, delay: "0.64s", duration: "3.2s", drift: "-34px", spin: "320deg", color: "#f0c5bd" },
] as const;

type FlowerStyle = CSSProperties & {
  "--flower-size": string;
  "--flower-top": string;
  "--flower-drift": string;
  "--flower-spin": string;
};

export function LabFlowerFall() {
  return (
    <div className="lab-flower-field" aria-hidden="true">
      {flowers.map((flower) => (
        <span
          key={flower.left}
          className="lab-flower"
          style={
            {
              left: `${flower.left}%`,
              top: flower.top,
              animationDelay: flower.delay,
              animationDuration: flower.duration,
              color: flower.color,
              "--flower-size": `${flower.size}px`,
              "--flower-top": flower.top,
              "--flower-drift": flower.drift,
              "--flower-spin": flower.spin,
            } as FlowerStyle
          }
        >
          <svg viewBox="0 0 40 40" focusable="false">
            <g fill="currentColor" opacity="0.82">
              <path d="M20 20C17 16 11 12 13 6 15 0 25 0 27 6 29 12 23 16 20 20Z" />
              <path d="M20 20C17 16 11 12 13 6 15 0 25 0 27 6 29 12 23 16 20 20Z" transform="rotate(72 20 20)" />
              <path d="M20 20C17 16 11 12 13 6 15 0 25 0 27 6 29 12 23 16 20 20Z" transform="rotate(144 20 20)" />
              <path d="M20 20C17 16 11 12 13 6 15 0 25 0 27 6 29 12 23 16 20 20Z" transform="rotate(216 20 20)" />
              <path d="M20 20C17 16 11 12 13 6 15 0 25 0 27 6 29 12 23 16 20 20Z" transform="rotate(288 20 20)" />
            </g>
            <circle cx="20" cy="20" r="6" fill="#f5da86" opacity="0.76" />
            <circle cx="20" cy="20" r="3.5" fill="#ffedb1" />
          </svg>
        </span>
      ))}
    </div>
  );
}