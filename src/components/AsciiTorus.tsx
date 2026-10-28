"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RAMP = " .,-~:;=!*#$@";
const COLS = 64, ROWS = 32;
const R1 = 1, R2 = 2, K2 = 5; // tube radius, ring radius, camera distance
const LIGHT = (() => { const l = [0, 1, -1]; const n = Math.hypot(...l); return l.map((v) => v / n); })();

/** Software 3D renderer: torus mesh -> rotation -> perspective -> lambert shading -> z-buffer -> ASCII ramp. */
function frame(ax: number, az: number, out: { ch: string; l: number }[]) {
  const sa = Math.sin(ax), ca = Math.cos(ax), sb = Math.sin(az), cb = Math.cos(az);
  const zbuf = new Float32Array(COLS * ROWS);
  for (let i = 0; i < out.length; i++) { out[i].ch = " "; out[i].l = 0; }
  const K1 = (COLS * K2 * 3) / (8 * (R1 + R2)) * 0.72;
  for (let th = 0; th < 6.283; th += 0.05) {
    const ct = Math.cos(th), st = Math.sin(th);
    for (let ph = 0; ph < 6.283; ph += 0.02) {
      const cp = Math.cos(ph), sp = Math.sin(ph);
      // point and normal on torus (before rotation); ring revolved about Y
      const cx = R2 + R1 * ct;
      const px = cx * cp, py = R1 * st, pz = -cx * sp;
      const nx = ct * cp, ny = st, nz = -ct * sp;
      // rotate about X by ax, then Z by az
      const rot = (x: number, y: number, z: number) => {
        const y1 = y * ca - z * sa, z1 = y * sa + z * ca;
        return [x * cb - y1 * sb, x * sb + y1 * cb, z1];
      };
      const [x, y, z] = rot(px, py, pz);
      const [rx, ry, rz] = rot(nx, ny, nz);
      const zc = z + K2;
      const ooz = 1 / zc;
      const xp = Math.floor(COLS / 2 + K1 * ooz * x);
      const yp = Math.floor(ROWS / 2 - K1 * ooz * y * 0.5);
      if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue;
      const L = rx * LIGHT[0] + ry * LIGHT[1] + rz * LIGHT[2];
      const idx = yp * COLS + xp;
      if (ooz > zbuf[idx]) {
        zbuf[idx] = ooz;
        const lum = Math.max(0, L);
        out[idx].l = lum;
        out[idx].ch = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(lum * (RAMP.length - 1)))];
      }
    }
  }
}

export function AsciiTorus() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const cells = Array.from({ length: COLS * ROWS }, () => ({ ch: " ", l: 0 }));
    const state = { ax: 0.9, az: 0.3, vx: 0, vz: 0, drag: false, lx: 0, ly: 0 };
    let raf = 0, visible = false, last = performance.now();

    const size = () => {
      const W = c.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = W / COLS, chh = cw * 2;
      c.width = W * dpr; c.height = chh * ROWS * dpr;
      c.style.height = chh * ROWS + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = () => {
      const W = c.clientWidth, cw = W / COLS, chh = cw * 2;
      ctx.clearRect(0, 0, W, chh * ROWS);
      ctx.font = `${chh * 0.95}px "JetBrains Mono Variable", ui-monospace, monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
        const cell = cells[y * COLS + x];
        if (cell.ch === " ") continue;
        ctx.fillStyle = `rgba(165,167,255,${(0.35 + cell.l * 0.65).toFixed(2)})`;
        ctx.fillText(cell.ch, x * cw + cw / 2, y * chh + chh / 2);
      }
    };
    const render = () => { frame(state.ax, state.az, cells); paint(); };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!state.drag) {
        // gentle auto-spin plus inertia carried over from drag / hover
        state.ax += (0.5 * dt) + state.vx; state.az += (0.28 * dt) + state.vz;
        state.vx *= 0.94; state.vz *= 0.94;
      }
      render();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf && visible && !reduced) { last = performance.now(); raf = requestAnimationFrame(tick); } };

    size(); render();
    const ro = new ResizeObserver(() => { size(); render(); }); ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start(); else { cancelAnimationFrame(raf); raf = 0; }
    }); io.observe(c);

    const down = (e: PointerEvent) => { state.drag = true; state.lx = e.clientX; state.ly = e.clientY; c.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (state.drag) {
        const dx = e.clientX - state.lx, dy = e.clientY - state.ly;
        state.lx = e.clientX; state.ly = e.clientY;
        state.az += dx * 0.012; state.ax += dy * 0.012;
        state.vz = dx * 0.0015; state.vx = dy * 0.0015;
        if (reduced) render();
      } else if (e.pointerType === "mouse" && !reduced) {
        const r = c.getBoundingClientRect();
        state.vz += ((e.clientX - (r.left + r.width / 2)) / r.width) * 0.0006;
        state.vx += ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.0006;
      }
    };
    const up = () => { state.drag = false; };
    c.addEventListener("pointerdown", down); c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up); c.removeEventListener("pointercancel", up);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="A rotating 3D torus drawn in ASCII characters. Drag to rotate."
      className="w-full max-w-[26rem] cursor-grab touch-pan-y select-none active:cursor-grabbing"
    />
  );
}
