/**
 * Hero section for the Schedule page.
 *
 * Matches the hero pattern used across other pages (`SmpHero`, `LinksHero`,
 * `MediaKitHero`) with consistent spacing and dark-mode support.
 *
 * This is a **React Server Component** — no client JS is shipped.
 *
 * @returns A `<section>` element containing the h1 heading and tagline.
 */
export default function ScheduleHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 sm:py-24 dark:bg-none dark:bg-[#1a0e2e]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Stream Schedule</span> 📅
        </h1>

        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-text-body dark:text-gray-200 sm:text-xl">
          Here&apos;s when to catch me live on Twitch. Grab a snack and come
          hang out! 💖
        </p>
      </div>
    </section>
  );
}
