import NavBar from "@/components/NavBar";
import AboutSection from "@/components/AboutSection";
import InstagramFeed from "@/components/InstagramFeed";
import TikTokFeed from "@/components/TikTokFeed";
import { getInstagramPosts, getTikTokVideos } from "@/lib/feeds";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [instagramPosts, tiktokVideos] = await Promise.all([
    getInstagramPosts(),
    getTikTokVideos(),
  ]);

  const posts = instagramPosts.map((post) => ({
    id: post.id,
    mediaType: post.mediaType,
    mediaUrl: post.mediaUrl,
    thumbnailUrl: post.thumbnailUrl,
    permalink: post.permalink,
    caption: post.caption,
    postedAt: post.postedAt,
  }));

  const videos = tiktokVideos.map((video) => ({
    id: video.id,
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,
    videoUrl: video.videoUrl,
    permalink: video.permalink,
    createdAt: video.createdAt,
  }));

  return (
    <>
      <NavBar />
      <main>
        <AboutSection />
        <InstagramFeed posts={posts} />
        <TikTokFeed videos={videos} />
      </main>
      <footer className="py-8 text-center font-body text-sm text-text-body">
        <p>© 2024 saithsfuff. All rights reserved.</p>
      </footer>
    </>
  );
}
