import { profile } from "@/data/profile";
import { AsciiPhoto } from "./AsciiPhoto";

export function Hero() {
  return (
    <section aria-label="Introduction">
      <AsciiPhoto src={profile.heroImage} alt={profile.heroAlt}>
        <div className="mx-auto max-w-6xl px-5 pt-10 md:px-8 md:pt-16">
          <div className="w-fit max-w-full">
            <h1 className="text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] [text-shadow:0_2px_24px_rgba(17,18,28,.9)]">{profile.heading}</h1>
            <p className="mt-5 max-w-xl text-lg text-fg/90 md:text-xl [text-shadow:0_1px_16px_rgba(17,18,28,.95)]">{profile.subtitle}</p>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 [text-shadow:0_1px_12px_rgba(17,18,28,.95)]">
              <span className="label">research interests</span>
              {profile.interests.map((t, i) => (
                <span key={t} className="font-mono text-sm text-fg">
                  {i > 0 && <span className="mr-3 text-accent" aria-hidden="true">/</span>}
                  {t}
                </span>
              ))}
            </p>
          </div>
        </div>
      </AsciiPhoto>
    </section>
  );
}
