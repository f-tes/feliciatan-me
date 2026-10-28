/**
 * Centralised font configuration (provisional: Option A).
 * To switch to Option B: install @fontsource-variable/bricolage-grotesque + @fontsource/space-mono,
 * swap the imports in app/layout.tsx and update the three stacks in app/globals.css.
 */
export const FONT_IMPORTS = [
  "@fontsource-variable/space-grotesk",
  "@fontsource-variable/dm-sans",
  "@fontsource-variable/jetbrains-mono",
] as const;
