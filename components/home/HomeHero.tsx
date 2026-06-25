import Image from "next/image";
import { BASE_PATH } from "@/lib/constants";

/**
 * Homepage hero section.
 *
 * Displays saithsfuff's profile photo, a gradient headline, and a tagline.
 * Uses the pastel hero gradient in light mode and a deep purple backdrop in
 * dark mode. The profile image is loaded with `priority` for LCP optimization.
 *
 * @returns A `<section>` element with the hero content.
 */
export default function HomeHero() {
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
          <span className="gradient-text">Hey, I&apos;m saithsfuff!</span> ✨
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-text-body dark:text-gray-200 sm:text-xl">
          Streamer, content creator, and cozy community builder. Welcome to my
          little corner of the internet — grab a snack and stay a while! 💖
        </p>


      </div>
    </section>
  );
}
