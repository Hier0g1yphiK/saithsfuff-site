import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import DecorativeStars from "@/components/shared/DecorativeStars";
import HomeHero from "@/components/home/HomeHero";
import TwitchSection from "@/components/home/TwitchSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import TikTokFeed from "@/components/home/TikTokFeed";

/**
 * Homepage — the root route (`/`).
 *
 * Composes the standard page shell (DecorativeStars, NavBar, Footer) with
 * content sections: hero, Twitch embed, Instagram feed, and TikTok feed.
 *
 * This is a React Server Component (no "use client" directive).
 *
 * @returns The fully-rendered homepage layout.
 */
export default function Home() {
  return (
    <>
      <DecorativeStars />
      <NavBar />
      <main>
        <HomeHero />
        <TwitchSection />
        <InstagramFeed />
        <TikTokFeed />
      </main>
      <Footer />
    </>
  );
}
