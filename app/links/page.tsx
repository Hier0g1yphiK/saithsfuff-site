import type { Metadata } from "next";
import DecorativeStars from "@/components/shared/DecorativeStars";
import NavBar from "@/components/shared/NavBar";
import LinksHero from "@/components/links/LinksHero";
import SocialLinksSection from "@/components/links/SocialLinksSection";
import PartnersSection from "@/components/links/PartnersSection";

/** Page-level metadata for SEO and social sharing on the `/links` route. */
export const metadata: Metadata = {
  title: "Links | saithsfuff",
  description:
    "Find all of saithsfuff's social media profiles, partner links, and discount codes in one place.",
};

/**
 * Links page — the `/links` route.
 *
 * A "link-in-bio" style page listing saithsfuff's social media profiles and
 * partner/sponsor discount codes. All link data is sourced from static arrays
 * in `lib/links-data.ts`.
 *
 * Layout: DecorativeStars → NavBar → LinksHero → SocialLinksSection →
 * PartnersSection → footer. Sections are separated by sparkle dividers.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns The fully-rendered links page layout.
 */
export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-whimsical dark:bg-none dark:bg-[#1a0e2e]">
      <DecorativeStars />
      <NavBar />
      <main>
        <LinksHero />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="sparkle-divider" />
          <SocialLinksSection />
          <div className="sparkle-divider" />
          <PartnersSection />
        </div>
      </main>
      <footer className="py-8 text-center font-body text-sm text-text-body dark:text-gray-100">
        <p>© 2026 saithsfuff. All rights reserved.</p>
      </footer>
    </div>
  );
}
