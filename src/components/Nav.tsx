import Link from "next/link";
import { Scramble } from "./Scramble";

const items = [
  { href: "/#research", label: "research" },
  { href: "/#building", label: "building" },
  { href: "/#past", label: "more projects" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur-sm">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-display text-lg tracking-tight">
          felicia<span className="text-accent">.</span>
        </Link>
        <ul className="flex gap-5 font-mono text-[0.8rem] md:gap-8">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="u-link pb-0.5 text-muted">
                <Scramble text={i.label} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
