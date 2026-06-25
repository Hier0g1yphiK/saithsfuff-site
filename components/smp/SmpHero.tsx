import { smpData } from "@/lib/smp-data";

/**
 * Hero section for the SMP page.
 *
 * Renders a gradient-backed header with the server name and a brief tagline.
 * Matches the hero pattern used across other pages (`LinksHero`, `HomeHero`,
 * `MediaKitHero`) with consistent spacing and dark-mode support.
 *
 * This is a **React Server Component** — no client JS is shipped.
 *
 * @remarks
 * - Uses `bg-gradient-hero` for the pastel gradient background.
 * - Heading uses `gradient-text` + `font-display` (Fredoka).
 * - Body text uses `font-body` (Nunito) with `dark:text-gray-200`.
 * - Content is sourced from `lib/smp-data.ts` (`smpData.hero`).
 *
 * @example
 * ```tsx
 * // Used inside app/smp/page.tsx
 * import SmpHero from "@/components/smp/SmpHero";
 *
 * export default function SmpPage() {
 *   return (
 *     <main>
 *       <SmpHero />
 *     </main>
 *   );
 * }
 * ```
 *
 * @returns A `<section>` element containing the h1 heading and tagline.
 */
export default function SmpHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 sm:py-24 dark:bg-none dark:bg-[#1a0e2e]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">{smpData.hero.serverName}</span> ⛏️
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-text-body dark:text-gray-200 sm:text-xl">
          {smpData.hero.tagline}
        </p>
      </div>
    </section>
  );
}
