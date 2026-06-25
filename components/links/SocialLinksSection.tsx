import { socialLinks } from "@/lib/links-data";
import LinkCard from "./LinkCard";

/**
 * Renders the "Social Media" section of the Links page.
 *
 * Iterates over the `socialLinks` array from `lib/links-data.ts` and renders
 * a vertically-stacked list of {@link LinkCard} components.
 *
 * @returns A `<section>` with an h2 heading and the social link cards.
 */
export default function SocialLinksSection() {
  return (
    <section>
      <h2 className="text-2xl font-display font-bold mb-4 text-text-dark dark:text-lavender-100">Social Media</h2>
      <div className="flex flex-col gap-3">
        {socialLinks.map((link) => (
          <LinkCard
            key={link.href}
            name={link.name}
            href={link.href}
            description={link.description}
            icon={link.icon}
          />
        ))}
      </div>
    </section>
  );
}
