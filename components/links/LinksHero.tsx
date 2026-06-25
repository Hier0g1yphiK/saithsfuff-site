/**
 * Hero section for the Links page.
 *
 * Renders a gradient-backed header with the page title ("All My Links") and a
 * brief tagline. Matches the hero pattern used across other pages (HomeHero,
 * MediaKitHero) with consistent spacing and dark-mode support.
 *
 * @returns A `<section>` element containing the h1 heading and tagline.
 */
export default function LinksHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 sm:py-24 dark:bg-none dark:bg-[#1a0e2e]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">All My Links</span> ✨
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-text-body dark:text-gray-200 sm:text-xl">
          Here you can find all my socials, collabs, and discount codes!
        </p>
      </div>
    </section>
  );
}
