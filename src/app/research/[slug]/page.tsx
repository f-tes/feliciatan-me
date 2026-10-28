import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { research, getResearch } from "@/data/research";
import { DataTable } from "@/components/DataTable";
import { ZoomImage, PaperViewer } from "@/components/ViewOnly";
import { MaestroArt } from "@/components/MaestroArt";
import { SindexArt } from "@/components/SindexArt";

export const dynamicParams = false;
export function generateStaticParams() { return research.map((r) => ({ slug: r.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getResearch((await params).slug);
  return r ? { title: `${r.name} · felicia tan`, description: r.homeBlurb } : {};
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-2xl md:text-3xl">{children}</h2>;
}
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-muted">
    {items.map((x) => <li key={x} className="leading-relaxed before:mr-2 before:text-accent before:content-['›']">{x}</li>)}
  </ul>
);

export default async function ResearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = getResearch((await params).slug);
  if (!r) notFound();
  const idx = research.findIndex((x) => x.slug === r.slug);
  const next = research[(idx + 1) % research.length];

  return (
    <article className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
      <Link href="/#research" className="u-link label">← back</Link>
      <header className="mt-8">
        <p className="label">{r.affiliation} · {r.period}</p>
        <h1 className="mt-3 text-5xl md:text-7xl">{r.name}</h1>
        <p className="mt-3 text-xl text-muted">{r.tagline}</p>
        {r.coauthors && <p className="mt-3 text-sm text-muted">with {r.coauthors.join(", ")}</p>}
        {r.honour && <p className="mt-4 inline-block border border-accent/40 px-3 py-1 font-mono text-xs text-accent">{r.honour}</p>}
      </header>

      {r.lead?.kind === "video" && (
        <figure className="mt-12">
          <div className="border border-line bg-surface">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video controls preload="metadata" playsInline poster={r.lead.poster} src={r.lead.src} aria-label={r.lead.alt} className="w-full" />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            <strong className="text-fg">A demo of one episode.</strong> A navigation demonstration from the HM3D ObjectNav setting: first-person RGB, semantic segmentation, depth, and top-down maps as the agent searches for a <strong className="text-fg">couch</strong>.
            The episode succeeded (88 steps, SPL 0.86). A single episode illustrates the system; it does not by itself establish overall performance. The aggregate benchmark result is reported separately below.
          </figcaption>
        </figure>
      )}

      {r.lead?.kind === "art" && (
        <div className="mt-12 aspect-[8/3] overflow-hidden border border-line bg-bg">{r.lead.src === "sindex" ? <SindexArt className="h-full w-full" /> : <MaestroArt className="h-full w-full" />}</div>
      )}

      {r.lead?.kind === "image" && (
        <ZoomImage className="mt-12" src={r.lead.src} alt={r.lead.alt} />
      )}

      <section className="prose-r mt-14">
        <H2>overview</H2>
        {r.overview.map((p) => <p key={p}>{p}</p>)}
      </section>

      {r.motivation && (
        <section className="prose-r mt-14">
          <H2>motivation</H2>
          {r.motivation.map((p) => <p key={p}>{p}</p>)}
        </section>
      )}

      {r.problem && (
        <section className="prose-r mt-14">
          <H2>problem</H2>
          {r.problem.map((p) => <p key={p}>{p}</p>)}
        </section>
      )}

      {r.approach && (
        <section className="mt-14">
          <H2>technical approach</H2>
          <ol className="space-y-6 border-l border-line pl-6">
            {r.approach.map((a) => (
              <li key={a.title}>
                <h3 className="text-lg">{a.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-14">
        <H2>main contributions</H2>
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {r.contributions.map((c, i) => (
            <li key={c.title} className="bg-bg p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-2 text-lg">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {r.setup && (
        <section className="mt-14">
          <H2>experimental setup</H2>
          <Bullets items={r.setup} />
        </section>
      )}

      <section className="mt-14">
        <H2>results</H2>
        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {r.results.map((s, i) => (
            <div key={i} className="bg-bg p-5">
              <dt className="label">{s.label}{s.note ? ` · ${s.note}` : ""}</dt>
              <dd className="mt-2 font-display text-3xl text-accent md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        {r.resultsNote && <p className="mt-3 text-sm text-muted">{r.resultsNote}</p>}
        {r.resultsExtra && <div className="mt-6"><Bullets items={r.resultsExtra} /></div>}
        {r.tables && <div className="mt-10 space-y-10">{r.tables.map((t) => <DataTable key={t.title} t={t} />)}</div>}
      </section>

      {r.figures && (
        <section className="mt-14">
          <H2>figures</H2>
          <div className="grid gap-8">
            {r.figures.map((f) => <ZoomImage key={f.src} src={f.src} alt={f.alt} caption={f.caption} />)}
          </div>
        </section>
      )}

      {(r.poster || r.paper) && (
        <section className="mt-14">
          <H2>poster &amp; report</H2>
          {r.poster && <ZoomImage src={r.poster.src} alt={r.poster.alt} caption="The ISEF poster. Click to enlarge." />}
          {r.paper && (
            <div className="mt-8">
              <p className="mb-3 text-sm text-muted">{r.paper.title}</p>
              <PaperViewer dir={r.paper.dir} pages={r.paper.pages} title={r.paper.title} />
            </div>
          )}
        </section>
      )}

      {r.recognition.length > 0 && (
        <section className="mt-14">
          <H2>recognition</H2>
          <Bullets items={r.recognition} />
        </section>
      )}

      {(r.limitations || r.future) && (
        <section className="mt-14">
          <H2>limitations &amp; future directions</H2>
          {r.limitations && (<><p className="label mb-2">limitations noted in the report</p><Bullets items={r.limitations} /></>)}
          {r.future && (<><p className="label mb-2 mt-6">future work</p><Bullets items={r.future} /></>)}
        </section>
      )}

      {r.inProgress && (
        <aside className="mt-14 border border-dashed border-line p-5 text-sm text-muted">
          <p className="font-mono text-accent">[ write-up in progress ]</p>
          <p className="mt-2">Problem formulation, experimental setup, figures, papers and posters, and limitations will be added once approved material is available.</p>
        </aside>
      )}

      <nav className="mt-16 border-t border-line pt-8" aria-label="Next project">
        <Link href={`/research/${next.slug}`} className="group inline-flex items-baseline gap-3">
          <span className="label">next</span>
          <span className="u-link font-display text-2xl">{next.name}</span>
          <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </nav>
    </article>
  );
}
