"use client";
import Link from "next/link";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Research } from "@/data/research";
import { MaestroArt } from "./MaestroArt";
import { SindexArt } from "./SindexArt";
import { useReducedMotion } from "@/lib/useReducedMotion";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface text-center">
      <span className="font-mono text-xs text-accent/80">[ {name.toLowerCase()} · representative image to be supplied ]</span>
      <span className="label">provisional placeholder</span>
    </div>
  );
}

/**
 * Image-led showcase. At rest: just the media. On hover / keyboard focus: detection-style annotation boxes
 * pop onto the media and a solid caption block slides in, overlapping the frame's edge.
 * Meta-Robots: the real demo video plays (muted, inline) while hovered and resets on leave.
 */
export function ResearchShowcase({ r, index }: { r: Research; index: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const isVideo = r.lead?.kind === "video";

  const play = () => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause(); v.currentTime = 0; setPlaying(false);
  };
  useEffect(() => () => video.current?.pause(), []);

  return (
    <article className="group/s">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">0{index + 1}</span>
          <h3 className="text-3xl md:text-5xl">{r.name}</h3>
        </div>
        <span className="label hidden sm:block">{r.period}</span>
      </div>

      <div
        className="showcase relative"
        onMouseEnter={() => { if (isVideo && !reduced) play(); }}
        onMouseLeave={() => { if (isVideo) stop(); }}
      >
        <div className="relative aspect-[8/3] w-full overflow-hidden border border-line bg-surface">
          {r.lead?.kind === "video" ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.lead.poster} alt="" className={`media absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`} loading="lazy" />
              <video ref={video} className="media absolute inset-0 h-full w-full object-contain" src={r.lead.src} muted playsInline loop preload="metadata" aria-label={r.lead.alt} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
            </>
          ) : r.lead?.kind === "art" ? (
            <div className="media absolute inset-0 bg-bg">{r.lead.src === "sindex" ? <SindexArt className="h-full w-full" /> : <MaestroArt className="h-full w-full" />}</div>
          ) : r.lead ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.lead.src} alt={r.lead.alt} className="media absolute inset-0 h-full w-full bg-white object-contain" loading="lazy" />
          ) : (
            <Placeholder name={r.name} />
          )}

          {/* annotation boxes (desktop; on phones the text sits below the media) */}
          {r.callouts?.map((c, i) => (
            <div
              key={c.label}
              aria-hidden="true"
              className="pop pointer-events-none absolute hidden border-2 border-accent md:block"
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%`, transitionDelay: `${120 + i * 110}ms` }}
            >
              <span className="absolute -left-0.5 -top-0.5 max-w-full truncate bg-accent px-1.5 py-0.5 font-mono text-[0.68rem] leading-none text-bg">{c.label}</span>
            </div>
          ))}

          {r.lead?.badge && (
            <span className="pointer-events-none absolute right-14 top-3 z-[5] border border-accent/50 bg-bg/80 px-2 py-1 font-mono text-[0.7rem] text-accent md:right-[4.5rem] md:top-5">{r.lead.badge}</span>
          )}
          <span className="pointer-events-none absolute right-3 top-3 z-[5] bg-bg/80 p-1.5 md:right-5 md:top-5">
            <ArrowUpRight aria-hidden="true" className="size-5 text-accent transition-transform duration-300 group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5 md:size-6" />
          </span>
        </div>

        {/* whole-card link: stretched anchor, keyboard focusable */}
        <Link
          href={`/research/${r.slug}`}
          aria-label={`${r.name}: read the research page`}
          className="absolute inset-0 z-10"
          onFocus={() => { if (isVideo && !reduced) play(); }}
          onBlur={() => { if (isVideo) stop(); }}
        />

        {/* solid caption block, overlapping the frame's bottom-left edge */}
        <div className="pop pointer-events-none absolute -bottom-24 left-6 z-20 hidden max-w-[34rem] bg-accent p-5 text-bg shadow-[0_8px_30px_rgba(0,0,0,.35)] md:block lg:left-10">
          <p className="text-[1.02rem] leading-snug">{r.homeBlurb}</p>
          <p className="mt-3 font-mono text-xs font-medium">{r.highlight}</p>
          {r.honour && <p className="mt-1 font-mono text-[0.7rem] opacity-75">{r.honour}</p>}
        </div>

        {isVideo && (
          <button
            type="button"
            onClick={() => (playing ? stop() : play())}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className={`absolute bottom-3 right-3 z-30 flex size-10 items-center justify-center rounded-full border border-accent/60 bg-bg/80 text-accent transition-colors hover:bg-accent hover:text-bg md:bottom-5 md:right-5 ${reduced ? "" : "md:[@media(hover:hover)]:hidden"}`}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        )}
      </div>

      {/* always-visible text: the mobile / no-hover path to the essentials */}
      <div className="mt-4 grid gap-1 md:hidden">
        <p className="text-fg/90">{r.homeBlurb}</p>
        <p className="font-mono text-sm text-accent">{r.highlight}</p>
        {r.honour && <p className="font-mono text-xs text-muted">{r.honour}</p>}
        <Link href={`/research/${r.slug}`} className="u-link mt-1 w-fit text-sm">read the research page →</Link>
      </div>
      <p className="label mt-3 hidden md:block md:text-right">{r.tagline} · {r.affiliation}</p>
    </article>
  );
}
