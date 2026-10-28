"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Subtle spring-based magnetic pull toward the cursor. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 18 });
  const reduced = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}
