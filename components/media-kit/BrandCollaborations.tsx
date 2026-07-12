import Image from "next/image";
import { brandCollaborations } from "@/lib/media-kit-data";

/**
 * Brand collaborations section for the Portfolio/Media Kit page.
 *
 * Displays past brand partners in a flex-wrap grid of glass cards. Each card
 * shows the brand logo, name, and category. Data is sourced from
 * `lib/media-kit-data.ts`.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns A `<section>` element containing the brand collaboration cards.
 */
export default function BrandCollaborations() {
  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Brands I&apos;ve Worked With</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {brandCollaborations.map((brand) => (
          <div
            key={brand.name}
            className="glass-card flex w-36 flex-col items-center justify-center p-4 text-center transition-transform hover:scale-105 sm:w-40"
          >
            {/* Brand logo */}
            <div className="mb-2 flex h-12 w-12 items-center justify-center">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>

            {/* Brand name */}
            <p className="font-display text-sm font-medium text-text-dark dark:text-lavender-100">
              {brand.name}
            </p>

            {/* Category */}
            <p className="mt-1 text-xs text-text-muted dark:text-lavender-300">
              {brand.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
