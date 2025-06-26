import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../context/themePalettes";

type PomoflowTheme = typeof THEMES.original.work;

function getBubbleColors(theme: PomoflowTheme) {
  return [
    theme.primary,
    theme.accent,
    theme.glow,
    theme.cardBg,
    theme.border,
  ];
}

const POP_SOUND =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYQAAAD/AAD/AAD/AAAAgAAA/wAAAP8AAAAA//8A//8A//8AAAD/AAD/AAAAgAAA//8A";

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const BUBBLE_COUNT = 18;

const makeBubbles = (colors: string[]) =>
  Array.from({ length: BUBBLE_COUNT }).map((_, i) => ({
    size: randomBetween(32, 72),
    left: randomBetween(0, 98),
    baseTop: randomBetween(80, 99),
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: randomBetween(0.17, 0.32),
    blur: randomBetween(2, 7),
    key: `bubble-${i}-${Math.random()}`,
    id: i,
    offsetX: 0,
    offsetY: 0,
  }));

const MAX_DIST = 120;
const FORCE = 24;
const ORG_FACTOR = 0.16;

const BubbleBackground: React.FC = () => {
  const { theme } = useTheme();
  const [bubbles, setBubbles] = useState(() => makeBubbles(getBubbleColors(theme)));
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const popRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setBubbles(makeBubbles(getBubbleColors(theme)));
  }, [theme]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((b) => {
        const bubbleX = (b.left / 100) * window.innerWidth + b.offsetX;
        const bubbleY = (b.baseTop / 100) * window.innerHeight + b.offsetY;
        const dx = mouse.x - bubbleX;
        const dy = mouse.y - bubbleY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let offsetX = 0;
        let offsetY = 0;

        if (dist < MAX_DIST) {
          const repulse = (1 - dist / MAX_DIST) * FORCE;
          offsetX = -dx / dist * repulse;
          offsetY = -dy / dist * repulse;
        }
        offsetX += (dx / window.innerWidth) * ORG_FACTOR * b.size;
        offsetY += (dy / window.innerHeight) * ORG_FACTOR * b.size;

        return { ...b, offsetX, offsetY };
      })
    );
  }, [mouse.x, mouse.y]);

  const handlePop = (el: HTMLElement) => {
    if (popRef.current) {
      popRef.current.currentTime = 0;
      popRef.current.play();
    }
    if ("vibrate" in navigator) navigator.vibrate?.(30);
    el.classList.add("pop-animate");
    setTimeout(() => el.classList.remove("pop-animate"), 240);
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {bubbles.map((b) => (
        <span
          key={b.key}
          onClick={e => handlePop(e.currentTarget)}
          style={{
            position: "absolute",
            left: `calc(${b.left}% + ${b.offsetX}px)`,
            top: `calc(${b.baseTop}% + ${b.offsetY}px)`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            cursor: "pointer",
            pointerEvents: "auto",
            transition:
              "left 0.38s cubic-bezier(.34,1.56,.64,1), top 0.38s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s",
            boxShadow:
              b.offsetX * b.offsetX + b.offsetY * b.offsetY < 90
                ? `0 0 20px 2px ${theme.glow}33`
                : undefined,
            willChange: "transform",
            animation: `bubbleFloat 18s linear infinite`,
            animationDelay: `${b.id * 0.8}s`,
          }}
        />
      ))}
      <audio ref={popRef} src={POP_SOUND} preload="auto" />
      <style>
        {`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1);}
          100% { transform: translateY(-94vh) scale(1.08); opacity: 0;}
        }
        .pop-animate {
          animation: pop 0.26s cubic-bezier(.4,1.7,.5,.8) !important;
          z-index: 11 !important;
          box-shadow: 0 0 32px 10px ${theme.glow}99;
        }
        @keyframes pop {
          0% { transform: scale(1);}
          55% { transform: scale(1.52);}
          100% { transform: scale(1);}
        }
        `}
      </style>
    </div>
  );
};

export default BubbleBackground;
