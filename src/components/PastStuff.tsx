"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { past, groupNotes } from "@/data/projects";

export function PastStuff() {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const labels = Array.from(new Set(past.map((p) => p.group)));
  const groups = labels.map((label) => ({ label, items: past.filter((p) => p.group === label) }));
  const preview = past.find((p) => p.title === hover)?.image;

  return (
    <section id="past" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24 md:px-8 md:pb-32">
      <h2 className="mb-10 text-3xl md:text-5xl">more projects</h2>
      <div onPointerMove={(e) => { x.set(e.clientX + 24); y.set(e.clientY - 80); }}>
      {groups.map((g) => (
      <div key={g.label ?? "main"} className={g.label ? "mt-16" : ""}>
      {g.label && (
        <div className="mb-4">
          <h3 className="font-display text-2xl md:text-3xl">{g.label}</h3>
          {groupNotes[g.label] && <p className="mt-2 max-w-2xl text-muted">{groupNotes[g.label]}</p>}
        </div>
      )}
      <ul className="border-t border-line">
        {g.items.map((p) => {
          const expandable = p.details.length > 0 || !!p.href;
          const isOpen = expandable && open === p.title;
          return (
            <li key={p.title} className="border-b border-line" onMouseEnter={() => setHover(p.title)} onMouseLeave={() => setHover(null)}>
              <button
                type="button"
                aria-expanded={expandable ? isOpen : undefined}
                onClick={() => expandable && setOpen(isOpen ? null : p.title)}
                className={`group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 ${expandable ? "" : "cursor-default"}`}
              >
                <ChevronRight aria-hidden="true" className={!expandable ? "size-4 shrink-0 translate-y-0.5 text-line" : `size-4 shrink-0 translate-y-0.5 text-accent transition-transform ${isOpen ? "rotate-90" : "group-hover:translate-x-1"}`} />
                <span className="w-32 shrink-0 font-display text-xl transition-colors group-hover:text-accent md:w-56 md:text-2xl">{p.title}</span>
                <span className="flex-1 text-muted">{p.blurb}</span>
                <span className="label hidden sm:block">{p.meta}</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <ul className="overflow-hidden pl-8 md:pl-[17rem]">
                  <li className="pb-1" />
                  {p.details.map((d) => (
                    <li key={d} className="pb-2 font-mono text-sm text-muted before:mr-2 before:text-accent before:content-['›']">{d}</li>
                  ))}
                  {p.href && <li className="pb-5"><a href={p.href} className="u-link text-sm">visit →</a></li>}
                  <li className="pb-3" />
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
      ))}
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div style={{ x, y }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-40 w-64 border border-line object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
