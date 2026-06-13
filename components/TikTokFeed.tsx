import Image from "next/image";

export interface TikTokVideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  permalink: string;
  createdAt: Date;
}

interface TikTokFeedProps {
  videos?: TikTokVideoItem[];
}

const TIKTOK_CHANNEL_URL = "https://www.tiktok.com/@saithsfuff";

export default function TikTokFeed({ videos }: TikTokFeedProps) {
  if (!videos || videos.length === 0) {
    return (
      <section id="tiktok" className="section-container">
        <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
          <span className="gradient-text">Follow on TikTok</span> 🎵
        </h2>
        <div className="whimsical-card text-center">
          <p className="font-body text-text-body text-base sm:text-lg">
            Our TikTok feed is taking a break — check back soon!
          </p>
          <a
            href={TIKTOK_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
          >
            Visit our TikTok →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="tiktok" className="section-container">
      <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
        <span className="gradient-text">Follow on TikTok</span> 🎵
      </h2>

      <div
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            role="listitem"
            className="whimsical-card p-0 overflow-hidden group"
          >
            <a
              href={video.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative aspect-[9/16]">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title || "TikTok video"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </a>
            <div className="p-3">
              <p className="font-body text-text-body text-sm line-clamp-2">
                {video.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={TIKTOK_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
        >
          Visit channel →
        </a>
      </div>
    </section>
  );
}
