import { smpData } from "@/lib/smp-data";

/**
 * Whitelist requirements section for the SMP page.
 *
 * Explains how players can get whitelisted on the FuffSMP, including the
 * Twitch channel points redemption option.
 *
 * This is a **React Server Component** — ships zero client JS.
 *
 * @remarks
 * - Uses `section-container` for consistent max-width and padding.
 * - Card uses `whimsical-card` with dark-mode overrides.
 * - All display text is sourced from `lib/smp-data.ts`.
 *
 * @example
 * ```tsx
 * import WhitelistSection from "@/components/smp/WhitelistSection";
 *
 * <WhitelistSection />
 * ```
 *
 * @returns A `<section>` element explaining whitelist requirements.
 */
export default function WhitelistSection() {
  const { title, description, twitchUrl } = smpData.whitelistSection;

  return (
    <section className="section-container">
      <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
        <span className="gradient-text">{title}</span>
      </h2>

      <div className="whimsical-card mt-6 dark:border-lavender-300/20 dark:bg-[#2d1b4e]">
        <p className="font-body text-text-body dark:text-gray-200">
          {description}
        </p>
        <p className="mt-4 font-body text-text-body dark:text-gray-200">
          Head to{" "}
          <a
            href={twitchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-pink-600 underline hover:text-pink-700 dark:text-pink-300 dark:hover:text-pink-200"
          >
            saithsfuff&apos;s Twitch
            <span className="sr-only">(opens in new tab)</span>
          </a>{" "}
          to redeem your channel points!
        </p>
      </div>
    </section>
  );
}
