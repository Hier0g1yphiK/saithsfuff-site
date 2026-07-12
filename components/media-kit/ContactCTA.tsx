import { contactInfo } from "@/lib/media-kit-data";

/**
 * Contact CTA section for the Portfolio/Media Kit page.
 *
 * Encourages brand partners to reach out with a prominent email button,
 * displayed email address, and social media links. Data is sourced from
 * `lib/media-kit-data.ts`.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns A `<section>` element containing the contact call-to-action.
 */
export default function ContactCTA() {
  return (
    <section className="section-container">
      <div className="whimsical-card text-center">

        <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-4">
          <span className="gradient-text">Let&apos;s Work Together</span> 💌
        </h2>

        <p className="mx-auto max-w-lg font-body text-text-body dark:text-gray-200 mb-6">
          Interested in a collaboration? I&apos;d love to hear from you! Reach out for
          sponsored content, brand partnerships, or creative projects.
        </p>

        {/* CTA Button */}
        <a
          href={`mailto:${contactInfo.email}`}
          className="inline-block rounded-pill bg-gradient-to-r from-pink-400 to-lavender-400 px-8 py-3 font-display text-sm font-semibold text-white shadow-whimsical transition-all hover:shadow-glow hover:scale-105 dark:from-lavender-500 dark:to-pink-500"
        >
          Get In Touch ✨
        </a>

        {/* Email */}
        <p className="mt-4 text-sm text-text-muted dark:text-lavender-300">
          {contactInfo.email}
        </p>

        {/* Social links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {contactInfo.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-pill bg-pink-50 px-3 py-1.5 text-sm font-medium text-text-body transition-colors hover:bg-pink-100 dark:bg-lavender-900/40 dark:text-lavender-200 dark:hover:bg-lavender-900/60"
            >
              {link.label}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
