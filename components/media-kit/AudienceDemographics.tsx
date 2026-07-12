import {
  ageBreakdown,
  genderDistribution,
  topLocations,
  audienceInterests,
} from "@/lib/media-kit-data";

/**
 * Audience demographics section for the Portfolio/Media Kit page.
 *
 * Displays age breakdown, gender distribution, top locations, and audience
 * interests in a 2-column grid of whimsical cards with progress bars. Data is
 * sourced from `lib/media-kit-data.ts`.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns A `<section>` element containing the demographics grid.
 */
export default function AudienceDemographics() {
  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Audience Demographics</span>
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Age breakdown */}
        <div className="whimsical-card">
          <h3 className="font-display text-lg font-medium mb-4">Age Range</h3>
          <div className="space-y-3">
            {ageBreakdown.map((item) => (
              <div key={item.range}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-text-body dark:text-gray-200">{item.range}</span>
                  <span className="font-medium text-text-dark dark:text-lavender-100">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-pink-100 dark:bg-lavender-900/50">
                  <div
                    className="h-full rounded-pill bg-gradient-to-r from-pink-400 to-lavender-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender distribution */}
        <div className="whimsical-card">
          <h3 className="font-display text-lg font-medium mb-4">Gender</h3>
          <div className="space-y-3">
            {genderDistribution.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-text-body dark:text-gray-200">{item.label}</span>
                  <span className="font-medium text-text-dark dark:text-lavender-100">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-pink-100 dark:bg-lavender-900/50">
                  <div
                    className="h-full rounded-pill bg-gradient-to-r from-lavender-400 to-mint-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top locations */}
        <div className="whimsical-card">
          <h3 className="font-display text-lg font-medium mb-4">Top Locations</h3>
          <div className="space-y-3">
            {topLocations.map((item) => (
              <div key={item.country}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-text-body dark:text-gray-200">{item.country}</span>
                  <span className="font-medium text-text-dark dark:text-lavender-100">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-pink-100 dark:bg-lavender-900/50">
                  <div
                    className="h-full rounded-pill bg-gradient-to-r from-mint-400 to-pink-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience interests */}
        <div className="whimsical-card">
          <h3 className="font-display text-lg font-medium mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {audienceInterests.map((interest) => (
              <span
                key={interest}
                className="inline-block rounded-pill bg-pink-100/80 px-3 py-1 text-sm font-medium text-text-body dark:bg-lavender-900/50 dark:text-lavender-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
