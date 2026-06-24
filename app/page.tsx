import NavBar from "@/components/shared/NavBar";
import DecorativeStars from "@/components/shared/DecorativeStars";
import HomeHero from "@/components/home/HomeHero";
import TwitchSection from "@/components/home/TwitchSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import TikTokFeed from "@/components/home/TikTokFeed";
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
      <footer className="py-8 text-center font-body text-sm text-text-body">
        <p>© 2024 saithsfuff. All rights reserved.</p>
      </footer>
    </>
  );
}
