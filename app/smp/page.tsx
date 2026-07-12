import type { Metadata } from "next";
import DecorativeStars from "@/components/shared/DecorativeStars";
import NavBar from "@/components/shared/NavBar";
import SmpHero from "@/components/smp/SmpHero";
import WhitelistSection from "@/components/smp/WhitelistSection";
import JavaSection from "@/components/smp/JavaSection";
import BedrockSection from "@/components/smp/BedrockSection";

/**
 * Page-level metadata for SEO and social sharing on the `/smp` route.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: "SMP | saithsfuff",
  description:
    "Join the saithsfuff SMP — a cozy community Minecraft server. Get the IP address, connection instructions, and start playing today!",
};

/**
 * SMP page — the `/smp` route.
 *
 * Advertises the saithsfuff SMP community Minecraft server with connection
 * details for both Java Edition and Bedrock Edition players. All content is
 * sourced from static data in `lib/smp-data.ts`.
 *
 * **Layout order:**
 * `DecorativeStars` → `NavBar` → `<main>` (SmpHero → WhitelistSection →
 * JavaSection → BedrockSection) → `<footer>`
 *
 * This is a **React Server Component** (no `"use client"` directive).
 * The only client-side JS on this route comes from `ServerIpDisplay` inside
 * `JavaSection`.
 *
 * @remarks
 * - Background is handled by the root layout (`bg-gradient-whimsical` on `<body>`).
 * - Sparkle dividers (`sparkle-divider` class) visually separate sections.
 * - Footer follows the site-wide pattern: `py-8 text-center font-body text-sm`.
 *
 * @returns The fully-rendered SMP page layout.
 */
export default function SmpPage() {
  return (
    <>
      <DecorativeStars />
      <NavBar />
      <main>
        <SmpHero />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="sparkle-divider" />
          <WhitelistSection />
          <div className="sparkle-divider" />
          <JavaSection />
          <div className="sparkle-divider" />
          <BedrockSection />
        </div>
      </main>
      <footer className="py-8 text-center font-body text-sm text-text-body dark:text-gray-100">
        <p>© 2026 saithsfuff. All rights reserved.</p>
      </footer>
    </>
  );
}
