"use client";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const GLYPHS = "!<>-_/[]{}=+*^?#";

/** Light character-scramble on hover/focus for short labels only. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const raf = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const run = () => {
    if (reduced) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 380;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
  };

  return (
    <span className={className} onMouseEnter={run} onFocus={run} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
