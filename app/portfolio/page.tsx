import type { Metadata } from "next";
import NavBar from "@/components/shared/NavBar";
import DecorativeStars from "@/components/shared/DecorativeStars";
import MediaKitHero from "@/components/media-kit/MediaKitHero";
import PlatformStats from "@/components/media-kit/PlatformStats";
import AudienceDemographics from "@/components/media-kit/AudienceDemographics";
import BrandCollaborations from "@/components/media-kit/BrandCollaborations";
import ContentExamples from "@/components/media-kit/ContentExamples";
import ContactCTA from "@/components/media-kit/ContactCTA";

/** Page-level metadata for SEO and social sharing on the `/portfolio` route. */
export const metadata: Metadata = {
  title: "Portfolio & Media Kit | saithsfuff",
  description:
    "Explore saithsfuff's media kit — platform stats, audience demographics, brand collaborations, and content examples. Let's work together!",
};

/**
 * Portfolio & Media Kit page — the `/portfolio` route.
 *
 * Presents saithsfuff's media kit for potential brand partners: platform
 * statistics, audience demographics, past collaborations, content examples,
 * and a contact CTA. Sections are separated by sparkle dividers.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns The fully-rendered portfolio/media-kit page layout.
 */
export default function PortfolioPage() {
  return (
    <>
      <DecorativeStars />
      <NavBar />
      <main>
        <MediaKitHero />
        <div className="sparkle-divider" />
        <PlatformStats />
        <div className="sparkle-divider" />
        <AudienceDemographics />
        <div className="sparkle-divider" />
        <BrandCollaborations />
        <div className="sparkle-divider" />
        <ContentExamples />
        <div className="sparkle-divider" />
        <ContactCTA />
      </main>
      <footer className="py-8 text-center font-body text-sm text-text-body">
        <p>© 2026 saithsfuff. All rights reserved.</p>
      </footer>
    </>
  );
}
