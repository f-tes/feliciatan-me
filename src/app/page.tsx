import { Hero } from "@/components/Hero";
import { ResearchShowcase } from "@/components/ResearchShowcase";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { PastStuff } from "@/components/PastStuff";
import { research } from "@/data/research";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="research" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-8 pt-20 md:px-8 md:pt-28">
        <h2 className="mb-12 text-3xl md:text-5xl">some things i&apos;ve worked on</h2>
        <div className="flex flex-col gap-20 md:gap-36">
          {research.map((r, i) => <ResearchShowcase key={r.slug} r={r} index={i} />)}
        </div>
      </section>
      <CurrentlyBuilding />
      <PastStuff />
    </>
  );
}
