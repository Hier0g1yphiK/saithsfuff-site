export interface InstagramMedia {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramApiResponse {
  data: Array<{
    id: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
    timestamp: string;
  }>;
}

export async function fetchInstagramMedia(
  accessToken: string,
  limit: number = 6
): Promise<InstagramMedia[]> {
  try {
    const fields =
      "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `Instagram API error: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const json: InstagramApiResponse = await response.json();

    return json.data.map((item) => ({
      id: item.id,
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url,
      permalink: item.permalink,
      caption: item.caption,
      timestamp: item.timestamp,
    }));
  } catch (error) {
    console.error("Failed to fetch Instagram media:", error);
    return [];
  }
}
