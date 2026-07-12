import { contentExamples } from "@/lib/media-kit-data";

/**
 * Content examples section for the Portfolio/Media Kit page.
 *
 * Displays sample content pieces in a 4-column grid with placeholder
 * thumbnails, titles, platform badges, and view counts. Data is sourced
 * from `lib/media-kit-data.ts`.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns A `<section>` element containing the content examples grid.
 */
export default function ContentExamples() {
  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Content Examples</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contentExamples.map((item) => (
          <div
            key={item.title}
            className="whimsical-card overflow-hidden transition-transform hover:scale-[1.02]"
          >
            {/* Placeholder thumbnail */}
            <div
              className={`${item.thumbnailColor} flex h-40 items-center justify-center rounded-t-card dark:opacity-80`}
            >
              <span className="text-4xl opacity-60" aria-hidden="true">▶️</span>
            </div>

            {/* Content info */}
            <div className="p-4">
              <h3 className="font-display text-sm font-medium text-text-dark dark:text-lavender-100 line-clamp-2">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center justify-between text-xs text-text-muted dark:text-lavender-300">
                <span className="inline-block rounded-pill bg-pink-100/80 px-2 py-0.5 dark:bg-lavender-900/50">
                  {item.platform}
                </span>
                <span>{item.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
