"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Fine-grained luminance ramp (dark -> light). Longer ramp = more photographic detail in the glyphs.
const RAMP = " .`'^,:;~-_+<>i!lI?/|(1{[]}tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
// Where the subject sits in the source photo, so cover-cropping keeps her in frame.
const FOCUS = { x: 0.5, y: 0.52 }; // the hero image is pre-cropped around the mirror
const BUCKETS = 32;
// glyph colour by brightness: deep periwinkle -> electric periwinkle -> pale lavender
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const palette = Array.from({ length: BUCKETS }, (_, i) => {
  const t = i / (BUCKETS - 1);
  const lo = [72, 74, 190], mid = [165, 167, 255], hi = [226, 227, 255];
  const [a, b, u] = t < 0.6 ? [lo, mid, t / 0.6] : [mid, hi, (t - 0.6) / 0.4];
  return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)].map(Math.round);
});

/**
 * Full-bleed hero: periwinkle-toned photo with a photo-derived ASCII layer on top. Children (the intro
 * copy) sit on the photo; ASCII is dimmed behind them so the text stays readable.
 * Cursor = lens (photo shows through) plus a ripple in the glyphs.
 */
export function AsciiPhoto({ src, alt, children }: { src: string; alt: string; children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const lens = useRef<HTMLImageElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const w = wrap.current, c = canvas.current;
    if (!w || !c) return;
    const ctx = c.getContext("2d")!;
    const img = new Image();
    img.src = src;
    let cols = 0, rows = 0, cw = 8, ch = 14, grid: Float32Array = new Float32Array(0);
    let safe = { x0: 0, y0: 0, x1: 0, y1: 0 };
    let mouse = { x: -999, y: -999, active: false };
    let raf = 0, running = false, visible = true;
    const t0 = performance.now();

    const build = () => {
      if (!img.naturalWidth) return;
      const W = w.clientWidth, H = w.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = W < 640 ? 6 : 8; ch = Math.round(cw * 1.8);
      cols = Math.ceil(W / cw); rows = Math.ceil(H / ch);
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const sw = W / s, sh = H / s;
      const sx = (img.naturalWidth - sw) * FOCUS.x, sy = (img.naturalHeight - sh) * FOCUS.y;
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      const lum = new Float32Array(cols * rows);
      for (let i = 0; i < lum.length; i++) lum[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      const sorted = Float32Array.from(lum).sort();
      const lo = sorted[Math.floor(sorted.length * 0.03)], hi = sorted[Math.floor(sorted.length * 0.985)];
      grid = lum.map((v) => Math.pow(Math.min(1, Math.max(0, (v - lo) / Math.max(0.001, hi - lo))), 0.7));
      // rectangle covered by the intro copy (dim glyphs behind it)
      const tr = text.current?.getBoundingClientRect(), wr = w.getBoundingClientRect();
      const inner = text.current?.firstElementChild?.firstElementChild?.getBoundingClientRect();
      const r = inner ?? tr;
      if (r) safe = { x0: r.left - wr.left - 24, y0: r.top - wr.top - 16, x1: r.right - wr.left + 40, y1: r.bottom - wr.top + 28 };
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.font = `${ch * 0.95}px "JetBrains Mono Variable", ui-monospace, monospace`;
      ctx.textBaseline = "middle"; ctx.textAlign = "center";
      const time = (now - t0) / 1000;
      const R = 140;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let v = grid[y * cols + x];
          const px = x * cw + cw / 2, py = y * ch + ch / 2;
          let a = 0.2 + v * 0.8;
          if (px > safe.x0 && px < safe.x1 && py > safe.y0 && py < safe.y1) a *= 0.28;
          if (mouse.active) {
            const dx = px - mouse.x, dy = py - mouse.y, dist = Math.hypot(dx, dy);
            if (dist < R) {
              const k = 1 - dist / R;
              v = Math.min(1, Math.max(0, v + Math.sin(dist * 0.08 - time * 6) * 0.22 * k));
              a *= 1 - k * 0.8;
            }
          }
          const ci = Math.floor(v * (RAMP.length - 1));
          if (ci === 0) continue;
          const col = palette[Math.min(BUCKETS - 1, Math.floor(v * BUCKETS))];
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(2)})`;
          ctx.fillText(RAMP[ci], px, py);
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = mouse.active ? requestAnimationFrame(loop) : 0;
      running = !!raf;
    };
    const kick = () => { if (!running && visible) { running = true; raf = requestAnimationFrame(loop); } };

    const onMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const r = w.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
      lens.current?.style.setProperty("--mx", mouse.x + "px");
      lens.current?.style.setProperty("--my", mouse.y + "px");
      lens.current?.style.setProperty("--lr", "140px");
      kick();
    };
    const onLeave = () => {
      mouse.active = false;
      lens.current?.style.setProperty("--lr", "0px");
      requestAnimationFrame((n) => draw(n));
    };

    const start = () => { build(); draw(performance.now()); };
    if (img.complete) start(); else img.onload = start;
    // fonts affect glyph metrics slightly; redraw once they're ready
    document.fonts?.ready.then(() => { if (grid.length) draw(performance.now()); });
    const ro = new ResizeObserver(() => { build(); draw(performance.now()); });
    ro.observe(w);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (!visible) { cancelAnimationFrame(raf); running = false; } });
    io.observe(w);
    w.addEventListener("pointermove", onMove);
    w.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      w.removeEventListener("pointermove", onMove);
      w.removeEventListener("pointerleave", onLeave);
    };
  }, [src, reduced]);

  return (
    <div ref={wrap} className="relative h-[min(88svh,56rem)] min-h-[34rem] w-full overflow-hidden bg-bg">
      {/* base photo (periwinkle duotone), kept faint so the ASCII layer carries the image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover opacity-30" style={{ objectPosition: "50% 52%" }} fetchPriority="high" />
      {/* lens: photo revealed around the cursor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={lens}
        src={src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: "50% 52%",
          ["--lr" as string]: "0px",
          WebkitMaskImage: "radial-gradient(circle var(--lr, 0px) at var(--mx, -999px) var(--my, -999px), #000 0%, transparent 100%)",
          maskImage: "radial-gradient(circle var(--lr, 0px) at var(--mx, -999px) var(--my, -999px), #000 0%, transparent 100%)",
        }}
      />
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      {/* soft scrim behind the copy, and a seam into the page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_22%,rgba(17,18,28,.78),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg to-transparent" />
      <div ref={text} className="relative z-10">{children}</div>
    </div>
  );
}
