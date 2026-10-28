# Missing assets, unverified claims, approvals

## Assets still needed
- [x] SINDEX lead: original schematic (SindexArt) plus four figures from the paper. Swap for a real demo screenshot if you have one.
- [ ] Additional Meta-Robots images (optional; the demo video is the lead)
- [ ] Exploro screenshots (App Store); images for any archive project (enables the cursor-following preview)
- [ ] SSI: what the acronym stands for and your role (card currently says "SSI" with the Dec 5 rocket and Winter 2027 cubesat)
- [ ] Meta-Robots paper / poster, if releasable (SINDEX paper is shown view-only as 10 page images)

Done: email, GitHub, LinkedIn links; MAESTRO poster, report and figures; Zing in "currently building".

## PDFs are not downloadable
No `.pdf` file is shipped in `public/`. The MAESTRO report is shown as 18 page images (`public/media/maestro/paper/`) and the poster as an image, with no download links. This avoids offering a file, but anything shown in a browser can still be screenshotted. There is no CV link on purpose.

## Public-release approvals
- [x] DSO approval for the Meta-Robots demo video (received 2026-10-28, per Felicia)
- [x] MAESTRO poster and report supplied by Felicia for the site (ISEF material). Confirm DSO is also fine with it being public.
- [ ] Any SINDEX / Meta-Robots figures, papers, posters

## Claims to verify
- **MAESTRO VQA numbers disagree across sources.** Report Table 4 gives accuracy 0.80 (MSRVTT-QA) and 0.86 (MSVD-QA), with best prior 0.72 and 0.80 (+8.0 and +6.0 points). The report text (§4.2) says F1 of 82.0% and 86.9%, and the CV/poster quote +8.0 / +6.9. The site currently shows Table 4 (80% / 86% accuracy) and does not state the point gains. Decide which to publish.
- The MAESTRO page's "figures" section includes a poster crop with its "Achieves SOTA ≥ 15%" line, which is not in the report. Keep, or re-crop.
- Magnetic Gears and Jet Refraction are described as IYPT-based using only what you told me. Confirm the exact IYPT problem names/years, whether it was a team effort, and your role.
- AnyNav description is my rephrase of "making everything a navigable point"; confirm it matches the idea.
- GGS WTD: "30k" has no currency; acronym not expanded.
- "93% F1" is F1(O) on the offensive class (macro-F1 is 0.95); the page shows both.
- Co-author credit: the report and poster list Low Li Ying Amy as co-author; the page says "with Low Li Ying Amy". Confirm the wording and that her affiliation is not implied to be DSO.
- "Recognised by Singapore's Minister of Defence" is shown for MAESTRO and SINDEX as supplied; confirm exact wording.
- Meta-Robots: HM3D evaluation split/conditions for 65.4% → 68.9% (+3.5 pp, ≈5.4% relative); the couch episode details (scene TEEsavR23oF, episode 2, SPL 0.86, soft SPL 0.85, 88 steps) come from the filename only.
- SINDEX: the 83.1% out-of-context F1 on the CV is NOT in the paper, so it is not on the site. Confirm the source or drop it from the CV.
- SINDEX: explanation scores disagree inside the paper (abstract: BLEU 0.361 / METEOR 0.450 / CIDEr 0.001 / ROUGE 0.609; section 6.4: 0.841 / 0.845 / 0.913). No numbers shown on the site. Tell me which is right.
- SINDEX: the paper lists Raffles Institution as your affiliation; the site says DSO National Laboratories (from the CV). Springer publication details/link still needed.
- Awards wording (ISEF 2025, SSEF 2025, IRC-SET, NSTS) against certificates.
- Zing bullets are as supplied (App Store / Google Play launch, 7 GP tuition centres and government schools).

## Defaults chosen (all reversible)
- Zing is listed first under "other past stuff" (2026 – present).
- Physics research and STEM empowerment work are sub-groups of "other past stuff", not separate homepage sections.
- MAESTRO homepage lead is an original schematic of the pipeline (labelled "schematic · not experimental data"), built as SVG in `src/components/MaestroArt.tsx`. The real figures, poster and report are on the research page.
- Fonts: Option A (Space Grotesk / DM Sans / JetBrains Mono), self-hosted via @fontsource.
- Meta-Robots page shows only supplied content plus a "write-up in progress" note. SINDEX is a full write-up from the paper.
- Hero subtitle kept verbatim ("cs + physics").
