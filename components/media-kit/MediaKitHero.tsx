import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";

export default function MediaKitHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 sm:py-24 dark:bg-none dark:bg-[#1a0e2e]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Profile image */}
        <div className="mx-auto mb-8 flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-pink-200/60 shadow-whimsical-lg dark:border-lavender-700/40">
            <Image
              src={`${BASE_PATH}/images/portrait.png`}
              alt="Portrait of saithsfuff"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Portfolio</span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-text-body dark:text-gray-200 sm:text-xl">
          Content creator & streamer building cozy communities and creating engaging,
          authentic content across Twitch, Instagram, and TikTok.
        </p>

        {/* Quick stats highlight */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-muted dark:text-lavender-300">
          <span className="inline-flex items-center gap-1.5">
            <Image src="/images/links/twitch.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            18K+ Twitch
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Image src="/images/links/instagram.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            56K+ Instagram
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Image src="/images/links/tiktok.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            70K+ TikTok
          </span>
        </div>

      </div>
    </section>
  );
}
