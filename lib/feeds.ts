import { prisma } from "@/lib/prisma";
import { fetchInstagramMedia } from "@/lib/instagram";
import { fetchTikTokOEmbed } from "@/lib/tiktok";

export async function getInstagramPosts() {
  try {
    const posts = await prisma.instagramPost.findMany({
      where: { isActive: true },
      orderBy: { postedAt: "desc" },
      take: 6,
    });
    return posts;
  } catch (error) {
    console.error("Failed to get Instagram posts from database:", error);
    return [];
  }
}

export async function getTikTokVideos() {
  try {
    const videos = await prisma.tikTokVideo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
    return videos;
  } catch (error) {
    console.error("Failed to get TikTok videos from database:", error);
    return [];
  }
}

export async function refreshInstagramFeed(): Promise<number> {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("INSTAGRAM_ACCESS_TOKEN is not set");
      return 0;
    }

    const media = await fetchInstagramMedia(accessToken);
    if (media.length === 0) {
      return 0;
    }

    for (const item of media) {
      await prisma.instagramPost.upsert({
        where: { id: item.id },
        update: {
          mediaType: item.mediaType,
          mediaUrl: item.mediaUrl,
          thumbnailUrl: item.thumbnailUrl ?? null,
          permalink: item.permalink,
          caption: item.caption ?? null,
          postedAt: new Date(item.timestamp),
          cachedAt: new Date(),
          isActive: true,
        },
        create: {
          id: item.id,
          mediaType: item.mediaType,
          mediaUrl: item.mediaUrl,
          thumbnailUrl: item.thumbnailUrl ?? null,
          permalink: item.permalink,
          caption: item.caption ?? null,
          postedAt: new Date(item.timestamp),
          cachedAt: new Date(),
          isActive: true,
        },
      });
    }

    return media.length;
  } catch (error) {
    console.error("Failed to refresh Instagram feed:", error);
    return 0;
  }
}

export async function refreshTikTokFeed(): Promise<number> {
  try {
    const videos = await prisma.tikTokVideo.findMany({
      where: { isActive: true },
    });

    if (videos.length === 0) {
      return 0;
    }

    let updatedCount = 0;

    for (const video of videos) {
      const oembedData = await fetchTikTokOEmbed(video.videoUrl);
      if (!oembedData) {
        continue;
      }

      await prisma.tikTokVideo.upsert({
        where: { id: video.id },
        update: {
          title: oembedData.title,
          thumbnailUrl: oembedData.thumbnail_url,
          cachedAt: new Date(),
        },
        create: {
          id: video.id,
          title: oembedData.title,
          thumbnailUrl: oembedData.thumbnail_url,
          videoUrl: video.videoUrl,
          permalink: video.permalink,
          createdAt: video.createdAt,
          cachedAt: new Date(),
          isActive: true,
        },
      });

      updatedCount++;
    }

    return updatedCount;
  } catch (error) {
    console.error("Failed to refresh TikTok feed:", error);
    return 0;
  }
}
