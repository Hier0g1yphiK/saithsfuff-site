import Image from "next/image";

export interface InstagramPost {
  id: string;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl: string | null;
  permalink: string;
  caption: string | null;
  postedAt: Date;
}

interface InstagramFeedProps {
  posts?: InstagramPost[];
}

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/saithsfuff/";

export default function InstagramFeed({ posts }: InstagramFeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <section id="instagram" className="section-container">
        <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
          <span className="gradient-text">Follow on Instagram</span> 📸
        </h2>
        <div className="whimsical-card text-center">
          <p className="font-body text-text-body text-base sm:text-lg">
            Our Instagram feed is taking a break — check back soon!
          </p>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
          >
            Visit our Instagram →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram" className="section-container">
      <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
        <span className="gradient-text">Follow on Instagram</span> 📸
      </h2>

      <div
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {posts.map((post) => {
          const imageUrl =
            post.mediaType === "VIDEO" && post.thumbnailUrl
              ? post.thumbnailUrl
              : post.mediaUrl;

          return (
            <div
              key={post.id}
              role="listitem"
              className="whimsical-card p-0 overflow-hidden group"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-square">
                  <Image
                    src={imageUrl}
                    alt={post.caption || "Instagram post"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
        >
          Visit profile →
        </a>
      </div>
    </section>
  );
}
