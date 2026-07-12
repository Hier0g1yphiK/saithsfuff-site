import { smpData } from "@/lib/smp-data";

/**
 * Bedrock Edition connection instructions section for the SMP page.
 *
 * Renders an `<h2>` heading, the server IP and port, step-by-step instructions
 * inside a `whimsical-card`, and optional help video links.
 *
 * This is a **React Server Component** — ships zero client JS.
 *
 * @remarks
 * - Uses `section-container` for consistent max-width and padding.
 * - Card uses `whimsical-card` with dark-mode overrides.
 * - Steps render as an `<ol>` (ordered list) for accessibility.
 * - All display text is sourced from `lib/smp-data.ts`.
 *
 * @returns A `<section>` element containing the Bedrock Edition joining guide.
 */
export default function BedrockSection() {
  const { title, steps, helpVideos } = smpData.bedrockSection;

  return (
    <section className="section-container">
      <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
        <span className="gradient-text">{title}</span>
      </h2>

      <div className="whimsical-card mt-6 dark:border-lavender-300/20 dark:bg-[#2d1b4e]">
        <div className="flex flex-col items-center gap-1 mb-4">
          <span className="text-2xl font-display font-bold text-pink-600 dark:text-pink-300 select-all" style={{ userSelect: "all" }}>
            {smpData.bedrockIp}
          </span>
          <span className="text-sm font-body text-text-muted dark:text-gray-300">
            Port: {smpData.bedrockPort}
          </span>
        </div>

        <ol className="list-decimal space-y-3 pl-6 font-body text-text-body dark:text-gray-200">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {helpVideos && helpVideos.length > 0 && (
          <div className="mt-6 space-y-3 font-body text-text-body dark:text-gray-200">
            {helpVideos.map((video, index) => (
              <p key={index}>
                {video.label}{" "}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-pink-600 underline hover:text-pink-700 dark:text-pink-300 dark:hover:text-pink-200"
                >
                  Watch here
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
