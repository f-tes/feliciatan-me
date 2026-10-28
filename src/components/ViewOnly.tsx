"use client";
import { useEffect, useRef, useState } from "react";
import { X, BookOpen, Maximize2 } from "lucide-react";

/**
 * View-only media. No PDF file is served by this site; the paper and poster are shown as page images
 * with no download links. (Anything displayed in a browser can still be screenshotted; this only avoids
 * offering the document as a file.)
 */
const guard = {
  draggable: false,
  onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
} as const;

export function ZoomImage({ src, alt, caption, className = "" }: { src: string; alt: string; caption?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <figure className={className}>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge: ${alt}`} className="group relative block w-full border border-line bg-white text-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block w-full select-none" {...guard} />
        <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-bg/85 px-2 py-1 font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-3.5" /> enlarge
        </span>
      </button>
      {caption && <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[60] overflow-auto bg-bg/95 p-4 md:p-10" onClick={() => setOpen(false)}>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="fixed right-4 top-4 z-10 flex size-10 items-center justify-center border border-line bg-surface text-accent hover:bg-accent hover:text-bg">
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="mx-auto h-auto max-w-none select-none bg-white md:max-w-[min(100%,1400px)]" onClick={(e) => e.stopPropagation()} {...guard} />
        </div>
      )}
    </figure>
  );
}

export function PaperViewer({ dir, pages, title }: { dir: string; pages: number; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-3 border border-line bg-surface px-5 py-3 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
      >
        <BookOpen className="size-4 text-accent" />
        {open ? "close the report" : `read the report (${pages} pages, view only)`}
      </button>
      {open && (
        <div className="mt-4 max-h-[85vh] overflow-y-auto border border-line bg-surface p-2 md:p-4" role="region" aria-label={title} tabIndex={0}>
          <div className="mx-auto flex max-w-[820px] flex-col gap-3">
            {Array.from({ length: pages }, (_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={`${dir}/page-${String(i + 1).padStart(2, "0")}.webp`} alt={`Report page ${i + 1} of ${pages}`} loading="lazy" className="block w-full select-none bg-white" {...guard} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
