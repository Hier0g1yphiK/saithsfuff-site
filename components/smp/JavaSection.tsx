import { smpData } from "@/lib/smp-data";
import ServerIpDisplay from "@/components/smp/ServerIpDisplay";

/**
 * Java Edition connection instructions section for the SMP page.
 *
 * Renders an `<h2>` heading, the interactive {@link ServerIpDisplay} client
 * component, and step-by-step instructions inside a `whimsical-card`.
 *
 * This is a **React Server Component** — the only client JS it ships comes
 * from the nested `ServerIpDisplay`.
 *
 * @remarks
 * - Uses `section-container` for consistent max-width and padding.
 * - Card uses `whimsical-card` with dark-mode overrides.
 * - Steps render as an `<ol>` (ordered list) for accessibility.
 * - All display text is sourced from `lib/smp-data.ts`.
 *
 * @example
 * ```tsx
 * // Used inside app/smp/page.tsx
 * import JavaSection from "@/components/smp/JavaSection";
 *
 * <JavaSection />
 * ```
 *
 * @returns A `<section>` element containing the Java Edition connection guide.
 */
export default function JavaSection() {
  const { title, steps } = smpData.javaSection;

  return (
    <section className="section-container">
      <h2 className="text-center font-display text-2xl font-bold text-text-dark dark:text-lavender-100 sm:text-3xl">
        {title}
      </h2>

      <div className="whimsical-card mt-6 dark:border-lavender-300/20 dark:bg-[#2d1b4e]">
        <ServerIpDisplay serverIp={smpData.serverIp} />

        <ol className="mt-6 list-decimal space-y-3 pl-6 font-body text-text-body dark:text-gray-200">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
