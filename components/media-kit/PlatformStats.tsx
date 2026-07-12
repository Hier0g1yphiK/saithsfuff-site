import Image from "next/image";
import { platformStats } from "@/lib/media-kit-data";

/**
 * Platform statistics section for the Portfolio/Media Kit page.
 *
 * Displays follower counts and average views for each platform in a responsive
 * grid of glass cards. Data is sourced from `lib/media-kit-data.ts`.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns A `<section>` element containing the platform stats grid.
 */
export default function PlatformStats() {
  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Platform Stats</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {platformStats.map((stat) => (
          <div
            key={stat.platform}
            className="glass-card p-6 text-center transition-transform hover:scale-[1.02]"
          >
            {/* Platform icon */}
            <div className="mb-3 flex justify-center" aria-hidden="true">
              <Image
                src={stat.icon}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>

            {/* Platform name */}
            <h3 className="font-display text-lg font-medium mb-4">
              {stat.platform}
            </h3>

            {/* Metrics */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted dark:text-lavender-300">Followers</span>
                <span className="font-semibold text-text-dark dark:text-lavender-100">{stat.followers}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-text-muted dark:text-lavender-300">Avg. Views</span>
                <span className="font-semibold text-text-dark dark:text-lavender-100">{stat.avgViews}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
