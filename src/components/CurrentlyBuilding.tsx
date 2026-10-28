import { building } from "@/data/projects";

export function CurrentlyBuilding() {
  return (
    <section id="building" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <h2 className="mb-10 text-3xl md:text-5xl">currently building...</h2>
      {building.length === 0 ? (
        <div className="border border-dashed border-line p-8 md:p-12">
          <p className="font-mono text-sm text-accent">[ to be added ]</p>
          <p className="mt-3 max-w-lg text-muted">
            The open workbench for current experiments, prototypes, and research directions. Entries live in
            <code className="mx-1 font-mono text-fg">src/data/projects.ts</code> and appear here automatically.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {building.map((b) => (
            <li key={b.title} className={`grid gap-6 border border-line bg-surface p-6 transition-colors hover:border-accent/60 md:p-8 ${b.bullets ? "md:col-span-2 md:grid-cols-[1fr_1.6fr]" : ""}`}>
              <div>
                {b.period && <p className="label">{b.period}</p>}
                <h3 className="mt-2 text-3xl md:text-4xl">{b.title}</h3>
                {b.role && <p className="mt-2 font-mono text-sm text-accent">{b.role}</p>}
                {b.description && <p className="mt-4 text-muted">{b.description}</p>}
                {b.goal && <p className="mt-3 font-mono text-xs text-accent">goal: {b.goal}</p>}
              </div>
              <div>
                {b.bullets && (
                  <ul className="space-y-3 text-sm leading-relaxed text-muted">
                    {b.bullets.map((x) => <li key={x} className="before:mr-2 before:text-accent before:content-['›']">{x}</li>)}
                  </ul>
                )}
                {b.tech && (
                  <p className="mt-5 flex flex-wrap gap-2">
                    <span className="label">tech stack</span>
                    {b.tech.map((t) => <span key={t} className="border border-line px-2 py-0.5 font-mono text-xs text-fg">{t}</span>)}
                  </p>
                )}
                {(b.progress || b.updated) && <p className="label mt-3">{[b.progress, b.updated && `updated ${b.updated}`].filter(Boolean).join(" · ")}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
