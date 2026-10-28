import { profile } from "@/data/profile";
import { Scramble } from "./Scramble";
import { Magnetic } from "./Magnetic";
import { ArrowUpRight } from "lucide-react";
import { AsciiTorus } from "./AsciiTorus";

export function Footer() {
  const l = profile.links;
  const links = [
    l.email && { label: "email", href: `mailto:${l.email}` },
    l.github && { label: "github", href: l.github },
    { label: "linkedin", href: l.linkedin },
    l.cv && { label: "cv", href: l.cv },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-12 px-5 pb-10 pt-16 md:flex-row md:items-end md:px-8">
        <div className="flex flex-col gap-8">
          <p className="font-display text-2xl md:text-3xl">say hi<span className="text-accent">!</span></p>
          <ul className="flex flex-col gap-3 font-mono text-base">
            {links.map((k) => (
              <li key={k.label}>
                <Magnetic>
                  <a href={k.href} className="group inline-flex items-center gap-2" {...(k.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
                    <span className="u-link pb-0.5"><Scramble text={k.label} /></span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
          <p className="label">© {new Date().getFullYear()} felicia tan ee shan</p>
        </div>
        <div className="flex w-full justify-center md:w-auto md:justify-end">
          <AsciiTorus />
        </div>
      </div>
    </footer>
  );
}
