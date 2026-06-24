import type { Metadata } from "next";
import DecorativeStars from "@/components/shared/DecorativeStars";
import NavBar from "@/components/shared/NavBar";
import LinksHero from "@/components/links/LinksHero";
import SocialLinksSection from "@/components/links/SocialLinksSection";
import PartnersSection from "@/components/links/PartnersSection";

export const metadata: Metadata = {
  title: "Links | saithsfuff",
  description:
    "Find all of saithsfuff's social media profiles, partner links, and discount codes in one place.",
};

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
        <p>© 2024 saithsfuff. All rights reserved.</p>
      </footer>
    </div>
  );
}
