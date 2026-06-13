export interface TikTokVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  permalink: string;
  createdAt: string;
}

export interface TikTokOEmbedResponse {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  html: string;
}

export async function fetchTikTokOEmbed(
  videoUrl: string
): Promise<TikTokOEmbedResponse | null> {
  try {
    const url = `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `TikTok oEmbed API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const json: TikTokOEmbedResponse = await response.json();

    return json;
  } catch (error) {
    console.error("Failed to fetch TikTok oEmbed data:", error);
    return null;
  }
}
