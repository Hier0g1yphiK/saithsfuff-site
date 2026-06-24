import type { Metadata } from "next";
import NavBar from "@/components/shared/NavBar";
import DecorativeStars from "@/components/shared/DecorativeStars";
import MediaKitHero from "@/components/media-kit/MediaKitHero";
import PlatformStats from "@/components/media-kit/PlatformStats";
import AudienceDemographics from "@/components/media-kit/AudienceDemographics";
import BrandCollaborations from "@/components/media-kit/BrandCollaborations";
import ContentExamples from "@/components/media-kit/ContentExamples";
import ContactCTA from "@/components/media-kit/ContactCTA";

export const metadata: Metadata = {
  title: "Portfolio & Media Kit | saithsfuff",
  description:
    "Explore saithsfuff's media kit — platform stats, audience demographics, brand collaborations, and content examples. Let's work together!",
};

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
        <p>© 2024 saithsfuff. All rights reserved.</p>
      </footer>
    </>
  );
}
